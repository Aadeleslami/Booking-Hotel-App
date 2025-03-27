import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotel } from "../../context/HotelContext";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";

function Map() {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const { isLoading, hotels } = useHotel();
  const[searchParams ,setSearchParams]=useSearchParams()
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");  

  useEffect(()=>{
    if(lat && lng){
      setMapCenter([lat,lng])
    }
  },[lat,lng])
  if (isLoading) return <Loader />;
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <ChangeCenter position={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {hotels.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
      ,
    </div>
  );
}

export default Map;

function ChangeCenter({position}){
   const map = useMap()
    map.setView(position)
    return null
}