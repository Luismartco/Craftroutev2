<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Illuminate\Support\Facades\Auth;

class ArtesanoDashboardController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        
        return Inertia::render('Dashboard/Artesano/Index', [
            'stats' => [
                'total_productos' => 0,
            ],
            'productos' => [],
        ]);
    }

    public function productos()
    {
        $user = Auth::user();
        
        return Inertia::render('Dashboard/Artesano/Productos', [
            'productos' => [],
        ]);
    }

    public function pedidos()
    {
        $user = auth()->user();
        return Inertia::render('Dashboard/Artesano/Pedidos', [
            'pedidos' => $user->pedidos()->with('cliente')->paginate(10),
        ]);
    }
} 