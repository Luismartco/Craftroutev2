<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransaccionItem extends Model
{
    use HasFactory;

    protected $table = 'detalles_transaccion';

    protected $fillable = [
        'id_transaccion',
        'id_producto',
        'id_tienda',
        'nombre_producto',
        'precio_unitario',
        'cantidad',
        'subtotal_linea',
    ];

    public function transaccion(): BelongsTo
    {
        return $this->belongsTo(Transaccion::class, 'id_transaccion');
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class, 'id_producto');
    }

    public function tienda(): BelongsTo
    {
        return $this->belongsTo(Tienda::class, 'id_tienda');
    }
}


