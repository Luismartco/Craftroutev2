<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use App\Models\Categoria;
use App\Models\Material;
use App\Models\Tecnica;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        // Obtener estadísticas
        $stats = [
            'total_users' => \App\Models\User::count(),
            'total_artesanos' => \App\Models\User::where('role', 'artisan')->count(),
            'total_clientes' => \App\Models\User::where('role', 'customer')->count(),
        ];

        // Obtener datos para los filtros
        $categorias = Categoria::orderBy('nombre')->get()->map(function($categoria) {
            return [
                'id' => $categoria->id,
                'name' => $categoria->nombre,
                'description' => $categoria->descripcion
            ];
        });

        // Obtener municipios únicos de las tiendas
        $municipios = \App\Models\Tienda::select('municipio_venta')
            ->distinct()
            ->orderBy('municipio_venta')
            ->get()
            ->map(function($tienda) {
                return [
                    'id' => $tienda->municipio_venta,
                    'name' => ucfirst($tienda->municipio_venta)
                ];
            });

        // Obtener artesanos con sus tiendas
        $artesanos = \App\Models\User::where('role', 'artisan')
            ->with('tienda')
            ->orderBy('name')
            ->get()
            ->map(function($artesano) {
                return [
                    'id' => $artesano->id,
                    'name' => $artesano->name . ' ' . $artesano->last_name,
                    'tienda' => $artesano->tienda ? $artesano->tienda->nombre : 'Sin tienda'
                ];
            });

        // Obtener todos los productos para generar datos de gráficas
        $todosLosProductos = \App\Models\Producto::with(['user.tienda', 'categoria', 'imagenes'])->get();
        
        // Generar datos para las gráficas
        // Gráfica 1: Ventas por Producto (cantidad * precio)
        $ventasPorProducto = $todosLosProductos->groupBy('nombre')->map(function($productos) {
            return [
                'producto' => $productos->first()->nombre,
                'value' => $productos->sum(function($p) {
                    return $p->cantidad_disponible * $p->precio;
                })
            ];
        })->values()->toArray();

        // Gráfica 2: Cantidad de Productos por Categoría
        $cantidadPorCategoria = $todosLosProductos->groupBy(function($producto) {
            // Usar solo categoria_id
            if ($producto->categoria_id && $producto->categoria && is_object($producto->categoria)) {
                return $producto->categoria->nombre;
            }
            // Si no hay relación pero hay categoria_id, buscar la categoría
            if ($producto->categoria_id) {
                $categoria = \App\Models\Categoria::find($producto->categoria_id);
                return $categoria ? $categoria->nombre : 'Sin categoría';
            }
            return 'Sin categoría';
        })->map(function($productos, $categoria) {
            return [
                'producto' => $categoria ?: 'Sin categoría',
                'value' => $productos->sum('cantidad_disponible')
            ];
        })->values()->toArray();

        // Obtener productos con información completa para la tabla de estadísticas (paginado)
        $productosPaginados = \App\Models\Producto::with(['user', 'categoria', 'imagenes'])
            ->paginate(5);
        
        $productos = $productosPaginados->map(function($producto) {
            $imagen = $producto->imagenes->where('es_principal', true)->first();
            $imagenUrl = $imagen ? asset('storage/' . $imagen->ruta_imagen) : null;
            
            return [
                'id' => $producto->id,
                'image' => $imagenUrl,
                'name' => $producto->nombre,
                'price' => '$' . number_format($producto->precio, 0, ',', '.'),
                'amount' => $producto->cantidad_disponible,
                'total' => '$' . number_format($producto->precio * $producto->cantidad_disponible, 0, ',', '.'),
                'store' => $producto->user && $producto->user->tienda ? $producto->user->tienda->nombre : 'Sin tienda',
                'municipality' => $producto->user && $producto->user->tienda ? ucfirst($producto->user->tienda->municipio_venta) : 'Sin municipio'
            ];
        });

        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => $stats,
            'recent_activities' => \App\Models\Activity::latest()->take(5)->get(),
            'categorias' => $categorias,
            'municipios' => $municipios,
            'artesanos' => $artesanos,
            'productos' => $productos,
            'chartData' => [
                'data1' => $ventasPorProducto,
                'data2' => $cantidadPorCategoria
            ],
            'productosPagination' => [
                'current_page' => $productosPaginados->currentPage(),
                'last_page' => $productosPaginados->lastPage(),
                'per_page' => $productosPaginados->perPage(),
                'total' => $productosPaginados->total(),
                'from' => $productosPaginados->firstItem(),
                'to' => $productosPaginados->lastItem(),
                'links' => $productosPaginados->linkCollection()->toArray()
            ],
            'materiales' => Material::orderBy('nombre')->get()->map(function($material) {
                return [
                    'id' => $material->id,
                    'name' => $material->nombre,
                    'description' => $material->descripcion
                ];
            }),
            'tecnicas' => Tecnica::orderBy('nombre')->get()->map(function($tecnica) {
                return [
                    'id' => $tecnica->id,
                    'name' => $tecnica->nombre,
                    'description' => $tecnica->descripcion
                ];
            }),
        ]);
    }

    public function storeCategoria(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:categorias',
            'descripcion' => 'required|string',
        ]);

        Categoria::create($validated);

        return redirect()->back()->with('success', 'Categoría creada exitosamente');
    }

    public function updateCategoria(Request $request, $id)
    {
        $categoria = Categoria::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:categorias,nombre,' . $id,
            'descripcion' => 'required|string',
        ]);

        $categoria->update($validated);

        return redirect()->back()->with('success', 'Categoría actualizada exitosamente');
    }

    public function destroyCategoria($id)
    {
        $categoria = Categoria::findOrFail($id);
        
        // Verificar si hay productos asociados
        $productosAsociados = $categoria->productos()->count();
        $productosConNombreCategoria = \App\Models\Producto::where('categoria', $categoria->nombre)->count();
        
        if ($productosAsociados > 0 || $productosConNombreCategoria > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la categoría porque tiene productos asociados');
        }

        $categoria->delete();

        return redirect()->back()->with('success', 'Categoría eliminada exitosamente');
    }

    public function storeMaterial(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:materiales',
            'descripcion' => 'required|string',
        ]);

        Material::create($validated);

        return redirect()->back()->with('success', 'Material creado exitosamente');
    }

    public function updateMaterial(Request $request, $id)
    {
        $material = Material::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:materiales,nombre,' . $id,
            'descripcion' => 'required|string',
        ]);

        $material->update($validated);

        return redirect()->back()->with('success', 'Material actualizado exitosamente');
    }

    public function destroyMaterial($id)
    {
        $material = Material::findOrFail($id);
        
        // Verificar si hay productos asociados
        $productosAsociados = $material->productos()->count();
        
        if ($productosAsociados > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar el material porque tiene productos asociados');
        }

        $material->delete();

        return redirect()->back()->with('success', 'Material eliminado exitosamente');
    }

    public function storeTecnica(Request $request)
    {
        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:tecnicas',
            'descripcion' => 'required|string',
        ]);

        Tecnica::create($validated);

        return redirect()->back()->with('success', 'Técnica creada exitosamente');
    }

    public function updateTecnica(Request $request, $id)
    {
        $tecnica = Tecnica::findOrFail($id);

        $validated = $request->validate([
            'nombre' => 'required|string|max:255|unique:tecnicas,nombre,' . $id,
            'descripcion' => 'required|string',
        ]);

        $tecnica->update($validated);

        return redirect()->back()->with('success', 'Técnica actualizada exitosamente');
    }

    public function destroyTecnica($id)
    {
        $tecnica = Tecnica::findOrFail($id);
        
        // Verificar si hay productos asociados
        $productosAsociados = $tecnica->productos()->count();
        
        if ($productosAsociados > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la técnica porque tiene productos asociados');
        }

        $tecnica->delete();

        return redirect()->back()->with('success', 'Técnica eliminada exitosamente');
    }

    public function manageUsers()
    {
        return Inertia::render('Dashboard/Admin/ManageUsers', [
            'users' => \App\Models\User::with('profile')->paginate(10),
        ]);
    }

    public function manageArtesanos()
    {
        return Inertia::render('Dashboard/Admin/ManageArtesanos', [
            'artesanos' => \App\Models\User::where('role', 'artisan')
                ->with('profile')
                ->paginate(10),
        ]);
    }

    public function getFilteredData(Request $request)
    {
        try {
            // Verificar autenticación
            if (!Auth::check()) {
                return response()->json(['error' => 'No autenticado'], 401);
            }

            // Verificar rol de administrador
            if (Auth::user()->role !== 'admin') {
                return response()->json(['error' => 'No autorizado'], 403);
            }

            $categoriaId = $request->get('categoria_id');
            $municipio = $request->get('municipio');
            $artesanoId = $request->get('artesano_id');

            // Log para depuración
            Log::info('Filtros recibidos:', [
                'categoria_id' => $categoriaId,
                'municipio' => $municipio,
                'artesano_id' => $artesanoId
            ]);

        // Verificar si hay productos en la base de datos
        $totalProductos = \App\Models\Producto::count();
        $productosSinCategoria = \App\Models\Producto::whereNull('categoria_id')->count();
        $productosConCategoria = \App\Models\Producto::whereNotNull('categoria_id')->count();
        
        Log::info('Total de productos en la base de datos:', ['count' => $totalProductos]);
        Log::info('Productos sin categoria_id:', ['count' => $productosSinCategoria]);
        Log::info('Productos con categoria_id:', ['count' => $productosConCategoria]);
        
        // Ver algunos productos de ejemplo
        $productosEjemplo = \App\Models\Producto::with('categoria')->take(3)->get();
        Log::info('Productos de ejemplo:', $productosEjemplo->toArray());

        // Construir query base para productos
        $query = \App\Models\Producto::with(['user.tienda', 'categoria', 'imagenes']);

        // Aplicar filtros solo si tienen valor
        if ($categoriaId && $categoriaId !== '') {
            Log::info('Aplicando filtro de categoría:', ['categoria_id' => $categoriaId]);
            
            // Filtrar por categoria_id
            $query->where('categoria_id', $categoriaId);
        }

        if ($municipio && $municipio !== '') {
            Log::info('Aplicando filtro de municipio:', ['municipio' => $municipio]);
            $query->whereHas('user.tienda', function($q) use ($municipio) {
                $q->where('municipio_venta', $municipio);
            });
        }

        if ($artesanoId && $artesanoId !== '') {
            Log::info('Aplicando filtro de artesano:', ['artesano_id' => $artesanoId]);
            $query->where('user_id', $artesanoId);
        }

        // Log de la consulta SQL
        Log::info('Consulta SQL:', ['sql' => $query->toSql(), 'bindings' => $query->getBindings()]);

        $productos = $query->get();
        
        // Log para depuración
        Log::info('Productos encontrados:', ['count' => $productos->count()]);
        
        // Log de algunos productos para verificar
        if ($productos->count() > 0) {
            Log::info('Primeros productos encontrados:', $productos->take(3)->toArray());
        }

        // Gráfica 1: Ventas por Producto (cantidad * precio)
        $ventasPorProducto = $productos->groupBy('nombre')->map(function($productos) {
            return [
                'producto' => $productos->first()->nombre,
                'value' => $productos->sum(function($p) {
                    return $p->cantidad_disponible * $p->precio;
                })
            ];
        })->values()->toArray();

        // Gráfica 2: Cantidad de Productos por Categoría
        $cantidadPorCategoria = $productos->groupBy(function($producto) {
            // Usar solo categoria_id
            if ($producto->categoria_id && $producto->categoria && is_object($producto->categoria)) {
                return $producto->categoria->nombre;
            }
            // Si no hay relación pero hay categoria_id, buscar la categoría
            if ($producto->categoria_id) {
                $categoria = \App\Models\Categoria::find($producto->categoria_id);
                return $categoria ? $categoria->nombre : 'Sin categoría';
            }
            return 'Sin categoría';
        })->map(function($productos, $categoria) {
            return [
                'producto' => $categoria ?: 'Sin categoría',
                'value' => $productos->sum('cantidad_disponible')
            ];
        })->values()->toArray();

        // Productos paginados para la tabla
        $productosPaginados = $query->paginate(5);
        $productosTabla = $productosPaginados->map(function($producto) {
            $imagen = $producto->imagenes->where('es_principal', true)->first();
            $imagenUrl = $imagen ? asset('storage/' . $imagen->ruta_imagen) : null;
            
            return [
                'id' => $producto->id,
                'image' => $imagenUrl,
                'name' => $producto->nombre,
                'price' => '$' . number_format($producto->precio, 0, ',', '.'),
                'amount' => $producto->cantidad_disponible,
                'total' => '$' . number_format($producto->precio * $producto->cantidad_disponible, 0, ',', '.'),
                'store' => $producto->user && $producto->user->tienda ? $producto->user->tienda->nombre : 'Sin tienda',
                'municipality' => $producto->user && $producto->user->tienda ? ucfirst($producto->user->tienda->municipio_venta) : 'Sin municipio'
            ];
        });

        $response = [
            'chartData' => [
                'data1' => $ventasPorProducto,
                'data2' => $cantidadPorCategoria
            ],
            'products' => $productosTabla,
            'pagination' => [
                'current_page' => $productosPaginados->currentPage(),
                'last_page' => $productosPaginados->lastPage(),
                'per_page' => $productosPaginados->perPage(),
                'total' => $productosPaginados->total(),
                'from' => $productosPaginados->firstItem(),
                'to' => $productosPaginados->lastItem(),
                'links' => $productosPaginados->linkCollection()->toArray()
            ]
        ];

        // Log para depuración
        Log::info('Datos de respuesta:', [
            'ventas_por_producto_count' => count($ventasPorProducto),
            'cantidad_por_categoria_count' => count($cantidadPorCategoria),
            'productos_tabla_count' => count($productosTabla)
        ]);

            return response()->json($response);
        } catch (\Exception $e) {
            Log::error('Error en getFilteredData:', [
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => $e->getTraceAsString()
            ]);
            
            return response()->json([
                'error' => 'Error interno del servidor',
                'message' => $e->getMessage()
            ], 500);
        }
    }
} 