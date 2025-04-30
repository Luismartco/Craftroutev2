import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

export default function Index({ stats, user }) {
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100">
                {/* Información del perfil */}
                <div className="bg-white shadow-lg border-b border-gray-200">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                        <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                                <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden ring-2 ring-gray-100 relative">
                                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
                                        <span className="text-2xl font-medium text-gray-600">
                                            {user.name.charAt(0)}{user.last_name.charAt(0)}
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div>
                                <div className="flex items-center space-x-2">
                                    <h1 className="text-xl font-semibold text-gray-900">
                                        {user.name} {user.last_name}
                                    </h1>
                                    <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                        Cliente
                                    </span>
                                </div>
                                <div className="mt-1 flex items-center">
                                    <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span className="ml-1 text-sm text-gray-500">{user.residence_municipality}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contenido principal */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna izquierda - Información personal */}
                        <div className="lg:col-span-1">
                            {/* Información del perfil */}
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden ring-2 ring-gray-100 relative">
                                            <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
                                                <span className="text-2xl font-medium text-gray-600">
                                                    {user.name.charAt(0)}{user.last_name.charAt(0)}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center space-x-2">
                                            <h1 className="text-xl font-semibold text-gray-900">
                                                {user.name} {user.last_name}
                                            </h1>
                                            <span className="px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                                Cliente
                                            </span>
                                        </div>
                                        <div className="mt-1 flex items-center">
                                            <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="ml-1 text-sm text-gray-500">{user.residence_municipality}</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Información de Contacto</h2>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-medium">{user.phone}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Ubicación</p>
                                        <p className="font-medium">{user.residence_municipality}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Mapa */}
                            {user.latitude && user.longitude && (
                                <div className="mt-6 bg-white rounded-lg shadow p-6">
                                    <h2 className="text-lg font-semibold mb-4">Ubicación</h2>
                                    <div className="h-64 w-full rounded-lg overflow-hidden">
                                        <MapContainer
                                            center={[user.latitude, user.longitude]}
                                            zoom={13}
                                            style={{ height: '100%', width: '100%' }}
                                        >
                                            <TileLayer
                                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            />
                                            <Marker position={[user.latitude, user.longitude]}>
                                                <Popup>
                                                    Tu ubicación
                                                </Popup>
                                            </Marker>
                                        </MapContainer>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Columna derecha - Estadísticas y acciones */}
                        <div className="lg:col-span-2">
                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Actividad</h2>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Total Pedidos</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_pedidos}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Artesanos Favoritos</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.artesanos_favoritos}</p>
                                    </div>
                                </div>

                                <div className="mt-6">
                                    <Link
                                        href={route('dashboard.cliente.recomendaciones')}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                    >
                                        Ver Recomendaciones
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