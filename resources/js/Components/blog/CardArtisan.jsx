import React from "react";
import WhatsAppIcon from '../../../media/blog/whatsapp-icon.png';

const CardArtisan = ({ imageArtisan, nameArtisan, location, description, contact }) => {
    const shortDescription = description.length > 150
        ? description.substring(0, 150) + '...'
        : description;

    return (
        <article className="bg-white shadow-md rounded-lg overflow-hidden w-full h-60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex h-full">
                {/* Imagen a la izquierda */}
                <div className="w-1/4 h-full">
                    {imageArtisan ? (
                        <img
                            src={imageArtisan}
                            alt={`Imagen de ${nameArtisan}`}
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                            <span className="text-gray-500 text-xs">Sin imagen</span>
                        </div>
                    )}
                </div>

                {/* Contenido */}
                <div className="flex-1 p-4 flex flex-col justify-between">
                    <div className="flex flex-wrap gap-4 text-sm">
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#2B1F1F]">Nombre:</span>
                            <span className="text-gray-700">{nameArtisan}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="font-semibold text-[#2B1F1F]">Ubicación:</span>
                            <span className="text-gray-700">{location}</span>
                        </div>
                    </div>

                    <div className="w-full h-0.5 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] my-2 rounded-full"></div>

                    <p className="text-sm text-gray-600 leading-relaxed">{shortDescription}</p>

                    {/* Botón de WhatsApp más visible */}
                    <div className="flex justify-end mt-2">
                        <a
                            href={`https://wa.me/${contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 bg-green-100 text-green-700 hover:bg-green-200 px-4 py-2 rounded-md shadow-sm text-sm font-semibold transition-all duration-200"
                        >
                            <img 
                                src={WhatsAppIcon} 
                                alt="WhatsApp Icon" 
                                className="w-5 h-5"
                            />
                            <span>WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CardArtisan;
