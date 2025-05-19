import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

export default function Index({ stats }) {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Dashboard del Artesano</h2>
                            
                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Productos</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_productos}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Ventas</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_ventas}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Pedidos</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_pedidos}</p>
                                </div>
                            </div>

                            {/* Contenido principal */}
                            <div className="space-y-6">
                                {/* Aquí irá el contenido principal del dashboard */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 