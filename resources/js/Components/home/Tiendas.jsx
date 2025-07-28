import React, { useState } from "react";
import { Link } from '@inertiajs/react';

const Tiendas = ({ tiendas = [] }) => {
  const [verTodas, setVerTodas] = useState(false);

  const tiendasParaMostrar = verTodas ? tiendas : tiendas.slice(0, 3);

  return (
    <div className="px-6 py-10 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {tiendasParaMostrar.map((tienda, index) => (
          <div
            key={tienda.id || index}
            className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl p-6 flex items-start gap-4 border border-gray-100"
          >
            <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden flex items-center justify-center relative mr-4">
              {tienda.foto_perfil ? (
                <img
                  src={`/storage/${tienda.foto_perfil}`}
                  alt={tienda.nombre}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-3xl font-medium text-gray-600">
                  {tienda.nombre ? tienda.nombre.charAt(0) : '?'}
                </span>
              )}
            </div>
            <div className="w-full">
              <h3 className="text-xl font-semibold text-gray-800 mb-1">{tienda.nombre}</h3>
              <p className="text-sm text-gray-500 mt-2">
                Artesano: <span className="font-medium">{tienda.user ? `${tienda.user.name} ${tienda.user.last_name || ''}` : 'Sin artesano'}</span> | {tienda.municipio_venta}
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

      {!verTodas && tiendas.length > 3 && (
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
