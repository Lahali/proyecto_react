// Home
const [filteredTitle, setFilteredTitle] = useState('');

// Main
const [newMarkerPosition, setNweMarkerPosition] = useState();
const [movie, setMovie] = useState(film); // guardamo en un State los datos mandados dentro de Link
const [map, setMap] = useState(null);
const [currentMarker, setCurrentMarker] = useState({}); // el marker actualmente seleccionado

// Card
const [clickedCard, setClickedCard] = useState(false)