import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Productos({ productos }) {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Mis Productos</h2>
                            
                            <div className="mb-4">
                                <input
                                    type="text"
                                    placeholder="Buscar productos..."
                                    className="w-full px-4 py-2 border rounded-lg"
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {productos.data.map(producto => (
                                    <div key={producto.id} className="border rounded-lg p-4">
                                        <img 
                                            src={producto.imagen} 
                                            alt={producto.nombre} 
                                            className="w-full h-48 object-cover rounded-lg mb-2"
                                        />
                                        <h4 className="font-medium">{producto.nombre}</h4>
                                        <p className="text-sm text-gray-500">{producto.categoria?.nombre}</p>
                                        <p className="text-lg font-bold text-indigo-600">
                                            ${producto.precio?.toFixed(2)}
                                        </p>
                                        <p className={`text-sm ${producto.stock > 0 ? 'text-green-600' : 'text-red-600'}`}>
                                            Stock: {producto.stock}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 