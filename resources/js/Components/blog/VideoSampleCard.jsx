import React from 'react';

const VideoSampleCard = ({ title, videoUrl }) => {
    // Extraer el ID del video de YouTube
    const getYouTubeEmbedUrl = (url) => {
        const videoId = url.split("v=")[1]?.split("&")[0];
        return `https://www.youtube.com/embed/${videoId}`;
    };

    return (
        <article className='bg-white shadow-md rounded-xl overflow-hidden w-full h-60 hover:-translate-y-1 transition-all duration-300 border border-gray-100'>
            <div className="flex h-full">
                {/* Panel de información lateral compacto */}
                <div className="w-1/4 bg-gradient-to-r from-[#4B3A3A] to-[#2B1F1F] p-4 flex flex-col justify-center">
                    <div className="text-center">
                        <svg className="w-8 h-8 mx-auto mb-2 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
                        </svg>
                        <h3 className='text-sm font-bold text-white leading-tight mb-1'>Video Demo</h3>
                        <p className='text-xs text-gray-200 leading-tight'>{title}</p>
                    </div>
                </div>

                {/* Video YouTube */}
                <div className="flex-1 p-3">
                    <div className="h-full rounded-lg overflow-hidden shadow-inner">
                        <iframe
                            src={getYouTubeEmbedUrl(videoUrl)}
                            title={title}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            className="w-full h-full rounded-lg"
                        ></iframe>
                    </div>
                </div>
            </div>
        </article>
    );
};

export default VideoSampleCard;
