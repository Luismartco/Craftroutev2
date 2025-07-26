<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('users')->insert([
            'name' => 'Administrador',
            'last_name' => 'Craftroute',
            'email' => 'admin@craftroute.com',
            'password' => Hash::make('123456789'),
            'role' => 'admin',
            'birth_date' => null,
            'gender' => null,
            'residence_municipality' => null,
            'neighborhood' => null,
            'address' => null,
            'phone' => null,
            'latitude' => null,
            'longitude' => null,
        ]);
    }
}
