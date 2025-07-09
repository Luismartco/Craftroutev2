import React from 'react';

const LocationCard = () => {
    return (
        <article className='bg-[#ededee] shadow-md overflow-hidden mb-6 mx-auto hover:-translate-y-1 transition-transform duration-300 ease-in-out w-full max-w-md sm:max-w-lg'>
            <h4 className='font-bold mt-3 mb-2 text-center' >Ubicación de la tienda</h4>
            <iframe
            title="ubicación de la tienda"
            src="https://maps.app.goo.gl/4TCft453xqiKg8ua8"
            width="100%"
            height="265"
            style={{border: 0}}
            allowFullScreen=""
            loading='lazy'
            referrerPolicy="no-referrer-when-downgrade"
            >
            </iframe>
        </article>
    );
}

export default LocationCard;