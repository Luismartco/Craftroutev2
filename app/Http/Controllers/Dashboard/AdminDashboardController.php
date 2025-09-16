<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Categoria;
use App\Models\Material;
use App\Models\Tecnica;
use App\Models\User;
use App\Models\Activity;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => [
                'total_users' => User::count(),
                'total_artesanos' => User::where('role', 'artesano')->count(),
                'total_clientes' => User::where('role', 'cliente')->count(),
            ],
            'recent_activities' => Activity::latest()->take(5)->get(),
        ]);
    }

    public function manageUsers(): Response
    {
        return Inertia::render('Dashboard/Admin/ManageUsers', [
            'users' => User::with('profile')->paginate(10),
        ]);
    }

    public function manageArtesanos(): Response
    {
        return Inertia::render('Dashboard/Admin/ManageArtesanos', [
            'artesanos' => User::where('role', 'artesano')
                ->with('profile')
                ->paginate(10),
        ]);
    }
}
