<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;
use App\Models\User;

class ClienteDashboardController extends Controller
{
    public function index(): Response
    {
        $user = Auth::user();
        
        return Inertia::render('Dashboard/Cliente/Index', [
            'stats' => [
                'total_pedidos' => 0,
                'artesanos_favoritos' => 0,
            ],
            'user' => [
                'name' => $user->name,
                'last_name' => $user->last_name,
                'residence_municipality' => $user->residence_municipality,
                'phone' => $user->phone,
                'latitude' => $user->latitude,
                'longitude' => $user->longitude,
                'profile_photo' => $user->profile_photo, // Add this line
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