/* import { Marker, Tooltip, useMap } from "react-leaflet";




const MarkerTooltip = (props) => {

    const leafletMap = useMap();

    const displayMarkers = props.data.map(marker => {
        const coordinates = marker.geometry.coordinates;
        const properties = marker.properties;
        return (
            <Marker
                key={String(coordinates)}
                position={[coordinates[1], coordinates[0]]}
                eventHandlers={{
                    click: (e) => leafletMap.panTo(e.latlng) //col Tooltip funziona bene, col popup no
                }}>
                <Tooltip >
                    <div >
                        <h2>{properties.Edifici}</h2> <br />
                        {properties.Nom_Via}
                    </div>
                </Tooltip>
            </Marker>
        )
    })


    return (
        <>
            {displayMarkers}
        </>
    )
}

export default MarkerTooltip; */