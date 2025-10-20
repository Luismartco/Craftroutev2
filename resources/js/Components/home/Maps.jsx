import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { Link } from '@inertiajs/react';
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps"


const Maps = ({position, markers = []}) => {

        const slugify = (text) =>
            text
                ?.toString()
                .toLowerCase()
                .normalize('NFD').replace(/\p{Diacritic}+/gu, '')
                .replace(/[^a-z0-9\s-]/g, '')
                .trim()
                .replace(/\s+/g, '-')
                .replace(/-+/g, '-');

        const calculateDistance = (lat1, lng1, lat2, lng2) => {
            const R = 6371; // Radius of the Earth in km
            const dLat = (lat2 - lat1) * Math.PI / 180;
            const dLng = (lng2 - lng1) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                      Math.sin(dLng / 2) * Math.sin(dLng / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            return R * c;
        };

        const lines = [];
        for (let i = 0; i < markers.length; i++) {
            for (let j = i + 1; j < markers.length; j++) {
                const dist = calculateDistance(markers[i].lat, markers[i].lng, markers[j].lat, markers[j].lng);
                if (dist < 5) {
                    lines.push({
                        path: [
                            { lat: markers[i].lat, lng: markers[i].lng },
                            { lat: markers[j].lat, lng: markers[j].lng }
                        ]
                    });
                }
            }
        }

        const [camera, setCamera] = useState({
            center: position,
            zoom: 15
        });

        //Esto es para manejar el estado del popup del marker cuando se hace click en el
        const [open, setOpen] = useState(false);
        const [selectedMarker, setSelectedMarker] = useState(null);

        const handleCameraChanged = (event) => {
            const newCamera = {
                center: {
                    lat: event.detail.center.lat,
                    lng: event.detail.center.lng
                },
                zoom: event.detail.zoom
            };
            setCamera(newCamera);
        };

        return (
            <APIProvider apiKey={import.meta.env.VITE_MAPS_KEY}>
                <Map 
                    center={camera.center} 
                    zoom={camera.zoom} 
                    gestureHandling="greedy"
                    onCameraChanged={handleCameraChanged}
                >
                    
                    {open &&
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)} >
                            <p className="text-lg font-bold">{position.name}</p>
                        </InfoWindow>
                    }
                    {Array.isArray(markers) && markers.slice(0, 50).map((m, idx) => (
                        (typeof m?.lat === 'number' && typeof m?.lng === 'number') ? (
                            <div key={m.id ?? idx}>
                                <Marker
                                    position={{ lat: m.lat, lng: m.lng }}
                                    onClick={() => setSelectedMarker(m)}
                                />
                                {selectedMarker?.id === m.id && (
                                    <InfoWindow
                                        key={`info-${m.id}`}
                                        position={{ lat: m.lat, lng: m.lng }}
                                        onCloseClick={() => setSelectedMarker(null)}
                                    >
                                        <div className="text-center">
                                            <p className="text-lg font-bold mb-2">{m.name}</p>
                                            <Link
                                                href={route('blog.show', slugify(m.name || ''))}
                                                className="inline-block px-3 py-1 bg-[#2B1F1F] text-white rounded hover:bg-[#3e2f2f] transition text-sm no-underline"
                                            >
                                                Visitar tienda
                                            </Link>
                                        </div>
                                    </InfoWindow>
                                )}
                            </div>
                        ) : null
                    ))}
                </Map>
            </APIProvider>
        );
};

export default Maps;



