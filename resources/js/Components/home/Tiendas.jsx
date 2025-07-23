import React, { useState } from "react";
import { Link } from '@inertiajs/react';


// Imágenes de las tiendas
import tienda1 from "../../../media/tiendas/1.jpg";
import tienda2 from "../../../media/tiendas/2.jpg";
import tienda3 from "../../../media/tiendas/3.jpg";
import tienda4 from "../../../media/tiendas/4.jpg";
import tienda5 from "../../../media/tiendas/5.jpg";

const todasLasTiendas = [
  {
    imagen: tienda1,
    nombre: "Tienda Artesanal Sol",
    descripcion: "Arte con alma y tradición",
    artesano: "Ana Pérez",
    ubicacion: "Morroa"
  },
  {
    imagen: tienda2,
    nombre: "Colores de Sampués",
    descripcion: "Tejidos que cuentan historias",
    artesano: "Luis Mendoza",
    ubicacion: "Sampués"
  },
  {
    imagen: tienda3,
    nombre: "Raíces Vivas",
    descripcion: "Cultura en cada detalle",
    artesano: "Marta Torres",
    ubicacion: "Morroa"
  },
  {
    imagen: tienda4,
    nombre: "Manos Doradas",
    descripcion: "Creaciones llenas de identidad",
    artesano: "Carlos Díaz",
    ubicacion: "Sampués"
  },
  {
    imagen: tienda5,
    nombre: "Encanto Artesanal",
    descripcion: "Tradición hecha a mano",
    artesano: "Lucía Gómez",
    ubicacion: "Morroa"
  },
  {
    imagen: tienda1,
    nombre: "Saberes de Mi Tierra",
    descripcion: "Productos con historia",
    artesano: "Javier López",
    ubicacion: "Sampués"
  },
  {
    imagen: tienda2,
    nombre: "Tejido Ancestral",
    descripcion: "Diseños que perduran",
    artesano: "Rosa Martínez",
    ubicacion: "Morroa"
  },
  {
    imagen: tienda3,
    nombre: "Arte y Origen",
    descripcion: "Pasión hecha artesanía",
    artesano: "Esteban Herrera",
    ubicacion: "Sampués"
  },
  {
    imagen: tienda4,
    nombre: "Luz de Barro",
    descripcion: "Tierra, manos y cultura",
    artesano: "María Fernanda",
    ubicacion: "Morroa"
  }
];

const Tiendas = () => {
  const [verTodas, setVerTodas] = useState(false);

  const tiendasParaMostrar = verTodas ? todasLasTiendas : todasLasTiendas.slice(0, 3);

  return (
<div className="px-6 py-10 bg-gray-50">
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
    {tiendasParaMostrar.map((tienda, index) => (
      <div
        key={index}
        className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl p-6 flex items-start gap-4 border border-gray-100"
      >
        <img
          src={tienda.imagen}
          alt={tienda.nombre}
          className="w-16 h-16 object-cover rounded-full shrink-0"
        />
        <div className="w-full">
          <h3 className="text-xl font-semibold text-gray-800 mb-1">{tienda.nombre}</h3>
          <p className="text-sm text-gray-600">{tienda.descripcion}</p>
          <p className="text-sm text-gray-500 mt-2">
            Artesano: <span className="font-medium">{tienda.artesano}</span> |{" "}
            {tienda.ubicacion}
          </p>
          <div className="mt-4 text-center">
            <Link
              href={route('blog')}
              className="inline-block mt-4 px-4 py-2 no-underline bg-[#2B1F1F] text-white rounded hover:bg-[#3e2f2f] transition"
            >
              Ver tienda
            </Link>
          </div>
        </div>
      </div>
    ))}
  </div>

  {!verTodas && (
    <div className="mt-10 text-center">
      <button
        onClick={() => setVerTodas(true)}
        className="px-6 py-2 bg-[#2B1F1F] text-white rounded hover:bg-[#3e2f2f] transition"
      >
        Ver más
      </button>
    </div>
  )}
</div>

  );
};

export default Tiendas;
