import React from 'react';
import AMorroa from '../../../media/AMorroa.jpg';
import CasaCulMorr from '../../../media/CasaCulMorr.png';
import hilaza from '../../../media/hilaza.jpg';
import Sampues from '../../../media/Sampues.jpg';
import sombrero from '../../../media/sombrero.jpg';

const images = [AMorroa, CasaCulMorr, hilaza, Sampues, sombrero];

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
