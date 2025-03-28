import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import { useHotel } from "../../context/HotelContext";
import Loader from "../Loader/Loader";
import { useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/useGeoLoacation";

function Map() {
  const [mapCenter, setMapCenter] = useState([51.505, -0.09]);
  const { isLoading, hotels } = useHotel();
  const [searchParams, setSearchParams] = useSearchParams();
  const lat = searchParams.get("lat");
  const lng = searchParams.get("lng");
  const{isLoading: isLoadingGeoLocation,position:geoLocationPosition,getPosition}=useGeoLocation()

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(()=>{
    if(geoLocationPosition?.lat && geoLocationPosition?.lng) setMapCenter([geoLocationPosition.lat,geoLocationPosition.lng])
  },[geoLocationPosition])

  if (isLoading) return <Loader />;
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="getLocation">
          {isLoadingGeoLocation?"Loading ...":"Use Your Location"}
        </button>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        <ChangeCenter position={mapCenter} />
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

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
