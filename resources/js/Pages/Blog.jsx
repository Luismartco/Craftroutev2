import React, { useState } from 'react';
import { Head } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function Blog() {
    const [selectedCategory, setSelectedCategory] = useState('todos');

    // Datos de ejemplo para productos
    const productos = [
        {
            id: 1,
            nombre: 'Mochila Wayúu Tradicional',
            descripcion: 'Mochila tejida a mano con hilos de algodón, siguiendo las técnicas ancestrales wayúu.',
            precio: 120000,
            categoria: 'tejido',
            imagen: 'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2076&q=80',
            artesano: 'María González',
            municipio: 'Morroa'
        },
        {
            id: 2,
            nombre: 'Jarrón de Cerámica',
            descripcion: 'Jarrón artesanal elaborado con arcilla local y decorado con pigmentos naturales.',
            precio: 85000,
            categoria: 'ceramica',
            imagen: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2045&q=80',
            artesano: 'Juan Pérez',
            municipio: 'Sampues'
        },
        {
            id: 3,
            nombre: 'Collar de Semillas',
            descripcion: 'Collar artesanal elaborado con semillas naturales y cuentas de madera.',
            precio: 45000,
            categoria: 'joyeria',
            imagen: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            artesano: 'Ana Martínez',
            municipio: 'Morroa'
        },
        {
            id: 4,
            nombre: 'Mesa de Madera Tallada',
            descripcion: 'Mesa de madera tallada a mano con diseños tradicionales de la región.',
            precio: 350000,
            categoria: 'madera',
            imagen: 'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
            artesano: 'Carlos Rodríguez',
            municipio: 'Sampues'
        }
    ];

    const categorias = [
        { id: 'todos', nombre: 'Todos' },
        { id: 'tejido', nombre: 'Tejido' },
        { id: 'ceramica', nombre: 'Cerámica' },
        { id: 'joyeria', nombre: 'Joyería' },
        { id: 'madera', nombre: 'Madera' }
    ];

    const productosFiltrados = selectedCategory === 'todos' 
        ? productos 
        : productos.filter(p => p.categoria === selectedCategory);

    return (
        <GuestLayout>
            <Head title="Blog - Artesanías" />

            {/* Hero Section */}
            <div className="relative bg-indigo-800">
                <div className="absolute inset-0">
                    <img
                        className="w-full h-full object-cover"
                        src="https://images.unsplash.com/photo-1513519245088-0e12902e5a38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
                        alt="Artesanías"
                    />
                    <div className="absolute inset-0 bg-indigo-800 mix-blend-multiply" />
                </div>
                <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
                    <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
                        Descubre Nuestras Artesanías
                    </h1>
                    <p className="mt-6 text-xl text-indigo-100 max-w-3xl">
                        Explora la riqueza cultural de nuestra región a través de piezas únicas elaboradas por artesanos locales.
                    </p>
                </div>
            </div>

            {/* Filtros */}
            <div className="bg-white py-6">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap justify-center gap-4">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria.id}
                                onClick={() => setSelectedCategory(categoria.id)}
                                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 ${
                                    selectedCategory === categoria.id
                                        ? 'bg-indigo-600 text-white'
                                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                                }`}
                            >
                                {categoria.nombre}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Grid de Productos */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                    {productosFiltrados.map((producto) => (
                        <div key={producto.id} className="bg-white rounded-lg shadow-lg overflow-hidden transform transition duration-300 hover:scale-105">
                            <div className="relative h-48">
                                <img
                                    src={producto.imagen}
                                    alt={producto.nombre}
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute top-2 right-2 bg-white px-2 py-1 rounded-full text-xs font-medium text-gray-600">
                                    {producto.categoria}
                                </div>
                            </div>
                            <div className="p-6">
                                <h3 className="text-lg font-semibold text-gray-900 mb-2">{producto.nombre}</h3>
                                <p className="text-gray-600 text-sm mb-4">{producto.descripcion}</p>
                                <div className="flex justify-between items-center">
                                    <span className="text-indigo-600 font-bold">${producto.precio.toLocaleString()}</span>
                                    <div className="text-sm text-gray-500">
                                        <p>Artesano: {producto.artesano}</p>
                                        <p>Municipio: {producto.municipio}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Sección de Artesanos Destacados */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-8">Artesanos Destacados</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[1, 2, 3].map((index) => (
                            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                                <div className="p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="h-16 w-16 rounded-full bg-indigo-100 flex items-center justify-center">
                                            <span className="text-2xl font-medium text-indigo-600">
                                                {['M', 'J', 'A'][index - 1]}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-gray-900">
                                                {['María González', 'Juan Pérez', 'Ana Martínez'][index - 1]}
                                            </h3>
                                            <p className="text-sm text-gray-500">
                                                {['Tejedora Wayúu', 'Ceramista', 'Joyera'][index - 1]}
                                            </p>
                                        </div>
                                    </div>
                                    <p className="mt-4 text-gray-600">
                                        {[
                                            'Especialista en tejidos tradicionales wayúu con más de 20 años de experiencia.',
                                            'Maestro ceramista que preserva las técnicas ancestrales de la región.',
                                            'Creadora de joyería artesanal con materiales naturales y sostenibles.'
                                        ][index - 1]}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Newsletter */}
            <div className="bg-indigo-700">
                <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center">
                    <div className="lg:w-0 lg:flex-1">
                        <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
                            Suscríbete a nuestro boletín
                        </h2>
                        <p className="mt-3 max-w-3xl text-lg text-indigo-200">
                            Recibe las últimas novedades sobre artesanías, eventos y talleres.
                        </p>
                    </div>
                    <div className="mt-8 lg:mt-0 lg:ml-8">
                        <form className="sm:flex">
                            <label htmlFor="email-address" className="sr-only">
                                Correo electrónico
                            </label>
                            <input
                                id="email-address"
                                name="email-address"
                                type="email"
                                autoComplete="email"
                                required
                                className="w-full px-5 py-3 border border-transparent placeholder-gray-500 focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white focus:border-white sm:max-w-xs rounded-md"
                                placeholder="Ingresa tu correo"
                            />
                            <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3 sm:flex-shrink-0">
                                <button
                                    type="submit"
                                    className="w-full flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-indigo-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-indigo-700 focus:ring-white"
                                >
                                    Suscribirse
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </GuestLayout>
    );
}