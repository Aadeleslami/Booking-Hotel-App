import { useNavigate, useParams } from "react-router-dom";
import { useBookmark } from "../../context/BookmarkListContext";
import { useEffect } from "react";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";

function SingleBookmark() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { isCurrLoadingBookmark, currentBookmark, getBookmark } = useBookmark();
  const handleBack = () => {
    navigate(-1)
  };
  useEffect(() => {
    getBookmark(id);
  }, [id]);
  if (isCurrLoadingBookmark || !currentBookmark) return <Loader />;
  return (
    <div>
      <button onClick={handleBack} className="btn btn--back">
        
       &larr; Back
      </button>
      <h2>{currentBookmark.cityName}</h2>
      <div className="bookmarkItem">
        <ReactCountryFlag svg countryCode={currentBookmark.countryCode} />
        &nbsp;<strong>{currentBookmark.cityName}</strong>&nbsp;
        <span>{currentBookmark.country}</span>
      </div>
    </div>
  );
}

export default SingleBookmark;
