import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function Index({ stats, pedidos, user }) {
        const [profilePhoto, setProfilePhoto] = useState(user.profile_photo || null);
        const fileInputRef = useRef(null);

        // Función para formatear moneda en formato colombiano
        const formatCurrency = (amount) => {
            if (!amount && amount !== 0) return '$0,00';
            return (
                <NumericFormat
                    value={amount}
                    displayType={'text'}
                    thousandSeparator="."
                    decimalSeparator=","
                    prefix="$"
                    decimalScale={2}
                    fixedDecimalScale={true}
                />
            );
        };
        const handlePhotoChange = (e) => {
            const file = e.target.files[0];
            if (file) {
                const formData = new FormData();
                formData.append('profile_photo', file);
                router.post(route('profile.photo.update'), formData, {
                    onSuccess: (page) => {
                        setProfilePhoto(page.props.auth.user.profile_photo);
                    },
                });
            }
        };
    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100">
                

                {/* Contenido principal */}
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Columna izquierda - Información personal */}
                        <div className="lg:col-span-1">
                            {/* Información del perfil */}
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="h-20 w-20 rounded-full bg-white border-4 border-white shadow-lg overflow-hidden ring-2 ring-gray-100 relative cursor-pointer" onClick={() => fileInputRef.current.click()}>
                                            {profilePhoto ? (
                                                <img
                                                    src={profilePhoto.startsWith('http') ? profilePhoto : `/storage/${profilePhoto}`}
                                                    alt="Foto de perfil"
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200 flex items-center justify-center">
                                                    <span className="text-2xl font-medium text-gray-600">
                                                        {user.name.charAt(0)}{user.last_name.charAt(0)}
                                                    </span>
                                                </div>
                                            )}
                                            <input
                                                type="file"
                                                accept="image/*"
                                                className="hidden"
                                                ref={fileInputRef}
                                                onChange={handlePhotoChange}
                                            />
                                            <div className="absolute bottom-0 right-0 bg-white rounded-full p-1 shadow-md">
                                                <svg className="h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3zm0 0v3h3" />
                                                </svg>
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
                            </div>

                            {/* Sección de Pedidos */}
                            <div className="bg-white rounded-lg shadow p-6 mt-6">
                                <h2 className="text-lg font-semibold mb-4">Mis Pedidos Recientes</h2>
                                {pedidos && pedidos.length > 0 ? (
                                    <div className="space-y-4">
                                        {pedidos.map((pedido) => (
                                            <div key={pedido.id_pedido} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-2">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold">Pedido #{pedido.id_pedido}</h3>
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600 mt-2">
                                                            <div>
                                                                <span className="font-medium">Artesano:</span> {pedido.artesano?.name} {pedido.artesano?.last_name}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Tienda:</span> {pedido.artesano?.tienda?.nombre || 'Sin tienda'}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Teléfono artesano:</span> {pedido.artesano?.phone || 'No disponible'}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Estado:</span>
                                                                <span className={`ml-1 px-2 py-1 rounded-full text-xs font-medium ${
                                                                    pedido.estado === 'pendiente' ? 'bg-yellow-100 text-yellow-800' :
                                                                    pedido.estado === 'confirmado' ? 'bg-blue-100 text-blue-800' :
                                                                    pedido.estado === 'enviado' ? 'bg-purple-100 text-purple-800' :
                                                                    pedido.estado === 'entregado' ? 'bg-green-100 text-green-800' :
                                                                    'bg-red-100 text-red-800'
                                                                }`}>
                                                                    {pedido.estado === 'pendiente' ? 'Pendiente' :
                                                                     pedido.estado === 'confirmado' ? 'Confirmado' :
                                                                     pedido.estado === 'enviado' ? 'Enviado' :
                                                                     pedido.estado === 'entregado' ? 'Entregado' :
                                                                     'Cancelado'}
                                                                </span>
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Método:</span> {pedido.metodo_entrega === 'contra_entrega' ? 'Contra Entrega' : 'Envío a Domicilio'}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Empresa transportadora:</span> {pedido.empresa_transportadora || 'Servientrega'}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">N° de guía:</span> 123456789012
                                                            </div>
                                                        </div>

                                                        {/* Sección de resumen de costos */}
                                                        <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                                            <h4 className="font-semibold text-sm mb-3 text-gray-800">Resumen de costos</h4>
                                                            <div className="space-y-3">
                                                                {/* Productos del pedido */}
                                                                <div>
                                                                    <p className="text-sm font-medium text-gray-700 mb-2">Productos:</p>
                                                                    <div className="space-y-1">
                                                                        {pedido.detalles && pedido.detalles.map((detalle, index) => (
                                                                            <div key={index} className="text-sm text-gray-600 flex justify-between">
                                                                                <span>{detalle.nombre_producto} (x{detalle.cantidad})</span>
                                                                                <span>{formatCurrency(detalle.subtotal)}</span>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                <div className="border-t pt-3 space-y-2">
                                                                    <div className="flex justify-between text-sm">
                                                                        <span className="font-medium">Subtotal productos:</span>
                                                                        <span>{formatCurrency(pedido.subtotal_productos || 0)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-sm">
                                                                        <span className="font-medium">Valor envío:</span>
                                                                        <span>{formatCurrency(pedido.costo_envio || 0)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between text-sm font-semibold border-t pt-2 border-gray-300">
                                                                        <span>Total:</span>
                                                                        <span>{formatCurrency(pedido.total)}</span>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-8">
                                        <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                        </svg>
                                        <h3 className="mt-2 text-sm font-medium text-gray-900">No hay pedidos</h3>
                                        <p className="mt-1 text-sm text-gray-500">Aún no has realizado ningún pedido.</p>
                                        <div className="mt-6">
                                            <Link
                                                href="/"
                                                className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors duration-200"
                                            >
                                                Explorar Productos
                                            </Link>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
} 