import React from 'react'
import closeIcon from '../../../media/svg/close-icon.svg'
import { FormatCurrency } from '@/utils/FormatCurrency'

export const FormsPaymentMethod = ({formData, onClose}) => {
  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
        <div className='bg-white p-4 rounded-lg w-full max-w-xl flex-wrap'>
            <div className='flex justify-between'>
                <p className='font-bold text-lg'>{formData.paymentMethod === 'Efectivo' ? 'Calcula el cambio de tu venta' : ''}</p>
                <img src={closeIcon} alt='cerrar' className='w-8 h-8 hover:cursor-pointer' onClick={onClose} />
            </div>
        {
            formData.paymentMethod === "Efectivo" && (
                <form className='flex flex-col gap-2 w-full' >
                <label>Valor de la venta</label>
                <input placeholder={FormatCurrency(formData.totalPrice)} disabled className='rounded-xl bg-gray-100' ></input>
                <label>Valor a pagar en efectivo</label>
                <input placeholder={FormatCurrency(formData.totalPrice)} disabled className='rounded-xl bg-gray-100' ></input>
                <label>¿Con cuánto paga tu cliente?</label>
                <input type='number' placeholder='Digite el valor' className='rounded-xl' ></input>
                <div className='flex justify-between'>
                    <p className='font-bold text-sm'>Valor a devolver</p>
                    <p className='font-bold text-sm'>$27.000</p>
                </div>
                <div className='flex justify-end'>
                    <button onClick={onClose} className='flex items-center p-2 bg-[#1a2732] text-white rounded-xl hover:bg-[#232f3e] hover:scale-105 transition-all duration-300' style={{ minHeight: "48px" }}>
                        Confirmar
                    </button>
                </div>
                </form>
            )
        }
        </div>
    </div>
  )
}
