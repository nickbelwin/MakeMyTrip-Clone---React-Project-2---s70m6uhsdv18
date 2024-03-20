const { createContext, useState, useEffect } = require("react");


export const AppContext= createContext();

const AppContextProvider=({children})=>{
    const [isLogin,setIsLogin]=useState({status:false, page:"login"});
    const [token,setToken]=useState("");
    const [nameOfUser, setNameOfUser]=useState("");
    const [currentTravelOption, setCurrentTravelOption]= useState("FLIGHTS");
    const [flightArray,setFlightArray]=useState([]);
    const [flightdate, setFlightDate] = useState(new Date());
    const [hotelInDate,setHotelInDate]=useState(new Date());
    const [hotelOutDate,setHotelOutDate]=useState(new Date());
    const [bookingStatus, setBookingStatus] = useState(false);
    const [trainArray,setTrainArray]=useState([]);
    const [hotelArray,setHotelArray]=useState([]);
    const [source, setSource]=useState("Delhi");
    const [destination, setDestination]=useState("Mumbai");
    const [hotelLocation, setHotelLocation]=useState("Mumbai");
    const [trainClassCode,setTrainClassesCode]=useState("ALL");
    const [isModalOpen,setIsModalOpen]=useState(false);
    const [fromOrTo, setFromOrTo]=useState("");

    const closeHandler=()=>{
        setIsLogin({...isLogin, status:false});
    }

    useEffect(()=>{
        setToken(localStorage.getItem("mmtToken"));
        setNameOfUser(localStorage.getItem("mmtName"));
    },[]);

    return(
        <AppContext.Provider value={{
            closeHandler,
            isLogin,setIsLogin,
            token,setToken,
            nameOfUser, setNameOfUser,
            currentTravelOption, setCurrentTravelOption,
            flightArray,setFlightArray,
            flightdate, setFlightDate,
            hotelInDate,setHotelInDate,
            hotelOutDate,setHotelOutDate,
            bookingStatus, setBookingStatus,
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