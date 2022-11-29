import { Marker, useMap } from "react-leaflet";
import * as L from "leaflet";
import iconRed from '../icon/icono-lila.svg' // icono rojo
import iconAzul from '../icon/icono-dark.svg' // icono azul

export default function DisplayMarkers(props) {

    const leafletMap = useMap();
    
    function createIcon(url) {
        return new L.Icon({
            iconUrl: url,
            iconSize: [40, 40],
        });
    }

    const handleClick = e => {
        leafletMap.panTo(e.latlng); //esto sirve para centrar el marker seleccionado
         // console.log('props.prevCurrentMarkertRef', props.prevCurrentMarkertRef.current)
        props.setCurrentMarker({
            scene_title: e.sourceTarget.options.scene_title,
            movie_title: e.sourceTarget.options.movie_title,
            scene_description: e.sourceTarget.options.scene_description,
            img: e.sourceTarget.options.img,
            coordinates: e.latlng,
            index: e.target.options.index // esto sirve para el icono
        });
    }

    const getMarkerIcon = index => { // segun el index es icono rojo o azul
        if (index === props.currentMarker.index) {
            //qui bisognerebbe cambiare lo z-index alla classe leaflet-marker-icon. styled components?
            //let imgSelected = document.getElementsByClassName('leaflet-marker-icon');
            return createIcon(iconRed);
        }
        return createIcon(iconAzul);
    }

    // MAP! por cada escena genero un Marker
    const displayMarkers = props.arrayScenes.map((marker, index) => {
        const coordinates = marker.geometry.coordinates;
        const properties = marker.properties;

        return (
            <Marker
                key={index}
                icon={getMarkerIcon(index)}
                index={index}
                //key={String(coordinates)}
                scene_title={properties.scene_title}
                movie_title={properties.movie_title}
                scene_description={properties.scene_description}
                img={properties.img}
                position={coordinates} // la propiedad tiene que ser position!
                eventHandlers={{
                    click: handleClick
                }}
            />
        )
    })

    return (
        <>
            {displayMarkers}
        </>
    )
}
