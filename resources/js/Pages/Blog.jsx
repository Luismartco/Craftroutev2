// Blog.js (página principal) - Diseño Moderno y Elegante
import React, { useState, useMemo } from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, usePage } from '@inertiajs/react';

import CardArtisan from '@/Components/blog/CardArtisan';
import HeroSection from '@/Components/blog/HeroSection';
import LocationCard from '@/Components/blog/LocationCard';
import FeaturedProductCard from '@/Components/blog/FeaturedProductCard';
import VideoSampleCard from '@/Components/blog/VideoSampleCard';
import Prod from '@/Components/home/Prod';
import Maps from '@/Components/home/Maps';

export default function Blog({ tienda, artesano, productos, featuredContent, categorias }) {
     const { auth } = usePage().props;

     // Filter states
     const [searchTerm, setSearchTerm] = useState('');
     const [selectedCategory, setSelectedCategory] = useState('');
     const [selectedPriceRange, setSelectedPriceRange] = useState('');

    // Filtered products based on search and filters
    const filteredProducts = useMemo(() => {
        if (!productos) return [];

        return productos.filter(producto => {
            // Search filter
            if (searchTerm && !producto.nombre.toLowerCase().includes(searchTerm.toLowerCase())) {
                return false;
            }

            // Category filter
            if (selectedCategory && producto.categoria_id != selectedCategory) {
                return false;
            }

            // Price range filter
            if (selectedPriceRange) {
                const [min, max] = selectedPriceRange.split('-');
                const precio = Number(producto.precio);
                if (min && precio < Number(min)) return false;
                if (max && max !== '' && precio > Number(max)) return false;
            }

            return true;
        });
    }, [productos, searchTerm, selectedCategory, selectedPriceRange]);

    return (
        <GuestLayout auth={auth} fullWidth={true} className='flex flex-col bg-gradient-to-br from-slate-50 via-white to-amber-50'>
            <Head title={tienda?.nombre ? `Tienda: ${tienda.nombre}` : 'Tienda'} />

            {/* HERO SECTION - Modernizado */}
            <div className="relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-100/20 via-transparent to-orange-100/20"></div>
                <HeroSection
                    ImageStore={tienda?.foto_perfil ? `/storage/${tienda.foto_perfil}` : null}
                    NameStore={tienda?.nombre || 'Tienda'}
                    Location={`${tienda?.barrio || ''}${tienda?.barrio ? ', ' : ''}${tienda?.municipio_venta || ''}`}
                />
            </div>

            {/* SECCIÓN DESTACADA - Rediseño Moderno */}
            <section className='relative py-20 px-5 overflow-hidden'>
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                    <div className="absolute inset-0" style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C6B4A' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                    }}></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header Section */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-6 shadow-lg">
                            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                        </div>
                        <h2 className='text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-6'>
                            Conoce Nuestros Artesanos
                        </h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
                            Descubre las historias y tradiciones detrás de cada pieza artesanal
                        </p>
                        <div className="flex items-center justify-center space-x-2">
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                            <div className="w-3 h-3 bg-amber-400 rounded-full animate-pulse"></div>
                            <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Cards Grid - Modern Layout */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left Column */}
                        <div className="space-y-8">
                            {/* Artisan Card - Enhanced */}
                            <div className="group">
                                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden">
                                    <CardArtisan
                                        imageArtisan={artesano?.profile_photo_url || null}
                                        nameArtisan={`${artesano?.name || ''} ${artesano?.last_name || ''}`.trim() || 'Artesano'}
                                        location={`${tienda?.barrio || ''}${tienda?.barrio ? ', ' : ''}${tienda?.municipio_venta || ''}`}
                                        contact={tienda?.telefono || ''}
                                        description={artesano?.bio || 'Artesano de la región con productos hechos a mano.'}
                                    />
                                </div>
                            </div>

                            {/* Location Card - Enhanced */}
                            <div className="group">
                                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden">
                                    <LocationCard />
                                </div>
                            </div>
                        </div>

                        {/* Right Column */}
                        <div className="space-y-8">
                            {/* Featured Product Card - Enhanced */}
                            <div className="group">
                                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden">
                                    <FeaturedProductCard
                                        image={featuredContent?.featured_product_image ? `/storage/${featuredContent.featured_product_image}` : "https://via.placeholder.com/400x300?text=Producto+Destacado"}
                                        title={featuredContent?.featured_product_title || 'Producto Destacado'}
                                        description={featuredContent?.featured_product_description || 'Descripción del producto destacado.'}
                                    />
                                </div>
                            </div>

                            {/* Video Card - Enhanced */}
                            <div className="group">
                                <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-xl hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-white/50 overflow-hidden">
                                    <VideoSampleCard
                                        title={featuredContent?.video_title || 'Video Demo'}
                                        videoUrl={featuredContent?.video_url || "https://www.youtube.com/watch?v=CLGdBdYQguE"}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-br from-amber-200 to-orange-300 rounded-full opacity-20"></div>
                    <div className="absolute bottom-20 right-10 w-16 h-16 bg-gradient-to-br from-orange-200 to-amber-300 rounded-full opacity-20"></div>
                </div>
            </section>

            {/* SECCIÓN DE PRODUCTOS - Rediseño Moderno */}
            <section className='relative bg-gradient-to-br from-white via-amber-50/30 to-orange-50/30 py-24 px-5 overflow-hidden'>
                {/* Background Elements */}
                <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-br from-amber-100/20 to-orange-100/20 rounded-full blur-3xl"></div>
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-gradient-to-br from-orange-100/20 to-amber-100/20 rounded-full blur-3xl"></div>
                </div>

                <div className="max-w-7xl mx-auto relative z-10">
                    {/* Header */}
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full mb-8 shadow-2xl">
                            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                            </svg>
                        </div>
                        <h2 className='text-4xl md:text-6xl font-bold bg-gradient-to-r from-amber-800 via-orange-700 to-amber-800 bg-clip-text text-transparent mb-6'>
                            Nuestros Productos Destacados
                        </h2>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8 leading-relaxed">
                            Descubre nuestra selección de productos artesanales únicos,
                            elaborados con técnicas tradicionales y materiales de la más alta calidad.
                        </p>
                        <div className="flex items-center justify-center space-x-4">
                            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                            <div className="w-4 h-4 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full shadow-lg"></div>
                            <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full"></div>
                        </div>
                    </div>

                    {/* Custom Filters for Blog */}
                    <div className="mb-8 bg-white/60 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-6">
                        <div className="flex flex-wrap gap-6 justify-center">
                            {/* Barra de búsqueda */}
                            <div className="flex flex-col w-80">
                                <label className="mb-1 text-sm font-semibold text-gray-700">Buscar producto</label>
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
                                    placeholder="Escribe el nombre del producto..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                            </div>
                            {/* Filtro por Categoría */}
                            <div className="flex flex-col w-80">
                                <label className="mb-1 text-sm font-semibold text-gray-700">Categoría</label>
                                <select
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                >
                                    <option value="">Todas las categorías</option>
                                    {categorias && categorias.map(cat => (
                                        <option key={cat.id} value={cat.id.toString()}>{cat.nombre}</option>
                                    ))}
                                </select>
                            </div>
                            {/* Filtro por Precio */}
                            <div className="flex flex-col w-80">
                                <label className="mb-1 text-sm font-semibold text-gray-700">Rango de precios</label>
                                <select
                                    className="border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-[#4B3A3A]"
                                    value={selectedPriceRange}
                                    onChange={(e) => setSelectedPriceRange(e.target.value)}
                                >
                                    <option value="">Todos los precios</option>
                                    <option value="0-10000">Hasta $10.000</option>
                                    <option value="10001-50000">$10.001 - $50.000</option>
                                    <option value="50001-100000">$50.001 - $100.000</option>
                                    <option value="100001-200000">$100.001 - $200.000</option>
                                    <option value="200001-">Más de $200.000</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Products Component */}
                    <div className="bg-white/60 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/50 p-8 md:p-12">
                        <Prod productos={filteredProducts} user={artesano} showFilters={false} />
                    </div>
                </div>
            </section>
        </GuestLayout>
    );
}
