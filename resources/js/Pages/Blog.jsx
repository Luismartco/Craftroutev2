import React from 'react';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head } from '@inertiajs/react';
// imagenes
import ImageStore from  '../../media/blog/store.png';
import ImageArtisan from  '../../media/blog/artisan.jpg';
import FeaturedProduct from '../../media/blog/hat.jpg'; 
import ProductCard from '@/Components/blog/ProductCard';
// componentes
import CardArtisan from '@/Components/blog/CardArtisan';
import HeroSection from '@/Components/blog/HeroSection';
import LocationCard from '@/Components/blog/LocationCard';
import FeaturedProductCard from '@/Components/blog/FeaturedProductCard';
import VideoSampleCard from '@/Components/blog/VideoSampleCard';

export default function Blog() {

    const products = [
        {
            id: 1,
            name: 'Sombreo Vueltiao',
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
            image: 'https://tse3.mm.bing.net/th/id/OIP.dBxdKU0PLxNzyeZZDQENQQHaHa?r=0&rs=1&pid=ImgDetMain&o=7&rm=3',
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
        <GuestLayout fullWidth={true} className='flex flex-col flex-wrap'>
            <Head title="Blog" />
            
            <HeroSection 
                ImageStore={ImageStore} 
                NameStore="la mano de Dios" 
                Location="San Blas, Morroa"
            />
            <section className='mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-20 gap-y-2 max-w-5xl mx-auto'>
                
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
                        image = {FeaturedProduct}
                        title='Sombrero Vueltiao "Tradición Zenú"'
                        description='Este sombrero vueltiao está tejido a mano con caña flecha por artesanos del resguardo indígena Zenú, en Morroa, Sucre. Cada diseño representa una historia cultural, y puede tardar hasta 15 días en terminarse.'
                    />
                    <VideoSampleCard
                        title='Sombrero Vueltiao "Tradición Zenú"'
                        videoUrl="https://www.youtube.com/watch?v=OHh4RCw_BBk"
                    />
            </section>
            <div className='flex justify-center mt-10 mb-10'>
                <button className='text-white font-sans p-2 w-32 bg-[#2b1f1f] rounded-xl hover:bg-[#3c2f2f] hover:scale-105 transition-all duration-300'>
                Ver más
                </button>
            </div>

            <section className='px-5 py-10'>
                <h1 className='text-3xl font-bold text-center mb-3'>Productos</h1>
                <div className='flex flex-wrap w-full space-x-5 justify-center'>
                    {products.map(product => (
                        <ProductCard 
                            key={product.id}
                            productImage={product.image} 
                            name={product.name} 
                            price={product.price} 
                            stock={product.stock}
                        />
                    ))}
                </div>
            </section>
        </GuestLayout>
    );
}
