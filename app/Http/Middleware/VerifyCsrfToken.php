<?php

namespace App\Http\Middleware;

use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken as Middleware;
use Illuminate\Session\TokenMismatchException;

class VerifyCsrfToken extends Middleware
{
    /**
     * The URIs that should be excluded from CSRF verification.
     *
     * @var array
     */
    protected $except = [
        'register', // Excluir la ruta de registro de la verificación CSRF
        'api/*', // Excluir todas las rutas API de la verificación CSRF
    ];

    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     *
     * @throws \Illuminate\Session\TokenMismatchException
     */
    public function handle($request, \Closure $next)
    {
        try {
            return parent::handle($request, $next);
        } catch (TokenMismatchException $e) {
            // Si es una petición AJAX o API, devolver JSON con error
            if ($request->expectsJson() || $request->ajax() || $request->is('api/*')) {
                return response()->json([
                    'message' => 'Token CSRF expirado. Renovando automáticamente...',
                    'error' => 'CSRF_TOKEN_MISMATCH',
                    'requires_refresh' => true
                ], 419);
            }
            
            // Para peticiones normales, intentar renovar la sesión silenciosamente
            if ($request->isMethod('POST') || $request->isMethod('PUT') || $request->isMethod('DELETE')) {
                // Regenerar la sesión y el token
                $request->session()->regenerate();
                
                // Redirigir de vuelta con un nuevo token
                return redirect()->back()
                    ->withInput($request->except('_token'))
                    ->with('_token', csrf_token());
            }
            
            // Para otras peticiones, redirigir normalmente
            return redirect()->back()
                ->withInput($request->except('_token'))
                ->withErrors(['csrf' => 'La sesión ha expirado. Por favor, intenta nuevamente.']);
        }
    }
}
