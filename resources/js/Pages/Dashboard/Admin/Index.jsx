import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';

export default function Index({ stats }) {
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100">
                {/* Encabezado */}
                <div className="bg-white shadow-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <h1 className="text-2xl font-bold text-gray-900">Panel de Administración</h1>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna izquierda - Gestión de Categorías */}
                        <div className="lg:col-span-1">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Gestión de Categorías</h2>
                                <div className="space-y-4">
                                    {/* Aquí desactivamos las rutas mientras no las implementas */}
                                    {/* <Link
                                        href={route('dashboard.admin.categories.create')}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                                        </svg>
                                        Agregar Nueva Categoría
                                    </Link> */}
                                    {/* <Link
                                        href={route('dashboard.admin.categories.index')}
                                        className="w-full inline-flex items-center justify-center px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors duration-200"
                                    >
                                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                        </svg>
                                        Ver Todas las Categorías
                                    </Link> */}
                                </div>
                            </div>
                        </div>

                        {/* Columna derecha - Estadísticas y Gráficas */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Estadísticas Generales</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Total Usuarios</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_users}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Total Artesanos</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_artesanos}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Total Clientes</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_clientes}</p>
                                    </div>
                                </div>

                                {/* Espacio para futuras gráficas */}
                                <div className="mt-6">
                                    <h3 className="text-lg font-semibold mb-4">Visualización de Datos</h3>
                                    <div className="grid grid-cols-1 gap-6">
                                        <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
                                            <p className="text-gray-500">Gráfica 1 - Pendiente de implementación</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
                                            <p className="text-gray-500">Gráfica 2 - Pendiente de implementación</p>
                                        </div>
                                        <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
                                            <p className="text-gray-500">Gráfica 3 - Pendiente de implementación</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Espacio para más funcionalidades */}
                                <div className="mt-6 space-y-4">
                                    <Link
                                        href="#"
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        Gestionar Usuarios (próximamente)
                                    </Link>
                                    <Link
                                        href="#"
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200 ml-4"
                                    >
                                        Gestionar Artesanos (próximamente)
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
