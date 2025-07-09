import React from 'react';

const HeroSection = ({ImageStore, NameStore, Location}) => {
    return (
        <div className='flex flex-col w-full justify-center bg-gradient-to-b from-[#f5f5f5] to-white'>
            <section className='flex flex-col items-center w-full mx-auto px-6 py-8 relative'>
                <div className='relative max-w-4xl mx-auto'>
                    <div className='flex flex-col lg:flex-row items-center gap-6 relative z-10'>
                        <div className='relative group'>
                            <img 
                                className='rounded-xl shadow-lg hover:scale-105 transition-all duration-300 w-48 h-48 object-cover border-2 border-white' 
                                src={ImageStore} 
                                alt="image store" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F1F]/15 to-transparent rounded-xl"></div>
                        </div>
                        
                        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                            <div className="mb-3">
                                <span className="bg-[#4B3A3A] text-white px-3 py-1 rounded-full text-xs font-medium">
                                    Artesanía Tradicional
                                </span>
                            </div>
                            <h1 className="text-2xl lg:text-3xl font-extrabold text-[#2B1F1F] mb-3 leading-tight">
                                Tienda <span className="text-[#4B3A3A]">{NameStore}</span>
                            </h1>
                            <p className="text-base text-gray-600 mb-4 max-w-md">
                                {Location}
                            </p>
                            <div className="flex gap-1.5">
                                <div className="w-2 h-2 bg-[#4B3A3A] rounded-full"></div>
                                <div className="w-2 h-2 bg-[#2B1F1F] rounded-full"></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Elemento decorativo de fondo */}
                <div className='absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] rounded-t-2xl opacity-10'></div>
            </section> 
        </div> 
    );
}

export default HeroSection;