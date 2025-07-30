<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;
use App\Models\Producto;
use App\Models\Pedido;
use App\Models\PedidoDetalle;

class CheckoutController extends Controller
{
    public function index(Request $request): Response|RedirectResponse
    {
        $user = Auth::user();
        $cartItems = $request->session()->get('cart', []);
        
        // Si no hay productos en el carrito, mostrar página vacía
        if (empty($cartItems)) {
            return Inertia::render('Checkout/Index', [
                'cartProducts' => [],
                'subtotal' => 0,
                'total' => 0,
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'last_name' => $user->last_name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'address' => $user->address,
                    'neighborhood' => $user->neighborhood,
                    'residence_municipality' => $user->residence_municipality,
                ] : null,
            ]);
        }
        
        // Obtener los productos del carrito con sus detalles
        $cartProducts = [];
        $subtotal = 0;
        
        foreach ($cartItems as $item) {
            $producto = Producto::with(['imagenes', 'user'])->find($item['id']);
            if ($producto) {
                $cartProducts[] = [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'cantidad' => $item['quantity'],
                    'subtotal' => $producto->precio * $item['quantity'],
                    'imagen' => $producto->imagenes->first() ? '/storage/' . $producto->imagenes->first()->ruta_imagen : null,
                    'artesano_id' => $producto->user_id,
                    'artesano_nombre' => $producto->user ? $producto->user->name . ' ' . $producto->user->last_name : 'Artesano',
                ];
                $subtotal += $producto->precio * $item['quantity'];
            }
        }
        
        // Calcular total (aquí podrías agregar impuestos, descuentos, etc.)
        $total = $subtotal;
        
        return Inertia::render('Checkout/Index', [
            'cartProducts' => $cartProducts,
            'subtotal' => $subtotal,
            'total' => $total,
            'user' => $user ? [
                'id' => $user->id,
                'name' => $user->name,
                'last_name' => $user->last_name,
                'email' => $user->email,
                'phone' => $user->phone,
                'address' => $user->address,
                'neighborhood' => $user->neighborhood,
                'residence_municipality' => $user->residence_municipality,
            ] : null,
        ]);
    }
    
    public function store(Request $request)
    {
        $request->validate([
            'cart_products' => 'required|array',
            'cart_products.*.id' => 'required|exists:productos,id',
            'cart_products.*.cantidad' => 'required|integer|min:1',
            'user_data' => 'required|array',
            'user_data.email' => 'required|email',
            'user_data.name' => 'required|string|max:255',
            'user_data.last_name' => 'required|string|max:255',
            'user_data.phone' => 'required|string|max:20',
            'user_data.address' => 'required|string|max:500',
            'terms_accepted' => 'required|accepted',
        ]);
        
        $user = Auth::user();
        $cartProducts = $request->input('cart_products');
        $userData = $request->input('user_data');
        
        // Crear el pedido
        $pedido = Pedido::create([
            'cliente_id' => $user ? $user->id : null,
            'total' => collect($cartProducts)->sum(function($item) {
                return $item['precio'] * $item['cantidad'];
            }),
            'estado' => 'pendiente',
            'direccion_entrega' => $userData['address'],
            'metodo_pago' => 'pendiente',
            'notas' => 'Pedido creado desde checkout',
        ]);
        
        // Crear los detalles del pedido
        foreach ($cartProducts as $item) {
            PedidoDetalle::create([
                'pedido_id' => $pedido->id,
                'producto_id' => $item['id'],
                'cantidad' => $item['cantidad'],
                'precio_unitario' => $item['precio'],
                'subtotal' => $item['precio'] * $item['cantidad'],
            ]);
        }
        
        // Limpiar el carrito
        $request->session()->forget('cart');
        
        return redirect()->route('checkout.success', ['pedido_id' => $pedido->id])
            ->with('success', 'Pedido creado exitosamente');
    }
    
    public function success(Request $request, $pedido_id): Response
    {
        $pedido = Pedido::with(['detalles.producto', 'cliente'])->findOrFail($pedido_id);
        
        return Inertia::render('Checkout/Success', [
            'pedido' => $pedido,
        ]);
    }
} 