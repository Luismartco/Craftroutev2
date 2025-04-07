import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8);
  const [loading, setLoading] = useState(true);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  useEffect(() => {
    fetch("https://fakestoreapi.com/products")
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((error) => console.error("Error al consumir la API:", error));
  }, []);

  const getDescriptionLength = (title) => {
    const maxLength = 80 - title.length;
    return maxLength > 20 ? maxLength : 20;
  };

  const handleOutsideClick = (e) => {
    if (e.target.id === "modalOverlay") {
      setSelectedProductIndex(null);
    }
  };

  return (
    <div className="p-4 relative">
      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, visibleProducts).map((product, index) => (
              <div
                key={product.id}
                className="border p-4 rounded shadow-md bg-white flex flex-col text-center h-full transition-transform duration-300 hover:scale-[1.02] hover:shadow-xl"
              >
                <img
                  src={product.image}
                  alt={product.title}
                  className="w-32 h-32 object-contain mb-2 mx-auto"
                />
                <h2 className="text-lg font-semibold flex-1">{product.title}</h2>
                <p className="text-sm text-gray-600 mt-2 flex-1">
                  {product.description.length > getDescriptionLength(product.title)
                    ? product.description.substring(0, getDescriptionLength(product.title)) + "..."
                    : product.description}
                </p>
                <p className="text-md font-bold mt-2">Precio: ${product.price}</p>
                <div className="mt-auto w-full flex justify-center gap-2 p-2">
                  <button className="px-4 py-2 bg-[#2B1F1F] text-white rounded hover:bg-opacity-80 transition-colors duration-200">
                    Comprar
                  </button>
                  <button
                    className="px-4 py-2 bg-[#4B3A3A] text-white rounded hover:bg-opacity-80 transition-colors duration-200"
                    onClick={() => setSelectedProductIndex(index)}
                  >
                    Ver Detalle
                  </button>
                </div>
              </div>
            ))}
          </div>
          {visibleProducts < products.length && (
            <div className="text-center mt-4">
              <button
                onClick={() => setVisibleProducts(visibleProducts + 8)}
                className="px-6 py-2 bg-[#2B1F1F] text-white rounded hover:bg-opacity-80 transition-colors duration-200"
              >
                Ver más
              </button>
            </div>
          )}
        </>
      )}

      {selectedProductIndex !== null && (
        <div
          id="modalOverlay"
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={handleOutsideClick}
        >
          <div className="bg-white rounded shadow-md w-[500px] h-[550px] p-4 relative flex flex-col items-center text-center overflow-hidden">
            <img
              src={products[selectedProductIndex].image}
              alt={products[selectedProductIndex].title}
              className="w-32 h-32 object-contain mb-2"
            />
            <h2 className="text-lg font-semibold">{products[selectedProductIndex].title}</h2>
            <p className="text-sm text-gray-600 mt-2 px-2 overflow-y-auto max-h-[140px]">
              {products[selectedProductIndex].description}
            </p>
            <p className="text-md font-bold mt-4">
              Precio: ${products[selectedProductIndex].price}
            </p>
            <p className="text-sm text-gray-700 mt-1">
              Categoría: {products[selectedProductIndex].category}
            </p>
            <p className="text-sm text-gray-700 mb-4">
              Cantidad disponible: {products[selectedProductIndex].rating.count}
            </p>
            <div className="flex justify-between items-center w-full px-2 mt-auto">
              <button
                className="text-2xl"
                onClick={() =>
                  setSelectedProductIndex(
                    (selectedProductIndex - 1 + products.length) % products.length
                  )
                }
              >
                ←
              </button>
              <div className="flex gap-2">
                <button
                  className="px-4 py-2 bg-[#2B1F1F] text-white rounded hover:bg-opacity-80"
                  onClick={() => alert("¡Producto comprado!")}
                >
                  Comprar
                </button>
                <button
                  className="px-4 py-2 bg-[#4B3A3A] text-white rounded hover:bg-opacity-80"
                  onClick={() => setSelectedProductIndex(null)}
                >
                  Cerrar
                </button>
              </div>
              <button
                className="text-2xl"
                onClick={() =>
                  setSelectedProductIndex((selectedProductIndex + 1) % products.length)
                }
              >
                →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
