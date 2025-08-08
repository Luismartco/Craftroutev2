import React, {useState, useContext} from "react";
import CardItems from "./CardItems";
import ModalItems from "./ModalItems";
import Agree from "./Agree";
import { ModalContext } from "./ModalContext";
import axios from 'axios';

const ManageForm = ({data, title}) => {

    const [list, setList] = useState(data);

    const {setIsModalOpen} = useContext(ModalContext);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState(null);

    const openAddModal = () => {
        setSelectedItem(null);
        setModalOpen(true);
        setIsModalOpen(true);
    }

    const openEditModal = (item) => {
        setSelectedItem(item);
        setModalOpen(true);
        setIsModalOpen(true);
    }

    const openDeleteModal = (item) => {
        setSelectedItem(item);
        setDeleteModalOpen(true);
        setIsModalOpen(true);
    }

    // Función para obtener la URL de la API según el título
    const getApiUrl = () => {
        const baseUrl = '/api';
        switch(title.toLowerCase()) {
            case 'categorías':
                return `${baseUrl}/categorias`;
            case 'materiales':
                return `${baseUrl}/materiales`;
            case 'técnicas':
                return `${baseUrl}/tecnicas`;
            default:
                return `${baseUrl}/categorias`;
        }
    };

    const handleSubmitItem = async (item) => {
        try {
            const apiUrl = getApiUrl();
            const payload = {
                nombre: item.name,
                descripcion: item.description
            };

            if (selectedItem) {
                // Actualizar elemento existente
                const response = await axios.put(`${apiUrl}/${item.id}`, payload);
                if (response.data.success) {
                    setList(prev => 
                        prev.map((itm) => (itm.id === item.id ? item : itm))
                    );
                    alert('Elemento actualizado exitosamente');
                }
            } else {
                // Crear nuevo elemento
                const response = await axios.post(apiUrl, payload);
                if (response.data.success) {
                    const newItem = {
                        id: response.data.data.id,
                        name: response.data.data.nombre,
                        description: response.data.data.descripcion
                    };
                    setList((prev) => [newItem, ...prev]);
                    alert('Elemento creado exitosamente');
                }
            }
            setModalOpen(false);
        } catch (error) {
            console.error('Error al guardar:', error);
            if (error.response?.data?.errors) {
                const errors = Object.values(error.response.data.errors).flat();
                alert('Error de validación: ' + errors.join(', '));
            } else {
                alert('Error al guardar el elemento: ' + (error.response?.data?.message || error.message));
            }
        }
    };

    const handleDelete = async (id) => {
        try {
            const apiUrl = getApiUrl();
            const response = await axios.delete(`${apiUrl}/${id}`);
            
            if (response.data.success) {
                setList(prev => prev.filter(item => item.id !== id));
                alert('Elemento eliminado exitosamente');
            }
            setDeleteModalOpen(false);
        } catch (error) {
            console.error('Error al eliminar:', error);
            alert('Error al eliminar el elemento: ' + (error.response?.data?.message || error.message));
            setDeleteModalOpen(false);
        }
    }

    return (
                <section className={"relative flex flex-col items-center justify-center bg-[#ffffff] shadow-lg rounded-xl p-4 w-full max-w-2xl mx-auto mt-4"}>
                <div className="flex flex-col items-start justify-center w-full max-w-md">
                <h1 className="text-3xl font-bold ">{title} disponibles</h1>
                <button className="bg-[#3C2F2F] p-2 rounded-xl text-white my-2 transform hover:scale-105 transition duration-300 ease-in-out hover:bg-[#4B3A3A]" onClick={openAddModal}>Agregar {title}</button>
                </div>
                {data && list.map((items) => (
                    <CardItems key={items.id} data={items} onDelete={() => openDeleteModal(items)} onEdit={() => openEditModal(items)} />
                ))}
                {
                    isModalOpen && (
                        <ModalItems 
                            data={list}
                            onClose={() => setModalOpen(false)}
                            onSubmit={handleSubmitItem}
                            existingItem={selectedItem}
                            title={title != undefined ? title.toLowerCase() === "materiales" ? title.replace("es", "") : title.replace("s", "") : ""}
                        />
                    )
                }
                {
                    data === undefined ? <p>No hay {title} disponibles.</p> : list.length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full max-w-md">
                            <p className="text-gray-500">No hay {title} disponibles.</p>
                        </div>
                    )
                }
                {
                    //modal de confirmación para eliminar

                    isDeleteModalOpen && (
                        <Agree 
                            onClose={() => setDeleteModalOpen(false)}
                            onDelete={handleDelete}
                            item={selectedItem}
                        />
                    )
                }
            </section>
    );
}

export default ManageForm;