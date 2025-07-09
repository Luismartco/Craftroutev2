import React from 'react';

const LocationCard = () => {
    return (
        <article className="bg-white shadow-lg rounded-2xl overflow-hidden w-full h-60 hover:-translate-y-2 transition-all duration-500 border border-gray-100">
            <div className="flex h-full">
                {/* Información lateral compacta */}
                <div className="w-1/4 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] flex flex-col justify-center items-center p-4">
                    <div className="text-center">
                        <svg className="w-8 h-8 text-white mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <h3 className="text-white font-bold text-sm mb-1">Ubicación</h3>
                        <p className="text-gray-200 text-xs">San Blas, Morroa</p>
                    </div>
                </div>
                
                {/* Mapa expandido */}
                <div className="flex-1 p-3">
                    <div className="h-full rounded-lg overflow-hidden shadow-inner">
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
            </div>
        </article>
    );
};

export default LocationCard;