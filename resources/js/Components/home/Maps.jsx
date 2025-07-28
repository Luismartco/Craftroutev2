import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useState } from "react";
import { APIProvider, Map, Marker, InfoWindow } from "@vis.gl/react-google-maps"


const Maps = ({position}) => {

        const [camera, setCamera] = useState({
            center: position,
            zoom: 14
        });

        //Esto es para manejar el estado del popup del marker cuando se hace click en el
        const [open, setOpen] = useState(false);

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
                    <Marker position={position} onClick={() => setOpen(!open)} />
                    {open && 
                        <InfoWindow position={position} onCloseClick={() => setOpen(false)} >
                            <p className="text-lg font-bold">{position.name}</p>
                        </InfoWindow>
                    }
                </Map>
            </APIProvider>
        );
};

export default Maps;



