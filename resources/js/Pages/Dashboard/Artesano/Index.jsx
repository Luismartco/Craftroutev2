import React, { useState, useEffect } from 'react';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import { Link, Head, router, usePage } from '@inertiajs/react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useRef } from 'react';
import Maps from '@/Components/home/Maps';
import Sale from './Sale';

import { FormatCurrency } from '@/utils/FormatCurrency';


export default function Index({ stats, user, tienda }) {
    const [showSuccessMessage, setShowSuccessMessage] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [showErrorMessage, setShowErrorMessage] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const { flash } = usePage().props;

    // Verificar si hay un mensaje de éxito en parámetros de URL
    useEffect(() => {
        console.log('Dashboard cargado, verificando parámetros de URL...');
        console.log('URL completa:', window.location.href);
        console.log('Search params:', window.location.search);

        const urlParams = new URLSearchParams(window.location.search);
        const successParam = urlParams.get('success');
        console.log('Parámetro success encontrado:', successParam);

        let message = null;
        if (successParam === 'created') {
            message = '¡Producto creado con éxito!';
            console.log('Mensaje de creación asignado:', message);
        } else if (successParam === 'updated') {
            message = '¡Producto editado con éxito!';
            console.log('Mensaje de edición asignado:', message);
        }

        if (message) {
            console.log('Configurando mensaje de éxito:', message);
            setSuccessMessage(message);
            setShowSuccessMessage(true);
            console.log('Mensaje mostrado:', message);
            console.log('Estado showSuccessMessage:', true);
            // Limpiar el parámetro de la URL
            window.history.replaceState({}, document.title, window.location.pathname);
            setTimeout(() => {
                console.log('Ocultando mensaje después de 8 segundos');
                setShowSuccessMessage(false);
            }, 8000); // Ocultar después de 8 segundos
        } else {
            console.log('No se encontró mensaje para mostrar');
        }
    }, []);

    // Verificar si hay mensajes de error en flash
    useEffect(() => {
        if (flash?.error) {
            setErrorMessage(flash.error);
            setShowErrorMessage(true);
            setTimeout(() => {
                setShowErrorMessage(false);
            }, 8000); // Ocultar después de 8 segundos
        }
    }, [flash]);

    // Verificar si hay mensajes de éxito en flash
    useEffect(() => {
        if (flash?.success) {
            setSuccessMessage(flash.success);
            setShowSuccessMessage(true);
            setTimeout(() => {
                setShowSuccessMessage(false);
            }, 8000); // Ocultar después de 8 segundos
        }
    }, [flash]);

    // Función para construir la URL correcta de la imagen
    const getImageUrl = (imagePath) => {
        // Si la ruta ya incluye 'storage/', devolverla directamente
        if (imagePath.startsWith('storage/')) {
            return `/${imagePath}`;
        }
        // Si la ruta comienza con 'productos/', añadir '/storage/'
        if (imagePath.startsWith('productos/')) {
            return `/storage/${imagePath}`;
        }
        // Para cualquier otro caso, asumir que es una ruta relativa a storage
        return `/storage/${imagePath}`;
    };

    // Función para manejar errores de carga de imágenes
    const handleImageError = (e) => {
        console.error('Error al cargar imagen:', e.target.src);
        e.target.onerror = null;
        e.target.src = 'https://via.placeholder.com/300x200?text=Imagen+no+disponible';
    };

    const [profilePhoto, setProfilePhoto] = useState(user.profile_photo || null);
    const fileInputRef = useRef(null);
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

    const [carouselIndexes, setCarouselIndexes] = useState({});
    const handlePrev = (productoId, totalImages) => {
    setCarouselIndexes(prev => {
        const currentIndex = prev[productoId] ?? 0;
        const newIndex = (currentIndex - 1 + totalImages) % totalImages;
        return { ...prev, [productoId]: newIndex };
    });
};

const handleNext = (productoId, totalImages) => {
    setCarouselIndexes(prev => {
        const currentIndex = prev[productoId] ?? 0;
        const newIndex = (currentIndex + 1) % totalImages;
        return { ...prev, [productoId]: newIndex };
    });
};

const location = {
    lat: parseFloat(user.latitude),
    lng: parseFloat(user.longitude),
    name: user.residence_municipality
}

// Acá estará parte de la lógica para la venta
//Estado para la canasta de productos, este es un arreglo de objetos, en el cual están los productos seleccionados para la venta.
const [selectedProducts, setSelectedProducts] = useState([]);
//Estado para mostrar el modal de venta, este es un booleano, que se usa para mostrar o no el modal de venta.
const [showSaleModal, setShowSaleModal] = useState(false);

//Función para agregar un producto a la canasta, esta función se efectua cuando se hace click en el producto, y se agrega al arreglo de productos seleccionados.
const addProduct = (product) => {
    //Si el producto que se quiere agregar ya está en la canasta, se muestra el modal de venta.
    if (selectedProducts.find(p => p.id === product.id)){
        setShowSaleModal(true);
    //Si el producto que se va a agregar no está en la canasta, se agrega al arreglo de productos seleccionados, y se muestra el modal de venta.
    } else {
        setSelectedProducts(prev => [...prev, product]);
        product.cantidad = 1;
        product.subtotal = product.precio;
    }
} 


//Función para eliminar un producto de la canasta, se efectua al dar click en el botón de eliminar en la canasta. 
const handleDeleteProduct = (productId) => {
    //Lo que hace, es básicamente filtrar el arreglo de productos seleccionado, y deja los productos que el id sea diferente al id del producto que se desea eliminar.
    setSelectedProducts(prev => prev.filter(product => product.id !== productId));
}

//Función para vaciar la canasta, se acciona al dar click en el botón de vaciar la canasta.
const handleClearBasket = () => {
    setSelectedProducts([]);
}

//Función para cambiar la cantidad de un producto en la canasta y el subtotal, se efecua mediante los botones de agregar o quitar cantidad.
const handleQuantityChange = (productId, quantity, subtotal) => {
    setSelectedProducts(prev => prev.map(product => product.id === productId ? {...product, cantidad: quantity, subtotal: subtotal} : product));
}

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

// Función para actualizar el estado de un pedido
const updatePedidoStatus = async (pedidoId, newStatus) => {
    console.log('Iniciando actualización de pedido:', { pedidoId, newStatus });

    router.put(`/pedidos/${pedidoId}/status`, { estado: newStatus }, {
        onSuccess: (page) => {
            console.log('Pedido actualizado exitosamente');
            // Recargar la página para mostrar los cambios
            window.location.reload();
        },
        onError: (errors) => {
            console.error('Error al actualizar pedido:', errors);
            alert('Error al actualizar el estado del pedido');
        }
    });
};


    return (
        <AuthenticatedLayout>
            <div className="min-h-screen bg-gray-100">
                {/* Mensaje de éxito */}
                {showSuccessMessage && (
                    <div className="fixed z-50 p-4 border border-green-200 rounded-lg shadow-lg top-4 right-4 bg-green-50">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="w-5 h-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {successMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mensaje de error */}
                {showErrorMessage && (
                    <div className="fixed top-4 right-4 z-50 bg-red-50 border border-red-200 rounded-lg p-4 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-red-800">
                                    {errorMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Mensaje de éxito */}
                {showSuccessMessage && (
                    <div className="fixed top-4 right-4 z-50 bg-green-50 border border-green-200 rounded-lg p-4 shadow-lg">
                        <div className="flex items-center">
                            <div className="flex-shrink-0">
                                <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                </svg>
                            </div>
                            <div className="ml-3">
                                <p className="text-sm font-medium text-green-800">
                                    {successMessage}
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Contenido principal */}
                <div className="px-4 py-8 mx-auto max-w-7xl sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-8 lg:grid-cols-4">
                        {/* Columna izquierda - Información personal y tienda */}
                        <div className="lg:col-span-1">
                            {/* Información del perfil */}
                            <div className="w-full max-w-full p-10 mx-auto mb-10 bg-white rounded-lg shadow">
                                <div className="flex items-center space-x-4">
                                    <div className="flex-shrink-0">
                                        <div className="relative w-20 h-20 overflow-hidden bg-white border-4 border-white rounded-full shadow-lg cursor-pointer ring-2 ring-gray-100" onClick={() => fileInputRef.current.click()}>
                                            {profilePhoto ? (
                                                <img
                                                    src={profilePhoto.startsWith('http') ? profilePhoto : `/storage/${profilePhoto}`}
                                                    alt="Foto de perfil"
                                                    className="object-cover w-full h-full"
                                                />
                                            ) : (
                                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 via-gray-100 to-gray-200">
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
                                            <div className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-md">
                                                <svg className="w-5 h-5 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536M9 13h3l8-8a2.828 2.828 0 10-4-4l-8 8v3zm0 0v3h3" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex flex-col items-start">
                                            <h1 className="text-xl font-semibold text-gray-900 whitespace-nowrap">
                                                {user.name} {user.last_name}
                                            </h1>
                                            <span className="mt-1 px-2 py-0.5 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                                                Artesano
                                            </span>
                                        </div>
                                        <div className="flex items-center mt-2">
                                            <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            <span className="ml-1 text-sm text-gray-500">{user.residence_municipality}</span>
                                        </div>
                                    </div>


                                    
                                </div>
                            </div>

                            {/* Sección de Tienda */}
                            <div className="w-full max-w-full p-10 mx-auto mb-10 bg-white rounded-lg shadow">
                                <div className="flex items-center justify-between mb-4">
                                    {!tienda ? (
                                        <Link
                                            href={route('dashboard.artesano.create-tienda')}
                                            className="inline-flex items-center px-4 py-2 bg-[rgb(60,47,47)] text-white rounded-md hover:bg-[rgb(43,31,31)] transition-colors duration-200"
                                        >
                                            Crear Tienda
                                        </Link>
                                    ) : (
                                        <Link
                                            href={route('dashboard.artesano.gestionar-tienda')}
                                            className="inline-flex items-center px-4 py-2 bg-[rgb(60,47,47)] text-white rounded-md hover:bg-[rgb(43,31,31)] transition-colors duration-200 no-underline text-sm"
                                        >
                                            Gestionar Tienda
                                        </Link>
                                    )}
                                </div>
                                {tienda && (
                                    <div className="space-y-4">
                                        <div className="flex items-center space-x-4">
                                            <div className="flex-shrink-0">
                                                <div className="relative flex items-center justify-center w-16 h-16 overflow-hidden bg-white border-2 border-gray-200 rounded-full">
                                                    {tienda.foto_perfil ? (
                                                        <img
                                                            src={tienda.foto_perfil.startsWith('http') ? tienda.foto_perfil : `/storage/${tienda.foto_perfil}`}
                                                            alt={tienda.nombre}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    ) : (
                                                        <span className="text-xl font-medium text-gray-600">
                                                            {tienda.nombre ? tienda.nombre.charAt(0) : '?'}
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <div>
                                                <h3 className="text-lg font-medium text-gray-900">{tienda.nombre}</h3>
                                                <p className="text-sm text-gray-500">{tienda.municipio_venta}</p>
                                            </div>
                                        </div>
                                        <div className="pt-4 border-t border-gray-200">
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
                                )}
                            </div>

                            <div className="w-full max-w-full p-10 mx-auto bg-white rounded-lg shadow">
                                <h3 className="mb-4 text-lg font-semibold">Información de Contacto:</h3>
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
                                <div className="w-full max-w-full p-10 mx-auto mt-10 bg-white rounded-lg shadow">
                                    <h2 className="mb-4 text-lg font-semibold">Ubicación</h2>
                                    <div className="w-full h-64 overflow-hidden rounded-lg">
                                        <Maps position={location} />
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Columna derecha - Estadísticas y productos */}
                        <div className="lg:col-span-3">
                            {/* Estadísticas */}
                            <div className="p-6 mb-6 bg-white rounded-lg shadow">
                                <h2 className="mb-4 text-lg font-semibold">Actividad</h2>
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
                                    <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-500">Total Productos</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_productos}</p>
                                    </div>
                                    <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-500">Total Ventas</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_ventas}</p>
                                    </div>
                                    <div className="flex flex-col items-center p-4 rounded-lg bg-gray-50">
                                        <p className="text-sm text-gray-500">Total Pedidos</p>
                                        <p className="text-2xl font-bold text-indigo-600">{stats.total_pedidos}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Pedidos */}
                            <div className="bg-white rounded-lg shadow p-6 mb-6">
                                <h2 className="text-lg font-semibold mb-4">Pedidos Recibidos</h2>
                                {stats.pedidos && stats.pedidos.length === 0 ? (
                                    <p className="text-gray-500">No hay pedidos pendientes</p>
                                ) : (
                                    <div className="space-y-4">
                                        {stats.pedidos && stats.pedidos.map((pedido) => (
                                            <div key={pedido.id_pedido} className="border border-gray-200 rounded-lg p-4">
                                                <div className="flex justify-between items-start mb-4">
                                                    <div className="flex-1">
                                                        <h3 className="font-semibold mb-3">Pedido #{pedido.id_pedido}</h3>

                                                        {/* Información del cliente */}
                                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600 mb-3">
                                                            <div>
                                                                <span className="font-medium">Cliente:</span> {pedido.cliente?.name} {pedido.cliente?.last_name}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Teléfono:</span> {pedido.cliente?.phone}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Email:</span> {pedido.cliente?.email}
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">N° de guía:</span> 123456789012
                                                            </div>
                                                            <div>
                                                                <span className="font-medium">Método:</span> {pedido.metodo_entrega === 'contra_entrega' ? 'Contra Entrega' : 'Envío a Domicilio'}
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
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
                                                                <select
                                                                    value={pedido.estado}
                                                                    onChange={(e) => updatePedidoStatus(pedido.id_pedido, e.target.value)}
                                                                    className="border border-gray-300 rounded px-3 py-1 text-xs"
                                                                >
                                                                    <option value="pendiente">Cambiar estado</option>
                                                                    <option value="confirmado">Confirmado</option>
                                                                    <option value="enviado">Enviado</option>
                                                                    <option value="entregado">Entregado</option>
                                                                    <option value="cancelado">Cancelado</option>
                                                                </select>
                                                            </div>
                                                        </div>

                                                        {/* Resumen de costos y productos */}
                                                        <div className="bg-gray-50 rounded-lg p-3 border">
                                                            <div className="space-y-3">
                                                                {/* Productos del pedido */}
                                                                <div>
                                                                    <div className="text-sm font-medium text-gray-700 mb-2">Productos:</div>
                                                                    <div className="space-y-2">
                                                                        {pedido.detalles && pedido.detalles.map((detalle, index) => (
                                                                            <div key={index} className="text-sm text-gray-600">
                                                                                <div>{detalle.nombre_producto} (x{detalle.cantidad})</div>
                                                                                <div className="text-right font-medium">{formatCurrency(detalle.subtotal)}</div>
                                                                            </div>
                                                                        ))}
                                                                    </div>
                                                                </div>

                                                                {/* Línea separadora */}
                                                                <div className="border-t border-gray-300"></div>

                                                                {/* Resumen de costos */}
                                                                <div className="space-y-2 text-sm">
                                                                    <div className="flex justify-between">
                                                                        <span className="font-medium">Costo envío:</span>
                                                                        <span>{formatCurrency(pedido.costo_envio || 0)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between">
                                                                        <span className="font-medium">Subtotal productos:</span>
                                                                        <span>{formatCurrency(pedido.subtotal_productos || pedido.detalles?.reduce((sum, d) => sum + d.subtotal, 0) || 0)}</span>
                                                                    </div>
                                                                    <div className="flex justify-between border-t pt-2 border-gray-300">
                                                                        <span className="font-medium">Total:</span>
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
                                )}
                            </div>

                            {/* Productos */}
                            <div className="w-full p-6 mx-auto bg-white rounded-lg shadow max-w-7xl">
                                <div className="flex flex-wrap items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold">Mis Productos</h2>
                                    <div className="flex items-center gap-2 ">
                                        <Link
                                            href={route('dashboard.artesano.create-producto')}
                                            className="inline-flex items-center p-2 bg-[rgb(60,47,47)] text-white rounded-md hover:bg-[rgb(43,31,31)] transition-colors duration-200 no-underline text-md md:text-base"
                                        >
                                            Agregar Producto
                                        </Link>
                                        {/* Botón para mostrar el modal de venta */}
                                        <button onClick={() => setShowSaleModal(true)} className="inline-flex items-center px-4 py-2 bg-[rgb(60,47,47)] text-white rounded-md hover:bg-[rgb(43,31,31)] transition-colors duration-200 no-underline text-md md:text-base">
                                            Vender
                                        </button>

                                    </div>
                                </div>
                                {/* Condición para mostrar la modal de venta */}
                                {showSaleModal && (
                                    //Sale es un componente, que es basicamente la modal de ventas, este recibe 5 props, como se ve acontinuación. 
                                     <Sale onClose={() => setShowSaleModal(false)} products={selectedProducts} onDeleteProduct={handleDeleteProduct} onClearBasket={handleClearBasket} onQuantityChange={handleQuantityChange} />
                                )}

                                <div  className="grid w-full grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-2">
                                    {stats.productos.map((producto) => {
                                        // Depuración en consola
                                        console.log(`Producto ${producto.id} - Imágenes:`, producto.imagenes);
                                        
                                        // Obtener la imagen principal o la primera imagen
                                        const imagenPrincipal = producto.imagenes?.find(img => img.es_principal) || producto.imagenes?.[0];
                                        
                                        const imagenes = producto.imagenes || [];
                                        const currentImg = carouselIndexes[producto.id] || 0;

                                        return (
                                            <div key={producto.id} className="relative flex-col w-full overflow-auto transition-all duration-300 bg-white border rounded-lg shadow over overflow- hover:cursor-pointer hover:-translate-y-1 hover:shadow-md md:flex-row">
                                                {/* Icono de cantidad seleccionada del producto */}
                                                {/* Si el producto que está siendo renderizado está en la canasta (selectedProducts), siginifica que fue seleccionado, por ende se muestra el icono de cantidad, de lo contrario no se muestra */}
                                                { selectedProducts.find(p => p.id === producto.id) && <div className='absolute flex justify-center w-8 h-8 px-1 py-2 text-gray-800 transition-colors duration-200 bg-gray-200 rounded-md top-2 right-2 hover:bg-gray-300'>
                                                    <p className='text-sm'>{
                                                        //Con esta línea de código se obtiene la cantidad seleccionad del producto. 
                                                        //Básicamente lo que hace es que mediante la función find se busca el producto en la canasta, si ese producto que está siendo renderizado actualmente se encuentra en la canasta, se obtiene la cantidad seleccionada de ese producto, de lo contrario, no se obtiene nada.
                                                        selectedProducts.find(p => p.id === producto.id)?.cantidad || ''
                                                    }</p>
                                                </div> }
                                                {/* Carrusel de imágenes */}
                                                <div className="flex items-center justify-center w-full h-48 bg-gray-100 hoverflow-hiddecoration-purple-50">
                                                    {imagenes.length > 0 && (
                                                        <>
                                                            <img
                                                                src={getImageUrl(imagenes[currentImg]?.ruta_imagen)}
                                                                alt={producto.nombre}
                                                                className="object-contain w-full h-full"
                                                                onError={handleImageError}
                                                            />
                                                            {imagenes.length > 1 && (
                                                                <>
                                                                    <button
                                                                        onClick={() => handlePrev(producto.id, imagenes.length)}
                                                                        className="absolute left-2 top-1/2 -translate-y-1/2 border border-[#4B3A3A] text-[#4B3A3A] rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-[#4B3A3A] hover:text-white transition-colors"
                                                                        aria-label="Anterior"
                                                                    >
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" /></svg>
                                                                    </button>
                                                                    <button
                                                                        onClick={() => handleNext(producto.id, imagenes.length)}
                                                                        className="absolute right-2 top-1/2 -translate-y-1/2 border border-[#4B3A3A] text-[#4B3A3A] rounded-full p-1 w-8 h-8 flex items-center justify-center hover:bg-[#4B3A3A] hover:text-white transition-colors"
                                                                        aria-label="Siguiente"
                                                                    >
                                                                        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" /></svg>
                                                                    </button>
                                                                    <div className="absolute flex gap-1 -translate-x-1/2 bottom-2 left-1/2">
                                                                        {imagenes.map((_, idx) => (
                                                                            <span
                                                                                key={idx}
                                                                                className={`inline-block w-2 h-2 rounded-full ${idx === currentImg ? 'bg-[#4B3A3A]' : 'bg-gray-300'}`}
                                                                            />
                                                                        ))}
                                                                    </div>
                                                                </>
                                                            )}
                                                        </>
                                                    )}
                                                </div>
                                                
                                                <div className="relative flex flex-col justify-between p-4">
                                                    <div>
                                                        <h4 className="text-lg font-medium text-gray-900">{producto.nombre}</h4>
                                                        <p className="mt-1 text-sm text-gray-500 line-clamp-2">{producto.descripcion}</p>
                                                        <div className="grid grid-cols-2 mt-4 sm:grid-cols-2 gap-x-4 gap-y-2">
                                                            <p className="text-sm">
                                                                <span className="font-medium">Precio:</span> ${producto.precio.toLocaleString()}
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Cantidad:</span> {producto.cantidad_disponible}
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Categoría:</span>{' '}
                                                                <span className="capitalize">{producto.categoria?.nombre || 'Sin categoría'}</span>
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Técnica:</span>{' '}
                                                                <span className="capitalize">{producto.tecnica?.nombre || 'No especificado'}</span>
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Materia Prima:</span>{' '}
                                                                <span className="capitalize">{producto.material?.nombre || 'No especificado'}</span>
                                                            </p>
                                                            <p className="text-sm">
                                                                <span className="font-medium">Color:</span>{' '}
                                                                <span className="capitalize">{producto.color || 'No especificado'}</span>
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-wrap gap-2 mt-2">
                                                        <Link
                                                            href={route('dashboard.artesano.edit-producto', producto.id)}
                                                            className="flex items-center justify-center flex-1 p-2 text-xs font-semibold tracking-widest text-white uppercase bg-gray-800 border border-transparent rounded-md hover:bg-gray-700"
                                                        >
                                                            Editar
                                                        </Link>
                                                        <button
                                                            onClick={() => {
                                                                if (confirm('¿Está seguro de que desea eliminar este producto?')) {
                                                                    router.delete(route('dashboard.artesano.delete-producto', producto.id), {
                                                                        onError: (errors) => {
                                                                            if (errors.delete) {
                                                                                alert(errors.delete);
                                                                            } else {
                                                                                alert('Error al eliminar el producto');
                                                                            }
                                                                        }
                                                                    });
                                                                }
                                                            }}
                                                            className="flex-1 p-2 text-xs font-semibold tracking-widest text-white uppercase bg-red-600 border border-transparent rounded-md hover:bg-red-700"
                                                        >
                                                            Eliminar
                                                        </button>
                                                        <button onClick={() => addProduct(producto) } className="w-full p-2 text-xs font-semibold tracking-widest text-white uppercase bg-green-600 border border-transparent rounded-md buttom-0 hover:bg-green-700 lg:w-auto">
                                                            Agregar a la canasta
                                                        </button>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>


                            
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}