import React from "react";
import WhatsAppIcon from '../../../media/blog/whatsapp-icon.png';

const CardArtisan = ({ imageArtisan, nameArtisan, speciality, location, contact, description }) => {
    return (
        <article className="bg-white shadow-md rounded-xl overflow-hidden mb-6 mx-auto w-full max-w-md sm:max-w-3xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
            <div className="flex flex-col sm:flex-row">
                {/* Imagen a la izquierda */}
                <div className="h-60 sm:h-auto sm:w-1/2">
                    <img 
                        src={imageArtisan} 
                        alt={`Imagen de ${nameArtisan}`} 
                        className="w-full h-full object-cover"
                    />
                </div>

                {/* Contenido a la derecha */}
                <div className="flex flex-col justify-between p-5 sm:w-1/2">
                    <div className="space-y-2 text-gray-800 text-sm">
                        <p><span className="font-semibold">Nombre:</span> {nameArtisan}</p>
                        <p><span className="font-semibold">Especialidad:</span> {speciality}</p>
                        <p><span className="font-semibold">Ubicación:</span> {location}</p>
                        <p><span className="font-semibold">Contacto:</span> {contact}</p>
                        <p><span className="font-semibold">Descripción:</span> {description}</p>
                    </div>

                    {/* Botón de WhatsApp centrado */}
                    <div className="flex justify-center sm:justify-start mt-4">
                        <a
                            href={`https://wa.me/${contact}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-green-600 hover:text-green-700"
                        >
                            <img 
                                src={WhatsAppIcon} 
                                alt="WhatsApp Icon" 
                                className="w-6 h-6"
                            />
                            <span className="text-sm font-medium">Contactar por WhatsApp</span>
                        </a>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default CardArtisan;
