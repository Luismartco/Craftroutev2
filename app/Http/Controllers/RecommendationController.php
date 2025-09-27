<?php

namespace App\Http\Controllers;

use App\Models\Producto;
use App\Models\Tienda;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Auth;
use App\Models\UserPreference;

class RecommendationController extends Controller
{
    public function proxyProductos(Request $request)
    {
        $base = Config::get('services.ai_recommender.base_uri');
        $userId = (int) $request->query('user_id');
        if (!$userId) {
            return response()->json(['message' => 'user_id requerido'], 422);
        }
        $resp = Http::timeout(10)->get("{$base}/recomendar_productos", [ 'user_id' => $userId ]);
        return response()->json($resp->json(), $resp->status());
    }

    public function proxyTiendas(Request $request)
    {
        $base = Config::get('services.ai_recommender.base_uri');
        $userId = (int) $request->query('user_id');
        if (!$userId) {
            return response()->json(['message' => 'user_id requerido'], 422);
        }
        $resp = Http::timeout(10)->get("{$base}/recomendar_tiendas", [ 'user_id' => $userId ]);
        return response()->json($resp->json(), $resp->status());
    }

    public function productosByIds(Request $request)
    {
        $idsParam = (string) $request->query('ids', '');
        $ids = collect(explode(',', $idsParam))
            ->filter(fn ($v) => $v !== '')
            ->map(fn ($v) => (int) $v)
            ->unique()
            ->values()
            ->all();

        if (empty($ids)) {
            return response()->json([]);
        }

        $productos = Producto::with(['imagenes' => function ($q) {
                $q->orderByDesc('es_principal');
            }, 'user.tienda'])
            ->whereIn('id', $ids)
            ->get()
            ->map(function ($producto) {
                return [
                    'id' => $producto->id,
                    'nombre' => $producto->nombre,
                    'precio' => $producto->precio,
                    'imagen' => $producto->imagenes->first()->imagen ?? null,
                    'tienda_nombre' => optional($producto->user->tienda)->nombre,
                ];
            });

        // Preservar el orden segun los ids recibidos
        $byId = $productos->keyBy('id');
        $ordered = collect($ids)->map(fn ($id) => $byId->get($id))->filter();

        return response()->json($ordered->values()->all());
    }

    public function tiendasByIds(Request $request)
    {
        $idsParam = (string) $request->query('ids', '');
        $ids = collect(explode(',', $idsParam))
            ->filter(fn ($v) => $v !== '')
            ->map(fn ($v) => (int) $v)
            ->unique()
            ->values()
            ->all();

        if (empty($ids)) {
            return response()->json([]);
        }

        $tiendas = Tienda::with('user')
            ->whereIn('id', $ids)
            ->get()
            ->map(function ($tienda) {
                return [
                    'id' => $tienda->id,
                    'nombre' => $tienda->nombre,
                    'direccion' => $tienda->direccion,
                    'municipio_venta' => $tienda->municipio_venta,
                    'foto_perfil' => $tienda->foto_perfil,
                    'latitude' => $tienda->latitude,
                    'longitude' => $tienda->longitude,
                ];
            });

        $byId = $tiendas->keyBy('id');
        $ordered = collect($ids)->map(fn ($id) => $byId->get($id))->filter();

        return response()->json($ordered->values()->all());
    }

    public function hasPreferences()
    {
        $user = Auth::user();
        if (!$user) {
            return response()->json(['hasCompletedPreferences' => false]);
        }
        $pref = UserPreference::where('user_id', $user->id)->first();
        return response()->json([
            'hasCompletedPreferences' => (bool)($pref?->has_completed_preferences)
        ]);
    }
}

