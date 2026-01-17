<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Mail;
use App\Mail\TwoFactorCode;
use Inertia\Inertia;
use Illuminate\Validation\ValidationException;

class TwoFactorController extends Controller
{
    public function index()
    {
        return Inertia::render('Auth/VerifyTwoFactor');
    }

    public function store(Request $request)
    {
        $request->validate([
            'two_factor_code' => 'required|integer',
        ]);

        $user = auth()->user();

        if ($request->two_factor_code == $user->two_factor_code) {
            $user->resetTwoFactorCode();
            
            // Redirect based on role (logic copied from AuthenticatedSessionController)
            return match ($user->role) {
                'admin' => redirect()->intended(route('dashboard.admin.index')),
                'artisan' => redirect()->intended(route('dashboard.artesano.index')),
                'customer' => redirect()->intended(route('dashboard.cliente.index')),
                default => redirect()->intended(route('dashboard')),
            };
        }

        throw ValidationException::withMessages([
            'two_factor_code' => __('El código que ingresaste es incorrecto.'),
        ]);
    }

    public function resend()
    {
        $user = auth()->user();
        $user->generateTwoFactorCode();
        Mail::to($user->email)->send(new TwoFactorCode($user->two_factor_code));

        return back()->with('status', 'El código de verificación ha sido re-enviado.');
    }
}
