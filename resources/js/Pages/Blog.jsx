// Blog.js (página principal)
import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';

import ImageStore from '../../media/blog/store.png';
import ImageArtisan from '../../media/blog/artisan.jpg';
import FeaturedProduct from '../../media/blog/hat.jpg'; 

import ProductCard from '@/Components/blog/ProductCard';
import CardArtisan from '@/Components/blog/CardArtisan';
import HeroSection from '@/Components/blog/HeroSection';
import LocationCard from '@/Components/blog/LocationCard';
import FeaturedProductCard from '@/Components/blog/FeaturedProductCard';
import VideoSampleCard from '@/Components/blog/VideoSampleCard';

import Prod from '@/Components/home/Prod';


export default function Blog() {

    const products = [
        {
            id: 1,
            name: 'Sombrero Vueltiao',
            price: '150.000',
            stock: 5,
            image: FeaturedProduct,
        },
        {
            id: 2,
            name: 'Hamaca',
            price: '120.000',
            stock: 10,
            image: 'https://www.vistaalmar.es/images/ampliadas4/hamaca-lovethesign.jpg',
        },
        {
            id: 3,
            name: 'Mochila Wayuu',
            price: '250.000',
            stock: 7,
            image: 'https://tse3.mm.bing.net/th/id/OIP.dBxdKU0PLxNzyeZZDQENQQENQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
        },
        {
            id: 4,
            name: 'Cesta Werregue',
            price: '90.000',
            stock: 15,
            image: 'https://i.etsystatic.com/11695661/r/il/7001e6/2378353649/il_600x600.2378353649_7qw1.jpg',
        },
    ];

    return (
        <GuestLayout fullWidth={true} className='flex flex-col bg-[#f5f5f5]'>
            <Head title="Blog" />

            {/* HERO */}
            <HeroSection 
                ImageStore={ImageStore} 
                NameStore="La Mano de Dios" 
                Location="San Blas, Morroa"
            />

            {/* SECCIÓN DESTACADA */}
            <section className='py-16 max-w-6xl mx-auto px-5'>
                <div className="text-center mb-12">
                    <h2 className='text-3xl font-bold text-[#2B1F1F] mb-4'>
                        Conoce Nuestros Artesanos
                    </h2>
                    <div className="w-24 h-1 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <CardArtisan 
                        imageArtisan={ImageArtisan} 
                        nameArtisan="María Hoyos" 
                        speciality="Artesanía en cerámica"
                        location="San Blas, Morroa"
                        contact="+57 301 2345678"
                        description="María es una artesana con más de 20 años de experiencia en la creación de piezas únicas de cerámica. Su trabajo ha sido reconocido a nivel nacional e internacional."
                    />
                    <LocationCard />

                    <FeaturedProductCard 
                        image={FeaturedProduct}
                        title='Sombrero Vueltiao "Tradición Zenú"'
                        description='Tejido a mano con caña flecha por artesanos del resguardo indígena Zenú, en Morroa. Cada diseño cuenta una historia cultural y puede tardar hasta 15 días en completarse.'
                    />
                    <VideoSampleCard
                        title='Sombrero Vueltiao "Tradición Zenú"'
                        videoUrl="https://www.youtube.com/watch?v=OHh4RCw_BBk"
                    />
                </div>
            </section>

            {/* BOTÓN VER MÁS */}
            <div className='flex justify-center mb-16'>
                <button className='text-white font-medium px-8 py-4 bg-gradient-to-r from-[#2B1F1F] to-[#4B3A3A] rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center gap-2'>
                    <span>Ver más</span>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </button>
            </div>

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
                <Prod />
            </section>
        </GuestLayout>
    );
}