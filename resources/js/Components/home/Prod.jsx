import React, { useState } from "react";

// Importa imágenes (como ya lo hiciste)
import prod1img1 from "../../../media/Products/producto1/1.jpeg";
import prod1img2 from "../../../media/Products/producto1/2.jpeg";
import prod1img3 from "../../../media/Products/producto1/3.jpeg";
import prod1img4 from "../../../media/Products/producto1/4.jpeg";
import prod1img5 from "../../../media/Products/producto1/5.jpeg";

import prod2img1 from "../../../media/Products/producto2/1.jpeg";
import prod2img2 from "../../../media/Products/producto2/2.jpeg";
import prod2img3 from "../../../media/Products/producto2/3.jpeg";
import prod2img4 from "../../../media/Products/producto2/4.jpeg";
import prod2img5 from "../../../media/Products/producto2/5.jpeg";

import prod3img1 from "../../../media/Products/producto3/1.jpeg";
import prod3img2 from "../../../media/Products/producto3/2.jpeg";
import prod3img3 from "../../../media/Products/producto3/3.jpeg";
import prod3img4 from "../../../media/Products/producto3/4.jpeg";
import prod3img5 from "../../../media/Products/producto3/5.jpeg";

import prod4img1 from "../../../media/Products/producto4/1.jpeg";
import prod4img2 from "../../../media/Products/producto4/2.jpeg";
import prod4img3 from "../../../media/Products/producto4/3.jpeg";
import prod4img4 from "../../../media/Products/producto4/4.jpeg";
import prod4img5 from "../../../media/Products/producto4/5.jpeg";

import prod5img1 from "../../../media/Products/producto5/1.jpeg";
import prod5img2 from "../../../media/Products/producto5/2.jpeg";
import prod5img3 from "../../../media/Products/producto5/3.jpeg";
import prod5img4 from "../../../media/Products/producto5/4.jpeg";
import prod5img5 from "../../../media/Products/producto5/5.jpeg";

import prod6img1 from "../../../media/Products/producto6/1.jpeg";
import prod6img2 from "../../../media/Products/producto6/2.jpeg";
import prod6img3 from "../../../media/Products/producto6/3.jpeg";
import prod6img4 from "../../../media/Products/producto6/4.jpeg";
import prod6img5 from "../../../media/Products/producto6/5.jpeg";

import prod7img1 from "../../../media/Products/producto7/1.jpeg";
import prod7img2 from "../../../media/Products/producto7/2.jpeg";
import prod7img3 from "../../../media/Products/producto7/3.jpeg";
import prod7img4 from "../../../media/Products/producto7/4.jpeg";
import prod7img5 from "../../../media/Products/producto7/5.jpeg";

import prod8img1 from "../../../media/Products/producto8/1.jpeg";
import prod8img2 from "../../../media/Products/producto8/2.jpeg";
import prod8img3 from "../../../media/Products/producto8/3.jpeg";
import prod8img4 from "../../../media/Products/producto8/4.jpeg";
import prod8img5 from "../../../media/Products/producto8/5.jpeg";

import prod9img1 from "../../../media/Products/producto9/1.jpeg";
import prod9img2 from "../../../media/Products/producto9/2.jpeg";
import prod9img3 from "../../../media/Products/producto9/3.jpeg";
import prod9img4 from "../../../media/Products/producto9/4.jpeg";
import prod9img5 from "../../../media/Products/producto9/5.jpeg";

const productos = [
  {
    nombre: "Hamaca Wayuu",
    descripcion: "Tejida a mano por artesanos Wayuu.",
    precio: 120000,
    imagenes: [prod1img1, prod1img2, prod1img3, prod1img4, prod1img5],
  },
  {
    nombre: "Sombrero Vueltiao",
    descripcion: "Auténtico sombrero de caña flecha.",
    precio: 95000,
    imagenes: [prod2img1, prod2img2, prod2img3, prod2img4, prod2img5],
  },
  {
    nombre: "Mochila Wayuu",
    descripcion: "Mochila colorida de uso diario.",
    precio: 85000,
    imagenes: [prod3img1, prod3img2, prod3img3, prod3img4, prod3img5],
  },
  {
    nombre: "Sobremesa artesanal",
    descripcion: "Elemento decorativo hecho a mano para realzar tus espacios.",
    precio: 45000,
    imagenes: [prod4img1, prod4img2, prod4img3, prod4img4, prod4img5],
  },
  {
    nombre: "Adornos para mesas",
    descripcion: "Conjunto de adornos tejidos que embellecen tu hogar.",
    precio: 40000,
    imagenes: [prod5img1, prod5img2, prod5img3, prod5img4, prod5img5],
  },
  {
    nombre: "Sonajeros artesanales",
    descripcion: "Sonajeros coloridos elaborados con técnicas ancestrales.",
    precio: 30000,
    imagenes: [prod6img1, prod6img2, prod6img3, prod6img4, prod6img5],
  },
  {
    nombre: "Barco de madera decorativo",
    descripcion: "Figura náutica hecha a mano ideal para decoración costera.",
    precio: 65000,
    imagenes: [prod7img1, prod7img2, prod7img3, prod7img4, prod7img5],
  },
  {
    nombre: "Canasta de picnic artesanal",
    descripcion: "Canasta tejida ideal para salidas al aire libre.",
    precio: 70000,
    imagenes: [prod8img1, prod8img2, prod8img3, prod8img4, prod8img5],
  },
  {
    nombre: "Florero artesanal",
    descripcion: "Florero pintado a mano con diseños tradicionales.",
    precio: 60000,
    imagenes: [prod9img1, prod9img2, prod9img3, prod9img4, prod9img5],
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
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-6">
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

      {/* Modal */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl p-6 w-full max-w-xl relative shadow-xl">
            <button
              onClick={closeModal}
              className="absolute top-3 right-4 text-xl font-bold text-gray-500 hover:text-black"
            >
              ×
            </button>

            <div className="flex items-center justify-between mb-4">
              <button onClick={prevImg} className="text-2xl font-bold text-gray-600">‹</button>
              <img
                src={selected.imagenes[imgIndex]}
                alt="Producto"
                className="w-72 h-60 object-contain mx-4 rounded"
              />
              <button onClick={nextImg} className="text-2xl font-bold text-gray-600">›</button>
            </div>

            <h2 className="text-xl font-bold mb-2">{selected.nombre}</h2>
            <p className="text-gray-700 mb-2">{selected.descripcion}</p>
            <p className="text-gray-900 font-semibold text-lg mb-4">
              ${selected.precio.toLocaleString()}
            </p>
            <button
              onClick={() => handleBuy(selected)}
              className="px-4 py-2 bg-[#2B1F1F] text-white rounded hover:bg-[#4B3A3A]"
            >
              Comprar
            </button>
          </div>
        </div>
      )}
    </>
  );
};

// Actualiza el componente Prod con los botones en orden invertido
const Prod = ({ producto, onClick, onBuy }) => {
  return (
    <div className="p-4 bg-white shadow rounded-xl w-full hover:shadow-lg transition">
      <img
        src={producto.imagenes[0]}
        alt={producto.nombre}
        className="w-full h-40 object-cover rounded-lg mb-4"
      />
      <h2 className="text-lg font-bold mb-1">{producto.nombre}</h2>
      <p className="text-gray-600 mb-2">{producto.descripcion}</p>
      <p className="text-gray-800 font-semibold mb-4">
        ${producto.precio.toLocaleString()}
      </p>
      <div className="flex justify-between">
        <button
          onClick={onBuy}
          className="px-3 py-1 text-sm bg-[#2B1F1F] text-white rounded hover:bg-[#4B3A3A]"
        >
          Comprar
        </button>
        <button
          onClick={onClick}
          className="px-3 py-1 text-sm bg-[#4B3A3A] text-white rounded hover:bg-[#2B1F1F]"
        >
          Ver detalles
        </button>
      </div>
    </div>
  );
};

export default ProductGallery;