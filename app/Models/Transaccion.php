<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Transaccion extends Model
{
    use HasFactory;

    protected $table = 'transacciones';
    protected $primaryKey = 'id_transaccion';
    public $incrementing = true;

    protected $fillable = [
        'id_cliente',
        'tipo_transaccion',
        'estado_transaccion',
        'subtotal',
        'costo_envio',
        'total',
        'moneda',
        'metodo_entrega',
        'direccion_entrega',
        'ciudad_entrega',
        'departamento_entrega',
        'municipio_entrega',
        'info_adicional_entrega',
        'destinatario',
        'metodo_pago',
        'fecha_creacion',
        'fecha_pago',
    ];

    protected $casts = [
        'fecha_creacion' => 'datetime',
        'fecha_pago' => 'datetime',
    ];

    public function cliente(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_cliente');
    }

    public function detalles(): HasMany
    {
        return $this->hasMany(TransaccionItem::class, 'id_transaccion');
    }
}


