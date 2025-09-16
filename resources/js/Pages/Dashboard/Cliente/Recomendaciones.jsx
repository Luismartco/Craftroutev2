import React, { useState } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { router } from '@inertiajs/react';

const Recomendaciones = ({ productos = [] }) => {
    const [selectedProducts, setSelectedProducts] = useState([]);

    const toggleSelection = (productId) => {
        if (selectedProducts.includes(productId)) {
            // Si el producto ya está seleccionado, lo quitamos
            setSelectedProducts(selectedProducts.filter(id => id !== productId));
        } else {
            if (selectedProducts.length < 3) {
                // Si hay menos de 3 seleccionados, agregamos el nuevo
                setSelectedProducts([...selectedProducts, productId]);
            } else {
                // Si ya hay 3 seleccionados, quitamos el primero y agregamos el nuevo
                setSelectedProducts([...selectedProducts.slice(1), productId]);
            }
        }
    };

    const handleSubmit = () => {
        router.post(route('preferences.store'), {
            selected_preferences: selectedProducts,
            preserveScroll: true,
            onSuccess: () => {
                // Redireccionar al dashboard después de guardar las preferencias
                router.visit(route('dashboard'));
            }
        });
    };



    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Selecciona hasta 3 productos</h2>
                            {productos.length > 0 && (
                                <p className="text-gray-600 mb-4">{productos.length} productos disponibles</p>
                            )}

                            <div className="grid grid-cols-3 gap-4">
                                {productos.map((producto) => (
                                    <div
                                        key={producto.id}
                                        className={`relative cursor-pointer transition-all duration-300 transform ${
                                            selectedProducts.includes(producto.id) 
                                                ? 'ring-4 ring-indigo-500 scale-105' 
                                                : 'hover:scale-102'
                                        }`}
                                        onClick={() => toggleSelection(producto.id)}
                                    >
                                        <div className="relative">
                                            {producto.imagenes && producto.imagenes.length > 0 ? (
                                                <img
                                                    src={`/storage/${producto.imagenes[0].imagen}`}
                                                    alt={producto.nombre}
                                                    className="w-full h-48 object-cover rounded-lg transition-all duration-300"
                                                />
                                            ) : (
                                                <div className="w-full h-48 bg-gray-100 flex items-center justify-center rounded-lg">
                                                    <span className="text-gray-500">Sin imagen</span>
                                                </div>
                                            )}
                                            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-2">
                                                <div className="font-semibold">{producto.nombre}</div>
                                                <div className="text-sm">
                                                    {producto.tienda_nombre || 'Sin tienda asignada'}
                                                </div>
                                            </div>
                                            {selectedProducts.includes(producto.id) && (
                                                <div className="absolute top-2 right-2 bg-indigo-500 text-white rounded-full w-8 h-8 flex items-center justify-center">
                                                    {selectedProducts.indexOf(producto.id) + 1}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-6 text-center">
                                <button
                                    onClick={handleSubmit}
                                    disabled={selectedProducts.length !== 3}
                                    className={`inline-flex items-center px-4 py-2 rounded-md transition-colors duration-300 ${
                                        selectedProducts.length === 3
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                                    }`}
                                >
                                    Enviar
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Recomendaciones; 