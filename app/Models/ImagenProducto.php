<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ImagenProducto extends Model
{
     protected $table = 'imagenes_productos'; // Especifica el nombre de la tabla
    
    protected $fillable = ['producto_id', 'ruta_imagen', 'es_principal'];

    public function producto()
    {
        return $this->belongsTo(Producto::class);
    }
}
