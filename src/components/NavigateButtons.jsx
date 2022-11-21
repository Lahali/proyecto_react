export default function NavigateButtons(props) {


    // trova in che posizione dell'array Movie è il nome di curent
    //next place è la coordinata del successivo elemento di Movue
    //
    //
    //const leafletMap = useMap();

    const next = () => {
        let nextIndexEscena = 0;
        let lengthMovie = props.movie.features.length;
        let indexEscena = props.movie.features.findIndex(escena => escena.properties.escena === props.currentMarker.nombre)
        if (indexEscena === lengthMovie - 1) {
            nextIndexEscena = 0
        } else {
            nextIndexEscena = indexEscena + 1
        }
        props.setCurrentMarker({
            nombre: props.movie.features[nextIndexEscena].properties.escena,
            img: props.movie.features[nextIndexEscena].properties.img,
            coordinates: [props.movie.features[nextIndexEscena].geometry.coordinates[1], props.movie.features[nextIndexEscena].geometry.coordinates[0]],
            index: nextIndexEscena
        })
        props.map.flyTo([props.movie.features[nextIndexEscena].geometry.coordinates[1], props.movie.features[nextIndexEscena].geometry.coordinates[0]],
            this, {
            animate: true,
            duration: 1
        });
    }

    const before = () => {
        let nextIndexEscena = 0;
        let lengthMovie = props.movie.features.length;
        let indexEscena = props.movie.features.findIndex(escena => escena.properties.escena === props.currentMarker.nombre)
        if (indexEscena === 0) {
            nextIndexEscena = lengthMovie - 1
        } else {
            nextIndexEscena = indexEscena - 1
        }
        props.setCurrentMarker({
            nombre: props.movie.features[nextIndexEscena].properties.escena,
            img: props.movie.features[nextIndexEscena].properties.img,
            coordinates: [props.movie.features[nextIndexEscena].geometry.coordinates[1], props.movie.features[nextIndexEscena].geometry.coordinates[0]],
            index: nextIndexEscena
        })
        props.map.flyTo([props.movie.features[nextIndexEscena].geometry.coordinates[1], props.movie.features[nextIndexEscena].geometry.coordinates[0]])
        // en lugar de flyTo se puede usar setView
    }

    return (
        <div className="navigateButtons">
            {/* props.action para el onClick y {children} el texto*/}
            <button className="buttonNav" onClick={props.action}>{props.children}</button>
            {/* <button className="buttonNav" onClick={next}>NEXT</button> */}
        </div>
    )
}