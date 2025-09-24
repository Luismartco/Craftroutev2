<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Transaccion;
use App\Models\TransaccionItem;
use App\Models\Tienda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TransaccionController extends Controller
{
    // Compra simulada (cuando usuario hace click en Entrar - Nequi)
    public function storeCompra(Request $request)
    {
        $validated = $request->validate([
            'items' => ['required', 'array', 'min:1'],
            'items.*.producto_id' => ['required', 'integer', 'exists:productos,id'],
            'items.*.quantity' => ['required', 'integer', 'min:1'],
            'delivery' => ['nullable', 'array'],
            'payment' => ['nullable', 'array'],
            'totals.subtotal' => ['required', 'integer', 'min:0'],
            'totals.shipping' => ['required', 'integer', 'min:0'],
            'totals.total' => ['required', 'integer', 'min:0'],
        ]);

        $userId = Auth::id() ?? $request->user()?->id;
        if (!$userId) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $transaccion = DB::transaction(function () use ($validated, $userId) {
            $t = Transaccion::create([
                'customer_id' => $userId,
                'type' => 'compra',
                'status' => 'simulada_pagada',
                'subtotal_amount' => $validated['totals']['subtotal'],
                'shipping_amount' => $validated['totals']['shipping'],
                'total_amount' => $validated['totals']['total'],
                'currency' => 'COP',
                'delivery_method' => $validated['delivery']['delivery_method'] ?? null,
                'delivery_address' => $validated['delivery']['address'] ?? null,
                'delivery_city' => $validated['delivery']['city'] ?? null,
                'delivery_department' => $validated['delivery']['department'] ?? null,
                'delivery_municipality' => $validated['delivery']['municipality'] ?? null,
                'delivery_additional_info' => $validated['delivery']['additional_info'] ?? null,
                'recipient' => $validated['delivery']['recipient'] ?? null,
                'payment_method' => $validated['payment']['method'] ?? 'nequi',
                'payment_provider' => 'simulado',
                'payment_status' => 'approved',
                'payment_meta' => $validated['payment'] ?? [],
                'paid_at' => now(),
            ]);

            foreach ($validated['items'] as $line) {
                $producto = Producto::findOrFail($line['producto_id']);
                $tiendaId = $producto->tienda_id ?? Tienda::where('user_id', $producto->user_id)->value('id');
                if (!$tiendaId) {
                    // Si no existe tienda asociada, intenta derivar por el artesano dueño del producto
                    // y si no hay, lanza excepción para mantener integridad
                    throw new \RuntimeException('No se encontró tienda para el producto ID '.$producto->id);
                }
                TransaccionItem::create([
                    'transaccion_id' => $t->id,
                    'producto_id' => $producto->id,
                    'tienda_id' => $tiendaId,
                    'product_name' => $producto->nombre,
                    'unit_price_amount' => (int) $producto->precio,
                    'quantity' => (int) $line['quantity'],
                    'line_subtotal_amount' => (int) $producto->precio * (int) $line['quantity'],
                ]);
            }

            return $t;
        });

        return response()->json(['ok' => true, 'transaccion_id' => $transaccion->id]);
    }

    // Venta simulada (cuando artesano confirma en su flujo visual)
    public function storeVenta(Request $request)
    {
        $validated = $request->validate([
            'producto_id' => ['required', 'integer', 'exists:productos,id'],
            'quantity' => ['required', 'integer', 'min:1'],
            'total' => ['required', 'integer', 'min:0'],
        ]);

        $userId = Auth::id() ?? $request->user()?->id;
        if (!$userId) {
            return response()->json(['message' => 'No autenticado'], 401);
        }

        $transaccion = DB::transaction(function () use ($validated, $userId) {
            $t = Transaccion::create([
                'customer_id' => $userId, // en simulación usamos el usuario actual
                'type' => 'venta',
                'status' => 'simulada_creada',
                'subtotal_amount' => $validated['total'],
                'shipping_amount' => 0,
                'total_amount' => $validated['total'],
                'currency' => 'COP',
            ]);

            $producto = Producto::findOrFail($validated['producto_id']);
            $tiendaId = $producto->tienda_id ?? Tienda::where('user_id', $producto->user_id)->value('id');
            if (!$tiendaId) {
                throw new \RuntimeException('No se encontró tienda para el producto ID '.$producto->id);
            }
            TransaccionItem::create([
                'transaccion_id' => $t->id,
                'producto_id' => $producto->id,
                'tienda_id' => $tiendaId,
                'product_name' => $producto->nombre,
                'unit_price_amount' => (int) $producto->precio,
                'quantity' => (int) $validated['quantity'],
                'line_subtotal_amount' => (int) $validated['total'],
            ]);

            return $t;
        });

        return response()->json(['ok' => true, 'transaccion_id' => $transaccion->id]);
    }
}


