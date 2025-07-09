import React from 'react'

const ProductCard = ({productImage, name, price, stock}) => {
    return(
        <article className='bg-white shadow-lg rounded-2xl overflow-hidden mb-6 hover:scale-105 hover:-translate-y-2 transition-all duration-500 w-full h-full max-w-[280px] border border-gray-100 group'>
            <div className="relative overflow-hidden">
                <img 
                    src={productImage} 
                    alt="Product" 
                    className='w-full h-56 object-cover transition-transform duration-700 group-hover:scale-110' 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#2B1F1F]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="absolute top-3 right-3">
                    <span className="bg-white/90 text-[#2B1F1F] px-2 py-1 rounded-full text-xs font-medium">
                        {stock} disponible
                    </span>
                </div>
            </div>
            
            <div className='p-5'>
                <div className='text-gray-800 space-y-2 mb-4'>
                    <h3 className='text-lg font-semibold text-[#2B1F1F] leading-tight'>{name}</h3>
                    <div className="flex items-center gap-2">
                        <span className='text-2xl font-bold text-[#4B3A3A]'>${price}</span>
                    </div>
                </div>
                
                <button className='w-full bg-gradient-to-r from-[#2B1F1F] to-[#4B3A3A] text-white py-3 px-4 rounded-xl font-medium hover:from-[#4B3A3A] hover:to-[#2B1F1F] transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg'>
                    Ver detalle
                </button>
            </div>
        </article>
    );
}

export default ProductCard;