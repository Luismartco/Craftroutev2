import { useEffect, useState } from "react";

export default function ProductList() {
  const [products, setProducts] = useState([]);
  const [visibleProducts, setVisibleProducts] = useState(8); // Muestra solo las 2 primeras filas (8 productos en total)
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="p-4">
      {loading ? (
        <p className="text-center">Cargando productos...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, visibleProducts).map((product) => (
              <div key={product.id} className="border p-4 rounded shadow-md bg-white flex flex-col text-center h-full">
                <img src={product.image} alt={product.title} className="w-32 h-32 object-contain mb-2 mx-auto" />
                <h2 className="text-lg font-semibold flex-1">{product.title}</h2>
                <p className="text-sm text-gray-600 mt-2 flex-1">
                  {product.description.length > getDescriptionLength(product.title)
                    ? product.description.substring(0, getDescriptionLength(product.title)) + "..."
                    : product.description}
                </p>
                <p className="text-md font-bold mt-2">Precio: ${product.price}</p>
                <div className="mt-auto w-full flex justify-center gap-2 p-2">
                  <button className="px-4 py-2 bg-[#2B1F1F] text-white rounded hover:bg-opacity-80">Comprar</button>
                  <button className="px-4 py-2 bg-[#4B3A3A] text-white rounded hover:bg-opacity-80">Ver Detalle</button>
                </div>
              </div>
            ))}
          </div>
          {visibleProducts < products.length && (
            <div className="text-center mt-4">
              <button 
                onClick={() => setVisibleProducts(visibleProducts + 8)} 
                className="px-6 py-2 bg-[#2B1F1F] text-white rounded hover:bg-opacity-80"
              >
                Ver más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}