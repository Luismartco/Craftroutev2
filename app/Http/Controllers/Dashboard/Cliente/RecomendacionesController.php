<?php

namespace App\Http\Controllers\Dashboard\Cliente;

use App\Models\Producto;
use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class RecomendacionesController extends Controller
{
    public function index()
    {
        // Obtener 9 productos de diferentes tiendas
        $productos = Producto::with(['user', 'imagenes'])
            ->with(['user.tienda'])
            ->whereHas('user', function ($query) {
                $query->whereHas('tienda');
            })
            ->inRandomOrder()
            ->take(9)
            ->get()
            ->map(function ($producto) {
                // Asegurarse de que la tienda esté accesible
                if ($producto->user && $producto->user->tienda) {
                    // Agregamos la información de la tienda directamente al producto
                    $producto->setAttribute('tienda_nombre', $producto->user->tienda->nombre);
                    $producto->setAttribute('tienda_direccion', $producto->user->tienda->direccion);
                }
                return $producto;
            });

        return inertia('Dashboard/Cliente/Recomendaciones', [
            'productos' => $productos
        ]);
    }
}
