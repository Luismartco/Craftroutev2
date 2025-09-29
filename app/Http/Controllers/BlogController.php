<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tienda;
use App\Models\Producto;
use Illuminate\Support\Str;

class BlogController extends Controller
{
    public function show(string $slug): Response
    {
        // Find tienda by slug from nombre and eager-load related data
        $tienda = Tienda::with(['user'])
            ->get()
            ->first(function ($t) use ($slug) {
                return Str::slug($t->nombre) === $slug;
            });

        if (!$tienda) {
            abort(404);
        }

        $artesano = $tienda->user;

        $productos = Producto::with([
                'imagenes' => function($q) { $q->orderByDesc('es_principal'); }
            ])
            ->where('user_id', $artesano?->id)
            ->get()
            ->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'descripcion' => $producto->descripcion,
                    'imagenes' => $producto->imagenes->map(function ($img) {
                        return [
                            'id' => $img->id,
                            'ruta' => $img->ruta,
                            'es_principal' => $img->es_principal,
                        ];
                    }),
                ];
            });

        $tiendaPayload = [
            'id' => $tienda->id,
            'nombre' => $tienda->nombre,
            'barrio' => $tienda->barrio,
            'direccion' => $tienda->direccion,
            'telefono' => $tienda->telefono,
            'municipio_venta' => $tienda->municipio_venta,
            'latitude' => $tienda->latitude,
            'longitude' => $tienda->longitude,
            'foto_perfil' => $tienda->foto_perfil,
        ];

        $artesanoPayload = $artesano ? [
            'id' => $artesano->id,
            'name' => $artesano->name,
            'last_name' => $artesano->last_name,
            'email' => $artesano->email,
            'profile_photo_url' => $artesano->profile_photo ? '/storage/' . $artesano->profile_photo : null,
            'bio' => $artesano->bio ?? null,
        ] : null;

        return Inertia::render('Blog', [
            'tienda' => $tiendaPayload,
            'artesano' => $artesanoPayload,
            'productos' => $productos,
        ]);
    }
}

