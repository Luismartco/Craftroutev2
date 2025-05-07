<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AdminDashboardController extends Controller
{
    public function index(): Response
    {
        return Inertia::render('Dashboard/Admin/Index', [
            'stats' => [
                'total_users' => \App\Models\User::count(),
                'total_artesanos' => \App\Models\User::where('role', 'artesano')->count(),
                'total_clientes' => \App\Models\User::where('role', 'cliente')->count(),
            ],
            'recent_activities' => \App\Models\Activity::latest()->take(5)->get(),
        ]);
    }

    public function manageUsers()
    {
        return Inertia::render('Dashboard/Admin/ManageUsers', [
            'users' => \App\Models\User::with('profile')->paginate(10),
        ]);
    }

    public function manageArtesanos()
    {
        return Inertia::render('Dashboard/Admin/ManageArtesanos', [
            'artesanos' => \App\Models\User::where('role', 'artesano')
                ->with('profile')
                ->paginate(10),
        ]);
    }
} 