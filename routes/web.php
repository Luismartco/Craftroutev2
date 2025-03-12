<?php
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');  // Renderiza
})->name('home');

Route::get('/login', function () {
    return Inertia::render('Login'); // Renderiza 
})->name('login');

Route::get('/register', function () {
    return Inertia::render('Register'); // Renderiza 
})->name('register');

Route::get('/ingreso', function () {
    return Inertia::render('Ingreso'); // Renderiza 
})->name('ingreso');

