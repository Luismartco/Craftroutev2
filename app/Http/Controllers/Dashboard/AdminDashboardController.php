<?php

namespace App\Http\Controllers\Dashboard;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use App\Models\Categoria;
use App\Models\Material;
use App\Models\Tecnica;

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
            'categories' => Categoria::orderBy('nombre')->get()->map(function($categoria) {
                return [
                    'id' => $categoria->id,
                    'name' => $categoria->nombre,
                    'description' => $categoria->descripcion
                ];
            }),
            'materials' => Material::orderBy('nombre')->get()->map(function($material) {
                return [
                    'id' => $material->id,
                    'name' => $material->nombre,
                    'description' => $material->descripcion
                ];
            }),
            'techniques' => Tecnica::orderBy('nombre')->get()->map(function($tecnica) {
                return [
                    'id' => $tecnica->id,
                    'name' => $tecnica->nombre,
                    'description' => $tecnica->descripcion
                ];
            }),
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