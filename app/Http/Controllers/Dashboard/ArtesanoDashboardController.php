<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;
use App\Models\Tienda;
use App\Models\Producto;
use App\Models\ImagenProducto; // Importación crucial
use Illuminate\Support\Facades\Log;


class ArtesanoDashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $tienda = $user->tienda;
        
        // Cargar productos con sus imágenes
        $productos = Producto::with(['imagenes'])
                    ->where('user_id', $user->id)
                    ->get();

        $stats = [
            'total_productos' => $productos->count(),
            'total_ventas' => 0,
            'total_pedidos' => 0,
            'productos' => $productos,
        ];

        return Inertia::render('Dashboard/Artesano/Index', [
            'stats' => $stats,
            'user' => $user,
            'tienda' => $tienda,
        ]);
    }

    public function productos()
    {
        $user = Auth::user();
        
        return Inertia::render('Dashboard/Artesano/Productos', [
            'productos' => [],
        ]);
    }

    public function createProducto()
    {
        return Inertia::render('Dashboard/Artesano/CreateProducto');
    }

    public function pedidos()
    {
        $user = Auth::user();
        return Inertia::render('Dashboard/Artesano/Pedidos', [
            'pedidos' => $user->pedidos()->with('cliente')->paginate(10),
        ]);
    }

    public function createTienda()
    {
        return Inertia::render('Dashboard/Artesano/CreateTienda');
    }

    public function storeTienda(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'barrio' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'municipio_venta' => 'required|in:morroa,sampues',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
            'foto_perfil' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:10240',
        ]);

        $user = auth()->user();

        // Verificar si el usuario ya tiene una tienda
        if ($user->tienda) {
            return redirect()->back()->with('error', 'Ya tienes una tienda creada.');
        }

        $data = $request->except('foto_perfil');

        // Manejar la imagen de perfil si se sube
        if ($request->hasFile('foto_perfil')) {
            $path = $request->file('foto_perfil')->store('tiendas', 'public');
            $data['foto_perfil'] = $path;
        }

        // Crear la tienda
        $tienda = $user->tienda()->create($data);

        return redirect()->route('dashboard.artesano.gestionar-tienda')
            ->with('success', 'Tienda creada exitosamente.');
    }

    public function gestionarTienda()
    {
        $user = auth()->user();
        $tienda = Tienda::where('user_id', $user->id)->first();
        $productos = Producto::where('user_id', $user->id)->get();

        return Inertia::render('Dashboard/Artesano/GestionarTienda', [
            'tienda' => $tienda,
            'productos' => $productos
        ]);
    }

    public function editTienda()
    {
        $user = auth()->user();
        $tienda = $user->tienda;

        if (!$tienda) {
            return redirect()->route('dashboard.artesano.index')
                ->with('error', 'No tienes una tienda creada.');
        }

        return Inertia::render('Dashboard/Artesano/EditTienda', [
            'tienda' => $tienda,
        ]);
    }

    public function updateTienda(Request $request)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'barrio' => 'required|string|max:255',
            'direccion' => 'required|string|max:255',
            'telefono' => 'required|string|max:20',
            'municipio_venta' => 'required|in:morroa,sampues',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ]);

        $user = auth()->user();
        $tienda = $user->tienda;

        if (!$tienda) {
            return redirect()->route('dashboard.artesano.index')
                ->with('error', 'No tienes una tienda creada.');
        }

        $data = $request->all();

        // Actualizar la tienda
        $tienda->update($data);

        return redirect()->route('dashboard.artesano.gestionar-tienda')
            ->with('success', 'Tienda actualizada exitosamente.');
    }


public function storeProducto(Request $request)
{
    // Validación inicial sin las imágenes
    $validatedData = $request->validate([
        'nombre' => 'required|string|max:255',
        'descripcion' => 'required|string',
        'precio' => 'required|numeric|min:0',
        'cantidad_disponible' => 'required|integer|min:0',
        'categoria' => 'required|string|in:tejido,madera,ceramica,joyeria',
        'municipio_venta' => 'required|string|in:morroa,sampues',
        'tecnica_artesanal' => 'required|string|in:telar_horizontal,bordado,cosido',
        'materia_prima' => 'required|string|in:paja,algodon,fique,ceramica,hilos,canamos',
    ]);

    // Validación de imágenes por separado
    $request->validate([
        'imagenes' => 'required|array|min:1|max:5',
        'imagenes.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240',
    ]);

    // Crear el producto con los datos validados
    $producto = auth()->user()->productos()->create($validatedData);

    // Procesar imágenes
    foreach ($request->file('imagenes') as $key => $imagen) {
        // Guardar imagen en storage
        $path = $imagen->store("productos/{$producto->id}", 'public');
        
        // Crear registro en la base de datos
        ImagenProducto::create([
            'producto_id' => $producto->id,
            'ruta_imagen' => $path,
            'es_principal' => ($key === 0), // La primera imagen es la principal
        ]);
    }

    return redirect()->route('dashboard.artesano.gestionar-tienda')
        ->with('success', 'Producto creado exitosamente');
}

    public function editProducto($id)
    {
        $producto = Producto::with(['imagenes' => function($query) {
            $query->orderBy('es_principal', 'desc');
        }])
        ->where('id', $id)
        ->where('user_id', auth()->id())
        ->firstOrFail();

        // Asegurarse de que las rutas de las imágenes sean correctas
        $producto->imagenes->transform(function($imagen) {
            // Si la ruta no comienza con 'storage/', agregarlo
            if (!str_starts_with($imagen->ruta_imagen, 'storage/')) {
                $imagen->ruta_imagen = 'storage/' . $imagen->ruta_imagen;
            }
            return $imagen;
        });

        return Inertia::render('Dashboard/Artesano/EditProducto', [
            'producto' => $producto,
        ]);
    }


    public function updateProducto(Request $request, $id)
{
    Log::info('Datos recibidos en updateProducto', [
        'request' => $request->all(),
        'files' => $request->allFiles(),
        'producto_id' => $id,
        'user_id' => auth()->id(),
    ]);

    $validatedData = $request->validate([
        'nombre' => 'nullable|string|max:255',
        'descripcion' => 'nullable|string',
        'precio' => 'nullable|numeric|min:0',
        'cantidad_disponible' => 'nullable|integer|min:0',
        'categoria' => 'nullable|string|in:tejido,madera,ceramica,joyeria',
        'municipio_venta' => 'nullable|string|in:morroa,sampues',
        'tecnica_artesanal' => 'nullable|string|in:telar_horizontal,bordado,cosido',
        'materia_prima' => 'nullable|string|in:paja,algodon,fique,ceramica,hilos,canamos',
        'imagenes_eliminadas' => 'nullable|array',
        'imagenes_eliminadas.*' => 'integer|exists:imagenes_productos,id',
        'imagen_principal' => 'nullable|integer|exists:imagenes_productos,id',
        'nuevas_imagenes' => 'nullable|array|max:5',
        'nuevas_imagenes.*' => 'image|mimes:jpeg,png,jpg,gif|max:10240',

    ]);

    $producto = Producto::findOrFail($id);

    if ($producto->user_id !== auth()->id()) {
        abort(403, 'No tienes permiso para editar este producto');
    }


 // Solo excluye los campos especiales
    $excludeFields = ['imagenes_eliminadas', 'imagen_principal', 'nuevas_imagenes'];
    $dataToUpdate = array_diff_key($validatedData, array_flip($excludeFields));

    // Actualizar campos básicos
    try {
        $producto->update($request->only([
            'nombre', 
            'descripcion', 
            'precio', 
            'cantidad_disponible',
            'categoria',
            'municipio_venta',
            'tecnica_artesanal',
            'materia_prima'
        ]));
        Log::info('Producto actualizado correctamente', [
            'producto_id' => $producto->id,
            'datos_actualizados' => $request->only([
                'nombre', 
                'descripcion', 
                'precio', 
                'cantidad_disponible',
                'categoria',
                'municipio_venta',
                'tecnica_artesanal',
                'materia_prima'
            ]),
        ]);
    } catch (\Exception $e) {
        Log::error('Error al actualizar producto', [
            'producto_id' => $producto->id,
            'error' => $e->getMessage(),
        ]);
        return back()->withErrors(['update' => 'Error al actualizar el producto: ' . $e->getMessage()])->withInput();
    }

    // Eliminar imágenes
    if ($request->has('imagenes_eliminadas')) {
        foreach ($request->imagenes_eliminadas as $imagenId) {
            $imagen = ImagenProducto::find($imagenId);
            if ($imagen && $imagen->producto_id === $producto->id) {
                Storage::disk('public')->delete($imagen->ruta_imagen);
                $imagen->delete();
            }
        }
    }

    // Imagen principal
    if ($request->filled('imagen_principal')) {
        // Resetear todas las imágenes principales
        ImagenProducto::where('producto_id', $producto->id)
            ->update(['es_principal' => false]);
        
        // Establecer nueva imagen principal
        ImagenProducto::where('id', $request->imagen_principal)
            ->where('producto_id', $producto->id)
            ->update(['es_principal' => true]);
    }

    // Subir nuevas imágenes
    if ($request->hasFile('nuevas_imagenes')) {
        $imagenesActuales = ImagenProducto::where('producto_id', $producto->id)->count();
        $nuevasImagenes = count($request->file('nuevas_imagenes'));
        $totalImagenes = $imagenesActuales + $nuevasImagenes;

        if ($totalImagenes > 5) {
            return back()
                ->withErrors(['nuevas_imagenes' => 'El producto no puede tener más de 5 imágenes en total.'])
                ->withInput();
        }

        foreach ($request->file('nuevas_imagenes') as $imagen) {
            $path = $imagen->store("productos/{$producto->id}", 'public');

            ImagenProducto::create([
                'producto_id' => $producto->id,
                'ruta_imagen' => $path,
                'es_principal' => false, // Por defecto no es principal
            ]);
        }
    }

    // Asegurar que haya al menos una imagen principal
    $tieneImagenPrincipal = ImagenProducto::where('producto_id', $producto->id)
        ->where('es_principal', true)
        ->exists();

    if (!$tieneImagenPrincipal) {
        $primeraImagen = ImagenProducto::where('producto_id', $producto->id)->first();
        if ($primeraImagen) {
            $primeraImagen->update(['es_principal' => true]);
        }
    }

    return redirect()->route('dashboard.artesano.index')
        ->with('success', 'Producto actualizado exitosamente');
}

    public function deleteProducto($id)
    {
        $producto = Producto::findOrFail($id);
        
        // Verificar que el producto pertenece al artesano actual
        if ($producto->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para eliminar este producto');
        }

        // Eliminar las imágenes del almacenamiento
        foreach ($producto->imagenes as $imagen) {
            Storage::disk('public')->delete($imagen->ruta_imagen);
        }

        // Eliminar el producto (y las imágenes por "onDelete('cascade')")
        $producto->delete();
        
        return redirect()->route('dashboard.artesano.gestionar-tienda')
            ->with('success', 'Producto eliminado exitosamente');
    }
} 