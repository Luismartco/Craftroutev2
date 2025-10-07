import React, { useRef } from "react";
import { Link } from '@inertiajs/react';

const Tiendas = ({ tiendas = [] }) => {
  const scrollRef = useRef(null);

  const slugify = (text) =>
    text
      ?.toString()
      .toLowerCase()
      .normalize('NFD').replace(/\p{Diacritic}+/gu, '')
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -320, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 320, behavior: 'smooth' });
    }
  };

  return (
    <div className="px-6 py-10 bg-gray-50 relative">
      {tiendas.length > 3 && (
        <>
          <button
            onClick={scrollLeft}
            className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white text-[#2B1F1F] p-6 text-3xl rounded-full shadow-lg border-2 border-[#2B1F1F]"
            aria-label="Scroll left"
          >
            ‹
          </button>
          <button
            onClick={scrollRight}
            className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white text-[#2B1F1F] p-6 text-3xl rounded-full shadow-lg border-2 border-[#2B1F1F]"
            aria-label="Scroll right"
          >
            ›
          </button>
        </>
      )}
      <div
        ref={scrollRef}
        className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide"
        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
      >
        {tiendas.map((tienda, index) => (
          <div
            key={tienda.id || index}
            className="bg-white shadow-md hover:shadow-xl transition-shadow rounded-xl p-6 flex items-start gap-4 border border-gray-100 flex-shrink-0 w-80"
          >
            <div className="h-20 w-20 rounded-full bg-gray-100 shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0">
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
                  href={route('blog.show', slugify(tienda.nombre || ''))}
                  className="inline-block mt-4 px-4 py-2 no-underline bg-[#2B1F1F] text-white rounded hover:bg-[#3e2f2f] transition"
                >
                  Ver tienda
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Tiendas;