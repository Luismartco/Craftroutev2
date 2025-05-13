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

class ArtesanoDashboardController extends Controller
{
    public function index(): Response
    {
        $user = auth()->user();
        $tienda = $user->tienda;
        $productos = Producto::where('user_id', $user->id)->get();
        
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
        ]);

        $user = auth()->user();

        // Verificar si el usuario ya tiene una tienda
        if ($user->tienda) {
            return redirect()->back()->with('error', 'Ya tienes una tienda creada.');
        }

        $data = $request->all();

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
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'cantidad_disponible' => 'required|integer|min:0',
            'categoria' => 'required|string|in:tejido,madera,ceramica,joyeria',
            'municipio_venta' => 'required|string|in:morroa,sampues',
            'tecnica_artesanal' => 'required|string|in:telar_horizontal,bordado,cosido',
            'materia_prima' => 'required|string|in:paja,algodon,fique,ceramica,hilos,canamos',
        ]);

        $user = auth()->user();
        $data = $request->all();

        // Crear el producto
        $producto = $user->productos()->create($data);

        return redirect()->route('dashboard.artesano.index')
            ->with('success', 'Producto agregado exitosamente.');
    }

    public function editProducto($id)
    {
        $producto = Producto::findOrFail($id);
        return Inertia::render('Dashboard/Artesano/EditProducto', [
            'producto' => $producto
        ]);
    }

    public function updateProducto(Request $request, $id)
    {
        $request->validate([
            'nombre' => 'required|string|max:255',
            'descripcion' => 'required|string',
            'precio' => 'required|numeric|min:0',
            'cantidad_disponible' => 'required|integer|min:0',
            'categoria' => 'required|string|in:tejido,madera,ceramica,joyeria',
            'municipio_venta' => 'required|string|in:morroa,sampues',
            'tecnica_artesanal' => 'required|string|in:telar_horizontal,bordado,cosido',
            'materia_prima' => 'required|string|in:paja,algodon,fique,ceramica,hilos,canamos',
        ]);

        $producto = Producto::findOrFail($id);
        $data = $request->all();

        // Actualizar el producto
        $producto->update($data);

        return redirect()->route('dashboard.artesano.gestionar-tienda')
            ->with('success', 'Producto actualizado exitosamente.');
    }

    public function deleteProducto($id)
    {
        $producto = Producto::findOrFail($id);
        
        // Verificar que el producto pertenece al artesano actual
        if ($producto->user_id !== auth()->id()) {
            abort(403, 'No tienes permiso para eliminar este producto');
        }
        
        $producto->delete();
        
        return redirect()->route('dashboard.artesano.gestionar-tienda')
            ->with('success', 'Producto eliminado exitosamente');
    }
} 