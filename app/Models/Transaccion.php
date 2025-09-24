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

    protected $fillable = [
        'customer_id',
        'status',
        'subtotal_amount',
        'shipping_amount',
        'total_amount',
        'currency',
        'delivery_method',
        'delivery_address',
        'delivery_city',
        'delivery_department',
        'delivery_municipality',
        'delivery_additional_info',
        'recipient',
        'payment_method',
        'payment_provider',
        'payment_status',
        'payment_meta',
        'placed_at',
        'paid_at',
    ];

    protected $casts = [
        'payment_meta' => 'array',
        'placed_at' => 'datetime',
        'paid_at' => 'datetime',
    ];

    public function customer(): BelongsTo
    {
        return $this->belongsTo(User::class, 'customer_id');
    }

    public function items(): HasMany
    {
        return $this->hasMany(TransaccionItem::class, 'transaccion_id');
    }
}


