import React, {useState} from 'react';
import trash from '../../../media/svg/trash.svg';
import plusIcon from '../../../media/svg/plus.svg';
import minusIcon from '../../../media/svg/minus-icon.svg';
import {FormatCurrency} from '../../utils/FormatCurrency';

//Este componente recibe tres props: product, onDeleteProduct y onQuantityChange, 
// El product, es la lista de productos que ha sido seleccionada.
//onDeleteProduct es una función que viene desde el padre (Sale) que sirve para eliminar un producto de la canasta
//onQuantityChange, al igual que onDeleteProduct, es una función que viene desde el padre (Sale) y sirve para cambiar la cantidad de los productos que estan en la canasta

const Basket = ({product, onDeleteProduct, onQuantityChange}) => {
  
  //Se crea un estado de la cantidad total y el subtotal de los productos en la canasta, para mostrarlos en la view
  const [quantity, setQuantity] = useState(product.cantidad);
  const [subtotal, setSubtotal] = useState(product.subtotal);

  //Esta función se encarga de cambiar la cantidad de productos en la canasta
  const handleQuantityChange = (value) => {
    //Se asegura de que la cantidad no sea menor a 1 y no mayor a la cantidad disponible
    let newQuantity = Math.max(1, Math.min(product.cantidad_disponible, quantity + value));
    //Se actualiza el subtotal
    let newSubtotal = parseFloat(product.precio) * newQuantity;
    //Se actualiza la cantidad y el subtotal
    setQuantity(newQuantity);
    setSubtotal(newSubtotal);
    //Se actualiza la cantidad en la canasta, esta función se encuentra en el Index.jsx
    onQuantityChange(product.id, newQuantity, newSubtotal);
  }


  return (
    <div className='flex flex-col gap-2 w-full border-b-2 border-gray-300 mb-3'>
       <div className='flex items-center justify-between'>
       <div className='flex items-center justify-between gap-2'>
       <img
           src={product.imagenes && product.imagenes.length > 0
               ? `/storage/${(product.imagenes.find(img => img.es_principal) || product.imagenes[0]).ruta_imagen}`
               : "https://via.placeholder.com/40x40?text=Sin+imagen"
           }
           alt={product.nombre}
           className='w-10 h-10 rounded-full object-cover mb-3'
           onError={(e) => e.target.src = "https://via.placeholder.com/40x40?text=Error"}
       />
       <div className='flex flex-col justify-center'>
       <p className='font-medium mb-1'>{product.nombre}</p>
       <p className='text-sm text-gray-500'>{product.cantidad_disponible} {product.cantidad_disponible > 1 ? 'Disponibles' : 'Disponible'} </p>
       </div>
       </div>
        <button className='p-2 border-2 border-red-500 rounded-xl hover:bg-gray-200 hover:border-red-400 transition-all duration-300' onClick={() => onDeleteProduct(product.id)}>
            <img src={trash} alt="trash" className='w-6 h-6' />
        </button>
       </div>
       <div className='flex items-center gap-2'>
        <div className='flex items-center justify-around gap-8 rounded-xl border-2 border-gray-300 p-1 h-12 w-50'>
            <button className='rounded-full' onClick={() => handleQuantityChange(-1)}>
                <img src={minusIcon} alt="minus" className='w-5 h-5' />
            </button>
            <p className='text-md font-medium mt-3 '>{quantity}</p>
            <button className='rounded-full' onClick={() => handleQuantityChange(1)}>
                <img src={plusIcon} alt="plus" className='w-5 h-5' />
            </button>
        </div>
        <div className='rounded-xl border-2 border-gray-300 p-2 h-12 w-50'>
        <p className='mt-1'>{FormatCurrency(subtotal)}</p>
       </div>
       </div>
       <p className='font-bold'>Precio por unidad: {FormatCurrency(product.precio)} </p>
    </div>
  )
}

export default Basket;
