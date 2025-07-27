<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        $productos = [
            [
                'email' => 'carlos@cr.com',
                'productos' => [
                    [
                        'nombre' => 'Tapete de Cañamo Tejido',
                        'descripcion' => 'Tapete artesanal tejido con fibra de cáñamo. Resistente al tráfico y perfecto para decoración del hogar. Elaborado con técnicas tradicionales.',
                        'precio' => 95000,
                        'cantidad_disponible' => 10,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'morroa',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'canamos',
                        'color' => 'Marrón Natural',
                    ],
                    [
                        'nombre' => 'Bolso de Fique Ecológico',
                        'descripcion' => 'Bolso elaborado con fibra de fique, material 100% natural y biodegradable. Perfecto para compras ecológicas. Resistente al peso y duradero.',
                        'precio' => 45000,
                        'cantidad_disponible' => 25,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'cosido',
                        'materia_prima' => 'fique',
                        'color' => 'Natural',
                    ]
                ],
            ],
            [
                'email' => 'ana@cr.com',
                'productos' => [
                    [
                        'nombre' => 'Sombrero Vueltiao Tradicional',
                        'descripcion' => 'Sombrero vueltiao tejido a mano con técnicas ancestrales. Elaborado con caña flecha natural de la región de Córdoba. Ideal para protegerse del sol manteniendo el estilo tradicional colombiano.',
                        'precio' => 120000,
                        'cantidad_disponible' => 15,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'morroa',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'paja',
                        'color' => 'Natural',
                    ],
                    [
                        'nombre' => 'Hamaca de Algodón Artesanal',
                        'descripcion' => 'Hamaca tejida completamente a mano con algodón 100% natural. Perfecta para descansar en espacios interiores y exteriores. Resistente y cómoda, con acabados tradicionales.',
                        'precio' => 250000,
                        'cantidad_disponible' => 8,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'algodon',
                        'color' => 'Blanco y Azul',
                    ]
                ],
            ]
        ];

        foreach ($productos as $artesanoData) {
            $user = User::where('email', $artesanoData['email'])->first();

            if ($user) {
                foreach ($artesanoData['productos'] as $productoData) {
                    Producto::create(array_merge($productoData, [
                        'user_id' => $user->id,
                    ]));
                }
            }
        }
    }
}
