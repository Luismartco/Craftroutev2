import React from 'react'
import checkicon from '../../../media/svg/check.svg'

// Este componente se encarga de renderizar los métodos de pago disponibles para la venta. 
// Recibe cuatro props: icon, sencillamente es el icono del método de pago, title, es el nombre del método de pago, isSelected es un booleano que indica si el método de pago está seleccionado, y onSelect es una función que que viene desde el padre (Sale.jsx) y se encarga de cambiar el estado de qué método ha sido seleccioando. 

const PaymentMethod = ({icon, title, isSelected, onSelect}) => {

  return (
    <div onClick={onSelect} className={`relative flex flex-col items-center justify-center gap-2 p-1 border-2 ${isSelected ? 'border-[#10935d]' : 'border-gray-200'} rounded-lg w-auto xs:h-auto sm:h-auto md:h-28 hover:scale-105 hover:cursor-pointer transition-all duration-300`}>
        <img src={icon} alt={title} className='h-8' />
        <p className='text-sm text-center text-wrap'>{title}</p>
        {
          // Si el método de pago está seleccionado, se cambia el border del contenedor a verde y se muestra el icono de check en la esquina superior derecha. 
            isSelected && (
                <div className='bg-[#10935d] absolute right-0 top-0 p-2 rounded-bl-2xl'> 
                    <img src={checkicon} className='w-4 h-4 md:w-5 md:h-5' />
                </div>
            )
        }
    </div>
    
  )
}

export default PaymentMethod;
