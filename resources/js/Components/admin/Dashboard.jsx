import React from 'react'
import StatsCard from './StatsCard';
import Chart from './Chart';
import StatisticsTable from './StatisticsTable';
import Filters from './Filters';

const Dashboard = ({stats, chartData, products}) => {
    return (
        <div>
          <h1 className='text-2xl font-extrabold mt-2'>Dashboard administrativo</h1>
            <p className='text-lg italic'>Gestión de reportes</p>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6'>
                <StatsCard title="Total Artesanos" value={stats.total_users} />
                <StatsCard title="Total Ventas" value={stats.total_artesanos} />
                <StatsCard title="Total Categorías" value={stats.total_clientes} />
            </div>
            
            <div className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-3 py-16 gap-6 w-full">
                {/* Filtro por Categoría */}
                <Filters label="Categoría" options={['Ropa', 'Joyería']} />

                {/* Filtro por Municipio */}
                <Filters label="Municipio" options={['Morroa', 'Sampués']} />

                {/* Filtro por Artesano */}
                <Filters label="Artesano" options={['Artesano 1', 'Artesano 2']} />
            </div>
            {/* Gráficos */}
            {chartData === undefined ?
             <div className='text-center text-lg font-bold'>No hay gráficos para mostrar</div>
            :
            <div className='flex justify-center flex-wrap gap-2 w-full min-w-0'>
                <div className='flex-1 min-w-[250px] max-w-full'>
                    <Chart data={chartData.data1} />
                </div>
                <div className='flex-1 min-w-[250px] max-w-full'>
                    <Chart data={chartData.data2} />
                </div>
            </div>
            }
            {/* Tabla de estadísticas */}
            <div className='overflow-x-auto py-2'>
                <table className='min-w-full table-fixed border-spacing-2 border border-gray-300 text-center'>
                    <thead className='bg-gray-200'>
                        <tr className='border-b border-gray-300'>
                            <th className='p-2'>Imagen</th>
                            <th className='p-2'>Nombre</th>
                            <th className='p-2'>Precio</th>
                            <th className='p-2'>Cantidad</th>
                            <th className='p-2'>Total</th>
                            <th className='p-2'>Tienda</th>
                            <th className='p-2'>Municipio</th>
                        </tr>
                    </thead>
                    <tbody className='border-b border-gray-300'>
                    {products.map((product) => (
                        <StatisticsTable key={Math.random()} product={product} />
                    ))}
                    </tbody>
                </table>
            </div> 
        </div>
    )
}

export default Dashboard;