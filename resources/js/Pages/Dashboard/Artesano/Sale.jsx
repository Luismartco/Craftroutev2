import React, {useState, useEffect, useRef, use} from 'react'
import { toIntAmount } from '@/utils/money'
import Basket from '../../../Components/artisan/Basket';
import PaymentMethod from '@/Components/artisan/PaymentMethod';
import { ButtonNextStep } from '@/Components/artisan/ButtonNextStep';
import { FormsPaymentMethod } from '@/Components/artisan/FormsPaymentMethod';
import ConfirmSale from '@/Components/artisan/ConfirmSale';
import AlertMessage from '@/Components/AlertMessage';

//Importaciones de iconos
import closeIcon from '../../../../media/svg/close-icon.svg'
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
  // Estado para mostrar u ocultar el botón de continuar en la modal de venta
  const [showButtonPreviousStep, setshowButtonPreviousStep] = useState(true);

  const [saleData, setSaleData] = useState({});
  const [showFormsPaymentMethod, setShowFormsPaymentMethod] = useState(false);

  //Estado para el campo del nombre del cliente 
  const [clientName, setClientName] = useState('');

  //Estado para mostrar la modal de confirmación de venta
  const [showConfirmSale, setShowConfirmSale] = useState(false);
  // Snapshot de la venta al confirmar, para no depender de products tras limpiar la canasta
  const [saleSnapshot, setSaleSnapshot] = useState({ productoId: null, quantity: 0, total: 0 });

  //Estado para mostrar el mensaje de alerta
  const [showAlertMessage, setShowAlertMessage] = useState(false);

  // Función para mostrar el siguiente paso, que es el formulario de detalles de la venta 
  const showNextStep = () => {
    //Se cambia el estado de salesDetails a true, para mostrar el formulario de detalles de la venta y se oculta el botón de continuar
    setSalesDetails(true);
    setshowButtonPreviousStep(false);
  };

  //Función para cambiar el estado de quien está seleccionado
  const handlePaymentMethodSelect = (methodTitle) => {
    setSelectedPaymentMethod(methodTitle);
  };


//Esta función se encarga de actualizar el estado del nombre del cliente cuando el usuario escribe en el input.
  const handleChange = (e) => {
    const {value} = e.target; 
    setClientName(value);
  };

  //Función para manejar el envío del formulario de detalles de la venta
  //Esta función se encarga de validar que se haya seleccionado un método de pago y que el nombre del cliente no esté vacío.
  const handleForm = (e) => {
    e.preventDefault();
    // Validar que se haya seleccionado un método de pago
    if (!selectedPaymentMethod || clientName === '' ) {
      setShowAlertMessage(true);
      return;
    }

   //Se crea el objeto de la venta
   const saleData = {
      date: new Date().toISOString().split('T')[0], // Fecha actual
      clientName: clientName,
      paymentMethod: selectedPaymentMethod,
      totalPrice: totalPrice,
    };
    // Se actualiza el estado de saleData con los datos de la venta
    setSaleData(saleData);
    setShowFormsPaymentMethod(true);
  };

  //Función para cerrar el form de pago según el método de pago seleccionado
  const onCloseFormPaymentMethod = () => {
    setShowFormsPaymentMethod(false);
  }

  //Función para hacer la venta, básicamente cierra la modal del form de pago, muestra la modal de confirmar venta, y limpia la canasta
  const onMakeSale = () => {
    // Si no hay productos, no continuar
    if (!products || products.length === 0) {
      alert('No hay productos en la canasta');
      return;
    }
    // Tomar snapshot ANTES de limpiar la canasta
    const firstProduct = products[0];
    const productoId = firstProduct?.id ?? firstProduct?.producto_id ?? firstProduct?.product_id ?? null;
    const qty = Number.isFinite(totalQuantity) && totalQuantity > 0 ? totalQuantity : (firstProduct?.cantidad ?? 1);
    const totalInt = toIntAmount(totalPrice);
    setSaleSnapshot({ productoId, quantity: qty, total: totalInt });

    setShowFormsPaymentMethod(false);
    setShowConfirmSale(true);
    onClearBasket();
  }

  // Función para mostrar la modal de confirmación de venta, que se encarga de cerrar la modal de confirmación y la modal de venta
  const onShowConfirmSale = () => {
    setShowConfirmSale(false);
    onClose();
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
   <div className='fixed inset-0 z-50 flex items-center justify-center p-3 bg-black bg-opacity-50'>
    <div className={`flex flex-col bg-white rounded-lg p-4 w-full max-h-full ${salesDetails ? 'max-w-5xl' : 'max-w-2xl'} overflow-auto`}>
        <div className='flex items-center justify-between'>
          <h1>Venta</h1>
          <button className='p-2' onClick={onClose}>
            <img src={closeIcon} alt='cerrar' className='w-8 h-8 hover:cursor-pointer' />
          </button>
        </div>
        
        <div className={`grid grid-cols-1 ${!salesDetails ? 'md:grid-cols-1' : 'md:grid-cols-2'} gap-2 overflow-y-scroll`}>
          {/*Listado de productos*/}
        <div className='relative flex flex-col w-full p-2 border-2 border-gray-300 shadow-md shadow-gray-300'>
          <div className='flex items-center justify-between'>
            <p className='font-bold'>Productos</p> 
            <p className='font-bold underline transition-all duration-300 hover:text-gray-600 hover:cursor-pointer' onClick={onClearBasket}>Vaciar canasta</p>
          </div>
          <div className='mb-5'>
          { products.length > 0 ? products.map((product) => {
            return <Basket key={product.id} product={product} onDeleteProduct={onDeleteProduct} onQuantityChange={onQuantityChange} />
          }) : <p className='text-center text-gray-500'>No hay productos en la canasta</p>}
          </div>
          <div className="absolute bottom-0 left-0 flex w-full p-2 bg-white">
            {/* Botón de continuar */}
            {/* Si hay productos en la canasta y el estado de showButtonPreviousStep es true, se muestra el botón de continuar */}
            {products.length > 0 && showButtonPreviousStep ? (
              <ButtonNextStep totalQuantity={totalQuantity} totalPrice={totalPrice} title='Continuar' onClick={showNextStep} />
            ) : '' }
          </div>
        </div>
        {/* Detalles de la venta */}
        {/* Si en la canasta hay productos y el estado de salesDetails es true, se muestra el detalle de la venta, de lo contrario no */}
        {(products.length > 0 && salesDetails ) && 
          <form onSubmit={handleForm} className='relative flex flex-col w-full p-2 border-2 border-gray-300 shadow-md shadow-gray-300'>
            <div className='flex flex-col gap-2'>
                <label className='font-bold'>Fecha de la venta *</label>
                <input type='date' disabled value={new Date().toISOString().split('T')[0]} className='p-2 border-2 border-gray-200 rounded-xl'></input>
                <label className='font-bold'>Cliente</label>
                <input 
                  type='text' 
                  placeholder='Digite el nombre del cliente' 
                  className='p-2 border-2 border-gray-200 rounded-xl'
                  value={clientName}
                  onChange={handleChange}
                />
            </div>
            <p className='mt-3'>Selecciona el método de pago*</p>
            <div className='grid grid-cols-2 gap-2 mx-auto mb-16 md:grid-cols-3'>
              {/* Se renderiza cada método de pago */}
                <PaymentMethod 
                  icon={cash} 
                  title='Efectivo' 
                  isSelected={selectedPaymentMethod === 'Efectivo'}//Esto es una comparación, inicialmente, el estado es null, por lo que no hay ningún método de pago seleccionado, si se hace clic sobre algún método de pago, se efectua la función handlePaymentMethodSelect, que cambia el estado de selectedPaymentMethod al método de pago seleccionado, sencillo, si selecciono efectivo, el estado cambia a Efectivo, y se realiza la comparación: selectedPaymentMethod -> ("Efectivo") === 'Efectivo', entonces devuelve true, y se aplica el estilo definido para eso. 
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
            <div className="absolute bottom-0 left-0 flex w-full p-2 bg-white">
            {/* Botón de crear venta */}
            <ButtonNextStep totalQuantity={totalQuantity} totalPrice={totalPrice} title='Crear venta'/>
          </div>
          </form>
        }
        </div>
    </div>

    {/* Se muestra la modal del form de pago, según el método de pago seleccionado */}

    {showFormsPaymentMethod && (
      <FormsPaymentMethod formData={saleData} onClose={onCloseFormPaymentMethod} onClick={onMakeSale} />
    )}

    {/* Se muestra la modal de alertMessage para mostrar un mensaje de alerta si no se rellena bien el formulario */}

    { showAlertMessage && (
      <AlertMessage 
        message='Por favor, seleccione un método de pago o complete el nombre del cliente.' 
        onClose={() => {setShowAlertMessage(false)}}
      />
    )}

    {/*Esta es la modal de confirmación de venta, que se muestra al hacer clic en el botón de confirmar de los forms de métodos de pago */}
    {
      showConfirmSale && (
        <div>
          <ConfirmSale
            onClose={onShowConfirmSale}
            productoId={saleSnapshot.productoId}
            quantity={saleSnapshot.quantity}
            total={saleSnapshot.total}
          />
        </div>
      )
    }

   </div>
  )
}

export default Sale;
