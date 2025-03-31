import { createContext, useContext, useEffect, useReducer } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const BookmarkContext = createContext();
const BASE_URL = "http://localhost:5000";
const initialState = {
  bookmarks: [],
  isLoading: false,
  currentBookmark: null,
  error: null,
};
function bookmarkReducer(state, { type, payload }) {
  switch (type) {
    case "loading":
      return {
        ...state,
        isLoading: true,
      };
    case "bookmarks/loaded":
      return {
        ...state,
        bookmarks: payload,
        isLoading: false,
      };
    case "bookmark/loaded":
      return {
        ...state,
        currentBookmark: payload,
        isLoading: false,
      };
    case "bookmark/created":
      return {
        ...state,
        currentBookmark: payload,
        bookmarks: [...state.bookmarks, payload],
        isLoading: false,
      };
    case "bookmark/deleted":
      return {
        ...state,
        isLoading: false,
        bookmarks: state.bookmarks.filter((item) => item.id !== payload),
        currentBookmark: null,
      };
    case "rejected":
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    default:
      throw new Error("not loaded");
  }
}

function BookmarkListProvider({ children }) {
  const [{ bookmarks, isLoading, currentBookmark }, dispatch] = useReducer(
    bookmarkReducer,
    initialState
  );
  useEffect(() => {
    async function fetchBookmark() {
      dispatch({ type: "loading" });
      try {
        const { data } = await axios.get(`${BASE_URL}/bookmarks`);
        dispatch({ type: "bookmarks/loaded", payload: data });
      } catch (error) {
        toast.error(error?.message);
        dispatch({
          type: "rejected",
          payload: "an Error occurred in Loading bookmark",
        });
      }
    }
    fetchBookmark();
  }, []);

  async function getBookmark(id) {
    if (Number(id) === currentBookmark?.id) return;
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.get(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/loaded", payload: data });
    } catch (error) {
      toast.error(error?.message);
      dispatch({
        type: "rejected",
        payload: "an Error occurred in fetchin single bookmark",
      });
    }
  }
  async function createBookmark(newBookmark) {
    dispatch({ type: "loading" });
    try {
      const { data } = await axios.post(`${BASE_URL}/bookmarks/`, newBookmark);

      dispatch({ type: "bookmark/created", payload: data });
      toast.success("Bookmark added successfully");
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  async function deleteBookmark(id) {
    dispatch({ type: "loading" });
    try {
      await axios.delete(`${BASE_URL}/bookmarks/${id}`);
      dispatch({ type: "bookmark/deleted", payload: id });
      toast.success("Bookmark deleted");
    } catch (error) {
      toast.error(error?.message);
      dispatch({ type: "rejected", payload: error.message });
    }
  }
  return (
    <BookmarkContext.Provider
      value={{
        isLoading,
        bookmarks,
        currentBookmark,
        getBookmark,
        createBookmark,
        deleteBookmark,
      }}
    >
      {children}
    </BookmarkContext.Provider>
  );
}

export default BookmarkListProvider;
export function useBookmark() {
  return useContext(BookmarkContext);
}
