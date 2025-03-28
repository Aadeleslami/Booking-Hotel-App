import { createContext, useContext, useState } from "react";
import useFetch from "../hooks/useFetch";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";

function BookmarkListProvider({ children }) {
  const [isCurrLoadingBookmark, setIsCurrLoadingBookmark] = useState(false);
  const [currentBookmark, setCurrentBookmark] = useState(null);

  const { isLoading, data: bookmarks } = useFetch(`${BASE_URL}/bookmarks`);
  async function getBookmark(id) {
    setIsCurrLoadingBookmark(true);
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      setCurrentBookmark(data);
      setIsCurrLoadingBookmark(false);
    } catch (error) {
      toast.error(error?.message);
      setIsCurrLoadingBookmark(false);
    }
  }
  return (
    <BookmarkContext.Provider
      value={{ isLoading, bookmarks, isCurrLoadingBookmark, currentBookmark, getBookmark }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;
export function useBookmark() {
  return useContext(BookmarkContext);
}
