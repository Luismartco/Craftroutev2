import React from 'react';

const FeaturedProductCard = ({image, title, description}) => {
    return (
        <article className='bg-white shadow-lg rounded-2xl overflow-hidden mb-6 mx-auto hover:-translate-y-2 transition-all duration-500 w-full max-w-md sm:max-w-lg border border-gray-100'>
            <div className='relative'>
                {/* Imagen con overlay y badge */}
                <div className='relative h-48 overflow-hidden'>
                    <img 
                        src={image} 
                        alt="Featured Product" 
                        className='w-full h-full object-cover transition-transform duration-700 hover:scale-110'
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F1F]/40 via-transparent to-transparent"></div>
                    <div className="absolute top-4 left-4">
                        <span className="bg-[#4B3A3A] text-white px-3 py-1 rounded-full text-xs font-medium">
                            Destacado
                        </span>
                    </div>
                </div>
                
                {/* Contenido */}
                <div className='p-6'>
                    <h3 className='text-xl font-bold mb-4 text-[#2B1F1F] leading-tight'>{title}</h3>
                    <div className='bg-[#f5f5f5] rounded-xl p-4 border-l-4 border-[#4B3A3A]'>
                        <p className='text-gray-700 text-sm leading-relaxed'>{description}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FeaturedProductCard;