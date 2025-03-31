import HotelsProvider from "./context/HotelContext";
import BookmarkListProvider from "./context/BookmarkListContext";
import AuthProvider from "./context/AuthProvider";

function Provider({ children }) {
  return (
    <AuthProvider>
      <HotelsProvider>
        <BookmarkListProvider>{children}</BookmarkListProvider>
      </HotelsProvider>
    </AuthProvider>
  );
}

export default Provider;
