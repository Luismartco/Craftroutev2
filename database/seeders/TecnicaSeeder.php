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
                'nombre' => 'Telar Horizontal',
                'descripcion' => 'Técnica de tejido que utiliza un telar horizontal para elaborar productos como hamacas, mochilas y otros tejidos.',
            ],
            [
                'nombre' => 'Bordado',
                'descripcion' => 'Técnica de decoración textil que consiste en coser hilos sobre una tela para crear diseños y figuras.',
            ],
            [
                'nombre' => 'Cosido',
                'descripcion' => 'Técnica de unión de materiales mediante hilos y agujas para crear productos textiles y otros artículos.',
            ],
            [
                'nombre' => 'Moldeado',
                'descripcion' => 'Técnica de modelado de materiales como arcilla o cerámica para crear figuras y objetos.',
            ],
            [
                'nombre' => 'Tallado',
                'descripcion' => 'Técnica de escultura que consiste en tallar materiales como madera o piedra para crear figuras y objetos.',
            ],
            [
                'nombre' => 'Tejido de Palma',
                'descripcion' => 'Técnica tradicional de tejido utilizando fibras de palma para elaborar sombreros, canastos y otros productos.',
            ],
        ];

        foreach ($tecnicas as $tecnica) {
            Tecnica::create($tecnica);
        }
    }
}
