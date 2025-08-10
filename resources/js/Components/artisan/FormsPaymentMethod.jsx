import React, { useEffect, useState, useRef } from 'react'
import closeIcon from '../../../media/svg/close-icon.svg'
import { FormatCurrency } from '@/utils/FormatCurrency'

//Este componente se encarga de renderizar el formulario de pago, de acuerdo al método de pago seleccionado por el cliente.
//Recibe tres props: formData, que contiene los datos del formulario, este prop proviene del padre (Sale.jsx), y onClose que se encarga de cerrar la modal que es una función que viene desde el padre y onClick que es una función que viene desde el padre que sirve para reiniciar los estados.


export const FormsPaymentMethod = ({formData, onClose, onClick}) => {

    //Estados para el formulario de efectivo
    const [howMuchPay, setHowMuchPay] = useState();// Este es el valor que se ingresa en el input de ¿Con cuánto paga tu cliente?
    const [amountRefund, setAmountRefund] = useState(0);// Este es el valor que se calcula automáticamente, es la diferencia entre el valor que paga el cliente y el total de la venta
    const [showMesage, setShowMessage] = useState(false);// Estado para mostrar el mensaje debajo del input de ¿Con cuánto paga tu cliente?

    const debounceRef = useRef(null);

    //Función que se ejecuta al enviar el formulario de método de pago: Efectivo
    const onSubmit = (e) => {
        e.preventDefault();
        if (howMuchPay === '' || howMuchPay === undefined ) return alert('Por favor, digite la cantidad con la que paga el cliente');
        if (howMuchPay < formData.totalPrice) return alert('El valor con el que paga el cliente debe ser mayor o igual al total de la venta');
        if (howMuchPay.toString().includes('.')) return alert('Por favor, digite el valor sin puntos');
        onClick();
    } 

    //Función que se ejecuta al cambiar el valor del input de ¿Con cuánto paga tu cliente?
    //Esta función se encarga de actualizar el estado de howMuchPay
    const handleChange = (e) => {
        const {value} = e.target;
        // Evita que se ejecute el debounce si ya hay uno en curso
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        // Se espera un tiempo antes de actualizar el estado, así se evita que se actualice en cada pulsación de tecla
        debounceRef.current = setTimeout(() => {
        setHowMuchPay(value);   
        }, 1000);
    }

    //Efecto que se ejecuta al cambiar el valor de howMuchPay, este efecto se encarga de calcular el valor a devolver al cliente
    useEffect(() => {
        if(howMuchPay >= formData.totalPrice){
                setAmountRefund(howMuchPay - formData.totalPrice);
            } else {
                setAmountRefund(0);
            }
    }, [howMuchPay])

  return (
    <div className='fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center p-4'>
        <div className='bg-white p-4 rounded-lg w-full max-w-xl flex-wrap'>
            <div className='flex justify-between'>
                <p className='font-bold text-lg'>{formData.paymentMethod === 'Efectivo' ? 'Calcula el cambio de tu venta' : ''}</p>
                <img src={closeIcon} alt='cerrar' className='w-8 h-8 hover:cursor-pointer' onClick={onClose} />
            </div>
            {/* Dependiendo del método de pago, se muestra el formulario correspondiente en una modal  */}
        {
            formData.paymentMethod === "Efectivo" && (
                <form className='flex flex-col gap-2 w-full' >
                <label>Valor de la venta</label>
                <input placeholder={FormatCurrency(formData.totalPrice)} disabled className='rounded-xl bg-gray-100' ></input>
                <label>Valor a pagar en efectivo</label>
                <input placeholder={FormatCurrency(formData.totalPrice)} disabled className='rounded-xl bg-gray-100' ></input>
                <label>¿Con cuánto paga tu cliente?</label>
                <input type='number' required placeholder='Digite el valor' className='rounded-xl'
                
                onChange={handleChange}
                min={formData.totalPrice} step='1'
                onFocus={() => setShowMessage(true)} //onFocus se encarga de cambiar el estado de showMessage a true, para mostrar el mensaje debajo del input
                onBlur={() => setShowMessage(false)} //onBlur se encarga de cambiar el estado de showMessage a false, para ocultar el mensaje debajo del input
                ></input>
                {/* Mensaje que se muestra al hacer foco sobre el input de ¿Con cuánto paga tu cliente? */}
                {
                    showMesage && (
                        <p className='text-sm'>Digite el valor sin puntos decimales</p>
                    )
                }
                <div className='flex justify-between'>
                    <p className='font-bold text-sm'>Valor a devolver</p>
                    <p className='font-bold text-sm'>{FormatCurrency(amountRefund)}</p>
                </div>
                <div className='flex justify-end'>
                    <button onClick={onSubmit} className='flex items-center p-2 bg-[#1a2732] text-white rounded-xl hover:bg-[#232f3e] hover:scale-105 transition-all duration-300' style={{ minHeight: "48px" }}>
                        Confirmar
                    </button>
                </div>
                </form>
            )
        } 

        {
            formData.paymentMethod === "Tarjeta" && (
                <div>
                    <p className='font-bold text-lg'>Hola, soy el método de pago: Tarjeta</p>
                </div>
            )
        }

        {/* Debido a que no tengo las views para cada caso del método de pago, pues no están  */}
        </div>
    </div>
  )
}
