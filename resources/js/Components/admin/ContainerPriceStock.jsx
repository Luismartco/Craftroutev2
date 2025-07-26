import React from 'react';

const ContainerPriceStock = ({value}) => {
    return (
        <div className='p-2 border rounded-lg w-32 h-10 mx-auto'>
            <p className='text-sm font-bold text-center'>{value}</p>
        </div>
    );
}

export default ContainerPriceStock;