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
        <Route path="/bookmark" element={<BookmarkLayout/>}>
        <Route index element={<div>bookmarkList</div>} />
        <Route path="add" element={<div>add bookmark</div>} />
        </Route>
      </Routes>
   </Provider>
  );
}

export default App;
