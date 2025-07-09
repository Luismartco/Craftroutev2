import React from 'react';

const LocationCard = () => {
    return (
        <article className="bg-white shadow-lg rounded-2xl overflow-hidden mb-6 mx-auto hover:-translate-y-2 transition-all duration-500 w-full border border-gray-100">
            {/* Título */}
            <div className="bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] p-6">
                <h4 className="font-bold text-white text-center text-xl flex items-center justify-center gap-2">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Ubicación de la tienda
                </h4>
            </div>

            {/* Mapa */}
            <div className="p-4">
                <div className="w-full rounded-xl overflow-hidden shadow-inner aspect-[4/3]">
                    <iframe
                        title="ubicación de la tienda"
                        src="https://maps.google.com/maps?q=9.3337,-75.3022&z=15&output=embed"
                        className="w-full h-full"
                        style={{ border: 0 }}
                        allowFullScreen=""
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                    />
                </div>
            </div>
        </article>
    );
};

export default LocationCard;
