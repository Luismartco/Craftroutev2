<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Auth\Events\Registered;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules;
use Inertia\Inertia;
use Inertia\Response;
use Exception;

class RegisteredUserController extends Controller
{
    /**
     * Display the registration view.
     */
    public function create(): Response
    {
        return Inertia::render('Auth/Register');
    }

    /**
     * Handle an incoming registration request.
     *
     * @throws \Illuminate\Validation\ValidationException
     */
    public function store(Request $request): RedirectResponse
    {
        // Definir las reglas de validación dinámicas
        $rules = [
            'name' => 'required|string|max:255',
            'last_name' => 'required|string|max:255',
            'email' => 'required|string|lowercase|email|max:255|unique:users,email',
            'password' => ['required', 'confirmed', Rules\Password::defaults()],
            'birth_date' => 'required|date',
            'gender' => 'required|string|in:Male,Female,Other',
            'role' => 'required|string|in:customer,artisan',
            'residence_municipality' => 'required|string|max:255',
            'phone' => 'required|string|max:20',
            'latitude' => 'nullable|numeric',
            'longitude' => 'nullable|numeric',
        ];

        // Validar campos adicionales si es "artesano"
        if ($request->role === 'artisan') {
            $rules['neighborhood'] = 'required|string|max:255';
            $rules['address'] = 'required|string|max:255';
        } else {
            $rules['neighborhood'] = 'nullable|string|max:255';
            $rules['address'] = 'nullable|string|max:255';
        }

        // Validar la solicitud con las reglas dinámicas
        $validated = $request->validate($rules);

        try {
            // Crear el usuario en la base de datos
            $user = User::create([
                'name' => $validated['name'],
                'last_name' => $validated['last_name'],
                'email' => $validated['email'],
                'password' => Hash::make($validated['password']),
                'birth_date' => $validated['birth_date'],
                'gender' => $validated['gender'],
                'role' => $validated['role'],
                'residence_municipality' => $validated['residence_municipality'],
                'neighborhood' => $validated['neighborhood'] ?? null,
                'address' => $validated['address'] ?? null,
                'phone' => $validated['phone'],
                'latitude' => $validated['latitude'] ?? null,
                'longitude' => $validated['longitude'] ?? null,
            ]);

            event(new Registered($user));

            return redirect()->route('login')->with('success', 'Registro exitoso. ¡Bienvenido!');
        } catch (Exception $e) {
            return back()->withErrors(['error' => 'Error en el registro: ' . $e->getMessage()]);
        }
    }
}
