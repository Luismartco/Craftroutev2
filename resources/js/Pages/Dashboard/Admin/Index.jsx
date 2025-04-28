import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ stats }) {
    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            <h2 className="text-2xl font-bold mb-6">Dashboard del Administrador</h2>
                            
                            {/* Estadísticas */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Usuarios</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_usuarios}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Artesanos</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_artesanos}</p>
                                </div>
                                <div className="bg-white p-6 rounded-lg shadow">
                                    <h3 className="text-lg font-semibold text-gray-700">Total Clientes</h3>
                                    <p className="text-3xl font-bold text-indigo-600">{stats.total_clientes}</p>
                                </div>
                            </div>

                            {/* Acciones rápidas */}
                            <div className="space-y-4">
                                <Link 
                                    href={route('dashboard.admin.manage-users')}
                                    className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                                >
                                    Gestionar Usuarios
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 