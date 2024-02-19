const { createContext, useState, useEffect } = require("react");


export const AppContext= createContext();

const AppContextProvider=({children})=>{
    const [currentTravelOption, setCurrentTravelOption]= useState("flight");
    const [flightArray,setFlightArray]=useState([]);
    const [trainArray,setTrainArray]=useState([]);
    const [hotelArray,setHotelArray]=useState([]);
    const [source, setSource]=useState("Delhi");
    const [destination, setDestination]=useState("Mumbai");
    const [hotelLocation, setHotelLocation]=useState("Mumbai, Maharashtra");
    const [trainClassCode,setTrainClassesCode]=useState("ALL");
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [fromOrTo, setFromOrTo]=useState("");
    useEffect(()=>{
        console.log("appContext",isModalOpen)
    },[isModalOpen])
    return(
        <AppContext.Provider value={{
            currentTravelOption, setCurrentTravelOption,
            flightArray,setFlightArray,
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