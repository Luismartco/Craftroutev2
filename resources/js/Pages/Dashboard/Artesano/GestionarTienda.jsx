import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, useForm, Head, router } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';

export default function GestionarTienda({ tienda, productos = [] }) {
    // Coordenadas por defecto (centro de Sucre)
    const defaultCenter = [9.3047, -75.3977];
    const { delete: destroy } = useForm();

    const handleDelete = (id) => {
        if (confirm('¿Estás seguro de que deseas eliminar este producto?')) {
            destroy(route('dashboard.artesano.delete-producto', id));
        }
    };

    return (
        <AuthenticatedLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Columna izquierda - Información de la tienda */}
                        <div className="bg-white rounded-lg shadow p-10 w-full max-w-full mx-auto">
                            {/* Foto de perfil */}
                            <div className="h-32 w-32 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden">
                                <img
                                    src={tienda.foto_perfil ? `/storage/${tienda.foto_perfil}` : 'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=400&q=80'}
                                    alt={tienda.nombre}
                                    className="h-full w-full object-cover"
                                />
                            </div>
                            
                            {/* Información básica */}
                            <div>
                                <h3 className="text-lg font-medium text-gray-900">{tienda.nombre}</h3>
                                <p className="text-sm text-gray-500">{tienda.municipio_venta}</p>
                            </div>
                            <div className="mt-4 flex gap-4">
                                <Link
                                    href={route('dashboard.artesano.edit-tienda')}
                                    className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 no-underline"
                                >
                                    Editar Tienda
                                </Link>
                                <Link
                                    href={route('dashboard.artesano.index')}
                                    className="inline-flex items-center px-4 py-2 rounded-md text-sm font-medium text-white bg-[rgb(60,47,47)] hover:bg-[rgb(43,31,31)] no-underline"
                                >
                                    Volver al Perfil
                                </Link>
                            </div>
                            <br />
                            {/* Restaurar disposición original de barrio y teléfono */}
                            <div className="border-t border-gray-200 pt-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <p className="text-sm text-gray-500">Barrio</p>
                                        <p className="font-medium">{tienda.barrio}</p>
                                    </div>
                                    <div>
                                        <p className="text-sm text-gray-500">Teléfono</p>
                                        <p className="font-medium">{tienda.telefono}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Columna izquierda - Información detallada */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Tienda</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Dirección</p>
                                            <p className="mt-1 text-sm text-gray-900">{tienda.direccion}</p>
                                        </div>
                                        {tienda.latitude && tienda.longitude && (
                                            <div>
                                                <p className="text-sm font-medium text-gray-500">Coordenadas</p>
                                                <p className="mt-1 text-sm text-gray-900">
                                                    {tienda.latitude}, {tienda.longitude}
                                                </p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Mapa en la columna izquierda */}
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Ubicación</h3>
                                    <div className="h-64 bg-gray-100 rounded-lg">
                                        <MapContainer
                                            center={[tienda.latitude || 9.3047, tienda.longitude || -75.3977]}
                                            zoom={13}
                                            className="h-full w-full rounded-lg"
                                        >
                                            {tienda.latitude && tienda.longitude && (
                                                <Marker position={[tienda.latitude, tienda.longitude]} />
                                            )}
                                        </MapContainer>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 