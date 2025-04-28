<?php
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\AdminDashboardController;
use App\Http\Controllers\Dashboard\ArtesanoDashboardController;
use App\Http\Controllers\Dashboard\ClienteDashboardController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        // Redirigir según el rol del usuario
        if ($user->role === 'administrador') {
            return redirect()->route('dashboard.admin');
        } elseif ($user->role === 'artesano') {
            return redirect()->route('dashboard.artesano');
        } else {
            return redirect()->route('dashboard.cliente');
        }
    })->name('dashboard');

    // Dashboard de administrador
    Route::get('/dashboard/admin', [AdminDashboardController::class, 'index'])->name('dashboard.admin');

    // Dashboard de artesano
    Route::get('/dashboard/artesano', [ArtesanoDashboardController::class, 'index'])->name('dashboard.artesano');

    // Dashboard de cliente
    Route::get('/dashboard/cliente', [ClienteDashboardController::class, 'index'])->name('dashboard.cliente');
});

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/blog', function () {
    return Inertia::render('Blog');
})->name('blog');

require __DIR__.'/auth.php';
