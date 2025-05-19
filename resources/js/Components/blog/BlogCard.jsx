import React from 'react';

const BlogCard = ({image, title, nameArtisan, nameStore, description}) => {
    return (
        <article className='flex anima flex-col md:flex-row bg-[#ededee] shadow-md rounded-lg overflow-hidden mb-6 max-w-sm mx-auto hover:scale-105 transition-transform duration-300 ease-in-out'>
            <img 
            src={image} 
            alt={title} 
            className='u-full md:w-1/2 h-auto object-cover'
            />
            <div className='p-4 flex flex-col justify-between'>
                <h2 className='text-lg font-semibold mb-2' >{title}</h2>
                <div className='text-sm text-gray-700 space-y-0'> 
                    <p><span className='font-bold'>{nameArtisan} </span></p>
                    <p>Tienda: <span className='font-bold'>{nameStore} </span></p>
                    <p>{description}</p>
                </div>
            </div>
        </article>    
    );
}

export default BlogCard;