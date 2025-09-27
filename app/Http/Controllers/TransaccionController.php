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
                'id_cliente' => $userId,
                'tipo_transaccion' => 'compra',
                'estado_transaccion' => 'simulada_pagada',
                'subtotal' => $validated['totals']['subtotal'],
                'costo_envio' => $validated['totals']['shipping'],
                'total' => $validated['totals']['total'],
                'moneda' => 'COP',
                'metodo_entrega' => $validated['delivery']['delivery_method'] ?? null,
                'direccion_entrega' => $validated['delivery']['address'] ?? null,
                'ciudad_entrega' => $validated['delivery']['city'] ?? null,
                'departamento_entrega' => $validated['delivery']['department'] ?? null,
                'municipio_entrega' => $validated['delivery']['municipality'] ?? null,
                'info_adicional_entrega' => $validated['delivery']['additional_info'] ?? null,
                'destinatario' => $validated['delivery']['recipient'] ?? null,
                'metodo_pago' => $validated['payment']['method'] ?? 'nequi',
                'fecha_pago' => now(),
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
                    'id_transaccion' => $t->id_transaccion,
                    'id_producto' => $producto->id,
                    'id_tienda' => $tiendaId,
                    'nombre_producto' => $producto->nombre,
                    'precio_unitario' => (int) $producto->precio,
                    'cantidad' => (int) $line['quantity'],
                    'subtotal_linea' => (int) $producto->precio * (int) $line['quantity'],
                ]);
            }

            return $t;
        });

        return response()->json(['ok' => true, 'transaccion_id' => $transaccion->id_transaccion]);
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
                'id_cliente' => $userId, // en simulación usamos el usuario actual
                'tipo_transaccion' => 'venta',
                'estado_transaccion' => 'simulada_creada',
                'subtotal' => $validated['total'],
                'costo_envio' => 0,
                'total' => $validated['total'],
                'moneda' => 'COP',
            ]);

            $producto = Producto::findOrFail($validated['producto_id']);
            $tiendaId = $producto->tienda_id ?? Tienda::where('user_id', $producto->user_id)->value('id');
            if (!$tiendaId) {
                throw new \RuntimeException('No se encontró tienda para el producto ID '.$producto->id);
            }
            TransaccionItem::create([
                'id_transaccion' => $t->id_transaccion,
                'id_producto' => $producto->id,
                'id_tienda' => $tiendaId,
                'nombre_producto' => $producto->nombre,
                'precio_unitario' => (int) $producto->precio,
                'cantidad' => (int) $validated['quantity'],
                'subtotal_linea' => (int) $validated['total'],
            ]);

            return $t;
        });

        return response()->json(['ok' => true, 'transaccion_id' => $transaccion->id_transaccion]);
    }
}


