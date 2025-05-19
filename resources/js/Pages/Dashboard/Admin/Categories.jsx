import React, {useState} from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import CardCategories from "@/Components/admin/CardCategories";
import ModalCategories from "@/Components/admin/ModalCategories";
import Agree from "@/Components/admin/Agree";

const Categories = () => {

    const [categories, setCategories] = useState([
        { id: 1, name: "Categoría 1", description: "Descripción de la categoría 1" },
        { id: 2, name: "Categoría 2", description: "Descripción de la categoría 2" },
        { id: 3, name: "Categoría 3", description: "Descripción de la categoría 3" },
        { id: 4, name: "Categoría 4", description: "Descripción de la categoría 4" },
        { id: 5, name: "Categoría 5", description: "Descripción de la categoría 5" },
    ]);

    const [isModalOpen, setModalOpen] = useState(false);
    const [isDeleteModalOpen, setDeleteModalOpen] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const openAddModal = () => {
        setSelectedCategory(null);
        setModalOpen(true);
    }

    const openEditModal = (category) => {
        setSelectedCategory(category);
        setModalOpen(true);
    }

    const openDeleteModal = (category) => {
        setSelectedCategory(category);
        setDeleteModalOpen(true);
    }

    const handleSubmitCategory = (category) => {
        if (selectedCategory) {
            setCategories(prev => 
                prev.map((cat) => (cat.id === category.id ? category : cat))
        );
        } else {
            setCategories((prev) => [...prev, category]);
        }
        setModalOpen(false);
    };

    const handleDelete = (id) => {
        setCategories(prev => prev.filter(category => category.id !== id));
        setDeleteModalOpen(false);
    }

    return (
        <AuthenticatedLayout>
            <section className="flex flex-col items-center justify-center bg-[#ffffff] shadow-sm rounded-lg p-4 w-full max-w-2xl mx-auto mt-4">

                <div className="flex flex-col items-start justify-center w-full max-w-md">
                <h1 className="text-3xl font-bold ">Categorías disponibles</h1>
                <button className="bg-[#3C2F2F] p-2 rounded-xl text-white my-2 transform hover:scale-105 transition duration-300 ease-in-out hover:bg-[#4B3A3A]" onClick={openAddModal}>Agregar categorías</button>
                </div>
                {categories.map((category) => (
                    <CardCategories key={category.id} data={category} onDelete={() => openDeleteModal(category)} onEdit={() => openEditModal(category)} />
                ))}
                {
                    isModalOpen && (
                        <ModalCategories 
                            data={categories}
                            onClose={() => setModalOpen(false)}
                            onSubmit={handleSubmitCategory}
                            existingCategory={selectedCategory}
                        />
                    )
                }
                {
                    categories.length === 0 && (
                        <div className="flex flex-col items-center justify-center w-full max-w-md">
                            <p className="text-gray-500">No hay categorías disponibles.</p>
                        </div>
                    )
                }
                {
                    //modal de confirmación para eliminar

                    isDeleteModalOpen && (
                        <Agree 
                            onClose={() => setDeleteModalOpen(false)}
                            onDelete={handleDelete}
                            category={selectedCategory}
                        />
                    )
                }
            </section>
        </AuthenticatedLayout>
    );
}

export default Categories;