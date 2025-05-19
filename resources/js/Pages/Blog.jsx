import React from 'react';
import { Head, Link } from '@inertiajs/react';
import GuestLayout from "@/Layouts/GuestLayout";
import BlogCard from "@/Components/blog/BlogCard"
import imgageBlog from "../../media/blog/maria-hoyos.png";
import imageStore from "../../media/blog/store.png"



export default function Blog({ auth }) {

    const posts = [
        {
            image: imgageBlog,
            title: "Proceso de tejido de una hamaca a encargo",
            nameArtisan: "María Hoyos",
            nameStore: "La mano de Dios",
            description: "Hermosa hamaca que pidió una cliente desde la ciudad de Montería."
        },
        {
            image: imgageBlog,
            title: "Proceso creación sombrero vueltiao",
            nameArtisan: "Eliasib Benítez",
            nameStore: "El sombrero de la abuela",
            description: "Hermoso sombrero vueltiao que pidió una cliente desde la ciudad de Barranquilla."
        },
        {
            image: imgageBlog,
            title: "Proceso de tejido de una mochila",
            nameArtisan: "Deymis Camargo",
            nameStore: "Mochilas yo si te robo",
            description: '"Tejiendo" una mochila a crochet para estafar a un cliente en el municipio de Sampues.'
        }
    ];

    return (
        <GuestLayout auth={auth} fullWidth={true}>
          <div className='flex bg-white space-x-4'>
            <img src={imageStore} alt='imageStore' />
            <div className='flex flex-col justify-center'>
                 <h1 className='text-center font-bold'>Tienda la mano de Dios <br /> San Blas, Morroa</h1>
            </div>
            <h2>Estoy en proceso</h2>
          </div>
        </GuestLayout>
    );
}