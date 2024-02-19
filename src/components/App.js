import "../styles/App.css";
import { Route, Routes } from "react-router";
import AppContextProvider from "./ContextAPI/AppContext";
import Home from "./Home/Home";
import Header from "./Header/Header";
import Hotel from "./Hotel/Hotel";

function App() {
  return (<div className="App">
    <AppContextProvider>
      <div className=" overflow-hidden">
        <Routes>
          <Route path="/" element={<Header />} >
            <Route index element={<Home/>} />
          </Route>
        </Routes>
      </div>
    </AppContextProvider>
  </div>)
}

export default App;
