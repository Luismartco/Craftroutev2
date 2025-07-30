<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

class CustomerSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            [
                    'name' => 'Luis',
                    'last_name' => 'Martinez',
                    'email' => 'luis@cr.com',
                    'password' => Hash::make('123456789'),
                    'role' => 'customer',
                    'birth_date' => '1990-05-12',
                    'gender' => 'male',
                    'residence_municipality' => 'Morroa',
                    'neighborhood' => 'Centro',
                    'address' => 'Cra 45 #12-34',
                    'phone' => '3001234567',
                    'latitude' => 9.333282,
                    'longitude' => -75.3059,
                    'profile_photo' => null,
                    'email_verified_at' => now(),
                    'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Deimys',
                'last_name' => 'Mendoza',
                'email' => 'deimys@cr.com',
                'password' => Hash::make('123456789'),
                'role' => 'customer',
                'birth_date' => '1995-08-22',
                'gender' => 'female',
                'residence_municipality' => 'Sampues',
                'neighborhood' => 'Norte',
                'address' => 'Cra 10 #20-30',
                'phone' => '3007654321',
                'latitude' => 9.18230,
                'longitude' => -75.3822,
                'profile_photo' => null,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Eliasib',
                'last_name' => 'Benitez',
                'email' => 'eliasib@cr.com',
                'password' => Hash::make('123456789'),
                'role' => 'customer',
                'birth_date' => '1990-05-12',
                'gender' => 'male',
                'residence_municipality' => 'Morroa',
                'neighborhood' => 'Centro',
                'address' => 'Cra 45 #12-34',
                'phone' => '3001234567',
                'latitude' => 9.333282,
                'longitude' => -75.3059,
                'profile_photo' => null,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ],
            [
                'name' => 'Jesus',
                'last_name' => 'Castillo',
                'email' => 'jesus@cr.com',
                'password' => Hash::make('123456789'),
                'role' => 'customer',
                'birth_date' => '1990-05-12',
                'gender' => 'male',
                'residence_municipality' => 'Sampues',
                'neighborhood' => 'Centro',
                'address' => 'Cra 45 #12-34',
                'phone' => '3001234567',
                'latitude' => 9.18230,
                'longitude' => -75.3822,
                'profile_photo' => null,
                'email_verified_at' => now(),
                'remember_token' => Str::random(10),
            ]
        ]);
    }
}