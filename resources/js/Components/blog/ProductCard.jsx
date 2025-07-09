import React from 'react'

const ProductCard = ({productImage, name, price, stock}) => {
    return(
        <article className='bg-[#ededee] shadow-md mb-6 hover:scale-105 transition-transform duration-300 ease-in-out w-full h-full max-w-[269px] max-h-[450px] p-2'>
            <img 
            src={productImage} 
            alt="Product" 
            className='w-full h-full max-h-[246px] object-cover rounded-lg' />
           <div className='text-gray-800 space-y-0'>
            <p></p>
             <p className='text-md  mt-2'>{name}</p>
             <p className='text-md font-extrabold'>${price}</p>
             <p className='text-md'>{stock} disponible</p>
           </div>
            <div className='flex justify-center items-center mt-4'>
                <button className='bg-[#2b1f1f] text-white px-4 py-2 rounded-lg hover:bg-[#3c2f2f] transition-colors duration-300'>
                    Ver detalle
                </button>
            </div>
        </article>
    );
}

export default ProductCard;