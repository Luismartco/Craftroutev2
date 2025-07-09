import React from 'react';

const HeroSection = ({ImageStore, NameStore, Location}) => {
    return (
        <div className='flex flex-col w-full justify-center bg-gradient-to-b from-[#f5f5f5] to-white'>
            <section className='flex flex-col items-center w-full mx-auto px-6 py-12 relative'>
                <div className='relative max-w-4xl mx-auto'>
                    <div className='flex flex-col lg:flex-row items-center gap-8 relative z-10'>
                        <div className='relative group'>
                            <img 
                                className='rounded-2xl shadow-2xl hover:scale-105 transition-all duration-500 w-72 h-72 object-cover border-4 border-white' 
                                src={ImageStore} 
                                alt="image store" 
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F1F]/20 to-transparent rounded-2xl"></div>
                        </div>
                        
                        <div className='flex flex-col items-center lg:items-start text-center lg:text-left'>
                            <div className="mb-4">
                                <span className="bg-[#4B3A3A] text-white px-4 py-2 rounded-full text-sm font-medium">
                                    Artesanía Tradicional
                                </span>
                            </div>
                            <h1 className="text-4xl lg:text-5xl font-extrabold text-[#2B1F1F] mb-4 leading-tight">
                                Tienda <span className="text-[#4B3A3A]">{NameStore}</span>
                            </h1>
                            <p className="text-lg text-gray-600 mb-6 max-w-md">
                                {Location}
                            </p>
                            <div className="flex gap-2">
                                <div className="w-3 h-3 bg-[#4B3A3A] rounded-full"></div>
                                <div className="w-3 h-3 bg-[#2B1F1F] rounded-full"></div>
                                <div className="w-3 h-3 bg-gray-400 rounded-full"></div>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Elemento decorativo de fondo */}
                <div className='absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] rounded-t-[3rem] opacity-10'></div>
            </section> 
        </div> 
    );
}

export default HeroSection;