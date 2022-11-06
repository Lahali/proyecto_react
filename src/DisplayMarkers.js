import { useState } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import iconRed from './icon/icon-red.png'
import iconAzul from './icon/icon-azul.png'


export default function DisplayMarkers(props) {

    //const [selectedIndex, setSelectedIndex] = useState(-1); //esto para hacer seguimiento del marker seleccionado

    const leafletMap = useMap();

    function createIcon(url) {
        return new L.Icon({
            iconUrl: url,
            iconSize: [40, 40],
        });
    }

    const handleClick = e => {
        leafletMap.panTo(e.latlng); //esto sirve para centrar el marker seleccionado
        props.setCurrentMarker({
            nombre: e.sourceTarget.options.nombre,
            img: e.sourceTarget.options.imagen,
            coordinates: e.latlng,
            index: e.target.options.index // esto sireve para el icono
        });
    }

    const getMarkerIcon = index => {
        if (index === props.currentMarker.index) {
            //qui bisognerebbe cambiare lo z-index alla classe leaflet-marker-icon. styled components?
            //let imgSelected = document.getElementsByClassName('leaflet-marker-icon');
            //console.log('imgSelected:::', imgSelected);
            return createIcon(iconRed);
        }
        return createIcon(iconAzul);
    }

    const displayMarkers = props.movieFeatures.map((marker, index) => {
        const coordinates = marker.geometry.coordinates;
        const properties = marker.properties;

        return (
            <>
                <Marker
                    className="holaaaaaaaa"
                    style={{
                        border: 'solid green 4px'
                    }}
                    key={index}
                    icon={getMarkerIcon(index)}
                    index={index}
                    //key={String(coordinates)}
                    nombre={properties.escena}
                    imagen={properties.img}
                    position={[coordinates[1], coordinates[0]]}
                    eventHandlers={{
                        click: handleClick
                    }}
                />
            </>
        )
    })

    return (
        <>
            {displayMarkers}
        </>
    )
}

/* <Popup
    className="request-popup"
    /* pane="fixed"
    className="popup-fixed"
    autoPan="false" >
    <h2>{properties.Edifici}</h2> <br />
    {properties.Nom_Via}
</Popup> */

/* const handleClick = e => {
    leafletMap.panTo(e.latlng) //serve a centrare il markatore pero il Popup interferisce...
    props.setEvento(e.target);
    //console.log(e.target.options.children.props.children[0].props.children); queste info le prendeva dal popup
    console.log(e.target.option.attribution);
} */
/*   e => {
      leafletMap.panTo(e.latlng) //serve a centrare il markatore pero il Popup interferisce...
      props.setEvento(properties.Edifici);
      //console.log(e.target.options.children.props.children[0].props.children); queste info le prendeva dal popup
      console.log(properties);
  } */
//console.log('direccion', e.sourceTarget.options)
//console.log('e.latlng:::', e.latlng)
//console.log('nombre:::', e.sourceTarget.options.nombre);
//console.log('IMG:::', e.sourceTarget.options.imagen);
//props.setMapPosition(e.latlng);
//leafletMap.panTo(e.latlng) //serve a centrare il markatore pero il Popup interferisce...