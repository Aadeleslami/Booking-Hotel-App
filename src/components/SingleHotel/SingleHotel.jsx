import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import { useHotel } from "../../context/HotelContext";
import { useEffect } from "react";

function SingleHotel() {
  const { id } = useParams();
  const { isCurrLoading, currentHotel, getSingleHotel } = useHotel();
  useEffect(() => {
    getSingleHotel(id);
  }, [id]);
  if (isCurrLoading || !currentHotel) return <Loader />;
  return (
    <div className="room">
      <div className="roomDetail">
        <h2>{currentHotel.name}</h2>
        <div>
          {currentHotel.number_of_reviews} reviews &bull;{" "}
          {currentHotel.smart_location}
        </div>
        <img src={currentHotel.xl_picture_url} alt={currentHotel.name} />
      </div>
    </div>
  );
}

export default SingleHotel;
