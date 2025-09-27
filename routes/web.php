<?php
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\Dashboard\AdminDashboardController;
use App\Http\Controllers\Dashboard\ArtesanoDashboardController;
use App\Http\Controllers\Dashboard\ClienteDashboardController;
use App\Http\Controllers\CheckoutController;
use App\Http\Controllers\CartController;

use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TransaccionController;
use App\Http\Controllers\PedidoController;
use Inertia\Inertia;
use App\Http\Middleware\CheckRole;
use App\Http\Controllers\UserPreferenceController;
use App\Http\Controllers\RecommendationController;

Route::get('/', function () {
    $tiendas = \App\Models\Tienda::with('user')->get();
    $productos = \App\Models\Producto::with(['imagenes' => function($q) { $q->orderByDesc('es_principal'); }, 'user.tienda', 'categoria'])->get();
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
        'tiendas' => $tiendas,
        'productos' => $productos,
    ]);
});

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('/dashboard', function () {
        $user = Auth::user();

        if (!$user) {
            abort(403, 'Usuario no autenticado');
        }

        // Redirigir según el rol del usuario
        switch ($user->role) {
            case 'admin':
                return redirect()->route('dashboard.admin.index');
            case 'artisan':
                return redirect()->route('dashboard.artesano.index');
            case 'customer':
                return redirect()->route('dashboard.cliente.index');
            default:
                abort(403, 'Rol no válido');
        }
    })->name('dashboard');

    // Rutas del administrador
    Route::middleware([CheckRole::class . ':admin'])->group(function () {
        Route::prefix('dashboard/admin')->name('dashboard.admin.')->group(function () {
            Route::get('/', [AdminDashboardController::class, 'index'])->name('index');
                    Route::get('/manage-users', [AdminDashboardController::class, 'manageUsers'])->name('manage-users');
        Route::get('/manage-artesanos', [AdminDashboardController::class, 'manageArtesanos'])->name('manage-artesanos');
        Route::get('/filtered-data', [AdminDashboardController::class, 'getFilteredData'])->name('filtered-data');
        
        // Rutas para categorías
        Route::get('/categorias', function() { return redirect()->route('dashboard.admin.index'); })->name('categorias.index');
        Route::post('/categorias', [AdminDashboardController::class, 'storeCategoria'])->name('categorias.store');
        Route::put('/categorias/{id}', [AdminDashboardController::class, 'updateCategoria'])->name('categorias.update');
        Route::delete('/categorias/{id}', [AdminDashboardController::class, 'destroyCategoria'])->name('categorias.destroy');

        // Rutas para materiales
        Route::get('/materiales', function() { return redirect()->route('dashboard.admin.index'); })->name('materiales.index');
        Route::post('/materiales', [AdminDashboardController::class, 'storeMaterial'])->name('materiales.store');
        Route::put('/materiales/{id}', [AdminDashboardController::class, 'updateMaterial'])->name('materiales.update');
        Route::delete('/materiales/{id}', [AdminDashboardController::class, 'destroyMaterial'])->name('materiales.destroy');

        // Rutas para técnicas
        Route::get('/tecnicas', function() { return redirect()->route('dashboard.admin.index'); })->name('tecnicas.index');
        Route::post('/tecnicas', [AdminDashboardController::class, 'storeTecnica'])->name('tecnicas.store');
        Route::put('/tecnicas/{id}', [AdminDashboardController::class, 'updateTecnica'])->name('tecnicas.update');
        Route::delete('/tecnicas/{id}', [AdminDashboardController::class, 'destroyTecnica'])->name('tecnicas.destroy');
    });
    });

    // Rutas del artesano
    Route::middleware([CheckRole::class . ':artisan'])->group(function () {
        Route::prefix('dashboard/artesano')->name('dashboard.artesano.')->group(function () {
            Route::get('/', [ArtesanoDashboardController::class, 'index'])->name('index');
            Route::get('/create-producto', [ArtesanoDashboardController::class, 'createProducto'])->name('create-producto');
            Route::post('/store-producto', [ArtesanoDashboardController::class, 'storeProducto'])->name('store-producto');
            Route::get('/create-tienda', [ArtesanoDashboardController::class, 'createTienda'])->name('create-tienda');
            Route::post('/store-tienda', [ArtesanoDashboardController::class, 'storeTienda'])->name('store-tienda');
            Route::get('/gestionar-tienda', [ArtesanoDashboardController::class, 'gestionarTienda'])->name('gestionar-tienda');
            Route::get('/edit-tienda', [ArtesanoDashboardController::class, 'editTienda'])->name('edit-tienda');
            Route::put('/update-tienda', [ArtesanoDashboardController::class, 'updateTienda'])->name('update-tienda');
            Route::get('/edit-producto/{id}', [ArtesanoDashboardController::class, 'editProducto'])->name('edit-producto');
            Route::match(['put', 'post'], 'update-producto/{id}', [
                App\Http\Controllers\Dashboard\ArtesanoDashboardController::class, 'updateProducto'
            ])->name('update-producto');
            Route::delete('/delete-producto/{id}', [ArtesanoDashboardController::class, 'deleteProducto'])->name('delete-producto');
        });
    });

    // Rutas del cliente
    Route::middleware([CheckRole::class . ':customer'])->group(function () {
        Route::prefix('dashboard/cliente')->name('dashboard.cliente.')->group(function () {
            Route::get('/', [ClienteDashboardController::class, 'index'])->name('index');
            Route::get('/recomendaciones', [UserPreferenceController::class, 'show'])->name('recomendaciones');
            Route::get('/recomendaciones-ia', [UserPreferenceController::class, 'recommendationsPage'])->name('recomendaciones-ia');
        });
        Route::get('/preferences', [UserPreferenceController::class, 'show'])->name('preferences.show');
        Route::post('/preferences', [UserPreferenceController::class, 'store'])->name('preferences.store');
    });
});

// Rutas de checkout (accesibles para todos)
Route::get('/checkout', [CheckoutController::class, 'index'])->name('checkout.index');
Route::post('/checkout', [CheckoutController::class, 'store'])->name('checkout.store');
Route::get('/checkout/success/{pedido_id}', [CheckoutController::class, 'success'])->name('checkout.success');

// Rutas del carrito (accesibles para todos)
Route::post('/api/cart/store', [CartController::class, 'store'])->name('cart.store');
Route::get('/api/cart/get', [CartController::class, 'get'])->name('cart.get');
Route::delete('/api/cart/clear', [CartController::class, 'clear'])->name('cart.clear');

// Ruta para renovar token CSRF
Route::get('/api/csrf-token', function () {
    return response()->json([
        'csrf_token' => csrf_token()
    ]);
})->name('csrf.token');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto'])->name('profile.photo.update');
});

// Transacciones simuladas
Route::middleware(['auth'])->group(function () {
    Route::post('/transacciones/compra', [TransaccionController::class, 'storeCompra'])->name('transacciones.compra');
    Route::post('/transacciones/venta', [TransaccionController::class, 'storeVenta'])->name('transacciones.venta');
    Route::post('/pedidos/create', [PedidoController::class, 'create']);
    Route::put('/pedidos/{pedidoId}/status', [PedidoController::class, 'updateStatus']);
});

Route::get('/blog', function () {
    abort(404);
});

Route::get('/blog/{slug}', [\App\Http\Controllers\BlogController::class, 'show'])->name('blog.show');

// API interna para resolver detalles por IDs (accesible para clientes autenticados)
Route::middleware(['auth', CheckRole::class . ':customer'])->group(function () {
    Route::get('/api/recommendations/productos', [RecommendationController::class, 'productosByIds']);
    Route::get('/api/recommendations/tiendas', [RecommendationController::class, 'tiendasByIds']);
    Route::get('/api/recommendations/proxy/productos', [RecommendationController::class, 'proxyProductos']);
    Route::get('/api/recommendations/proxy/tiendas', [RecommendationController::class, 'proxyTiendas']);
    Route::get('/api/recommendations/has-preferences', [RecommendationController::class, 'hasPreferences']);
});

require __DIR__.'/auth.php';
