import React, { useEffect, useState, useRef } from 'react'
import closeIcon from '../../../media/svg/close-icon.svg'
import AlertMessage from '../AlertMessage'
import Cash from './formspaymentmethod/Cash'

//Este componente se encarga de renderizar el formulario de pago, de acuerdo al método de pago seleccionado por el cliente.
//Recibe tres props: formData, que contiene los datos del formulario de venta (fecha venta, nombre del cliente, método de pago y total a pagar), este y los demás prop provienen del padre (Sale.jsx), onClose se encarga de cerrar la modal y onClick que es para cerrar la modal de formulario de pago y abrir la modal de confirmación de venta.


export const FormsPaymentMethod = ({formData, onClose, onClick}) => {

    const [showAlertMessage, setShowAlertMessage] = useState(false);// Estado para mostrar la alerta
    const [message, setMessage] = useState(''); // Estado para el mensaje de la alerta
    
    const showAlertMessageFunction = (message) => {
        setShowAlertMessage(true); 
        setMessage(message);
    } // Función que se encarga de mostrar la alerta con el mensaje correspondiente
        

  return (
    <div className='fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50'>
        <div className='flex-wrap w-full max-w-xl p-4 bg-white rounded-lg'>
            <div className='flex justify-between'>
                <p className='text-2xl font-bold'>{formData.paymentMethod === 'Efectivo' ? 'Calcula el cambio de tu venta' : 'Mensaje'}</p>
                <img src={closeIcon} alt='cerrar' className='w-8 h-8 hover:cursor-pointer' onClick={onClose} />
            </div>
            {/* Dependiendo del método de pago, se muestra el formulario correspondiente en una modal  */}
        {
            formData.paymentMethod === "Efectivo" ? (
                <Cash formData={formData} onClick={onClick} showAlertMessage={showAlertMessageFunction} />
            ) : (
                <div>
                    <p className='text-lg font-base'>Hola, soy un método de pago, pero no estoy disponible aún 😁</p>
                </div>
            )
        } 


        {/* Debido a que no tengo las views para cada caso del método de pago, pues no están  */}
        </div>
        {showAlertMessage && (
            <AlertMessage 
                message={message}
                onClose={() => setShowAlertMessage(false)}
            />
        )}
    </div>
  )
}
