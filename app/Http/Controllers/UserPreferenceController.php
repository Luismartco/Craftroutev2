<?php

namespace App\Http\Controllers;

use App\Models\UserPreference;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserPreferenceController extends Controller
{
    public function show()
    {
        $user = auth()->user();
        
        // Si el usuario ya completó sus preferencias, redirigir al dashboard
        if ($user->preferences && $user->preferences->has_completed_preferences) {
            return redirect()->route('dashboard');
        }

        return Inertia::render('Dashboard/Cliente/Recomendaciones');
    }

    public function store(Request $request)
    {
        $request->validate([
            'selected_preferences' => 'required|array|size:3',
            'selected_preferences.*' => 'required|integer'
        ]);

        $user = auth()->user();

        // Crear o actualizar las preferencias del usuario
        $user->preferences()->updateOrCreate(
            ['user_id' => $user->id],
            [
                'selected_preferences' => $request->selected_preferences,
                'has_completed_preferences' => true
            ]
        );

        return redirect()->route('dashboard')->with('success', 'Preferencias guardadas exitosamente');
    }
}
