<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Material extends Model
{
    use HasFactory;

    protected $table = 'materiales';

    protected $fillable = [
        'nombre',
        'descripcion',
    ];

    public function productos(): HasMany
    {
        return $this->hasMany(Producto::class, 'materia_prima', 'nombre');
    }
}
