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
                    'nombre' => 'Artesanías Taller Ancestral',
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
                    'nombre' => 'Manos de tradición',
                    'barrio' => 'San José',
                    'direccion' => 'Calle 20 #8-50',
                    'telefono' => '3109876543',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.18230,
                    'longitude' => -75.3822,
                    'foto_perfil' => null,
               
                ],
             ],

                 [
                'email' => 'juan@cr.com',
                'tienda' => [
                    'nombre' => 'Herencia Artesanal',
                    'barrio' => 'Calle Real',
                    'direccion' => 'Carrera 6 #5-40',
                    'telefono' => '3134573543',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1821,
                    'longitude' => -75.3824,
                    'foto_perfil' => null,
                ],
            ],
            
            [
                'email' => 'patricia@cr.com',
                'tienda' => [
                    'nombre' => 'Raices de Arte',
                    'barrio' => 'El Oasis',
                    'direccion' => 'Carrera 8 #17-22',
                    'telefono' => '3144214543',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1845,
                    'longitude' => -75.3842,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'fernando@cr.com',
                'tienda' => [
                    'nombre' => 'Tradición Viva',
                    'barrio' => 'Fatima',
                    'direccion' => 'Calle 19 #6-80',
                    'telefono' => '3144214543',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1817,
                    'longitude' => -75.3816,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'diana@cr.com',
                'tienda' => [
                    'nombre' => 'Hilos de luna',
                    'barrio' => 'Nueve de Marzo',
                    'direccion' => 'Carrera 5 #21-34',
                    'telefono' => '3146789012',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1839,
                    'longitude' => -75.3827,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'andres@cr.com',
                'tienda' => [
                    'nombre' => 'Tejiendo sueños',
                    'barrio' => 'Villa Marta',
                    'direccion' => 'Calle 22 #7-18',
                    'telefono' => '3157890123',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1842,
                    'longitude' => -75.3838,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'sandra@cr.com',
                'tienda' => [
                    'nombre' => 'Susurros de paja',
                    'barrio' => 'Las palmas',
                    'direccion' => 'Carrera 9 #19-15',
                    'telefono' => '3168901234',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1828,
                    'longitude' => -75.3846,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'javier@cr.com',
                'tienda' => [
                    'nombre' => 'Alma tejida',
                    'barrio' => 'San José',
                    'direccion' => 'Calle 21 #9-70',
                    'telefono' => '3179012345',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1835,
                    'longitude' => -75.3799,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'lina@cr.com',
                'tienda' => [
                    'nombre' => 'Fique y tradición',
                    'barrio' => 'Las acacias',
                    'direccion' => 'Carrera 7 #6-35',
                    'telefono' => '3180123456',
                    'municipio_venta' => 'Sampués',
                    'latitude' => 9.1815,
                    'longitude' => -75.3829,
                    'foto_perfil' => null,
                ],
            ],

            [
                'email' => 'oscar@cr.com',
                'tienda' => [
                    'nombre' => 'Taller del Espíritu Creador',
                    'barrio' => 'Villa Marta',
                    'direccion' => 'Calle 23 #8-10',
                    'telefono' => '3191234567',
                    'municipio_venta' => 'Sampués',
                    'latitude' =>9.1840,
                    'longitude' => -75.3840,
                    'foto_perfil' => null,
                ],
            ],

            [
                'email' => 'tatiana@cr.com',
                'tienda' => [
                    'nombre' => 'Bendición Artesanal',
                    'barrio' => 'La Parroquia',
                    'direccion' => 'Calle 20 #8-52',
                    'telefono' => '3202345678',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3339,
                    'longitude' => -75.3045,
                    'foto_perfil' => null,
                ],
            ],

             [
                'email' => 'hector@cr.com',
                'tienda' => [
                    'nombre' => 'Taller del Sombrero Vueltiao',
                    'barrio' => 'La Cruz',
                    'direccion' => 'Carrera 8 #18-11',
                    'telefono' => '3213456789',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3348,
                    'longitude' => -75.3042,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'yolanda@cr.com',
                'tienda' => [
                    'nombre' => 'Matices Caribeños',
                    'barrio' => 'Alta Cruz',
                    'direccion' => 'Calle 19 #7-68',
                    'telefono' => '3224567890',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3355,
                    'longitude' => -75.3063,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'miguel@cr.com',
                'tienda' => [
                    'nombre' => 'Legado de Generaciones',
                    'barrio' => 'Rincon',
                    'direccion' => 'Carrera 5 #22-10',
                    'telefono' => '3235678901',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3353,
                    'longitude' => -75.3040,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'paola@cr.com',
                'tienda' => [
                    'nombre' => 'Taller Colonial',
                    'barrio' => 'Chambacú',
                    'direccion' => 'Carrera 6 #4-55',
                    'telefono' => '3246789012',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3330,
                    'longitude' => -75.3057,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'ricardo@cr.com',
                'tienda' => [
                    'nombre' => 'Memoria Tejida',
                    'barrio' => 'Calle baja',
                    'direccion' => 'Calle 22 #6-23',
                    'telefono' => '3257890123',
                    'municipio_venta' => 'Morroa',
                   'latitude' => 9.3331,
                    'longitude' => -75.3042,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'claudia@cr.com',
                'tienda' => [
                    'nombre' => 'Manos de Familia',
                    'barrio' => 'San Francisco',
                    'direccion' => 'Carrera 9 #20-03',
                    'telefono' => '3268901234',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3354,
                    'longitude' => -75.3062,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'pedro@cr.com',
                'tienda' => [
                    'nombre' => 'Taller de los Abuelos',
                    'barrio' => 'Candelaria',
                    'direccion' => 'Calle 21 #8-44',
                    'telefono' => '3179012345',
                    'municipio_venta' => 'Morroa',
                    'latitude' => 9.3353,
                    'longitude' => -75.3062,
                    'foto_perfil' => null,
                ],
            ],
            [
                'email' => 'luisa@cr.com',
                'tienda' => [
                    'nombre' => 'El Rincón de la Abuela',
                    'barrio' => 'Los Olivos',
                    'direccion' => 'Carrera 7 #17-90',
                    'telefono' => '3110123456',
                    'municipio_venta' => 'Morroa',
                   'latitude' => 9.3351,
                    'longitude' => -75.3042,
                    'foto_perfil' => null,
                ],
            ]
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
