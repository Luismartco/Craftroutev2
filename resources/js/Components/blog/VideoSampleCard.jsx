import React from 'react';

const VideoSampleCard = ({title, videoUrl}) => {
    return (
        <article className='bg-white shadow-lg rounded-2xl overflow-hidden mb-6 mx-auto hover:-translate-y-2 transition-all duration-500 w-full max-w-md sm:max-w-lg border border-gray-100'>
            <div className="relative">
                <div className="bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] p-4">
                    <h3 className='text-lg font-bold text-white text-center flex items-center justify-center gap-2'>
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        {title}
                    </h3>
                </div>
                
                <div className="p-4">
                    <div className="rounded-xl overflow-hidden shadow-inner">
                        <video width="100%" height="auto" controls className='w-full rounded-lg' >
                            <source src={videoUrl} type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>
                    </div>
                </div>
            </div>
        </article>
    );
}

export default VideoSampleCard;