<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Tienda;

class TiendasSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $artesanos = [
            [
                'email' => 'carlos@cr.com',
                'tienda' => [
                    'nombre' => 'Artesanías Carlos',
                    'barrio' => 'Centro',
                    'direccion' => 'Cra 45 #12-34',
                    'telefono' => '3001234567',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 10.12345678,
                    'longitude' => -75.12345678,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'ana@cr.com',
                'tienda' => [
                    'nombre' => 'Creaciones Ana',
                    'barrio' => 'San José',
                    'direccion' => 'Calle 20 #8-50',
                    'telefono' => '3109876543',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.32123456,
                    'longitude' => -75.32123456,
                    'foto_perfil' => null,
                ],
            ],
        ];

        foreach ($artesanos as $entry) {
            $user = User::where('email', $entry['email'])->first();

            if ($user) {
                Tienda::updateOrCreate(
                    ['user_id' => $user->id],
                    array_merge($entry['tienda'], ['user_id' => $user->id])
                );
            }
        }
    }
}
