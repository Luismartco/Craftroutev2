import React, { useState, useEffect } from 'react'
import { Link, router } from '@inertiajs/react'
import StatsCard from './StatsCard';
import Chart from './Chart';
import StatisticsTable from './StatisticsTable';
import Filters from './Filters';

const Dashboard = ({stats, chartData, products, productosPagination, categorias, municipios, artesanos}) => {
    const [filters, setFilters] = useState({
        categoria: '',
        municipio: '',
        artesano: ''
    });
    const [filteredData, setFilteredData] = useState({
        chartData: chartData,
        products: products,
        pagination: productosPagination
    });
    const [loading, setLoading] = useState(false);

    // Función para aplicar filtros
    const applyFilters = async (page = 1) => {
        setLoading(true);
        try {
            console.log('Estado actual de filtros:', filters);
            console.log('Categorías disponibles:', categorias);
            console.log('Municipios disponibles:', municipios);
            console.log('Artesanos disponibles:', artesanos);
            
            const params = new URLSearchParams();
            let hasFilters = false;

            if (filters.categoria) {
                console.log('Filtro categoría seleccionado:', filters.categoria);
                const categoria = categorias.find(c => c.name === filters.categoria);
                console.log('Categoría encontrada:', categoria);
                if (categoria) {
                    params.append('categoria_id', categoria.id);
                    hasFilters = true;
                }
            }
            if (filters.municipio) {
                console.log('Filtro municipio seleccionado:', filters.municipio);
                const municipio = municipios.find(m => m.name === filters.municipio);
                console.log('Municipio encontrado:', municipio);
                if (municipio) {
                    params.append('municipio', municipio.id);
                    hasFilters = true;
                }
            }
            if (filters.artesano) {
                console.log('Filtro artesano seleccionado:', filters.artesano);
                const artesano = artesanos.find(a => a.name === filters.artesano);
                console.log('Artesano encontrado:', artesano);
                if (artesano) {
                    params.append('artesano_id', artesano.id);
                    hasFilters = true;
                }
            }

            // Agregar página a los parámetros
            if (page > 1) {
                params.append('page', page);
            }

            console.log('¿Hay filtros aplicados?', hasFilters);
            
            // Si no hay filtros, usar datos iniciales
            if (!hasFilters && page === 1) {
                console.log('No hay filtros aplicados, usando datos iniciales');
                setFilteredData({
                    chartData: chartData,
                    products: products,
                    pagination: productosPagination
                });
                setLoading(false);
                return;
            }

            console.log('Aplicando filtros:', params.toString());
            const response = await fetch(`/dashboard/admin/filtered-data?${params.toString()}`);
            const data = await response.json();
            
            console.log('Datos recibidos del backend:', data);
            
            setFilteredData({
                chartData: data.chartData || [],
                products: data.products || [],
                pagination: data.pagination || null
            });
        } catch (error) {
            console.error('Error al aplicar filtros:', error);
        } finally {
            setLoading(false);
        }
    };

    // Aplicar filtros cuando cambien
    useEffect(() => {
        applyFilters();
    }, [filters]);

    const handleFilterChange = (filterType, value) => {
        setFilters(prev => ({
            ...prev,
            [filterType]: value
        }));
    };

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
                <Filters 
                    label="Categoría" 
                    options={categorias ? categorias.map(cat => cat.name) : []}
                    value={filters.categoria}
                    onChange={(value) => handleFilterChange('categoria', value)}
                />

                {/* Filtro por Municipio */}
                <Filters 
                    label="Municipio" 
                    options={municipios ? municipios.map(mun => mun.name) : []}
                    value={filters.municipio}
                    onChange={(value) => handleFilterChange('municipio', value)}
                />

                {/* Filtro por Artesano */}
                <Filters 
                    label="Artesano" 
                    options={artesanos ? artesanos.map(art => art.name) : []}
                    value={filters.artesano}
                    onChange={(value) => handleFilterChange('artesano', value)}
                />
            </div>
            {/* Gráficos */}
            {loading ? (
                <div className='text-center text-lg font-bold py-8'>Cargando datos...</div>
            ) : filteredData.chartData === undefined ? (
                <div className='text-center text-lg font-bold'>No hay gráficos para mostrar</div>
            ) : (
                <div className='flex justify-center flex-wrap gap-2 w-full min-w-0'>
                    <div className='flex-1 min-w-[250px] max-w-full'>
                        <h3 className='text-lg font-semibold mb-4 text-center'>Valor Total de Ventas por Producto</h3>
                        <Chart data={filteredData.chartData.data1} />
                    </div>
                    <div className='flex-1 min-w-[250px] max-w-full'>
                        <h3 className='text-lg font-semibold mb-4 text-center'>Cantidad de Productos por Categoría</h3>
                        <Chart data={filteredData.chartData.data2} />
                    </div>
                </div>
            )}
            {/* Tabla de estadísticas */}
            <div className='py-4'>
                <h3 className='text-lg font-semibold mb-4'>Productos Filtrados</h3>
                <div className='overflow-x-auto'>
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
                        {filteredData.products && filteredData.products.length > 0 ? (
                            filteredData.products.map((product) => (
                                <StatisticsTable key={product.id} product={product} />
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7" className="p-4 text-center text-gray-500">
                                    No hay productos que coincidan con los filtros seleccionados
                                </td>
                            </tr>
                        )}
                        </tbody>
                    </table>
                </div>
                
                {/* Paginación */}
                {filteredData.pagination && filteredData.pagination.last_page > 1 && (
                    <div className="flex items-center justify-between mt-4 px-4 py-3 bg-white border-t border-gray-200 sm:px-6">
                        <div className="flex-1 flex justify-between sm:hidden">
                            {filteredData.pagination.current_page > 1 && (
                                <button
                                    onClick={() => applyFilters(filteredData.pagination.current_page - 1)}
                                    className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Anterior
                                </button>
                            )}
                            {filteredData.pagination.current_page < filteredData.pagination.last_page && (
                                <button
                                    onClick={() => applyFilters(filteredData.pagination.current_page + 1)}
                                    className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
                                >
                                    Siguiente
                                </button>
                            )}
                        </div>
                        <div className="hidden sm:flex-1 sm:flex sm:items-center sm:justify-between">
                            <div>
                                <p className="text-sm text-gray-700">
                                    Mostrando{' '}
                                    <span className="font-medium">{filteredData.pagination.from}</span>
                                    {' '}a{' '}
                                    <span className="font-medium">{filteredData.pagination.to}</span>
                                    {' '}de{' '}
                                    <span className="font-medium">{filteredData.pagination.total}</span>
                                    {' '}resultados
                                </p>
                            </div>
                            <div>
                                <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                                    {filteredData.pagination.links.map((link, index) => {
                                        // Extraer número de página de la URL
                                        const pageMatch = link.url ? link.url.match(/page=(\d+)/) : null;
                                        const pageNumber = pageMatch ? parseInt(pageMatch[1]) : null;
                                        
                                        return (
                                            <button
                                                key={index}
                                                onClick={() => pageNumber && applyFilters(pageNumber)}
                                                disabled={!pageNumber}
                                                className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                                    link.active
                                                        ? 'z-10 bg-indigo-50 border-indigo-500 text-indigo-600'
                                                        : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                                                } ${index === 0 ? 'rounded-l-md' : ''} ${
                                                    index === filteredData.pagination.links.length - 1 ? 'rounded-r-md' : ''
                                                } ${!pageNumber ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}`}
                                                dangerouslySetInnerHTML={{ __html: link.label }}
                                            />
                                        );
                                    })}
                                </nav>
                            </div>
                        </div>
                    </div>
                )}
            </div> 
        </div>
    )
}

export default Dashboard;