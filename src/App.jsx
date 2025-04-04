import { Toaster } from "react-hot-toast";
import "./App.css";
import Header from "./components/Header/Header";
import LocationList from "./components/LocationList/LocationList";
import { Route, Routes } from "react-router-dom";
import AppLayout from "./components/AppLayout/AppLayout";
import Hotels from "./components/Hotels/Hotels";
import SingleHotel from "./components/SingleHotel/SingleHotel";
import BookmarkLayout from "./components/BookmarkLayout/BookmarkLayout";
import Provider from "./Provider";
import Bookmark from "./components/Bookmark/Bookmark";
import SingleBookmark from "./components/SingleBookmark/SingleBookmark";
import AddNewBookmark from "./components/AddNewBookmark/AddNewBookmark";
import Login from "./components/Login/Login";
import ProtectedRouter from "./components/ProtectedRouter/ProtectedRouter";


function App() {
  return (
   <Provider>
        <Toaster />
      <Header />
      <Routes>
        <Route path="/" element={<LocationList />} />
        <Route path="/hotels" element={<AppLayout />}>
          <Route index element={<Hotels />} />
          <Route path=":id" element={<SingleHotel />} />
        </Route>
        <Route path="/bookmark" element={<ProtectedRouter>
          <BookmarkLayout/>
        </ProtectedRouter>}>
        <Route index element={<Bookmark/>} />
        <Route path=":id" element={<SingleBookmark/>} />
        <Route path="add" element={<AddNewBookmark/>} />
        </Route>
        <Route path="/login" element={<Login/>} />
      </Routes>
   </Provider>
  );
}

export default App;
