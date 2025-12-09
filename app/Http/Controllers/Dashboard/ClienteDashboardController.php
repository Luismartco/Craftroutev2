<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;
use App\Models\UserPreference;
use App\Models\Transaccion;

class ClienteDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();

        // Check if user has completed preferences
        $hasPreferences = UserPreference::where('user_id', $user->id)->where('has_completed_preferences', true)->exists();
        if (!$hasPreferences) {
            return redirect()->route('dashboard.cliente.recomendaciones');
        }

        // Cargar pedidos del cliente con información del artesano y detalles
        $pedidos = $user->pedidosCliente()
            ->with(['artesano.tienda', 'detalles.producto'])
            ->latest()
            ->take(5) // Mostrar solo los 5 más recientes en el dashboard
            ->get();

        // Cargar transacciones simuladas pagadas del cliente
        $transaccionesSimuladas = Transaccion::where('id_cliente', $user->id)
            ->where('estado_transaccion', 'simulada_pagada')
            ->with(['detalles.producto', 'detalles.tienda'])
            ->latest('fecha_creacion')
            ->get();


        return Inertia::render('Dashboard/Cliente/Index', [
            'stats' => [
                'total_pedidos' => $user->pedidosCliente()->count(),
                'compras_simuladas' => $transaccionesSimuladas->count(),
            ],
            'pedidos' => $pedidos,
            'transaccionesSimuladas' => $transaccionesSimuladas,
            'user' => [
                'name' => $user->name,
                'last_name' => $user->last_name,
                'residence_municipality' => $user->residence_municipality,
                'phone' => $user->phone,
                'latitude' => $user->latitude,
                'longitude' => $user->longitude,
                'profile_photo' => $user->profile_photo,
            ],
        ]);
    }

    public function pedidos()
    {
        $user = Auth::user();
        return Inertia::render('Dashboard/Cliente/Pedidos', [
            'pedidos' => $user->pedidosCliente()->with('artesano')->paginate(10),
        ]);
    }

    public function favoritos()
    {
        $user = Auth::user();
        return Inertia::render('Dashboard/Cliente/Favoritos', [
            'artesanos' => $user->artesanosFavoritos()->with('profile')->paginate(10),
        ]);
    }
} 