import React from 'react';

const FeaturedProductCard = ({image, title, description}) => {
    return (
        <article className='bg-[#ededee] shadow-md overflow-hidden mb-6 mx-auto hover:-translate-y-1 transition-transform duration-300 ease-in-out w-full max-w-md sm:max-w-lg'>
            <div className='flex'>
                <img 
                    src={image} 
                    alt="Featured Product" 
                    className='u-full md:w-1/2 h-auto object-cover'
                />
                <div className='p-4 flex flex-col space-y-10'>
                    <h3 className='text-lg font-bold mb-2'>{title}</h3>
                    <div className='flex flex-col'>
                        <p className='text-sm text-gray-700 mb-2'>{description}</p>
                    </div>
                </div>
            </div>
        </article>
    )
}

export default FeaturedProductCard;