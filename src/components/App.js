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
import FlightBooking from "./Flight/FlightBooking";
import Payment from "./Payment/Payment";
import Demo from "./Demo";
import TrainReview from "./Train/TrainReview";
import BusReview from "./Bus/BusReview";



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
          </Route>
          <Route path="/hotel-review/:hotelId/:roomId" element={<HotelReviewPage/>} />
          <Route path="/flight-review/:flightId" element={<FlightBooking/>} />
          <Route path="/train/review/:from/:to/:trainId/:trainClass" element={<TrainReview/>} />
          <Route path="/payment/:option/:fareId/:roomId" element={<Payment/>} />
          <Route path="/Bus-review/:busId" element={<BusReview/>}/>
        </Routes>
      </div>
    </AppContextProvider>
  </div>)
}

export default App;
