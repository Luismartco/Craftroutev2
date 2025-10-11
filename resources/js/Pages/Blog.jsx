// Blog.js (página principal)
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

import ImageStore from '../../media/blog/store.png';
import ImageArtisan from '../../media/blog/artisan.jpg';
import FeaturedProduct from '../../media/blog/hat.jpg'; 

import CardArtisan from '@/Components/blog/CardArtisan';
import HeroSection from '@/Components/blog/HeroSection';
import LocationCard from '@/Components/blog/LocationCard';
import FeaturedProductCard from '@/Components/blog/FeaturedProductCard';
import VideoSampleCard from '@/Components/blog/VideoSampleCard';
import Prod from '@/Components/home/Prod';
import Maps from '@/Components/home/Maps';

export default function Blog({ tienda, artesano, productos }) {
    return (
        <GuestLayout fullWidth={true} className='flex flex-col bg-[#f5f5f5]'>
            <Head title={tienda?.nombre ? `Tienda: ${tienda.nombre}` : 'Tienda'} />

            {/* HERO */}
            <HeroSection
                ImageStore={tienda?.foto_perfil ? `/storage/${tienda.foto_perfil}` : null}
                NameStore={tienda?.nombre || 'Tienda'}
                Location={`${tienda?.barrio || ''}${tienda?.barrio ? ', ' : ''}${tienda?.municipio_venta || ''}`}
            />

            {/* SECCIÓN DESTACADA */}
            <section className='py-10 max-w-10xl mx-auto px-5'>
                <div className="text-center mb-10">
                    <h2 className='text-3xl font-bold text-[#2B1F1F] mb-4'>
                        Conoce Nuestros Artesanos
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-9 items-stretch">
                    <div className="">
                        <CardArtisan
                            imageArtisan={artesano?.profile_photo_url || null}
                            nameArtisan={`${artesano?.name || ''} ${artesano?.last_name || ''}`.trim() || 'Artesano'}
                            location={`${tienda?.barrio || ''}${tienda?.barrio ? ', ' : ''}${tienda?.municipio_venta || ''}`}
                            contact={tienda?.telefono || ''}
                            description={artesano?.bio || 'Artesano de la región con productos hechos a mano.'}
                        />
                    </div>

                    <div className="">
                        <LocationCard />
                    </div>

                    <div className="">
                        <FeaturedProductCard 
                            image={FeaturedProduct}
                            title='Sombrero Vueltiao "Tradición Zenú"'
                            description='Tejido a mano con caña flecha por artesanos del resguardo indígena Zenú, en Morroa. Cada diseño cuenta una historia cultural.'
                        />
                    </div>

                    <div className="">
                        <VideoSampleCard
                            title='Sombrero Vueltiao "Tradición Zenú"'
                            videoUrl="https://www.youtube.com/watch?v=CLGdBdYQguE"
                        />
                    </div>
                </div>

                {/* BOTÓN VER MÁS */}
                <section className="py-8 bg-[#f5f5f5]">
                    <div className="flex justify-center">
                        <button className="px-8 py-3 bg-[#2B1F1F] text-white text-sm md:text-base rounded-full shadow-md hover:bg-[#3b2d2d] transition-colors duration-300">
                            Ver más
                        </button>
                    </div>
                </section>
            </section>

            {/* SECCIÓN DE PRODUCTOS */}
            <section className='bg-white py-16 px-5'>
                <div className="text-center mb-12">
                    <h2 className='text-4xl font-bold text-[#2B1F1F] mb-4'>
                        Nuestros Productos Destacados
                    </h2>
                    <p className="text-gray-600 max-w-2xl mx-auto mb-6">
                        Descubre nuestra selección de productos artesanales únicos, 
                        elaborados con técnicas tradicionales y materiales de la más alta calidad.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
                </div>
                
                <Prod productos={productos || []} user={artesano} />
            </section>
        </GuestLayout>
    );
}
