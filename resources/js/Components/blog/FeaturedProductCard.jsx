import React from 'react';

const FeaturedProductCard = ({image, title, description}) => {
    return (
        <article className='bg-white shadow-md rounded-xl overflow-hidden w-full h-60 hover:-translate-y-1 transition-all duration-300 border border-gray-100'>
            <div className='flex h-full'>
                {/* Imagen compacta a la izquierda */}
                <div className='relative w-1/4 h-full overflow-hidden'>
                    <img 
                        src={image} 
                        alt="Featured Product" 
                        className='w-full h-full object-cover transition-transform duration-500 hover:scale-105'
                    />
                    <div className="absolute top-2 left-2">
                        <span className="bg-[#4B3A3A] text-white px-2 py-1 rounded-full text-xs font-medium">
                            Destacado
                        </span>
                    </div>
                </div>
                
                {/* Contenido expandido horizontalmente */}
                <div className='flex-1 p-4 flex flex-col justify-between'>
                    <div>
                        <h3 className='text-lg font-bold mb-2 text-[#2B1F1F] leading-tight'>{title}</h3>
                        <p className='text-gray-700 text-sm leading-relaxed'>{description}</p>
                    </div>
                     <div className="w-100 h-0.5 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] mx-auto rounded-full"></div>

                    {/* Botón de acción */}
                    <div className="flex justify-end">
                        <button className="bg-[#4B3A3A] hover:bg-[#2B1F1F] text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors duration-300 flex items-center gap-2">
                            Ver detalles
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FeaturedProductCard;