import React from 'react'

const StatsCard = ({title, value}) => {
    return (
        <div className='bg-gray-100 rounded-lg p-4'>
            <p className='text-lg text-black font-bold'>{title}</p>
            <p className='text-3xl font-bold text-indigo-600'>{value}</p>
        </div>
    );
}

export default StatsCard;