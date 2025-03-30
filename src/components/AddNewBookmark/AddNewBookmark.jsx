import { useNavigate } from "react-router-dom";
import useUrlLocation from "../../hooks/useUrlLocation";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loader from "../Loader/Loader";
import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListContext";
const BASE_GEOCODING_URL =
  "https://us1.api-bdc.net/data/reverse-geocode-client";
function AddNewBookmark() {
  const [lat, lng] = useUrlLocation();
  const [cityName, setCityName] = useState("");
  const [country, setCountry] = useState("");
  const [countryCode, setCountryCode] = useState("");
  const [isLoadingGeoCoding, setIsLoadingGeoCoding] = useState(false);
  const [errorGeoCoding, setErrorGeoCoding] = useState(null);
  const{createBookmark}=useBookmark()
  const navigate = useNavigate();
  useEffect(() => {
    if (!lat || !lng) return;
    async function fetchLocation() {
      try {
        setIsLoadingGeoCoding(true);
        setErrorGeoCoding(null);
        const { data } = await axios.get(
          `${BASE_GEOCODING_URL}?latitude=${lat}&longitude=${lng}`
        );
        if (!data.countryCode)
          throw new Error(
            "This location is not a city. Please click somewhere else on the map."
          );

        setCityName(data.city || data.locality || "Unknown City");
        setCountry(data?.countryName);
        setCountryCode(data.countryCode);
      } catch (error) {
        setErrorGeoCoding(error.message);
        toast.error(error.message);
      } finally {
        setIsLoadingGeoCoding(false);
      }
    }
    fetchLocation();
  }, [lat, lng]);
  const handleBack = (e) => {
    e.preventDefault();
    navigate(-1);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!cityName || !country) return toast.error("Please fill all fields");
    const newBookmark = {
      cityName,
      country,
      countryCode,
      latitude: lat,
      longitude: lng,
      host_location: cityName + "" + country,
    };
    await createBookmark(newBookmark);
    navigate("/bookmark");
  };
  if (isLoadingGeoCoding) return <Loader />;
  if (errorGeoCoding) return <strong>{errorGeoCoding}</strong>;
  return (
    <div>
      <h2>Bookmark New Location</h2>
      <form className="form" onSubmit={handleSubmit}>
        <div className="formControl">
          <label htmlFor="cityName">City Name</label>
          <input
            value={cityName}
            onChange={(e) => setCityName(e.target.value)}
            type="text"
            id="cityName"
            name="cityName"
          />
        </div>
        <div className="formControl">
          <label htmlFor="country">Country</label>
          <input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            type="text"
            id="country"
            name="country"
          />
          <ReactCountryFlag className="flag" svg countryCode={countryCode} />
        </div>
        <div className="buttons">
          <button className="btn btn--primary">Add</button>
          <button onClick={handleBack} className="btn btn--back">
            &larr; Back
          </button>
        </div>
      </form>
    </div>
  );
}

export default AddNewBookmark;
