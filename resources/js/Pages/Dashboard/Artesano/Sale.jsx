import React, {useState, useEffect, useRef, use} from 'react'
import Basket from '../../../Components/artisan/Basket';
import PaymentMethod from '@/Components/artisan/PaymentMethod';
import { ButtonNextStep } from '@/Components/artisan/ButtonNextStep';
import { FormsPaymentMethod } from '@/Components/artisan/FormsPaymentMethod';

//Importaciones de iconos
import cash from '../../../../media/svg/cash.svg'
import card from '../../../../media/svg/card.svg'
import bank from '../../../../media/svg/bank.svg'
import other from '../../../../media/svg/other.svg'
import nequi from '../../../../media/svg/nequi.png'
import daviPlata from '../../../../media/svg/daviplata.png'

//Este es el componente venta, que es básicamente la modal que se muestra al dar clic sobre el botón vender
//Este componente recibe 5 props, onClose, products, onDeleteProduct, onClearBasket, onQuantityChange
//onClose, es una función que viene desde el padre (index.jsx), que es para cerrar la ventana
//products, es la lista de productos que han sido seleccionados, esta lista viene desde el padre
//onDeleteProduct, es una función que viene desde el padre y sirve para eliminar un producto de la canasta, esta función se manda al hijo de Sale.jsx, en este caso Basket.jsx, al igual que la función onQuantityChange, que sirve para modificar la cantidad del producto seleccionado. 
//onClearBasket, es una función que viene desde el padre (index.jsx) que sirve para limpiar la canasta, como su nombre lo indica, vacía la lista de los productos seleccionados


const Sale = ({onClose, products, onDeleteProduct, onClearBasket, onQuantityChange}) => {
  //Se usa useState para mantener el estado de los valores totales
  const [totalQuantity, setTotalQuantity] = useState(products.cantidad);
  const [totalPrice, setTotalPrice] = useState(parseFloat(products.subtotal));

  const [salesDetails, setSalesDetails] = useState(false);
  //Estado para saber que método de pago está seleccionado
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const [showButtonPreviousStep, setshowButtonPreviousStep] = useState(true);

  const [saleData, setSaleData] = useState({});
  const [showFormsPaymentMethod, setShowFormsPaymentMethod] = useState(false);

  //Estado para el campo de del nombre del cliente 
  const [clientName, setClientName] = useState('');

  const showNextStep = () => {
    if (products.length === 0) return alert('no hay productos en la canasta, agreguelos');
    setSalesDetails(true);
    setshowButtonPreviousStep(false);
  };

  //Función para cambiar el estado de quien está seleccionado
  const handlePaymentMethodSelect = (methodTitle) => {
    setSelectedPaymentMethod(methodTitle);
  };

  const handleChange = (e) => {
    const {value} = e.target; 
    setClientName(value);
  };

  const handleForm = (e) => {
    e.preventDefault();
    // Validar que se haya seleccionado un método de pago
    if (!selectedPaymentMethod || clientName === '' ) {
      alert('Por favor digite el nombre o seleccione un método de pago');
      return;
    }

   //Se crea el objeto de la venta
   const saleData = {
      date: new Date().toISOString().split('T')[0], // Fecha actual
      clientName: clientName,
      paymentMethod: selectedPaymentMethod,
      totalPrice: totalPrice,
    };

    setSaleData(saleData);
    setShowFormsPaymentMethod(true);
  };

  const onCloseFormPaymentMethod = () => {
    setShowFormsPaymentMethod(false);
  }


//Efecto para actualizar los valores totales de la canasta (cantidad y subtotal)  
  useEffect(() => {
    // Se utiliza el método reduce para recorrer la lista de productos (products). 
    // Este método recibe dos parámetros: 'acc', que es el acumulador donde se va sumando el valor total (ya sea el precio o la cantidad), y 'product', que representa cada producto de la lista en cada iteración. Así, se obtiene la suma total de los subtotales y la cantidad total de productos en la canasta.
    let newTotal = products.reduce((acc, product) => acc + parseInt(product.cantidad), 0);
    let newTotalPrice = products.reduce((acc, product) => acc + parseFloat(product.subtotal), 0);
    setTotalQuantity(newTotal);
    setTotalPrice(newTotalPrice);
  }, [products]);


  return (
   <div className='fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-3'>
    <div className='bg-white rounded-lg p-4 w-full max-w-5xl '>
        <div className='flex items-center justify-between'>
          <h1>Venta</h1>
          <button className='underline font-bold hover:text-red-500' onClick={onClose}>Cerrar</button>
        </div>
        
        <div className='grid grid-cols-1 md:grid-cols-2 gap-2'>
          {/*Listado de productos*/}
        <div className='relative flex flex-col w-full border-2 border-gray-300 p-2 shadow-md shadow-gray-300'>
          <div className='flex items-center justify-between'>
            <p className='font-bold'>Productos</p> 
            <p className='underline font-bold hover:text-gray-600 hover:cursor-pointer transition-all duration-300' onClick={onClearBasket}>Vaciar canasta</p>
          </div>
          <div className='mb-5'>
          { products.length > 0 ? products.map((product) => {
            return <Basket key={product.id} product={product} onDeleteProduct={onDeleteProduct} onQuantityChange={onQuantityChange} />
          }) : <p className='text-center text-gray-500'>No hay productos en la canasta</p>}
          </div>
          <div className="flex absolute left-0 bottom-0 p-2 w-full bg-white">
            {/* Botón de continuar */}
            {showButtonPreviousStep && (
              <ButtonNextStep totalQuantity={totalQuantity} totalPrice={totalPrice} title='Continuar' onClick={showNextStep} />
            ) }
          </div>
        </div>
        {/* Detalles de la venta */}
        {/* Si en la canasta hay productos y el estado de salesDetails es true, se muestra el detalle de la venta, de lo contrario no */}
        {(products.length > 0 && salesDetails ) && 
          <form onSubmit={handleForm} className=' relative flex flex-col w-full border-2 border-gray-300 p-2 shadow-md shadow-gray-300'>
            <div className='flex flex-col gap-2'>
                <label className='font-bold'>Fecha de la venta *</label>
                <input type='date' disabled value={new Date().toISOString().split('T')[0]} className='border-2 border-gray-200 rounded-xl p-2'></input>
                <label className='font-bold'>Cliente</label>
                <input 
                  type='text' 
                  placeholder='Digite el nombre del cliente' 
                  className='border-2 border-gray-200 rounded-xl p-2'
                  value={clientName}
                  onChange={handleChange}
                />
            </div>
            <p className='mt-3'>Selecciona el método de pago*</p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2 mx-auto mb-16'>
                <PaymentMethod 
                  icon={cash} 
                  title='Efectivo' 
                  isSelected={selectedPaymentMethod === 'Efectivo'}//Esto devuelve true o false, es una comparación
                  onSelect={() => handlePaymentMethodSelect('Efectivo')}
                />
                <PaymentMethod 
                  icon={card} 
                  title='Tarjeta' 
                  isSelected={selectedPaymentMethod === 'Tarjeta'}
                  onSelect={() => handlePaymentMethodSelect('Tarjeta')}
                />
                <PaymentMethod 
                  icon={bank} 
                  title='Transferencia bancaria' 
                  isSelected={selectedPaymentMethod === 'Transferencia bancaria'}
                  onSelect={() => handlePaymentMethodSelect('Transferencia bancaria')}
                />
                <PaymentMethod 
                  icon={other} 
                  title='Otro' 
                  isSelected={selectedPaymentMethod === 'Otro'}
                  onSelect={() => handlePaymentMethodSelect('Otro')}
                />
                <PaymentMethod 
                  icon={nequi} 
                  title='Nequi' 
                  isSelected={selectedPaymentMethod === 'Nequi'}
                  onSelect={() => handlePaymentMethodSelect('Nequi')}
                />
                <PaymentMethod 
                  icon={daviPlata} 
                  title='Daviplata' 
                  isSelected={selectedPaymentMethod === 'Daviplata'}
                  onSelect={() => handlePaymentMethodSelect('Daviplata')}
                />
            </div>
            <div className="flex absolute left-0 bottom-0 p-2 w-full bg-white">
            {/* Botón de continuar */}
            <ButtonNextStep totalQuantity={totalQuantity} totalPrice={totalPrice} title='Crear venta'/>
          </div>
          </form>
        }
        </div>
    </div>

    {/* Se muestra la modal del form según el método de pago seleccionado */}

    {showFormsPaymentMethod && (
      <FormsPaymentMethod formData={saleData} onClose={onCloseFormPaymentMethod} />
    )}

   </div>
  )
}

export default Sale;
