import React from 'react'
import { useState } from 'react';

export default function AlertMessage({message, onClose}) {

 return (
    <div className='fixed inset-0 flex justify-center items-center p-4 bg-black bg-opacity-50 z-50' >
        <div className='flex flex-col bg-white rounded-xl p-4 max-w-md'>
            <div className='flex justify-start'>
                <h2>Mensaje</h2>
            </div>
            <p className=''>{message}</p>
            <div className='flex justify-end'>
                <button 
                onClick={onClose}
                className='inline-flex items-center px-4 py-2 bg-[rgb(60,47,47)] text-white rounded-md hover:bg-[rgb(43,31,31)] transition-colors duration-200 no-underline text-sm'>
                    Aceptar
                </button>
            </div>
        </div>
    </div>
 );
}

