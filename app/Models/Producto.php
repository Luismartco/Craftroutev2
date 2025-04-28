<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Producto extends Model
{
    use HasFactory;

    protected $fillable = [
        'artesano_id',
        'categoria_id',
        'nombre',
        'descripcion',
        'precio',
        'stock',
        'imagen',
        'estado',
    ];

    public function artesano(): BelongsTo
    {
        return $this->belongsTo(User::class, 'artesano_id');
    }

    public function categoria(): BelongsTo
    {
        return $this->belongsTo(Categoria::class);
    }
} 