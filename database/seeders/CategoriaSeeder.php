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
                'nombre' => 'Tejidos',
                'descripcion' => 'Productos artesanales elaborados con técnicas de tejido como hamacas, mochilas, chinchorros y otros accesorios.',
            ],
            [
                'nombre' => 'Cerámica',
                'descripcion' => 'Productos elaborados en cerámica como tazas, platos, jarrones y figuras decorativas.',
            ],
            [
                'nombre' => 'Madera',
                'descripcion' => 'Productos tallados en madera como muebles, utensilios de cocina y figuras decorativas.',
            ],
            [
                'nombre' => 'Joyería',
                'descripcion' => 'Accesorios y joyería artesanal elaborada con diferentes materiales y técnicas.',
            ],
            [
                'nombre' => 'Cuero',
                'descripcion' => 'Productos elaborados en cuero como carteras, cinturones, sandalias y otros accesorios.',
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
