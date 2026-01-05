<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Inertia\Response;
use App\Models\Tienda;
use App\Models\Producto;
use App\Models\TiendaFeaturedContent;
use App\Models\Categoria;
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

        $featuredContent = TiendaFeaturedContent::where('tienda_id', $tienda->id)->first();

        $productos = Producto::with([
                'imagenes' => function($q) { $q->orderByDesc('es_principal'); },
                'user.tienda',
                'categoria',
                'material',
                'tecnica'
            ])
            ->where('user_id', $artesano?->id)
            ->get()
            ->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'descripcion' => $producto->descripcion,
                    'cantidad_disponible' => $producto->cantidad_disponible,
                    'color' => $producto->color,
                    'municipio_venta' => $producto->municipio_venta,
                    'categoria_id' => $producto->categoria_id,
                    'categoria' => $producto->categoria ? [
                        'id' => $producto->categoria->id,
                        'nombre' => $producto->categoria->nombre
                    ] : null,
                    'material' => $producto->material ? [
                        'id' => $producto->material->id,
                        'nombre' => $producto->material->nombre
                    ] : null,
                    'tecnica' => $producto->tecnica ? [
                        'id' => $producto->tecnica->id,
                        'nombre' => $producto->tecnica->nombre
                    ] : null,
                    'user' => $producto->user ? [
                        'id' => $producto->user->id,
                        'name' => $producto->user->name,
                        'last_name' => $producto->user->last_name,
                        'foto_perfil' => $producto->user->foto_perfil,
                        'tienda' => $producto->user->tienda ? [
                            'nombre' => $producto->user->tienda->nombre,
                        ] : null,
                    ] : null,
                    'imagenes' => $producto->imagenes->map(function ($img) {
                        return [
                            'id' => $img->id,
                            'ruta' => $img->ruta,
                            'es_principal' => $img->es_principal,
                            'ruta_imagen' => $img->ruta, // Frontend might check this
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

        $categorias = Categoria::all()->map(function ($categoria) {
            return [
                'id' => $categoria->id,
                'nombre' => $categoria->nombre,
            ];
        });

        return Inertia::render('Blog', [
            'tienda' => $tiendaPayload,
            'artesano' => $artesanoPayload,
            'productos' => $productos,
            'featuredContent' => $featuredContent,
            'categorias' => $categorias,
        ]);
    }
}

