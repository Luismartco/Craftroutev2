<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Pedido extends Model
{
    use HasFactory;

    protected $table = 'pedidos';
    protected $primaryKey = 'id_pedido';

    protected $fillable = [
        'cliente_id',
        'artesano_id',
        'total',
        'subtotal_productos',
        'costo_envio',
        'estado',
        'metodo_entrega',
        'empresa_transportadora',
        'direccion_entrega',
        'ciudad_entrega',
        'departamento_entrega',
        'municipio_entrega',
        'informacion_adicional',
        'destinatario',
        'notas',
    ];

    protected $casts = [
        'total' => 'decimal:2',
        'subtotal_productos' => 'decimal:2',
        'costo_envio' => 'decimal:2',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(User::class, 'cliente_id');
    }

    public function artesano(): BelongsTo
    {
        return $this->belongsTo(User::class, 'artesano_id');
    }

    public function detalles(): HasMany
    {
        return $this->hasMany(PedidoDetalle::class, 'id_pedido', 'id_pedido');
    }

    public function detallesProductos()
    {
        return $this->belongsToMany(Producto::class, 'pedido_detalles', 'id_pedido', 'id_producto', 'id_pedido', 'id')
                    ->withPivot(['cantidad', 'precio_unitario', 'subtotal', 'nombre_producto']);
    }
} 