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
                'descripcion' => 'Incluye productos elaborados con fibras naturales o sintéticas mediante técnicas de telar, crochet o macramé. Representativa en La Guajira y Nariño.',
            ],
            [
                'nombre' => 'Cerámica y alfarería',
                'descripcion' => 'Piezas moldeadas en arcilla y decoradas a mano, tradicionales de regiones como Ráquira (Boyacá) y La Chamba (Tolima).',
            ],
            [
                'nombre' => 'Madera tallada',
                'descripcion' => 'Artículos decorativos y utilitarios hechos a partir de maderas nativas, talladas y pulidas artesanalmente.',
            ],
            [
                'nombre' => 'Joyería y orfebrería',
                'descripcion' => 'Creaciones en oro, plata y piedras preciosas con técnicas tradicionales como el filigrana de Mompox y Popayán.',
            ],
            [
                'nombre' => 'Cuero y marroquinería',
                'descripcion' => 'Accesorios, calzado y artículos decorativos elaborados en cuero natural con técnicas tradicionales de curtido y grabado.',
            ],
            [
                'nombre' => 'Cestería y fibras naturales',
                'descripcion' => 'Productos trenzados en palma de iraca, bejuco o caña flecha, típicos de Usiacurí, Nariño y Córdoba.',
            ],
            [
                'nombre' => 'Piedra y totumo',
                'descripcion' => 'Objetos tallados en piedra o elaborados con el fruto del totumo, decorados con pintura o grabados artesanales.',
            ],
            [
                'nombre' => 'Textiles indígenas',
                'descripcion' => 'Prendas, mochilas y accesorios tejidos por comunidades indígenas como los Wayuu y los Kankuamos, con símbolos culturales únicos.',
            ],
        ];

        foreach ($categorias as $categoria) {
            Categoria::create($categoria);
        }
    }
}
