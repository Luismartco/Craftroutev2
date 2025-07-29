<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class CartController extends Controller
{
    public function store(Request $request): JsonResponse
    {
        try {
            // Si los datos vienen como JSON string, decodificarlos
            $cartData = $request->input('cart');
            if (is_string($cartData)) {
                $cartData = json_decode($cartData, true);
            }
            
            $request->merge(['cart' => $cartData]);
            
            $request->validate([
                'cart' => 'required|array',
                'cart.*.id' => 'required|integer|exists:productos,id',
                'cart.*.quantity' => 'required|integer|min:1',
            ]);

            // Guardar el carrito en la sesión
            $request->session()->put('cart', $cartData);

            return response()->json([
                'success' => true,
                'message' => 'Carrito guardado exitosamente'
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Error al guardar el carrito: ' . $e->getMessage()
            ], 500);
        }
    }

    public function get(Request $request): JsonResponse
    {
        $cart = $request->session()->get('cart', []);

        return response()->json([
            'cart' => $cart
        ]);
    }

    public function clear(Request $request): JsonResponse
    {
        $request->session()->forget('cart');

        return response()->json([
            'success' => true,
            'message' => 'Carrito limpiado exitosamente'
        ]);
    }
} 