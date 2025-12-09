<?php

namespace App\Http\Controllers;

use App\Models\Pedido;
use App\Models\PedidoDetalle;
use App\Models\Producto;
use App\Models\User;
use App\Models\Transaccion;
use App\Models\TransaccionItem;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class PedidoController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            'items' => 'required|array',
            'items.*.producto_id' => 'required|exists:productos,id',
            'items.*.quantity' => 'required|integer|min:1',
            'delivery' => 'required|array',
            'delivery.delivery_method' => 'required|in:contra_entrega,envio_domicilio',
            'delivery.address' => 'required|string',
            'delivery.city' => 'required|string',
            'delivery.department' => 'required|string',
            'delivery.municipality' => 'required|string',
            'delivery.recipient' => 'required|string',
            'delivery.empresa_transportadora' => 'nullable|string',
            'user' => 'required|array',
            'user.email' => 'required|email',
            'user.name' => 'required|string',
            'user.last_name' => 'required|string',
            'user.phone' => 'required|string',
            'totals' => 'required|array',
            'totals.total' => 'required|numeric|min:0',
        ]);

        try {
            DB::beginTransaction();

            // Crear o actualizar usuario
            $user = User::where('email', $request->user['email'])->first();
            if (!$user) {
                $user = User::create([
                    'name' => $request->user['name'],
                    'last_name' => $request->user['last_name'],
                    'email' => $request->user['email'],
                    'phone' => $request->user['phone'],
                    'password' => bcrypt('password'), // Contraseña temporal
                    'role' => 'customer',
                ]);
            }

            // Agrupar productos por artesano
            $productosPorArtesano = [];
            foreach ($request->items as $item) {
                $producto = Producto::with('user.tienda')->findOrFail($item['producto_id']);
                $artesanoId = $producto->user_id;

                if (!isset($productosPorArtesano[$artesanoId])) {
                    $productosPorArtesano[$artesanoId] = [];
                }

                $productosPorArtesano[$artesanoId][] = [
                    'producto' => $producto,
                    'quantity' => $item['quantity'],
                    'subtotal' => $producto->precio * $item['quantity']
                ];
            }

            $pedidosCreados = [];

            // Calcular costo de envío por método
            $costoEnvioPorArtesano = $request->delivery['delivery_method'] === 'contra_entrega' ? 20000 : 5000;

            // Crear un pedido por cada artesano
            foreach ($productosPorArtesano as $artesanoId => $productos) {
                $subtotalProductos = array_sum(array_column($productos, 'subtotal'));
                $totalPedido = $subtotalProductos + $costoEnvioPorArtesano;

                // Crear pedido para este artesano
                $pedido = Pedido::create([
                    'cliente_id' => $user->id,
                    'artesano_id' => $artesanoId,
                    'total' => $totalPedido,
                    'subtotal_productos' => $subtotalProductos,
                    'costo_envio' => $costoEnvioPorArtesano,
                    'estado' => 'pendiente',
                    'metodo_entrega' => $request->delivery['delivery_method'],
                    'empresa_transportadora' => 'Servientrega',
                    'direccion_entrega' => $request->delivery['address'],
                    'ciudad_entrega' => $request->delivery['city'],
                    'departamento_entrega' => $request->delivery['department'],
                    'municipio_entrega' => $request->delivery['municipality'],
                    'informacion_adicional' => $request->delivery['additional_info'] ?? null,
                    'destinatario' => $request->delivery['recipient'],
                ]);

                // Crear detalles del pedido
                foreach ($productos as $item) {
                    PedidoDetalle::create([
                        'id_pedido' => $pedido->id_pedido,
                        'id_producto' => $item['producto']->id,
                        'cantidad' => $item['quantity'],
                        'precio_unitario' => $item['producto']->precio,
                        'subtotal' => $item['subtotal'],
                        'nombre_producto' => $item['producto']->nombre,
                    ]);

                    // Descontar stock del producto
                    $item['producto']->decrement('cantidad_disponible', $item['quantity']);
                }

                $pedidosCreados[] = $pedido->id_pedido;

                // Crear transacción para este pedido
                $transaccion = Transaccion::create([
                    'id_cliente' => $user->id,
                    'tipo_transaccion' => 'compra',
                    'estado_transaccion' => $request->delivery['delivery_method'] === 'contra_entrega' ? 'pendiente' : 'completado',
                    'subtotal' => $subtotalProductos,
                    'costo_envio' => $costoEnvioPorArtesano,
                    'total' => $totalPedido,
                    'moneda' => 'COP',
                    'metodo_entrega' => $request->delivery['delivery_method'],
                    'direccion_entrega' => $request->delivery['address'],
                    'ciudad_entrega' => $request->delivery['city'],
                    'departamento_entrega' => $request->delivery['department'],
                    'municipio_entrega' => $request->delivery['municipality'],
                    'info_adicional_entrega' => $request->delivery['additional_info'] ?? null,
                    'destinatario' => $request->delivery['recipient'],
                    'metodo_pago' => $request->delivery['delivery_method'] === 'contra_entrega' ? 'contra_entrega' : 'por_definir',
                ]);

                // Crear detalles de la transacción
                foreach ($productos as $item) {
                    TransaccionItem::create([
                        'id_transaccion' => $transaccion->id_transaccion,
                        'id_producto' => $item['producto']->id,
                        'id_tienda' => $item['producto']->user->tienda->id ?? null,
                        'nombre_producto' => $item['producto']->nombre,
                        'precio_unitario' => $item['producto']->precio,
                        'cantidad' => $item['quantity'],
                        'subtotal_linea' => $item['subtotal'],
                    ]);
                }
            }

            DB::commit();

            return response()->json([
                'success' => true,
                'pedidos_ids' => $pedidosCreados,
                'message' => count($pedidosCreados) > 1
                    ? 'Pedidos creados exitosamente para ' . count($pedidosCreados) . ' artesanos'
                    : 'Pedido creado exitosamente'
            ]);

        } catch (\Exception $e) {
            DB::rollback();
            return response()->json([
                'success' => false,
                'message' => 'Error al crear el pedido: ' . $e->getMessage()
            ], 500);
        }
    }

    public function updateStatus(Request $request, $pedidoId)
    {
        Log::info('UpdateStatus called', [
            'pedidoId' => $pedidoId,
            'request_data' => $request->all(),
            'user_id' => Auth::id()
        ]);

        $request->validate([
            'estado' => 'required|in:pendiente,confirmado,enviado,entregado,cancelado',
        ]);

        $user = Auth::user();
        Log::info('User authenticated', ['user_id' => $user->id]);

        $pedido = Pedido::where('id_pedido', $pedidoId)
                       ->where('artesano_id', $user->id)
                       ->first();

        if (!$pedido) {
            Log::error('Pedido not found', ['pedidoId' => $pedidoId, 'user_id' => $user->id]);
            return response()->json([
                'success' => false,
                'message' => 'Pedido no encontrado o no tienes permisos para modificarlo'
            ], 404);
        }

        Log::info('Pedido found', ['pedido' => $pedido->toArray()]);

        $oldStatus = $pedido->estado;
        $newStatus = $request->estado;

        Log::info('Updating pedido status', [
            'old_status' => $oldStatus,
            'new_status' => $newStatus,
            'metodo_entrega' => $pedido->metodo_entrega
        ]);

        $pedido->update(['estado' => $newStatus]);

        // Si el pedido se marca como entregado, actualizar el estado de la transacción correspondiente
        if ($newStatus === 'entregado') {
            // Buscar transacciones relacionadas con este pedido
            // Una transacción está relacionada si contiene productos del mismo artesano y cliente
            $transacciones = Transaccion::where('id_cliente', $pedido->cliente_id)
                ->where('estado_transaccion', 'pendiente')
                ->whereHas('detalles', function($query) use ($pedido) {
                    $query->whereHas('producto', function($subQuery) use ($pedido) {
                        $subQuery->where('user_id', $pedido->artesano_id);
                    });
                })
                ->get();

            foreach ($transacciones as $transaccion) {
                $transaccion->update(['estado_transaccion' => 'completado']);
                Log::info('Transaction status updated to completado', [
                    'transaction_id' => $transaccion->id_transaccion,
                    'pedido_id' => $pedido->id_pedido
                ]);
            }
        }

        Log::info('Pedido status updated successfully', ['new_status' => $newStatus]);

        return back()->with('success', 'Estado del pedido actualizado exitosamente');
    }
}
