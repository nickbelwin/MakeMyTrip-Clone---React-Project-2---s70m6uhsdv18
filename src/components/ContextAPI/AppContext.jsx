const { createContext, useState, useEffect } = require("react");


export const AppContext= createContext();

const AppContextProvider=({children})=>{
    const [currentTravelOption, setCurrentTravelOption]= useState("FLIGHTS");
    const [flightArray,setFlightArray]=useState([]);
    const [flightdate, setFlightDate] = useState(new Date());
    const [trainArray,setTrainArray]=useState([]);
    const [hotelArray,setHotelArray]=useState([]);
    const [source, setSource]=useState("Delhi");
    const [destination, setDestination]=useState("Mumbai");
    const [hotelLocation, setHotelLocation]=useState("Mumbai");
    const [trainClassCode,setTrainClassesCode]=useState("ALL");
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [fromOrTo, setFromOrTo]=useState("");

    return(
        <AppContext.Provider value={{
            currentTravelOption, setCurrentTravelOption,
            flightArray,setFlightArray,
            flightdate, setFlightDate,
            trainArray,setTrainArray,
            hotelArray,setHotelArray,
            source, setSource,
            destination, setDestination,
            hotelLocation, setHotelLocation,
            isModalOpen,setIsModalOpen,
            trainClassCode,setTrainClassesCode,
            fromOrTo, setFromOrTo,
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider;