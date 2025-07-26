import React from 'react';
import Logo from '../../../media/logo/logo_white.png';
import User from '../../../media/admin/user-admin.png';
import Logout from '../../../media/admin/logout.png';
import ButtonMenu from './ButtonMenu';
import { Link } from '@inertiajs/react';

const Menu = ({user}) => {
    return (
            <aside className='bg-[#3c2f2f] text-white  min-h-screen max-w-xs w-full py-4 px-1 flex flex-col justify-between'>
                <div>
                <div className='flex items-center justify-center gap-1'>
                    <img src={Logo} alt="Logo" className='w-11 h-11' />
                    <h1 className='text-2xl font-extrabold font-mono mt-2'>CrafRoute</h1>
                </div>
                <div>
                    <p className='text-center italic'>Dónde las manos tejen cultura</p>
                    <div className='bg-white rounded-full w-full h-1' ></div>
                </div>
                <div className='py-4'>
                    <h2 className='text-center text-xl font-bold'>MENÚ ADMINISTRADOR</h2>
                    <div className='flex flex-col px-4 py-6 gap-8'>
                        <ButtonMenu text="Dashboard" link="/dashboard/admin" />
                        <ButtonMenu text="Reportes" link="/dashboard/admin/users" />
                        <ButtonMenu text="Gestión categorías" link={route('dashboard.admin.view-state')} />
                        <ButtonMenu text="Gestión Materias" link="/dashboard/admin/products" />
                    </div>
                </div>
                </div>
                <div className='p-2 flex flex-col gap-4 '>
                    <div className='bg-[#584c4c] p-2 flex flex-col items-center justify-center gap-2'>
                        <img src={User} alt="user" className='w-16 h-16' />
                        <p className='text-md'>{user.name}</p>
                    </div>
                    <Link href={route('logout')} method="post" as="button" preserveScroll className='flex gap-4 items-center justify-center hover:cursor-pointer hover:scale-105 transition-all duration-300'>
                        <p className='text-xl font-bold mt-3'>Salir</p>
                        <img src={Logout} alt="logout" className='w-8 h-8' />
                    </Link>
                </div>
            </aside>
    )
}

export default Menu;