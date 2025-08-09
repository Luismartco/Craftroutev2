import React from 'react'
import { FormatCurrency } from '@/utils/FormatCurrency'

//Este componente se encarga de renderizar el botón de siguiente paso, que se utiliza en la modal de venta.
// Recibe cuatro props: totalQuantity, que es la cantidad total de productos en la venta, totalPrice, que es el precio total de la venta, title, que es el título o nombre del botón y onClick, que es una función que viene desde el padre, que se encarga de manejar el evento de clic en el botón.

export const ButtonNextStep = ({totalQuantity, totalPrice, title, onClick }) => {
  return (
    <button onClick={onClick} className="flex items-center w-full px-2 py-2 bg-[#1a2732] text-white rounded-xl hover:bg-[#232f3e] hover:translate-x-1 transition-all duration-300" style={{ minHeight: "48px" }}
    >
        <div className="flex items-center justify-center rounded-lg bg-[#394c60] w-9 h-9 mr-3">
        <span className="font-bold text-base">{totalQuantity}</span>
        </div>
        <span className="font-bold text-base mr-auto">{title}</span>
        <span className="font-bold text-base mr-2">
        {FormatCurrency(totalPrice)}
        </span>
        <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
    </button>
  )
}
