<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tienda extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'barrio',
        'direccion',
        'telefono',
        'municipio_venta',
        'latitude',
        'longitude',
        'user_id',
        'foto_perfil', // Added for store profile photo
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function featuredContent()
    {
        return $this->hasOne(TiendaFeaturedContent::class);
    }
}
