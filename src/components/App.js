import "../styles/App.css";
import { Route, Routes } from "react-router";
import AppContextProvider from "./ContextAPI/AppContext";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Hotel from "./Hotel/Hotel";
import ShowAllHotels from "./Hotel/ShowAllHotels";
import HotelDetails from "./Hotel/HotelDetails";
import ShowAllFlights from "./Flight/ShowAllFlights";
import ShowAllTrains from "./Train/ShowAllTrains";
import ShowAllBuses from "./Bus/ShowAllBuses";
import LogSignModal from "./LoginSignup/LogSignModal";
import HeaderWhite from "./Header/HeaderWhite";
import HotelReviewPage from "./Hotel/HotelReviewPage";


function App() {
  // https://make-my-trip-clone-react-project-2-s70m6uhsdv18.vercel.app/
  return (<div className="App">
    <AppContextProvider>
      <div className=" overflow-hidden">
        <LogSignModal />
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Home />} />
          </Route>
          <Route element={<HeaderWhite />}>
            <Route path="/hotels/:city" element={<ShowAllHotels />} />
            <Route path="/hotels/hotel-details/:hotelId" element={<HotelDetails />} />
            <Route path="/flights/:from/:to/:weekDay" element={<ShowAllFlights />} />
            <Route path="/trains" element={<ShowAllTrains />} />
            <Route path="/buses/:from/:to/:weekDay" element={<ShowAllBuses />} />
            <Route path="/hotel-review/:hotelId/:roomId" element={<HotelReviewPage/>} />
          </Route>
        </Routes>
      </div>
    </AppContextProvider>
  </div>)
}

export default App;
