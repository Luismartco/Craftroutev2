import React, { useState, useRef } from "react";
import { useCart } from '../../Contexts/CartContext';

// Importa imágenes
import prod1img1 from "../../../media/Products/producto1/1.jpeg";
import prod1img2 from "../../../media/Products/producto1/2.jpeg";


import prod2img1 from "../../../media/Products/producto2/1.jpg";
import prod2img2 from "../../../media/Products/producto2/2.jpg";
//import prod2img3 from "../../../media/Products/producto2/3.jpeg";
//import prod2img4 from "../../../media/Products/producto2/4.jpeg";
//import prod2img5 from "../../../media/Products/producto2/5.jpeg";

import prod3img1 from "../../../media/Products/producto3/1.jpg";
import prod3img2 from "../../../media/Products/producto3/2.jpg";
//import prod3img3 from "../../../media/Products/producto3/3.jpeg";
//import prod3img4 from "../../../media/Products/producto3/4.jpeg";
//import prod3img5 from "../../../media/Products/producto3/5.jpeg";

import prod4img1 from "../../../media/Products/producto4/1.jpeg";
import prod4img2 from "../../../media/Products/producto4/2.jpeg";
//import prod4img3 from "../../../media/Products/producto4/3.jpeg";
//import prod4img4 from "../../../media/Products/producto4/4.jpeg";
//import prod4img5 from "../../../media/Products/producto4/5.jpeg";

import prod5img1 from "../../../media/Products/producto5/1.jpg";
import prod5img2 from "../../../media/Products/producto5/2.jpeg";
//import prod5img3 from "../../../media/Products/producto5/3.jpeg";
//import prod5img4 from "../../../media/Products/producto5/4.jpeg";
//import prod5img5 from "../../../media/Products/producto5/5.jpeg";

import prod6img1 from "../../../media/Products/producto6/1.png";
import prod6img2 from "../../../media/Products/producto6/2.png";
//import prod6img3 from "../../../media/Products/producto6/3.jpeg";
//import prod6img4 from "../../../media/Products/producto6/4.jpeg";
//import prod6img5 from "../../../media/Products/producto6/5.jpeg";

import prod7img1 from "../../../media/Products/producto7/1.jpg";
import prod7img2 from "../../../media/Products/producto7/2.jpeg";
//import prod7img3 from "../../../media/Products/producto7/3.jpeg";
//import prod7img4 from "../../../media/Products/producto7/4.jpeg";
//import prod7img5 from "../../../media/Products/producto7/5.jpeg";

import prod8img1 from "../../../media/Products/producto8/1.png";
import prod8img2 from "../../../media/Products/producto8/2.png";
//import prod8img3 from "../../../media/Products/producto8/3.jpeg";
//import prod8img4 from "../../../media/Products/producto8/4.jpeg";
//import prod8img5 from "../../../media/Products/producto8/5.jpeg";

import prod9img1 from "../../../media/Products/producto9/1.jpg";
import prod9img2 from "../../../media/Products/producto9/2.jpg";
//import prod9img3 from "../../../media/Products/producto9/3.jpeg";
//import prod9img4 from "../../../media/Products/producto9/4.jpeg";
//import prod9img5 from "../../../media/Products/producto9/5.jpeg";


import prod10img1 from "../../../media/Products/producto10/1.png";
import prod10img2 from "../../../media/Products/producto10/2.png";


import prod11img1 from "../../../media/Products/producto11/1.png";
import prod11img2 from "../../../media/Products/producto11/2.png";

import prod12img1 from "../../../media/Products/producto12/1.jpeg";
import prod12img2 from "../../../media/Products/producto12/2.jpeg";


const productos = [
  {
    id: 1,
    nombre: "Canasto Artesanal para Lámpara",
    descripcion: "Tejido a mano en fibras naturales",
    precio: 120000,
    imagenes: [prod1img1, prod1img2],
  },
  
  {
    id: 2,
    nombre: "Manilla Tejida a Mano",
    descripcion: "Colorida y elaborada con hilos resistentes",
    precio: 95000,
    imagenes: [prod2img1, prod2img2],
  },
  {
    id: 3,
    nombre: "Hamaca Artesanal",
    descripcion: "Práctica y auténtica, tejida a mano.",
    precio: 85000,
    imagenes: [prod3img1, prod3img2],
  },
  {
    id: 4,
    nombre: "Sombrero Vueltiao Tradicional",
    descripcion: "Tejido a mano con caña flecha.",
    precio: 45000,
    imagenes: [prod4img1, prod4img2],
  },
  {
    id: 5,
    nombre: "Adornos para mesas",
    descripcion: "Conjunto de adornos tejidos que embellecen tu hogar.",
    precio: 40000,
    imagenes: [prod5img1, prod5img2],
  },
  {
    id: 6,
    nombre: "Mochila Tejida",
    descripcion: "Diseño tradicional, tejida con amor por artesanas locales",
    precio: 30000,
    imagenes: [prod6img1, prod6img2],
  },
  {
    id: 7,
    nombre: "Mochila Artesanal de Hilo",
    descripcion: "Ligera, colorida y tejida a mano con diseños únicos",
    precio: 65000,
    imagenes: [prod7img1, prod7img2],
  },
  {
    id: 8,
    nombre: "Canasta de picnic artesanal",
    descripcion: "Canasta tejida ideal para salidas al aire libre.",
    precio: 70000,
    imagenes: [prod8img1, prod8img2],
  },
  {
    id: 9,
    nombre: "Loro Artesanal en Madera",
    descripcion: "Tallado y pintado a mano, con detalles vibrantes",
    precio: 60000,
    imagenes: [prod9img1, prod9img2],
  },
  {
    id: 10,
    nombre: "Sobremesa artesanal",
    descripcion: "Elemento decorativo hecho a mano para realzar.",
    precio: 60000,
    imagenes: [prod10img1, prod10img2],
  },
  {
    id: 11,
    nombre: " Centro de Mesa con Tejido Artesanal",
    descripcion: "Hecho a mano con detalles finos.",
    precio: 60000,
    imagenes: [prod11img1, prod11img2],
  },
  {
    id: 12,
    nombre: "Mochila Tradicional",
    descripcion: "Tejido firme y elegante.",
    precio: 60000,
    imagenes: [prod12img1, prod12img2],
  },
];

// ...importaciones


const CATEGORIAS = [
  { value: '', label: 'Todas las categorías' },
  { value: 'tejido', label: 'Tejido' },
  { value: 'madera', label: 'Madera' },
  { value: 'ceramica', label: 'Cerámica' },
  { value: 'joyeria', label: 'Joyería' },
];
const MUNICIPIOS = [
  { value: '', label: 'Todos los municipios' },
  { value: 'morroa', label: 'Morroa' },
  { value: 'sampues', label: 'Sampues' },
];
const RANGOS_PRECIOS = [
  { value: '', label: 'Todos los precios' },
  { value: '0-10000', label: 'Hasta $10.000' },
  { value: '10001-50000', label: '$10.001 - $50.000' },
  { value: '50001-100000', label: '$50.001 - $100.000' },
  { value: '100001-200000', label: '$100.001 - $200.000' },
  { value: '200001-', label: 'Más de $200.000' },
];

const Prod = ({ producto, onClick, onBuy, user }) => {
   const isCustomer = user && user.role === 'customer';
   const isLogged = !!user;
   let img = '';
   if (producto.imagenes && producto.imagenes.length > 0) {
     if (typeof producto.imagenes[0] === 'string') {
       img = `/storage/${producto.imagenes[0]}`;
     } else {
       img = producto.imagenes[0].ruta_imagen ? `/storage/${producto.imagenes[0].ruta_imagen}` : '';
     }
   }
   const showAddToCart = !isLogged || isCustomer;

   // Función para formatear precio
   const formatPrice = (price) => {
     if (!price) return '$0';
     return new Intl.NumberFormat('es-CO', {
       style: 'currency',
       currency: 'COP',
       minimumFractionDigits: 0,
       maximumFractionDigits: 0,
     }).format(price);
   };

   return (
     <div className="p-4 bg-white shadow rounded-xl w-64 hover:shadow-lg transition-all duration-300 hover:-translate-y-2 flex-shrink-0">
       {img && (
         <img
           src={img}
           alt={producto.nombre}
           className="w-full h-48 object-contain rounded-lg mb-4"
         />
       )}
       <h2 className="text-lg font-bold mb-1">{producto.nombre}</h2>
       <p className="text-sm text-gray-500 mt-2">
         Artesano: <span className="font-medium">{producto.user ? `${producto.user.name} ${producto.user.last_name || ''}` : 'Sin artesano'}</span> | {producto.municipio_venta}
       </p>
       <p className="text-gray-800 font-semibold mb-4">
         {formatPrice(producto.precio)}
       </p>
      <div className="flex flex-row justify-center gap-2">
        {showAddToCart && (
          <button
            onClick={() => {
              if (!isLogged) {
                alert('Debes iniciar sesión para poder adquirir el artículo.');
              } else if (isCustomer) {
                onBuy();
              }
            }}
            className="p-2 text-sm bg-[#2B1F1F] text-white rounded hover:bg-[#4B3A3A]"
          >
            Agregar al carrito
          </button>
        )}
        <button
          onClick={onClick}
          className="p-2 text-sm bg-[#4B3A3A] text-white rounded hover:bg-[#2B1F1F]"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

const ProductGallery = ({ productos = [], user }) => {
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [categoria, setCategoria] = useState('');
  const [municipio, setMunicipio] = useState('');
  const [rangoPrecio, setRangoPrecio] = useState('');
  const scrollRef = useRef(null);

  // Usar el contexto global del carrito
  const { addToCart } = useCart();

  // Función para formatear precio
  const formatPrice = (price) => {
    if (!price) return '$0';
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price);
  };

  // Ordenar productos de más nuevo a más antiguo (por id descendente)
  const productosOrdenados = [...productos].sort((a, b) => b.id - a.id);

  // Filtrado conjunto
  let productosFiltrados = productosOrdenados.filter((prod) => {
    let ok = true;
    if (categoria && prod.categoria !== categoria) ok = false;
    if (municipio && prod.municipio_venta !== municipio) ok = false;
    if (rangoPrecio) {
      const [min, max] = rangoPrecio.split('-');
      const precio = Number(prod.precio);
      if (min && precio < Number(min)) ok = false;
      if (max && max !== '' && precio > Number(max)) ok = false;
    }
    return ok;
  });

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -280, behavior: 'smooth' });
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 280, behavior: 'smooth' });
    }
  };

  return (
    <>
      <br />
      <div className="mb-6 flex flex-wrap gap-10 justify-center">
        {/* Filtro por Municipio */}
        <div className="flex flex-col w-80">
          <label className="mb-1 text-sm font-semibold text-gray-700">Municipio</label>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
            value={municipio}
            onChange={e => setMunicipio(e.target.value)}
          >
            {MUNICIPIOS.map(m => (
              <option key={m.value} value={m.value}>{m.label}</option>
            ))}
          </select>
        </div>
        {/* Filtro por Categoría */}
        <div className="flex flex-col w-80">
          <label className="mb-1 text-sm font-semibold text-gray-700">Categoría</label>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
            value={categoria}
            onChange={e => setCategoria(e.target.value)}
          >
            {CATEGORIAS.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
        </div>
        {/* Filtro por Precio */}
        <div className="flex flex-col w-80">
          <label className="mb-1 text-sm font-semibold text-gray-700">Rango de precios</label>
          <select
            className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
            value={rangoPrecio}
            onChange={e => setRangoPrecio(e.target.value)}
          >
            {RANGOS_PRECIOS.map(r => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="relative p-6">
        {productosFiltrados.length > 4 && (
          <>
            <button
              onClick={scrollLeft}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 z-10 bg-white text-[#4B3A3A] p-6 text-3xl rounded-full shadow-lg border-2 border-[#4B3A3A]"
              aria-label="Scroll left"
            >
              ‹
            </button>
            <button
              onClick={scrollRight}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 z-10 bg-white text-[#4B3A3A] p-6 text-3xl rounded-full shadow-lg border-2 border-[#4B3A3A]"
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
          {productosFiltrados.map((prod, index) => (
            <Prod
              key={prod.id || index}
              producto={prod}
              user={user}
              onClick={() => {
                setSelected(prod);
                setImgIndex(0);
              }}
              onBuy={() => addToCart(prod)}
            />
          ))}
        </div>
      </div>

      {/* Modal de los productos */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 w-full max-w-5xl relative shadow-2xl border border-gray-200">
            <button
              onClick={() => {
                setSelected(null);
                setImgIndex(0);
              }}
              className="absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-[#2B1F1F] transition"
              aria-label="Cerrar"
            >
              ×
            </button>
            <div className="flex flex-col md:flex-row gap-10 items-center mb-6">
              <div className="flex flex-col items-center min-w-[340px]">
                <div className="flex items-center mb-3">
                  {selected.imagenes && selected.imagenes.length > 0 && (
                    <>
                      <button onClick={() => setImgIndex((prev) => (prev - 1 + selected.imagenes.length) % selected.imagenes.length)} className="text-2xl font-bold text-gray-400 hover:text-[#4B3A3A] px-2 py-1 rounded-full transition">‹</button>
                      <img
                        src={typeof selected.imagenes[imgIndex] === 'string' ? `/storage/${selected.imagenes[imgIndex]}` : `/storage/${selected.imagenes[imgIndex].ruta_imagen}`}
                        alt="Producto"
                        className="w-96 h-80 object-contain mx-2 rounded-xl"
                      />
                      <button onClick={() => setImgIndex((prev) => (prev + 1) % selected.imagenes.length)} className="text-2xl font-bold text-gray-400 hover:text-[#4B3A3A] px-2 py-1 rounded-full transition">›</button>
                    </>
                  )}
                  {(!selected.imagenes || selected.imagenes.length === 0) && (
                    <div className="w-96 h-80 flex items-center justify-center bg-gray-100 rounded-xl text-gray-400">Sin imagen</div>
                  )}
                </div>
                {selected.imagenes && selected.imagenes.length > 1 && (
                  <div className="flex gap-2 mt-2">
                    {selected.imagenes.map((img, idx) => (
                      <button
                        key={idx}
                        onClick={() => setImgIndex(idx)}
                        className={`w-4 h-4 rounded-full border-2 ${imgIndex === idx ? 'bg-[#4B3A3A] border-[#4B3A3A]' : 'bg-gray-200 border-gray-300'} transition`}
                        aria-label={`Ver imagen ${idx + 1}`}
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex-1 w-full max-w-xl">
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-20 w-20 rounded-full bg-gray-100 shadow-lg overflow-hidden flex items-center justify-center flex-shrink-0">
                    {selected.user?.foto_perfil ? (
                      <img
                        src={`/storage/${selected.user.foto_perfil}`}
                        alt={selected.user.name}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <span className="text-3xl font-medium text-gray-600">
                        {selected.user?.name ? selected.user.name.charAt(0) : '?'}
                      </span>
                    )}
                  </div>
                  <div>
                    <h2 className="text-3xl font-extrabold mb-3 text-[#2B1F1F]">{selected.nombre || 'Sin nombre'}</h2>
                    <p className="text-gray-700 mb-4 text-lg">{selected.descripcion || 'Sin descripción'}</p>
                    <p className="text-[#4B3A3A] font-bold text-3xl mb-6">
                      {formatPrice(selected.precio) || '$0'}
                    </p>
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <div>
                    <p className="text-sm text-gray-500">Tienda</p>
                    <p className="font-medium capitalize">{selected.user?.tienda?.nombre || 'Sin tienda'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Artesano</p>
                    <p className="font-medium capitalize">{selected.user?.name || 'Sin artesano'} {selected.user?.last_name || ''}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Cantidad Disponible</p>
                    <p className="font-medium">{selected.cantidad_disponible || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Técnica Artesanal</p>
                    <p className="font-medium capitalize">{selected.tecnica?.nombre || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Materia Prima</p>
                    <p className="font-medium capitalize">{selected.material?.nombre || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-medium capitalize">{selected.color || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Municipio de Venta</p>
                    <p className="font-medium capitalize">{selected.municipio_venta || 'No especificado'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Categoría</p>
                    <p className="font-medium capitalize">{selected.categoria?.nombre || 'No especificado'}</p>
                  </div>
                </div>
                <div className="flex flex-col md:flex-wrap items-center gap-3 md:flex-row md:gap-6">
                  {user && user.role === 'customer' && (
                    <button
                      onClick={() => addToCart(selected)}
                      className="min-w-[140px] h-12 px-4 bg-[#F7C873] text-[#2B1F1F] font-semibold rounded-lg shadow hover:bg-[#f5b94a] transition text-base"
                    >
                      Agregar al carrito
                    </button>
                  )}
                  {!user && (
                    <button
                      onClick={() => alert('Debes iniciar sesión para poder adquirir el artículo.')}
                      className="min-w-[140px] h-12 px-4 bg-[#F7C873] text-[#2B1F1F] font-semibold rounded-lg shadow hover:bg-[#f5b94a] transition text-base"
                    >
                      Agregar al carrito
                    </button>
                  )}
                  <button
                    onClick={() => alert('Ver ruta de: ' + selected.nombre)}
                    className="min-w-[140px] h-12 px-4 bg-[#4B3A3A] text-white font-semibold rounded-lg shadow hover:bg-[#2B1F1F] transition text-base"
                  >
                    Ver ruta
                  </button>
               {/*<button
                    onClick={() => handleBuy(selected)}
                    className="min-w-[140px] h-12 px-4 bg-[#2B1F1F] text-white font-semibold rounded-lg shadow hover:bg-[#4B3A3A] transition text-base"
                  >
                    Comprar
                  </button>*/}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

// Actualiza el componente Prod con los botones en orden invertido
// Hook useCartModal eliminado - ahora se usa el contexto global CartContext

export default ProductGallery;