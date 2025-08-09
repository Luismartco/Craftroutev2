import React from 'react'
import checkicon from '../../../media/svg/check.svg'

const PaymentMethod = ({icon, title, isSelected, onSelect}) => {

  return (
    <div onClick={onSelect} className={`relative flex flex-col items-center justify-center gap-2 p-1 border-2 ${isSelected ? 'border-[#10935d]' : 'border-gray-200'} rounded-lg w-28 md:w-full h-28 hover:scale-105 hover:cursor-pointer transition-all duration-300`}>
        <img src={icon} alt={title} className='h-8' />
        <p className='text-sm text-center text-wrap'>{title}</p>
        {
            isSelected && (
                <div className='bg-[#10935d] absolute right-0 top-0 p-2 rounded-bl-2xl'> 
                    <img src={checkicon} className='w-5 h-5' />
                </div>
            )
        }
    </div>
    
  )
}

export default PaymentMethod;
