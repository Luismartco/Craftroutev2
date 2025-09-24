<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TransaccionItem extends Model
{
    use HasFactory;

    protected $table = 'transaccion_items';

    protected $fillable = [
        'transaccion_id',
        'producto_id',
        'tienda_id',
        'product_name',
        'unit_price_amount',
        'quantity',
        'line_subtotal_amount',
    ];

    public function transaccion(): BelongsTo
    {
        return $this->belongsTo(Transaccion::class);
    }

    public function producto(): BelongsTo
    {
        return $this->belongsTo(Producto::class, 'producto_id');
    }

    public function tienda(): BelongsTo
    {
        return $this->belongsTo(Tienda::class, 'tienda_id');
    }
}


