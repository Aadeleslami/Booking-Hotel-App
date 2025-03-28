import { Outlet } from "react-router-dom";
import Map from "../Map/Map";
import { useHotel } from "../../context/HotelContext";

function AppLayout() {
  const{hotels}=useHotel()
  return (
    <div className="appLayout">
      <div className="sidebar">
        <Outlet />
      </div>
      <Map markerLocation={hotels} />
    </div>
  );
}

export default AppLayout;
