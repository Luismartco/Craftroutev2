<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\Tecnica;

class TecnicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $tecnicas = [
            [
                'nombre' => 'Tejido en telar',
                'descripcion' => 'Técnica tradicional para elaborar mantas, mochilas y hamacas usando hilos de algodón o lana.',
            ],
            [
                'nombre' => 'Alfarería',
                'descripcion' => 'Técnica ancestral usada para moldear arcilla y crear piezas como ollas, platos y figuras decorativas.',
            ],
            [
                'nombre' => 'Talla en madera',
                'descripcion' => 'Proceso artesanal de esculpir figuras o utensilios en diferentes tipos de madera nativa.',
            ],
            [
                'nombre' => 'Cestería en iraca',
                'descripcion' => 'Técnica de trenzado de palma de iraca para crear sombreros, individuales y bolsos decorativos.',
            ],
            [
                'nombre' => 'Orfebrería',
                'descripcion' => 'Técnica de trabajo del oro y la plata para crear joyas y objetos decorativos con diseños tradicionales.',
            ],
            [
                'nombre' => 'Marroquinería',
                'descripcion' => 'Trabajo artesanal del cuero para elaborar calzado, cinturones y bolsos de alta calidad.',
            ],
            [
                'nombre' => 'Tejeduría en chaquiras',
                'descripcion' => 'Arte de ensartar pequeñas cuentas de colores para crear collares, manillas y accesorios típicos de comunidades indígenas.',
            ],
            [
                'nombre' => 'Pintura sobre totumo',
                'descripcion' => 'Decoración artesanal de objetos elaborados con el fruto del totumo, con motivos florales o geométricos.',
            ],
        ];

        foreach ($tecnicas as $tecnica) {
            Tecnica::create($tecnica);
        }
    }
}
