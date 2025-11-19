<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Categoria;

class CategoriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $categorias = [
            [
                'nombre' => 'Tejeduría',
                'descripcion' => 'Productos elaborados a mano mediante técnicas de entrelazado de fibras naturales o sintéticas.',
            ],
            [
                'nombre' => 'Tejidos',
                'descripcion' => 'Artículos fabricados con hilos tejidos en telar o a mano, como mantas, hamacas y bolsos.',
            ],
            [
                'nombre' => 'Cerámica',
                'descripcion' => 'Piezas elaboradas a partir de arcilla moldeada y cocida, como vasijas, platos y figuras decorativas.',
            ],
            [
                'nombre' => 'Madera',
                'descripcion' => 'Objetos tallados o elaborados en madera, incluyendo utensilios, esculturas y decoraciones.',
            ],
            [
                'nombre' => 'Joyería',
                'descripcion' => 'Accesorios como collares, pulseras y aretes fabricados con metales, piedras o materiales naturales.',
            ],
            [
                'nombre' => 'Cuero',
                'descripcion' => 'Productos hechos en cuero como billeteras, bolsos, sandalias y cinturones.',
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
