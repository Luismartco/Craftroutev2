<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use App\Models\User;

class ClienteDashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();

        // Cargar pedidos del cliente con información del artesano y detalles

        // Cargar pedidos del cliente con información del artesano y detalles
        $pedidos = $user->pedidosCliente()
            ->with(['artesano.tienda', 'detalles.producto'])
            ->latest()
            ->take(5) // Mostrar solo los 5 más recientes en el dashboard
            ->get();


        return Inertia::render('Dashboard/Cliente/Index', [
            'stats' => [
                'total_pedidos' => $user->pedidosCliente()->count(),
                'artesanos_favoritos' => $user->artesanosFavoritos()->count(),
            ],
            'pedidos' => $pedidos,
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