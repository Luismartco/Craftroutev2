<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use App\Models\User;
use App\Models\Producto;

class ProductoSeeder extends Seeder
{
    public function run(): void
    {
        // Mapeo de categorías string a categoria_id
        $categoriaMap = [
            'tejido' => 20, // Tejidos tiene ID 20
            'madera' => 22, // Madera tiene ID 22
            'ceramica' => 21, // Cerámica tiene ID 21
            'joyeria' => 23, // Joyería tiene ID 23
        ];

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
                        'municipio_venta' => 'morroa',
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
                        'municipio_venta' => 'sampues',
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
            ],
            [
                'email' => 'patricia@cr.com',
                'productos' => [
                    [
                        'nombre' => 'Tapete de Cañamo Tejido multicolor con toques amaderado',
                        'descripcion' => 'Tapete artesanal tejido con fibra de cáñamo. Resistente al tráfico y perfecto para decoración del hogar. Elaborado con técnicas tradicionales.',
                        'precio' => 95000,
                        'cantidad_disponible' => 10,
                        'categoria' => 'madera',
                        'municipio_venta' => 'sampues',
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
                
             'email' => 'juan@cr.com',
                'productos' => [
                    [

                        'nombre' => 'Cesta Decorativa de Paja',
                        'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                        'precio' => 79000,
                        'cantidad_disponible' => 15,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'cosido',
                        'materia_prima' => 'canamos',
                        'color' => 'Marrón Chocolate',
                    ],
                    [
                        
                        'nombre' => 'Bolso de Paja Decorativo',
                        'descripcion' => 'Bolso tejido con diseños geométricos tradicionales.',
                        'precio' => 100000,
                        'cantidad_disponible' => 33,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'paja',
                        'color' => 'Beige',
                    ],
                    [
                        'nombre' => 'Hamaca de Fique',
                        'descripcion' => 'Hamaca resistente tejida con fibras naturales de fique.',
                        'precio' => 250000,
                        'cantidad_disponible' => 6,
                        'categoria' => 'madera',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'fique',
                        'color' => 'Blanca con negro',
                    ], 
                ],       
            ],
            [
                'email' => 'fernando@cr.com',
                'productos' => [
                    [
                        'nombre' => 'Vasija de Cerámica',
                        'descripcion' => 'Vasija decorativa moldeada y pintada a mano.',
                        'precio' => 79000,
                        'cantidad_disponible' => 15,
                        'categoria' => 'ceramica',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'cosido',
                        'materia_prima' => 'ceramica',
                        'color' => 'Terracota',
                    ],
                    [
                        'nombre' => 'Tapete de Hilos Multicolor',
                        'descripcion' => 'Tapete tejido con hilos de diversos colores en patrones geométricos.',
                        'precio' => 50000,
                        'cantidad_disponible' => 8,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'hilos',
                        'color' => 'Multicolor',
                    ],
                    [
                        'nombre' => 'Morral de Cáñamo y madera',
                        'descripcion' => 'Morral resistente tejido con fibras de cáñamo natural.',
                        'precio' => 220000,
                        'cantidad_disponible' => 50,
                        'categoria' => 'madera',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'cosido',
                        'materia_prima' => 'canamos',
                        'color' => 'Café',
                    ],
                 ],
            ],
            [
                 
                'email' => 'diana@cr.com',
                'productos' => [
                [
                        'nombre' => 'Sombrero de Paja Fino',
                        'descripcion' => 'Sombrero de paja con tejido fino y acabados elegantes.',
                        'precio' => 82000,
                        'cantidad_disponible' => 26,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'paja',
                        'color' => 'Crema',
                ],
                [
                        'nombre' => 'Maceta de Cerámica Pintada',
                        'descripcion' => 'Maceta decorativa con diseños coloridos pintados a mano.',
                        'precio' => 300000,
                        'cantidad_disponible' => 5,
                        'categoria' => 'ceramica',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'cosido',
                        'materia_prima' => 'ceramica',
                        'color' => 'Azul',
                ],
                [
                        'nombre' => 'Mantel de Fique Bordado',
                        'descripcion' => 'Mantel de fique con bordados decorativos en los bordes.',
                        'precio' => 60000,
                        'cantidad_disponible' => 10,
                        'categoria' => 'joyeria',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'bordado',
                        'materia_prima' => 'fique',
                        'color' => 'Marrón',
                ],
            ],
        ],
            [
                 
                'email' => 'andres@cr.com',
                'productos' => [
                [
                        'nombre' => 'Bufanda de Hilos Suaves',
                        'descripcion' => 'Bufanda tejida con hilos suaves en colores pasteles.',
                        'precio' => 80000,
                        'cantidad_disponible' => 5,
                        'categoria' => 'joyeria',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'telar horizontal',
                        'materia_prima' => 'hilos',
                        'color' => 'Lila',
                ],
                [
                        'nombre' => 'Cojín de Cáñamo Decorativo',
                        'descripcion' => 'Cojín relleno con decoraciones en fibra de cáñamo.',
                        'precio' => 79000,
                        'cantidad_disponible' => 15,
                        'categoria' => 'tejido',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'cosido',
                        'materia_prima' => 'canamos',
                        'color' => 'Gris',
                ],
                [
                        'nombre' => 'Centro de mesa decorativo en madera',
                        'descripcion' => 'Hermoso centro de mesa tejido a mano por artesanos locales. Ideal para darle vida a tu mesa.',
                        'precio' => 30000,
                        'cantidad_disponible' => 38,
                        'categoria' => 'madera',
                        'municipio_venta' => 'sampues',
                        'tecnica_artesanal' => 'bordado',
                        'materia_prima' => 'algodon',
                        'color' => 'Blanco con detalles azules',
                ],
            ],
            ],
            [ 
                'email' => 'sandra@cr.com',
                'productos' => [
                [
                    'nombre' => 'Posavasos de Paja con Bordado en madera para mayor adherencia',
                    'descripcion' => 'Set de posavasos tejidos con paja natural.',
                    'precio' => 25000,
                    'cantidad_disponible' => 10,
                    'categoria' => 'madera',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Natural',
                ],
                [
                     'nombre' => 'Chaleco de Fique Artesanal',
                     'descripcion' => 'Chaleco tejido con fibras de fique en diseño contemporáneo.',
                     'precio' => 30000,
                     'cantidad_disponible' => 5,
                     'categoria' => 'tejido',
                     'municipio_venta' => 'sampues',
                     'tecnica_artesanal' => 'telar horizontal',
                     'materia_prima' => 'fique',
                     'color' => 'Verde Oliva',
                ],
                [
                    'nombre' => 'Tapete de Cáñamo Tejido con madera fina',
                    'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                    'precio' => 76000,
                    'cantidad_disponible' => 6,
                    'categoria' => 'madera',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'ceramica',
                    'color' => 'Blanco Roto'
                ],
            ],

            ],
            [
                'email' => 'javier@cr.com',
                'productos' => [
                [
                    'nombre' => 'Bolso Artesanal de Fique',
                    'descripcion' => 'Diseño único y duradero. Cada pieza refleja la riqueza cultural y la destreza de su creador.',
                    'precio' => 115000,
                    'cantidad_disponible' => 5,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'algodon',
                    'color' => 'Marrón Natural',
                ],
                [
                    'nombre' => 'Camino de Mesa Bordado con detalles en madera',
                    'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                    'precio' => 53000,
                    'cantidad_disponible' => 10,
                    'categoria' => 'madera',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'hilos',
                    'color' => 'azul Claro',
                ],
                [
                    'nombre' => 'Cesta  de pintada a mano por niños de la comunidad',
                    'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                    'precio' => 78000,
                    'cantidad_disponible' => 17,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'bordado',
                    'materia_prima' => 'fique',
                    'color' => 'Blanco Roto',
                ],
            ],
            [  
                'email' => 'lina@cr.com',
                'productos' => 
                [
                    'nombre' => 'Bolso de Hilo Cosido a Mano',
                    'descripcion' => 'Diseño único y duradero. Cada pieza refleja la riqueza cultural y la destreza de su creador.',
                    'precio' => 76333,
                    'cantidad_disponible' => 7,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'fique',
                    'color' => 'Marrón Natural',

                ],
                [
                    'nombre' => 'Sombrero Artesanal',
                    'descripcion' => 'Producto artesanal elaborado con técnicas tradicionales y materiales sostenibles. Ideal para decoración o uso diario.',
                    'precio' => 100000,
                    'cantidad_disponible' => 40,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'hilos',
                    'color' => 'Beige Oscuro',

                ],
                [
                    'nombre' => 'Portavasos de Algodón Tejido',
                    'descripcion' => 'Producto artesanal elaborado con técnicas tradicionales y materiales sostenibles. Ideal para decoración o uso diario.',
                    'precio' => 15000,
                    'cantidad_disponible' => 21,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Beige Claro',

                ],
            ],
                  
            ],
            [
                'email' => 'oscar@cr.com',
                'productos' => [
                [
                    'nombre' => 'Maceta de Cerámica Pintada a Mano',
                    'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                    'precio' => 300000,
                    'cantidad_disponible' => 7,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'algodon',
                    'color' => 'Terracota',

                ],
                [
                    'nombre' => 'Tapete de Cáñamo Tejido',
                    'descripcion' => 'Producto artesanal elaborado con técnicas tradicionales y materiales sostenibles. Ideal para decoración o uso diario.',
                    'precio' => 60000,
                    'cantidad_disponible' => 18,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'bordado',
                    'materia_prima' => 'algodon',
                    'color' => 'Terracota',

                ],
                [
                    'nombre' => 'Gorro de Hilos Coloridos',
                    'descripcion' => 'Gorro tejido con hilos de colores vibrantes, perfecto para combinar con tu estilo diario, diseñado para brindar calidez y estilo.',
                    'precio' => 70000,
                    'cantidad_disponible' => 25,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'hilos',
                    'color' => 'Naranja',
                ],
            ],
            ],
            [
                'email' => 'tatiana@cr.com',
                'productos' => [
                [
                    'nombre' => 'Florero de Cerámica Rústico',
                    'descripcion' => 'Florero de cerámica con acabado rústico y texturas naturales, ideal para decoración de interiores, elaborado a mano por artesanos locales.',
                    'precio' => 290000,
                    'cantidad_disponible' => 1,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'ceramica',
                    'color' => 'Marrón Oscuro',
                ],
                [
                     'nombre' => 'Pulsera de Fique Natural',
                    'descripcion' => 'Pulsera artesanal tejida con fibras de fique natural, con un diseño elegante y sostenible.',
                    'precio' => 18000,
                    'cantidad_disponible' => 10,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morrroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'fique',
                    'color' => 'Verde Natural',
                ],
                [
                    'nombre' => 'Pañuelo de Hilos Delicados',
                    'descripcion' => 'Pañuelo tejido con hilos finos en patrones delicados, ideal para complementar tu atuendo.',
                    'precio' => 12000,
                    'cantidad_disponible' => 40,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'hilos',
                    'color' => 'Blanco',           
                ],
            ],
            ],
            [
                'email' => 'hector@cr.com',
                'productos' => [
                [
                    'nombre' => 'Sandalia de Cáñamo',
                    'descripcion' => 'Sandalia cómoda con suela tejida de fibras de cáñamo, capacidad de adaptación y confort.',
                    'precio' => 50000,
                    'cantidad_disponible' => 5,
                    'categoria' => 'madera',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'canamos',
                    'color' => 'Café Claro',
                ],
                [
                    'nombre' => 'Abanico de Paja Pintado',
                    'descripcion' => 'Abanico decorativo de paja con diseños pintados a mano, perfecto para el calor del Caribe.',
                    'precio' => 79000,
                    'cantidad_disponible' => 15,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Multicolor',
                    
                ],
                [
                    'nombre' => 'Taza de Cerámica Artesanal',
                    'descripcion' => 'Taza de cerámica moldeada y decorada a mano, hermosa para disfrutar de tus bebidas favoritas.',
                    'precio' => 29000,
                    'cantidad_disponible' => 90,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'ceramica',
                    'color' => 'Verde Claro',
                ],
            ],
            ],
            [
                'email' => 'yolanda@cr.com',
                'productos' => [
                [
                    'nombre' => 'Alfombra de Fique Pequeña',
                    'descripcion' => 'Alfombra pequeña tejida con fibras de fique resistente, ideal para decoración de espacios pequeños.',
                    'precio' => 79000,
                    'cantidad_disponible' => 15,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'fique',
                    'color' => 'Beige Oscuro',
                ],
                [
                    'nombre' => 'Collar de Hilos Artesanal',
                    'descripcion' => 'Hermoso collar decorativo tejido con hilos coloridos, espectacular para cualquier ocasión.',
                    'precio' => 10000,
                    'cantidad_disponible' => 36,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'hilos',
                    'color' => 'Turquesa',
                ],
                [
                    'nombre' => 'Delantal de Algodón Bordado',
                    'descripcion' => 'Delantal de cocina con bordados decorativos en algodón, el cual te brinda estilo y funcionalidad. Además de ser resistente y fácil de lavar.',
                    'precio' => 90000,
                    'cantidad_disponible' => 5,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'bordado',
                    'materia_prima' => 'algodon',
                    'color' => 'Rojo Claro',
                ],
            ],
            ],
            [
                'email' => 'miguel@cr.com',
                'productos' => [
                [
                    'nombre' => 'Sombrerito de Paja Infantil',
                    'descripcion' => 'Sombrero pequeño tejido especialmente para niños, con un diseño divertido y colorido. Ideal para proteger del sol mientras juegan y descubren nuevos mundos.',
                    'precio' => 79000,
                    'cantidad_disponible' => 32,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Rosa Claro',
                ],
                [
                    'nombre' => 'Cuenco de Cerámica Pequeño',
                    'descripcion' => 'Cuenco pequeño de cerámica para servir alimentos, con un acabado rústico y natural. Ideal para uso diario o decoración.',
                    'precio' => 20000,
                    'cantidad_disponible' => 1,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'ceramica',
                    'color' => 'Blanco Crema',
                ],
                [
                    'nombre' => 'Cartera de Fique Elegante',
                    'descripcion' => 'Cartera femenina tejida con fique en diseño elegante, te permitirá llevar tus pertenencias con estilo y sostenibilidad.',
                    'precio' => 30000,
                    'cantidad_disponible' => 40,
                    'categoria' => 'madera',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'fique',
                    'color' => 'Negro Elegante',
                ],
            ],

            ],
            [
                'email' => 'paola@cr.com',
                'productos' => [
                [
                    'nombre' => 'Alpargata de Cáñamo',
                    'descripcion' => 'Alpargata tradicional con suela de cáñamo trenzado, la que además tiene un estilo único, ideal para usarlas en tu día a día.',
                    'precio' => 100000,
                    'cantidad_disponible' => 1,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'canamos',
                    'color' => 'Crema Natural',
                ],
                [
                    'nombre' => 'Servilletero de Paja',
                    'descripcion' => 'Servilletero decorativo tejido con paja natural, el cual es ideal para decorar y darle un estilo único y original a tu mesa.',
                    'precio' => 29000,
                    'cantidad_disponible' => 89,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Amarillo Natural',
                ],
                [
                     'nombre' => 'Portavasos de Cáñamo',
                     'descripcion' => 'Set de portavasos resistentes tejidos con cáñamo, ideales para proteger tus superficies y añadir un toque rústico a tu hogar.',
                     'precio' => 20000,
                     'cantidad_disponible' => 15,
                     'categoria' => 'joyeria',
                     'municipio_venta' => 'morroa',
                     'tecnica_artesanal' => 'cosido',
                     'materia_prima' => 'canamos',
                     'color' => 'Verde Olivo',
                ],
            ],
            ],
            [
                'email' => 'ricardo@cr.com',
                'productos' => [
                [
                    'nombre' => 'Individual de Paja Mesa',
                    'descripcion' => 'Individual para mesa tejido con paja fina, ideal para proteger y decorar tu mesa de comedor. Además, es resistente y fácil de limpiar.',
                    'precio' => 8000,
                    'cantidad_disponible' => 70,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Café Natural',
                ],
                [
                    'nombre' => 'Alcancía de Cerámica',
                    'descripcion' => 'Alcancía decorativa moldeada y pintada a mano, útil para enseñar a los niños a ahorrar de una manera divertida y colorida.',
                    'precio' => 30000,
                    'cantidad_disponible' => 13,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'ceramica',
                    'color' => 'Rosa Pastel',
                ],
                [
                    'nombre' => 'Aretes de Hilos Coloridos',
                    'descripcion' => 'Aretes artesanales tejidos con hilos multicolores, perfectos para añadir un toque vibrante a tu atuendo diario.',
                    'precio' => 11000,
                    'cantidad_disponible' => 15,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'hilos',
                    'color' => 'Multicolor Vibrante',
                ],
            ],
            ],
            [
                 'email' => 'claudia@cr.com',
                'productos' => [
                [
                    'nombre' => 'Frutero de Paja Grande',
                    'descripcion' => 'Frutero grande tejido con paja para cocina, dale un toque natural y elegante a tu mesa con este hermoso frutero, ideal para exhibir tus frutas frescas.',
                    'precio' => 20000,
                    'cantidad_disponible' => 90,
                    'categoria' => 'madera',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Miel',
                ],
                [
                    'nombre' => 'Portarretratos de Cerámica',
                    'descripcion' => 'Marco portarretratos moldeado en cerámica decorativa, perfecto para resaltar tus fotos favoritas con un toque artesanal.',
                    'precio' => 20000,
                    'cantidad_disponible' => 11,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'ceramica',
                    'color' => 'Azul Cobalto',
                ],
                [
                    'nombre' => 'Tobillera de Fique',
                    'descripcion' => 'Tobillera decorativa tejida con fibras de fique, única y sostenible, ideal para complementar tu estilo diario.',
                    'precio' => 15000,
                    'cantidad_disponible' => 29,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'sampues',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'fique',
                    'color' => 'Verde Claro',
                ],
            ],

            ],
            [
                'email' => 'pedro@cr.com',
                'productos' => [
                [
                    'nombre' => 'Banda para Cabello de Hilos',
                    'descripcion' => 'Banda elástica para cabello tejida con hilos suaves, capaz de mantener tu peinado en su lugar con estilo y comodidad.',
                    'precio' => 9000,
                    'cantidad_disponible' => 15,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'materia_prima' => 'algodon',
                    'tecnica_artesanal' => 'telar horizontal',
                ],
                [
                    'nombre' => 'Camino de Mesa Bordado',
                    'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                    'precio' => 19000,
                    'cantidad_disponible' => 6,
                    'categoria' => 'tejido',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'algodon',
                    'color' => 'Verde Oliva',

                ],
                [
                    'nombre' => 'Maceta de Cerámica Pintada a Mano',
                    'descripcion' => 'Hecho a mano por artesanos locales, resistente y estético. Perfecto para regalar o embellecer espacios.',
                    'precio' => 29000,
                    'cantidad_disponible' => 7,
                    'categoria' => 'ceramica',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'algodon',
                    'color' => 'Terracota',

                ],
            ],
            ],
            [
                 'email' => 'luisa@cr.com',
                'productos' => [
                [
                    'nombre' => 'Cesta elaborada en Paja',
                    'descripcion' => 'Producto artesanal elaborado con técnicas tradicionales y materiales sostenibles. Ideal para decoración o uso diario.',
                    'precio' => 91700,
                    'cantidad_disponible' => 19,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'cosido',
                    'materia_prima' => 'canamos',
                    'color' => 'Terracota',
                ],
                [
                    'nombre' => 'Bolso de Hilo hecho a Mano',
                    'descripcion' => 'Diseño único y duradero. Cada pieza refleja la riqueza cultural y la destreza de su creador.',
                    'precio' => 72000,
                    'cantidad_disponible' => 8,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'bordado',
                    'materia_prima' => 'canamos',
                    'color' => 'Terracota',

                ],
                [
                    'nombre' => 'Tapete de Cáñamo Tejido',
                    'descripcion' => 'Diseño único y duradero. Cada pieza refleja la riqueza cultural y la destreza de su creador.',
                    'precio' => 113000,
                    'cantidad_disponible' => 20,
                    'categoria' => 'joyeria',
                    'municipio_venta' => 'morroa',
                    'tecnica_artesanal' => 'telar horizontal',
                    'materia_prima' => 'paja',
                    'color' => 'Terracota',

                ],
            ],
            ],
        ];

        foreach ($productos as $artesanoData) {
            $user = User::where('email', $artesanoData['email'])->first();

            if ($user) {
                foreach ($artesanoData['productos'] as $productoData) {
                    // Convertir categoria string a categoria_id
                    $categoriaString = $productoData['categoria'];
                    $categoriaId = $categoriaMap[$categoriaString] ?? null;
                    
                    // Remover el campo categoria y agregar categoria_id
                    unset($productoData['categoria']);
                    $productoData['categoria_id'] = $categoriaId;
                    
                    Producto::create(array_merge($productoData, [
                        'user_id' => $user->id,
                    ]));
                }
            }
        }
    }
}
