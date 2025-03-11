<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');  // Renderiza Home.jsx
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login'); // Renderiza Login.jsx
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register'); // Renderiza Login.jsx
})->name('register');

