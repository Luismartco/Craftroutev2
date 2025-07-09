import React from "react";
import WhatsAppIcon from '../../../media/blog/whatsapp-icon.png'; // Assuming you have a WhatsApp icon image

const CardArtisan = ({imageArtisan, nameArtisan, speciality, location, contact, description}) => {
    return (
        <article className='bg-[#ededee] shadow-md overflow-hidden mb-6 mx-auto hover:-translate-y-1 transition-transform duration-300 ease-in-out w-full max-w-md sm:max-w-lg'>
            <div className="flex">
                <img 
                    src={imageArtisan} 
                    alt={`Imagen de ${nameArtisan}`} 
                    className='u-full md:w-1/2 h-auto object-cover'
                />
                <div className='p-4 flex flex-col'>
                    <div className='text-sm text-gray-700 space-y-0'> 
                        <p></p>
                        <p><span className='font-bold'>Nombre: </span>{nameArtisan}</p>
                        <p><span className='font-bold' >Especialidad: </span> {speciality} </p>
                        <p><span className='font-bold'>Ubicación: </span> {location} </p>
                        <p><span className='font-bold'>Contacto: </span> {contact} </p>
                        <p><span className='font-bold'>Descripción: </span>{description}</p>
                    </div>
                    {/* icono de WhatsApp */}
                    <div className='flex justify-center mt-4'>
                        <a 
                        href={`https://wa.me/${contact}`} 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className='text-green-500 hover:text-green-700 transition-colors duration-300'>
                            <img 
                            src={WhatsAppIcon} 
                            alt="WhatsApp Icon" 
                            className='inline-block w-8 h-8' />
                        </a>
                    </div>
                </div>
            </div>
        </article>    
    );
}

export default CardArtisan;