import React, { useState } from "react";

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
    nombre: "Canasto Artesanal para Lámpara",
    descripcion: "Tejido a mano en fibras naturales",
    precio: 120000,
    imagenes: [prod1img1, prod1img2],
  },
  
  {
    nombre: "Manilla Tejida a Mano",
    descripcion: "Colorida y elaborada con hilos resistentes",
    precio: 95000,
    imagenes: [prod2img1, prod2img2],
  },
  {
    nombre: "Hamaca Artesanal",
    descripcion: "Práctica y auténtica, tejida a mano.",
    precio: 85000,
    imagenes: [prod3img1, prod3img2],
  },
  {
    nombre: "Sombrero Vueltiao Tradicional",
    descripcion: "Tejido a mano con caña flecha.",
    precio: 45000,
    imagenes: [prod4img1, prod4img2],
  },
  {
    nombre: "Adornos para mesas",
    descripcion: "Conjunto de adornos tejidos que embellecen tu hogar.",
    precio: 40000,
    imagenes: [prod5img1, prod5img2],
  },
  {
    nombre: "Mochila Tejida",
    descripcion: "Diseño tradicional, tejida con amor por artesanas locales",
    precio: 30000,
    imagenes: [prod6img1, prod6img2],
  },
  {
    nombre: "Mochila Artesanal de Hilo",
    descripcion: "Ligera, colorida y tejida a mano con diseños únicos",
    precio: 65000,
    imagenes: [prod7img1, prod7img2],
  },
  {
    nombre: "Canasta de picnic artesanal",
    descripcion: "Canasta tejida ideal para salidas al aire libre.",
    precio: 70000,
    imagenes: [prod8img1, prod8img2],
  },
  {
    nombre: "Loro Artesanal en Madera",
    descripcion: "Tallado y pintado a mano, con detalles vibrantes",
    precio: 60000,
    imagenes: [prod9img1, prod9img2],
  },
  {
    nombre: "Sobremesa artesanal",
    descripcion: "Elemento decorativo hecho a mano para realzar.",
    precio: 60000,
    imagenes: [prod10img1, prod10img2],
  },
  {
    nombre: " Centro de Mesa con Tejido Artesanal",
    descripcion: "Hecho a mano con detalles finos.",
    precio: 60000,
    imagenes: [prod11img1, prod11img2],
  },
  {
    nombre: "Mochila Tradicional",
    descripcion: "Tejido firme y elegante.",
    precio: 60000,
    imagenes: [prod12img1, prod12img2],
  },
];

// ...importaciones

const ProductGallery = () => {
  const [selected, setSelected] = useState(null);
  const [imgIndex, setImgIndex] = useState(0);
  const [verTodos, setVerTodos] = useState(false);

  const closeModal = () => {
    setSelected(null);
    setImgIndex(0);
  };

  const nextImg = () =>
    setImgIndex((prev) => (prev + 1) % selected.imagenes.length);

  const prevImg = () =>
    setImgIndex((prev) => (prev - 1 + selected.imagenes.length) % selected.imagenes.length);

  const handleBuy = (producto) => {
    alert(`Comprando: ${producto.nombre}`);
    // Aquí puedes redirigir o abrir un checkout
  };

  const productosAMostrar = verTodos ? productos : productos.slice(0, 4);

  return (
    <>
    <br />
<div className="mb-6 flex flex-wrap gap-10 justify-center">
  {/* Filtro por Municipio */}
  <div className="flex flex-col w-80">
    <label className="mb-1 text-sm font-semibold text-gray-700">Municipio</label>
    <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]">
      <option value="">Todos los municipios</option>
      <option value="Morroa">Morroa</option>
      <option value="Sampués">Sampués</option>
    </select>
  </div>

  {/* Filtro por Categoría */}
  <div className="flex flex-col w-80">
    <label className="mb-1 text-sm font-semibold text-gray-700">Categoría</label>
    <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]">
      <option value="">Todas las categorías</option>
      <option value="ropa">Ropa</option>
      <option value="joyería">Joyería</option>
      <option value="electrónica">Electrónica</option>
    </select>
  </div>

  {/* Filtro por Precio */}
  <div className="flex flex-col w-80">
    <label className="mb-1 text-sm font-semibold text-gray-700">Rango de precios</label>
    <select className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]">
      <option value="ropa">5.000 - 10.000</option>
      <option value="joyería">10.000 - 50.000</option>
      <option value="electrónica">50.000 - 100.000</option>
      <option value="electrónica">100.000 - 200.000</option>
      <option value="electrónica">Más de 200.000</option>
    </select>
  </div>
</div>


      <div className="grid grid-cols-1 lg:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 xl:grid-cols-4 gap-6 p-6">
        {productosAMostrar.map((prod, index) => (
          <Prod
            key={index}
            producto={prod}
            onClick={() => {
              setSelected(prod);
              setImgIndex(0);
            }}
            onBuy={() => handleBuy(prod)}
          />
        ))}
      </div>

      {!verTodos && (
        <div className="flex justify-center mb-8">
          <button
            onClick={() => setVerTodos(true)}
            className="px-4 py-2 bg-[#4B3A3A] text-white rounded hover:bg-[#2B1F1F]"
          >
            Ver más productos
          </button>
        </div>
      )}

      {/* Modal de los productos */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl p-10 w-full max-w-5xl relative shadow-2xl border border-gray-200">
            <button
              onClick={closeModal}
              className="absolute top-4 right-6 text-3xl font-bold text-gray-400 hover:text-[#2B1F1F] transition"
              aria-label="Cerrar"
            >
              ×
            </button>

            <div className="flex flex-col md:flex-row gap-10 items-center mb-6">
              <div className="flex flex-col items-center min-w-[340px]">
                <div className="flex items-center mb-3">
                  <button onClick={prevImg} className="text-2xl font-bold text-gray-400 hover:text-[#4B3A3A] px-2 py-1 rounded-full transition">‹</button>
                  <img
                    src={selected.imagenes[imgIndex]}
                    alt="Producto"
                    className="w-96 h-80 object-contain mx-2 rounded-xl"
                  />
                  <button onClick={nextImg} className="text-2xl font-bold text-gray-400 hover:text-[#4B3A3A] px-2 py-1 rounded-full transition">›</button>
                </div>
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
              </div>
              <div className="flex-1 w-full max-w-xl">
                <h2 className="text-3xl font-extrabold mb-3 text-[#2B1F1F]">{selected.nombre}</h2>
                <p className="text-gray-700 mb-4 text-lg">{selected.descripcion}</p>
                <p className="text-[#4B3A3A] font-bold text-3xl mb-8">
                  ${selected.precio.toLocaleString()}
                </p>
                <div className="flex flex-col md:flex-wrap items-center gap-3 md:flex-row md:gap-6">
                  <button
                    onClick={() => alert('Agregado al carrito: ' + selected.nombre)}
                    className="min-w-[140px] h-12 px-4 bg-[#F7C873] text-[#2B1F1F] font-semibold rounded-lg shadow hover:bg-[#f5b94a] transition text-base"
                  >
                    Agregar al carrito
                  </button>
                  <button
                    onClick={() => alert('Ver ruta de: ' + selected.nombre)}
                    className="min-w-[140px] h-12 px-4 bg-[#4B3A3A] text-white font-semibold rounded-lg shadow hover:bg-[#2B1F1F] transition text-base"
                  >
                    Ver ruta
                  </button>
                  <button
                    onClick={() => handleBuy(selected)}
                    className="min-w-[140px] h-12 px-4 bg-[#2B1F1F] text-white font-semibold rounded-lg shadow hover:bg-[#4B3A3A] transition text-base"
                  >
                    Comprar
                  </button>
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
const Prod = ({ producto, onClick, onBuy }) => {
  return (
    <div className="p-4 bg-white shadow rounded-xl w-full hover:shadow-lg transition-all duration-300 hover:-translate-y-2 ">
      <img
        src={producto.imagenes[0]}
        alt={producto.nombre}
        className="w-full h-48 object-contain rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold mb-1">{producto.nombre}</h2>
      <p className="text-gray-600 mb-2">{producto.descripcion}</p>
      <p className="text-gray-800 font-semibold mb-4">
        ${producto.precio.toLocaleString()}
      </p>
      <div className="flex flex-wrap justify-center space-x-2">
        <button
          onClick={onBuy}
          className="p-2 text-sm bg-[#2B1F1F] text-white rounded hover:bg-[#4B3A3A]"
        >
          Comprar
        </button>
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

export default ProductGallery;