import React from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, router } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef, useState } from 'react';
import { NumericFormat } from 'react-number-format';

export default function Index({ stats, pedidos, transaccionesSimuladas, user }) {
        const [profilePhoto, setProfilePhoto] = useState(user.profile_photo || null);
        const fileInputRef = useRef(null);

        // Estado para paginación de pedidos
        const [currentPage, setCurrentPage] = useState(1);
        const ordersPerPage = 2;

        // Estado para modal de historial de compras
        const [showPurchaseHistoryModal, setShowPurchaseHistoryModal] = useState(false);

        // Estado para paginación del historial de compras
        const [currentPurchasePage, setCurrentPurchasePage] = useState(1);
        const purchasesPerPage = 3;

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
                    <div className="grid grid-cols-1 gap-8">
                        {/* Columna completa - Información del perfil y estadísticas */}
                        <div className="w-full">
                            {/* Información del perfil integrada en Actividad */}
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <div className="flex items-center space-x-4 mb-6">
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
                                        <div className="mt-1 space-y-1">
                                            <div className="flex items-center">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                                </svg>
                                                <span className="ml-1 text-sm text-gray-500">{user.residence_municipality}</span>
                                            </div>
                                            <div className="flex items-center">
                                                <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                                </svg>
                                                <span className="ml-1 text-sm text-gray-500">{user.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-white rounded-lg shadow p-6">
                                <h2 className="text-lg font-semibold mb-4">Actividad</h2>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Total Pedidos</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_pedidos}</p>
                                    </div>
                                    <div className="bg-gray-50 rounded-lg p-4">
                                        <p className="text-sm text-gray-500">Cantidad de compras realizadas</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.compras_simuladas}</p>
                                    </div>
                                </div>

                                {/* Botón para historial de compras */}
                                <div className="border-t pt-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <h3 className="text-lg font-semibold">Historial de Compras</h3>
                                            <p className="text-sm text-gray-600 mt-1">
                                                Revisa todas tus compras realizadas
                                            </p>
                                        </div>
                                        <button
                                            onClick={() => setShowPurchaseHistoryModal(true)}
                                            className="inline-flex items-center px-4 py-2 bg-amber-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-amber-900 focus:bg-amber-900 active:bg-amber-900 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                        >
                                            Ver Historial
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Sección de Pedidos */}
                            <div className="bg-white rounded-lg shadow p-6 mt-6">
                                <h2 className="text-lg font-semibold mb-4">Mis Pedidos Recientes</h2>
                                {pedidos && pedidos.length > 0 ? (
                                    (() => {
                                        const indexOfLastOrder = currentPage * ordersPerPage;
                                        const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
                                        const currentOrders = pedidos.slice(indexOfFirstOrder, indexOfLastOrder);
                                        const totalPages = Math.ceil(pedidos.length / ordersPerPage);
                                        const totalResults = pedidos.length;
                                        const showingFrom = indexOfFirstOrder + 1;
                                        const showingTo = Math.min(indexOfLastOrder, totalResults);

                                        return (
                                            <>
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                    {currentOrders.map((pedido) => (
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

                                                {/* Componente de paginación */}
                                                {totalPages > 1 && (
                                                    <div className="flex items-center justify-between mt-4 px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                                        <div className="flex-1 flex justify-between sm:hidden">
                                                            <button
                                                                onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                                disabled={currentPage === 1}
                                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Siguiente
                                                            </button>
                                                        </div>
                                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                                            <div>
                                                                <p className="text-sm text-gray-700">
                                                                    Mostrando <span className="font-medium">{showingFrom}</span> a <span className="font-medium">{showingTo}</span> de <span className="font-medium">{totalResults}</span> resultados
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                                    <button
                                                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                                                        disabled={currentPage === 1}
                                                                        className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        « Anterior
                                                                    </button>

                                                                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                                                        <button
                                                                            key={page}
                                                                            onClick={() => setCurrentPage(page)}
                                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                                currentPage === page
                                                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                            }`}
                                                                        >
                                                                            {page}
                                                                        </button>
                                                                    ))}

                                                                    <button
                                                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                                                        disabled={currentPage === totalPages}
                                                                        className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        Siguiente »
                                                                    </button>
                                                                </nav>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()
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

                {/* Modal de historial de compras */}
                {showPurchaseHistoryModal && (
                    <div className="fixed inset-0 z-50 overflow-y-auto">
                        <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                            <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                                <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={() => setShowPurchaseHistoryModal(false)}></div>
                            </div>

                            <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-6xl sm:w-full">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div className="flex items-center justify-between mb-4">
                                        <h3 className="text-lg font-semibold text-gray-900">Historial de Compras</h3>
                                        <button
                                            onClick={() => setShowPurchaseHistoryModal(false)}
                                            className="text-gray-400 hover:text-gray-600"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                            </svg>
                                        </button>
                                    </div>

                                    {(() => {
                                        const indexOfLastPurchase = currentPurchasePage * purchasesPerPage;
                                        const indexOfFirstPurchase = indexOfLastPurchase - purchasesPerPage;
                                        const currentPurchases = transaccionesSimuladas.slice(indexOfFirstPurchase, indexOfLastPurchase);
                                        const totalPurchasePages = Math.ceil(transaccionesSimuladas.length / purchasesPerPage);
                                        const totalPurchaseResults = transaccionesSimuladas.length;
                                        const showingPurchaseFrom = indexOfFirstPurchase + 1;
                                        const showingPurchaseTo = Math.min(indexOfLastPurchase, totalPurchaseResults);

                                        return transaccionesSimuladas && transaccionesSimuladas.length === 0 ? (
                                            <div className="text-center py-8">
                                                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                                </svg>
                                                <h3 className="mt-2 text-sm font-medium text-gray-900">No hay compras simuladas</h3>
                                                <p className="mt-1 text-sm text-gray-500">Aún no has realizado ninguna compra simulada.</p>
                                            </div>
                                        ) : (
                                            <>
                                                <div className="space-y-4 max-h-96 overflow-y-auto">
                                                    {currentPurchases.map((transaccion) => (
                                                        <div key={transaccion.id_transaccion} className="border border-gray-200 rounded-lg p-4">
                                                            <div className="flex justify-between items-start mb-2">
                                                                <div className="flex-1">
                                                                    <div className="flex items-center justify-between mb-2">
                                                                        <h4 className="font-semibold">Transacción #{transaccion.id_transaccion}</h4>
                                                                        <span className="px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                                                            Simulada Pagada
                                                                        </span>
                                                                    </div>
                                                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                                                                        <div>
                                                                            <span className="font-medium">Tipo:</span> {transaccion.tipo_transaccion}
                                                                        </div>
                                                                        <div>
                                                                            <span className="font-medium">Método de pago:</span> {transaccion.metodo_pago}
                                                                        </div>
                                                                        <div>
                                                                            <span className="font-medium">Fecha de creación:</span> {new Date(transaccion.fecha_creacion).toLocaleDateString('es-ES')}
                                                                        </div>
                                                                        <div>
                                                                            <span className="font-medium">Fecha de pago:</span> {transaccion.fecha_pago ? new Date(transaccion.fecha_pago).toLocaleDateString('es-ES') : 'N/A'}
                                                                        </div>
                                                                        <div>
                                                                            <span className="font-medium">Método de entrega:</span> {transaccion.metodo_entrega === 'contra_entrega' ? 'Contra Entrega' : 'Envío a Domicilio'}
                                                                        </div>
                                                                        <div>
                                                                            <span className="font-medium">Moneda:</span> {transaccion.moneda}
                                                                        </div>
                                                                    </div>

                                                                    {/* Información de entrega */}
                                                                    {transaccion.metodo_entrega === 'envio_domicilio' && (
                                                                        <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                                                                            <h5 className="font-semibold text-sm mb-2 text-blue-800">Información de Entrega</h5>
                                                                            <div className="text-sm text-blue-700 space-y-1">
                                                                                <div><span className="font-medium">Destinatario:</span> {transaccion.destinatario}</div>
                                                                                <div><span className="font-medium">Dirección:</span> {transaccion.direccion_entrega}</div>
                                                                                <div><span className="font-medium">Ciudad:</span> {transaccion.ciudad_entrega}</div>
                                                                                <div><span className="font-medium">Departamento:</span> {transaccion.departamento_entrega}</div>
                                                                                {transaccion.info_adicional_entrega && (
                                                                                    <div><span className="font-medium">Info adicional:</span> {transaccion.info_adicional_entrega}</div>
                                                                                )}
                                                                            </div>
                                                                        </div>
                                                                    )}

                                                                    {/* Sección de resumen de costos */}
                                                                    <div className="mt-4 p-4 bg-gray-50 rounded-lg border">
                                                                        <h5 className="font-semibold text-sm mb-3 text-gray-800">Productos Comprados</h5>
                                                                        <div className="space-y-3">
                                                                            {/* Productos de la transacción */}
                                                                            <div>
                                                                                <div className="space-y-1">
                                                                                    {transaccion.detalles && transaccion.detalles.map((detalle, index) => (
                                                                                        <div key={index} className="text-sm text-gray-600 flex justify-between">
                                                                                            <span>{detalle.nombre_producto} (x{detalle.cantidad})</span>
                                                                                            <span>{formatCurrency(detalle.subtotal_linea)}</span>
                                                                                        </div>
                                                                                    ))}
                                                                                </div>
                                                                            </div>

                                                                            <div className="border-t pt-3 space-y-2">
                                                                                <div className="flex justify-between text-sm">
                                                                                    <span className="font-medium">Subtotal productos:</span>
                                                                                    <span>{formatCurrency(transaccion.subtotal)}</span>
                                                                                </div>
                                                                                <div className="flex justify-between text-sm">
                                                                                    <span className="font-medium">Valor envío:</span>
                                                                                    <span>{formatCurrency(transaccion.costo_envio)}</span>
                                                                                </div>
                                                                                <div className="flex justify-between text-sm font-semibold border-t pt-2 border-gray-300">
                                                                                    <span>Total:</span>
                                                                                    <span>{formatCurrency(transaccion.total)}</span>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Componente de paginación para compras */}
                                                {totalPurchasePages > 1 && (
                                                    <div className="flex items-center justify-between mt-4 px-4 py-3 bg-gray-50 border-t border-gray-200 sm:px-6">
                                                        <div className="flex-1 flex justify-between sm:hidden">
                                                            <button
                                                                onClick={() => setCurrentPurchasePage(prev => Math.max(prev - 1, 1))}
                                                                disabled={currentPurchasePage === 1}
                                                                className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Anterior
                                                            </button>
                                                            <button
                                                                onClick={() => setCurrentPurchasePage(prev => Math.min(prev + 1, totalPurchasePages))}
                                                                disabled={currentPurchasePage === totalPurchasePages}
                                                                className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                                            >
                                                                Siguiente
                                                            </button>
                                                        </div>
                                                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                                                            <div>
                                                                <p className="text-sm text-gray-700">
                                                                    Mostrando <span className="font-medium">{showingPurchaseFrom}</span> a <span className="font-medium">{showingPurchaseTo}</span> de <span className="font-medium">{totalPurchaseResults}</span> resultados
                                                                </p>
                                                            </div>
                                                            <div>
                                                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                                                    <button
                                                                        onClick={() => setCurrentPurchasePage(prev => Math.max(prev - 1, 1))}
                                                                        disabled={currentPurchasePage === 1}
                                                                        className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-l-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        « Anterior
                                                                    </button>

                                                                    {Array.from({ length: totalPurchasePages }, (_, i) => i + 1).map(page => (
                                                                        <button
                                                                            key={page}
                                                                            onClick={() => setCurrentPurchasePage(page)}
                                                                            className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                                                currentPurchasePage === page
                                                                                    ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                                                    : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                                        }`}
                                                                        >
                                                                            {page}
                                                                        </button>
                                                                    ))}

                                                                    <button
                                                                        onClick={() => setCurrentPurchasePage(prev => Math.min(prev + 1, totalPurchasePages))}
                                                                        disabled={currentPurchasePage === totalPurchasePages}
                                                                        className="relative inline-flex items-center px-4 py-2 border text-sm font-medium bg-white border-gray-300 text-gray-500 hover:bg-gray-50 rounded-r-md disabled:opacity-50 disabled:cursor-not-allowed"
                                                                    >
                                                                        Siguiente »
                                                                    </button>
                                                                </nav>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}
                                            </>
                                        );
                                    })()}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </AuthenticatedLayout>
    );
}