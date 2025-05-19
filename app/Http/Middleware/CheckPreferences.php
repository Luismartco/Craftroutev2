<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckPreferences
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = $request->user();

        // Solo verificar para usuarios con rol 'customer'
        if ($user && $user->role === 'customer') {
            // Si el usuario no tiene preferencias o no las ha completado
            if (!$user->preferences || !$user->preferences->has_completed_preferences) {
                // Si no está en la ruta de preferencias, redirigir
                if (!$request->is('preferences*')) {
                    return redirect()->route('preferences.show');
                }
            }
        }

        return $next($request);
    }
}
