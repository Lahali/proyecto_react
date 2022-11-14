import { Marker, Popup, useMap } from "react-leaflet";
import * as L from "leaflet";
import iconRed from '../icon/icon-red.png' // icono rojo
import iconAzul from '../icon/marker1.svg' // icono azul


export default function DisplayMarkers(props) {

    const leafletMap = useMap();

    function createIcon(url) {
        return new L.Icon({
            iconUrl: url,
            iconSize: [40, 40],
        });
    }

    const handleClick = e => {
        console.log('COSEEEE', e.sourceTarget.options)
        leafletMap.panTo(e.latlng); //esto sirve para centrar el marker seleccionado
        props.setCurrentMarker({
            scene_title: e.sourceTarget.options.scene_title,
            movie_title: e.sourceTarget.options.movie_title,
            img: e.sourceTarget.options.img,
            coordinates: e.latlng,
            index: e.target.options.index // esto sireve para el icono
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

    // por cada escena genero un Marker
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
                img={properties.img}
                position={coordinates} // esto tiene que ser position!
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