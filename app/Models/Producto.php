<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'nombre',
        'descripcion',
        'precio',
        'cantidad_disponible',
        'categoria',
        'categoria_id',
        'municipio_venta',
        'tecnica_artesanal',
        'materia_prima',
        'color',
        'user_id',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }

    public function artesano(): BelongsTo
    {
        return $this->belongsTo(User::class, 'artesano_id');
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
    public function imagenes()
    {
        return $this->hasMany(ImagenProducto::class);
    }

    public function imagenPrincipal()
    {
        return $this->hasOne(ImagenProducto::class)->where('es_principal', true);
    }
} 

