import React, {useContext} from 'react'
import Dashboard from './Dashboard';
import ManageForm from './ManageForm';
import { MenuContext } from './MenuContext';
import { ModalContext } from './ModalContext';

const DetailsPanel = ({stats, chartData, products, productosPagination, categorias, municipios, artesanos, categories, Materials, Techniques }) => {

    const {show} = useContext(MenuContext);
    const {isModalOpen} = useContext(ModalContext);
    const styles = "flex-1 py-2 px-4 overflow-y-auto";

    return (
        <main className={ show === "dashboard" ? styles : isModalOpen ? 'flex-1 py-2 px-4 overflow-y-auto flex flex-col items-center justify-center bg-black bg-opacity-50' : "flex-1 py-2 px-4 overflow-y-auto flex flex-col items-center justify-center"}>
           { show === "dashboard" && (
                <Dashboard 
                    stats={stats} 
                    chartData={chartData} 
                    products={products}
                    productosPagination={productosPagination}
                    categorias={categorias}
                    municipios={municipios}
                    artesanos={artesanos}
                />
           )}
           { show === "categories" && (
                <ManageForm data={categories} title="Categorías" />
           )}
           { show === "materials" && (
                <ManageForm data={Materials} title="Materiales" />
           )}
           { show === "techniques" && (
                <ManageForm data={Techniques} title="Técnicas" />
           )}
        </main>
    );
}

export default DetailsPanel;