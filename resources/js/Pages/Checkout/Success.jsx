import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import PrimaryButton from '@/Components/PrimaryButton';

export default function CheckoutSuccess({ auth, pedido }) {
    return (
        <GuestLayout auth={auth}>
            <Head title="Pedido Completado" />
            
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="bg-white rounded-lg shadow-md p-8 text-center">
                        {/* Icono de éxito */}
                        <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
                            <svg className="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                            </svg>
                        </div>
                        
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">
                            ¡Pedido Completado Exitosamente!
                        </h1>
                        
                        <p className="text-gray-600 mb-8">
                            Tu pedido ha sido procesado y está siendo preparado. Te enviaremos una confirmación por correo electrónico.
                        </p>
                        
                        {/* Información del pedido */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h2 className="text-xl font-semibold mb-4">Detalles del Pedido</h2>
                            
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
                                <div>
                                    <p className="text-sm text-gray-600">Número de Pedido</p>
                                    <p className="font-semibold">#{pedido.id}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Estado</p>
                                    <p className="font-semibold text-green-600 capitalize">{pedido.estado}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Fecha</p>
                                    <p className="font-semibold">{new Date(pedido.created_at).toLocaleDateString('es-ES')}</p>
                                </div>
                                
                                <div>
                                    <p className="text-sm text-gray-600">Total</p>
                                    <p className="font-semibold text-lg">${pedido.total.toLocaleString()}</p>
                                </div>
                            </div>
                        </div>
                        
                        {/* Productos del pedido */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Productos Pedidos</h3>
                            
                            <div className="space-y-4">
                                {pedido.detalles.map((detalle) => (
                                    <div key={detalle.id} className="flex items-center space-x-4 p-4 bg-white rounded-lg">
                                        {detalle.producto.imagenes && detalle.producto.imagenes.length > 0 && (
                                            <img
                                                src={`/storage/${detalle.producto.imagenes[0].ruta_imagen}`}
                                                alt={detalle.producto.nombre}
                                                className="w-16 h-16 object-contain rounded"
                                            />
                                        )}
                                        
                                        <div className="flex-1">
                                            <h4 className="font-semibold">{detalle.producto.nombre}</h4>
                                            <p className="text-gray-600 text-sm">
                                                Cantidad: {detalle.cantidad} x ${detalle.precio_unitario.toLocaleString()}
                                            </p>
                                        </div>
                                        
                                        <div className="text-right">
                                            <p className="font-semibold">${detalle.subtotal.toLocaleString()}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        
                        {/* Información de entrega */}
                        <div className="bg-gray-50 rounded-lg p-6 mb-8">
                            <h3 className="text-lg font-semibold mb-4">Información de Entrega</h3>
                            
                            <div className="text-left">
                                <p className="text-gray-600 mb-2">Dirección de entrega:</p>
                                <p className="font-semibold">{pedido.direccion_entrega}</p>
                                
                                {pedido.cliente && (
                                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-sm text-gray-600">Cliente</p>
                                            <p className="font-semibold">
                                                {pedido.cliente.name} {pedido.cliente.last_name}
                                            </p>
                                        </div>
                                        
                                        <div>
                                            <p className="text-sm text-gray-600">Teléfono</p>
                                            <p className="font-semibold">{pedido.cliente.phone}</p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                        
                        {/* Botones de acción */}
                        <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <Link href="/">
                                <PrimaryButton>
                                    Continuar Comprando
                                </PrimaryButton>
                            </Link>
                            
                            {auth.user && (
                                <Link href="/dashboard">
                                    <PrimaryButton className="bg-gray-600 hover:bg-gray-700">
                                        Ir al Dashboard
                                    </PrimaryButton>
                                </Link>
                            )}
                        </div>
                        
                        {/* Información adicional */}
                        <div className="mt-8 pt-6 border-t border-gray-200">
                            <p className="text-sm text-gray-500">
                                Si tienes alguna pregunta sobre tu pedido, no dudes en contactarnos.
                                Te enviaremos actualizaciones sobre el estado de tu pedido por correo electrónico.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
} 