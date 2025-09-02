import React, {useState, useEffect, useRef} from 'react';
import { FormatCurrency } from '@/utils/FormatCurrency';

// Este es el componente que se encarga de renderizar el formulario de método de pago: Efectivo
//Recibe tres props: formData, onClick y showAlertMessage
//formData: contiene los datos del formulario de venta (fecha venta, nombre del cliente, método de pago y total a pagar), este y los demás props provienen del padre (FormsPaymentMethod.jsx)
//onClick: es una función que se encarga de cerrar la modal de formulario de pago y abrir la modal de confirmación de venta
//showAlertMessage: es una función que se encarga de mostrar la alerta con el mensaje correspondiente

const Cash = ({formData, onClick, showAlertMessage}) =>{

    //Estados para el formulario de efectivo
    const [howMuchPay, setHowMuchPay] = useState();// Este es el valor que se ingresa en el input de ¿Con cuánto paga tu cliente?
    const [amountRefund, setAmountRefund] = useState(0);// Este es el valor que se calcula automáticamente, es la diferencia entre el valor que paga el cliente y el total de la venta
    const [showMesage, setShowMessage] = useState(false);// Estado para mostrar el mensaje debajo del input de ¿Con cuánto paga tu cliente?
    
    const debounceRef = useRef(null);

    //Función que se ejecuta al enviar el formulario de método de pago: Efectivo
    const onSubmit = (e) => {
        e.preventDefault();
        if (howMuchPay === '' || howMuchPay === undefined ) return showAlertMessage('Por favor, digite el valor con el que paga tu cliente');
        if (howMuchPay < formData.totalPrice) return showAlertMessage('El valor con el que paga tu cliente debe ser mayor o igual al valor de la venta')
        if (howMuchPay.toString().includes('.')) return showAlertMessage('Por favor, digite el valor sin puntos decimales');
        //Si todo está bien, se cierra la modal y se reinician los estados del abuelo (Sale.jsx), que sería cerrar la modal de formulario de pago y abrir la modal de confirmación de venta
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


    return(
        <form className='flex flex-col w-full gap-2' >
                <label>Valor de la venta</label>
                <input placeholder={FormatCurrency(formData.totalPrice)} disabled className='bg-gray-100 rounded-xl' ></input>
                <label>Valor a pagar en efectivo</label>
                <input placeholder={FormatCurrency(formData.totalPrice)} disabled className='bg-gray-100 rounded-xl' ></input>
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
                    <p className='text-sm font-bold'>Valor a devolver</p>
                    <p className='text-sm font-bold'>{FormatCurrency(amountRefund)}</p>
                </div>
                <div className='flex justify-end'>
                    <button onClick={onSubmit} className='flex items-center p-2 bg-[#1a2732] text-white rounded-xl hover:bg-[#232f3e] hover:scale-105 transition-all duration-300' style={{ minHeight: "48px" }}>
                        Confirmar
                    </button>
                </div>
        </form>
    )
}

export default Cash;