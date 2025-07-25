<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class ArtisanSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                # Artisan 1
                'name' => 'Carlos',
                'last_name' => 'Gómez',
                'email' => 'carlos@cr.com',
                'password' => Hash::make('123456789'),
                'role' => 'artisan',
                'birth_date' => '1990-05-12',
                'gender' => 'male',
                'residence_municipality' => 'Morroa',
                'neighborhood' => 'Centro',
                'address' => 'Cra 45 #12-34',
                'phone' => '3001234567',
                'latitude' => 10.12345678,
                'longitude' => -75.12345678,
                'profile_photo' => null,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ],
            [
                # Artisan 2
                'name' => 'Ana',
                'last_name' => 'Pérez',
                'email' => 'ana@cr.com',
                'password' => Hash::make('123456789'),
                'role' => 'artisan',
                'birth_date' => '1985-09-30',
                'gender' => 'female',
                'residence_municipality' => 'Sampués',
                'neighborhood' => 'San José',
                'address' => 'Calle 20 #8-50',
                'phone' => '3109876543',
                'latitude' => 9.32123456,
                'longitude' => -75.32123456,
                'profile_photo' => null,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]
        ]);
    }
}
