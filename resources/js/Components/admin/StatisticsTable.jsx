import React from 'react';
import ContainerPriceStock from './ContainerPriceStock';

const StatisticsTable = ({product}) => {
    return (
        <tr className='border-b border-gray-300'>
            <td className='p-2'>
                <img src={product.image} alt={product.name} className='w-10 h-10 object-cover rounded-full mx-auto' />
            </td>
            <td className='p-2'>{product.name}</td>
            <td className='p-2'><ContainerPriceStock value={product.price} /></td>
            <td className='p-2'><ContainerPriceStock value={product.amount} /></td>
            <td className='p-2'><ContainerPriceStock value={product.total} /></td>
            <td className='p-2'>{product.store}</td>
            <td className='p-2'>{product.municipality}</td>
        </tr>
    );
}

export default StatisticsTable;