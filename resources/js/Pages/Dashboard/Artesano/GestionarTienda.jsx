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
                    {/* Header con información de la tienda */}
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg mb-8">
                        <div className="p-6">
                            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
                                {/* Foto de perfil */}
                                <div className="h-32 w-32 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden">
                                    <img
                                        src={tienda.foto_perfil ? `/storage/${tienda.foto_perfil}` : 'https://via.placeholder.com/150'}
                                        alt={tienda.nombre}
                                        className="h-full w-full object-cover"
                                    />
                                </div>
                                
                                {/* Información básica */}
                                <div className="flex-1">
                                    <h1 className="text-3xl font-bold text-gray-900">{tienda.nombre}</h1>
                                    <p className="text-gray-600 capitalize mt-1">{tienda.municipio_venta}</p>
                                    <div className="mt-4 flex gap-4">
                                        <Link
                                            href={route('dashboard.artesano.edit-tienda')}
                                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700"
                                        >
                                            Editar Tienda
                                        </Link>
                                        <Link
                                            href={route('dashboard.artesano.index')}
                                            className="inline-flex items-center px-4 py-2 bg-gray-100 border border-transparent rounded-md font-semibold text-xs text-gray-700 uppercase tracking-widest hover:bg-gray-200"
                                        >
                                            Volver al Perfil
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna izquierda - Información detallada */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-4">Información de la Tienda</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Barrio</p>
                                            <p className="mt-1 text-sm text-gray-900">{tienda.barrio}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Dirección</p>
                                            <p className="mt-1 text-sm text-gray-900">{tienda.direccion}</p>
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-500">Teléfono</p>
                                            <p className="mt-1 text-sm text-gray-900">{tienda.telefono}</p>
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

                        {/* Columna derecha - Productos */}
                        <div className="lg:col-span-2">
                            <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                                <div className="p-6">
                                    <h3 className="text-lg font-medium text-gray-900 mb-6">Productos</h3>
                                    {productos.length > 0 ? (
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            {productos.map((producto) => (
                                                <div key={producto.id} className="bg-white border rounded-lg overflow-hidden">
                                                    <div className="p-4">
                                                        <h4 className="text-lg font-medium text-gray-900">{producto.nombre}</h4>
                                                        <p className="mt-1 text-sm text-gray-500">{producto.descripcion}</p>
                                                        <div className="mt-4 space-y-2">
                                                            <p className="text-sm">
                                                                <span className="font-medium">Precio:</span> ${producto.precio}
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Cantidad:</span> {producto.cantidad_disponible}
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Categoría:</span>{' '}
                                                                <span className="capitalize">{producto.categoria}</span>
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Técnica:</span>{' '}
                                                                <span className="capitalize">{producto.tecnica_artesanal.replace('_', ' ')}</span>
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Materia Prima:</span>{' '}
                                                                <span className="capitalize">{producto.materia_prima}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 text-center">No hay productos disponibles.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 