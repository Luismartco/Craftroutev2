import React from 'react';

import CasaCulMorr from '../../../media/CasaCulMorr.png';
import sombrero from '../../../media/sombrero.jpg';
import artisan from '../../../media/artisan.png';
import mochila from '../../../media/mochila.png';
import prod from '../../../media/prod.jpeg';

const images = [CasaCulMorr, prod, mochila, artisan, sombrero];

const FlexTricks = () => {
    return (
        <div className="flex w-auto h-[400px] rounded-[15px] overflow-hidden">
            {images.map((img, index) => (
                <div
                    key={index}
                    className="flex-1 h-full cursor-pointer transition-all duration-500 ease-in-out hover:flex-[3]"
                    style={{
                        backgroundImage: `url(${img})`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                    }}
                ></div>
            ))}
        </div>
    );
};

export default FlexTricks;
