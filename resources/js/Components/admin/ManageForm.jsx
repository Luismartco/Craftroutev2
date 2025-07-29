import React, {useState, useContext} from "react";
import CardItems from "./CardItems";
import ModalItems from "./ModalItems";
import Agree from "./Agree";
import { ModalContext } from "./ModalContext";

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

    const handleSubmitItem = (item) => {
        if (selectedItem) {
            setList(prev => 
                prev.map((itm) => (itm.id === item.id ? item : itm))
        );
        } else {
            setList((prev) => [item,...prev]);    
        }
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        setList(prev => prev.filter(item => item.id !== id));
        setDeleteModalOpen(false);
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
                            title={title != undefined ? title.toLowerCase() === "materiales" ? title.replace("es", ) : title.replace("s", "") : ""}
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