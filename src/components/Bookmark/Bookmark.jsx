import ReactCountryFlag from "react-country-flag";
import { useBookmark } from "../../context/BookmarkListContext";
import Loader from "../Loader/Loader";
import { Link } from "react-router-dom";
import { HiTrash } from "react-icons/hi2";
function Bookmark() {
  const { isLoading, bookmarks ,currentBookmark ,deleteBookmark } = useBookmark();
  const handleDelete = async (e,id)=>{
    e.preventDefault();
   await deleteBookmark(id)
    
  }
  if (isLoading) return <Loader />;
  if (!bookmarks.length) return <h2>No Bookmarks</h2>;
  return (
    <div>
      <h2>Bookmark List</h2>
      <div className="bookmarkList">
        {bookmarks.map((item) => {
          return (
           <Link key={item.id} to={`/bookmark/${item.id}?lat=${item.latitude}&lng=${item.longitude}`} >
            <div  className={`bookmarkItem ${currentBookmark?.id === item.id ? "current-bookmark" : ""}`}>
             <div>
             <ReactCountryFlag svg countryCode={item.countryCode} />
              &nbsp;<strong>{item.cityName}</strong>&nbsp;
              <span>{item.country}</span>
             </div>
             <button onClick={(e)=>handleDelete(e,item.id)}>
              <HiTrash className="trash"/>
             </button>
            </div>
           </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Bookmark;
