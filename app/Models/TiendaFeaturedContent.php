<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class TiendaFeaturedContent extends Model
{
    protected $fillable = [
        'tienda_id',
        'featured_product_title',
        'featured_product_description',
        'featured_product_image',
        'video_title',
        'video_description',
        'video_url',
    ];

    public function tienda()
    {
        return $this->belongsTo(Tienda::class);
    }
}
