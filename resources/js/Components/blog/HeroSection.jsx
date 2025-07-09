import React from 'react';


const HeroSection = ({ImageStore, NameStore, Location}) => {
    return (
        <div className='flex flex-col w-full justify-center'>
            <section className='flex flex-col items-center w-full mx-auto px-1 py-1 relative mt-5'>
            <div className='space-x-10 relative'>
                <div className='relative z-20 flex items-center space-x-8'>
                    <img className='rounded-xl hover:scale-105 transition-all duration-300' 
                    src={ImageStore} alt="image store" />
                    <h1 className="text-3xl font-extrabold mb-4 max-w-xs text-wrap">Tienda {NameStore} {Location}</h1>
                </div>
                {/* <div className='flex flex-col justify-center items-start'>
                    
                </div> */}
            </div>
            <div className='absolute bottom-8 left-0 w-full bg-[#3c2f2f] p-4 rounded-md z-0'></div>
        </section> 
        </div> 
    );
}

export default HeroSection;