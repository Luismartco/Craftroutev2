<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Material;

class MaterialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $materiales = [
            [
                'nombre' => 'Paja',
                'descripcion' => 'Material natural obtenido de plantas como la caña flecha, utilizada para elaborar sombreros y otros productos.',
            ],
            [
                'nombre' => 'Algodón',
                'descripcion' => 'Fibra natural utilizada para la elaboración de tejidos, hilos y productos textiles.',
            ],
            [
                'nombre' => 'Fique',
                'descripcion' => 'Fibra natural obtenida de la planta de fique, utilizada para elaborar costales, mochilas y otros productos.',
            ],
            [
                'nombre' => 'Cerámica',
                'descripcion' => 'Material arcilloso utilizado para la elaboración de productos cerámicos como tazas, platos y figuras.',
            ],
            [
                'nombre' => 'Hilos',
                'descripcion' => 'Material textil utilizado para la elaboración de tejidos, bordados y otros productos artesanales.',
            ],
            [
                'nombre' => 'Cañamos',
                'descripcion' => 'Material natural obtenido de plantas, utilizado para la elaboración de tejidos y productos artesanales.',
            ],
            [
                'nombre' => 'Cuero',
                'descripcion' => 'Utilizado para fabricar carteras, sandalias y accesorios, con gran presencia en Quibdó y Bogotá.',
            ],
            [
                'nombre' => 'Totumo',
                'descripcion' => 'Fruto seco usado como materia prima para elaborar utensilios y objetos decorativos en zonas del Caribe colombiano.',
            ],
            [
                'nombre' => 'Arcilla',
                'descripcion' => 'Material base utilizado en la cerámica tradicional colombiana, especialmente en regiones como Ráquira y La Chamba.',
            ],
            [
                'nombre' => 'Madera',
                'descripcion' => 'Usada para tallar figuras, utensilios y muebles artesanales en departamentos como Boyacá, Santander y el Chocó.',
            ],
        ];

        foreach ($materiales as $material) {
            Material::create($material);
        }
    }
}
