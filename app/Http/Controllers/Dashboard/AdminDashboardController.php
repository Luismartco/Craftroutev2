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
use App\Models\User; 

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        // Estadísticas
        $stats = [
            'total_users' => User::count(),
            'total_artesanos' => User::where('role', 'artisan')->count(),
            'total_clientes' => User::where('role', 'customer')->count(),
            'total_categorias' => Categoria::count(),
            'total_ventas' => \App\Models\TransaccionItem::sum('cantidad'),
        ];

        // Categorías
        $categorias = Categoria::orderBy('nombre')->get()->map(function($categoria) {
            return [
                'id' => $categoria->id,
                'name' => $categoria->nombre,
                'description' => $categoria->descripcion
            ];
        });

        // Municipios
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

        // Artesanos
        $artesanos = User::where('role', 'artisan')
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

        // Productos
        $todosLosProductos = \App\Models\Producto::with(['user.tienda', 'categoria', 'imagenes'])->get();

        // Gráfica 1: Ventas por producto
        $ventasPorProducto = \App\Models\TransaccionItem::selectRaw('nombre_producto, SUM(cantidad) as total_cantidad')
            ->groupBy('nombre_producto')
            ->get()
            ->map(function($item) {
                return [
                    'producto' => $item->nombre_producto,
                    'value' => $item->total_cantidad
                ];
            })->toArray();

        // Gráfica 2: Productos por categoría
        $cantidadPorCategoria = $todosLosProductos->filter(function($producto) {
            return $producto->categoria_id !== null;
        })->groupBy(function($producto) {
            if ($producto->categoria_id && $producto->categoria && is_object($producto->categoria)) {
                return $producto->categoria->nombre;
            }
            if ($producto->categoria_id) {
                $categoria = Categoria::find($producto->categoria_id);
                return $categoria ? $categoria->nombre : null;
            }
            return null;
        })->filter(function($productos, $categoria) {
            return $categoria !== null;
        })->map(function($productos, $categoria) {
            return [
                'producto' => $categoria,
                'value' => $productos->sum('cantidad_disponible')
            ];
        })->values()->toArray();

        // Tabla de productos
        $productosPaginados = \App\Models\Producto::with(['user', 'categoria', 'imagenes'])->paginate(5);
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

    // -------- Categorías --------
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
        $productosAsociados = $categoria->productos()->count();
        $productosConNombreCategoria = \App\Models\Producto::where('categoria', $categoria->nombre)->count();
        
        if ($productosAsociados > 0 || $productosConNombreCategoria > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la categoría porque tiene productos asociados');
        }

        $categoria->delete();
        return redirect()->back()->with('success', 'Categoría eliminada exitosamente');
    }

    // -------- Materiales --------
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
        $productosAsociados = $material->productos()->count();
        
        if ($productosAsociados > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar el material porque tiene productos asociados');
        }

        $material->delete();
        return redirect()->back()->with('success', 'Material eliminado exitosamente');
    }

    // -------- Técnicas --------
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
        $productosAsociados = $tecnica->productos()->count();
        
        if ($productosAsociados > 0) {
            return redirect()->back()->with('error', 'No se puede eliminar la técnica porque tiene productos asociados');
        }

        $tecnica->delete();
        return redirect()->back()->with('success', 'Técnica eliminada exitosamente');
    }

    // -------- Usuarios --------
    public function manageUsers()
    {
        return Inertia::render('Dashboard/Admin/ManageUsers', [
            'users' => User::with('profile')->paginate(10),
        ]);
    }

    public function manageArtesanos(): Response
    {
        return Inertia::render('Dashboard/Admin/ManageArtesanos', [
            'artesanos' => User::where('role', 'artisan')
                ->with('profile')
                ->paginate(10),
        ]);
    }

    // -------- Filtros --------
    public function getFilteredData(Request $request)
    {
        try {
            if (!Auth::check()) {
                return response()->json(['error' => 'No autenticado'], 401);
            }

            if (Auth::user()->role !== 'admin') {
                return response()->json(['error' => 'No autorizado'], 403);
            }

            $categoriaId = $request->get('categoria_id');
            $municipio = $request->get('municipio');
            $artesanoId = $request->get('artesano_id');

            Log::info('Filtros recibidos:', [
                'categoria_id' => $categoriaId,
                'municipio' => $municipio,
                'artesano_id' => $artesanoId
            ]);

            $query = \App\Models\Producto::with(['user.tienda', 'categoria', 'imagenes']);

            if ($categoriaId && $categoriaId !== '') {
                $query->where('categoria_id', $categoriaId);
            }

            if ($municipio && $municipio !== '') {
                $query->whereHas('user.tienda', function($q) use ($municipio) {
                    $q->where('municipio_venta', $municipio);
                });
            }

            if ($artesanoId && $artesanoId !== '') {
                $query->where('user_id', $artesanoId);
            }

            $productos = $query->get();

            // Gráfica 1
            $productIds = $productos->pluck('id');
            $ventasPorProducto = \App\Models\TransaccionItem::whereIn('id_producto', $productIds)
                ->selectRaw('nombre_producto, SUM(cantidad) as total_cantidad')
                ->groupBy('nombre_producto')
                ->get()
                ->map(function($item) {
                    return [
                        'producto' => $item->nombre_producto,
                        'value' => $item->total_cantidad
                    ];
                })->toArray();

            // Gráfica 2
            $cantidadPorCategoria = $productos->filter(function($producto) {
                return $producto->categoria_id !== null;
            })->groupBy(function($producto) {
                if ($producto->categoria_id && $producto->categoria && is_object($producto->categoria)) {
                    return $producto->categoria->nombre;
                }
                if ($producto->categoria_id) {
                    $categoria = Categoria::find($producto->categoria_id);
                    return $categoria ? $categoria->nombre : null;
                }
                return null;
            })->filter(function($productos, $categoria) {
                return $categoria !== null;
            })->map(function($productos, $categoria) {
                return [
                    'producto' => $categoria,
                    'value' => $productos->sum('cantidad_disponible')
                ];
            })->values()->toArray();

            // Tabla
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

            return response()->json([
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
            ]);
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