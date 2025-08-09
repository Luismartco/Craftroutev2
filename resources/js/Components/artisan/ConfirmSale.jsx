import React from 'react'
import closeIcon from '../../../media/svg/close-icon.svg'


//Este componente es la modal de confirmación de venta
//Este recibe un prop el cual es onClose, que es una función que viene desde el padre (Sale.jsx) y se encarga de cerrar esta modal y la modal de venta. Para que el artesano pueda seguir vendiendo sin problemas.

const ConfirmSale = ({onClose}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
        <div className='bg-white p-4 rounded-lg w-full max-w-md flex flex-col gap-4'>
            <div className='flex justify-emd hover:cursor-pointer ' onClick={onClose} >
                <img src={closeIcon} alt='cerrar' className='w-8 h-8 hover:cursor-pointer' />
            </div>
            <div className='flex flex-col items-center justify-center gap-2'>
                <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-16 h-16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="12" cy="12" r="10" fill="#ffffff" stroke='green' />
                                <path d="M8 12l3 3 5-5" stroke="green" strokeWidth="2.5" fill="none" />
                            </svg>
                            
                <p className='text-lg font-bold'>¡Creaste una venta!</p>
            </div>
            <div className='flex flex-col bg-[#f4f5f7] p-2 rounded-xl gap-2 '>
                <div>
                    <p className='font-bold'>Comprobante</p>
                    <p className='text-gray-500' >Puedes descargar el comprobante de venta.</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <button className='flex items-center gap-2 px-3 bg-[#ebecf1] text-white rounded-xl'>
                        <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6 text-[#95aed0]"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <rect x="6" y="9" width="12" height="7" rx="1" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M6 17v2a1 1 0 001 1h10a1 1 0 001-1v-2" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <path d="M6 9V5a1 1 0 011-1h10a1 1 0 011 1v4" stroke="currentColor" strokeWidth="2" fill="none"/>
                        <circle cx="17" cy="13" r="1" fill="currentColor"/>
                    </svg>
                    <p className='underline text-[#95aed0] mt-3'>Imprimir comprobante</p>
                    </button>
                    <button className='flex items-center gap-2 px-3 bg-[#ebecf1] text-white rounded-xl'>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-6 h-6 text-[#95aed0]"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                d="M12 4v12m0 0l-4-4m4 4l4-4"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                fill="none"
                            />
                            <rect
                                x="4"
                                y="18"
                                width="16"
                                height="2"
                                rx="1"
                                fill="currentColor"
                            />
                        </svg>
                        <p className='text-[#95aed0] mt-3 underline'>Descargar el comprobante</p>
                    </button>
                </div>
            </div>
             <button onClick={onClose}  className='p-2 w-full rounded-lg bg-[#1a2632] text-white hover:bg-[#232f3e] '>Seguir vendiendo</button>
        </div>
    </div>
  )
}

export default ConfirmSale
