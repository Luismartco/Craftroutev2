<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use App\Models\Producto;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class UserPreferenceController extends Controller
{
    public function show()
    {
        $user = Auth::user();

        // Obtener 9 productos aleatorios de artesanos con tienda
        $productos = Producto::with(['user', 'imagenes'])
            ->with(['user.tienda'])
            ->whereHas('user', function ($query) {
                $query->whereHas('tienda');
            })
            ->inRandomOrder()
            ->take(9)
            ->get()
            ->map(function ($producto) {
                if ($producto->user && $producto->user->tienda) {
                    $producto->setAttribute('tienda_nombre', $producto->user->tienda->nombre);
                    $producto->setAttribute('tienda_direccion', $producto->user->tienda->direccion);
                }
                return $producto;
            });

        // Persistir los IDs mostrados
        if ($user) {
            $shownIds = $productos->pluck('id')->values()->all();
            UserPreference::updateOrCreate(
                ['user_id' => $user->id],
                ['shown_product_ids' => $shownIds]
            );
        }

        return Inertia::render('Dashboard/Cliente/Recomendaciones', [
            'productos' => $productos,
        ]);
    }

    public function recommendationsPage()
    {
        $user = Auth::user();
        $hasCompleted = false;

        if ($user) {
            $pref = UserPreference::where('user_id', $user->id)->first();
            $hasCompleted = $pref?->has_completed_preferences ?? false;
        }

        return Inertia::render('Dashboard/Cliente/RecomendacionesIA', [
            'hasCompletedPreferences' => $hasCompleted,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            'selected_preferences' => 'required|array|size:3',
            'selected_preferences.*' => 'required|integer'
        ]);

        $user = Auth::user();

        // Crear o actualizar las preferencias del usuario
        UserPreference::updateOrCreate(
            ['user_id' => $user->id],
            [
                'selected_preferences' => $request->selected_preferences,
                'has_completed_preferences' => true
            ]
        );

        return redirect()->route('dashboard')->with('success', 'Preferencias guardadas exitosamente');
    }
}
