import React from 'react';

const VideoSampleCard = ({title, videoUrl}) => {
    return (
        <article className='bg-[#ededee] shadow-md overflow-hidden mb-6 mx-auto hover:-translate-y-1 transition-transform duration-300 ease-in-out w-full max-w-md sm:max-w-lg'>
           <video width="100%" height="auto" controls className='w-full' >
                <source src={videoUrl} type="video/mp4" />
                Your browser does not support the video tag.
           </video>
            <h3 className='text-lg text-black text-center mb-2 mt-4' >{title}</h3>
        </article>
    );
}

export default VideoSampleCard;