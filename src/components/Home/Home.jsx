import "./home.css";
import "../Header/header.css";
import Flight from "../Flight/Flight";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import Hotel from "../Hotel/Hotel";
import Train from "../Train/Train";
import Bus from "../Bus/Bus";
import { getAirportName, getHotelName } from "../Constant/constant";

const Home = () => {
    const {currentTravelOption,setFlightArray,setHotelArray, setCurrentTravelOption,isModalOpen,setIsModalOpen}=useContext(AppContext);
    const [isOpen,setIsOpen]=useState("none");
    const [loading, setLoading] = useState(false);
    const modals=()=>{
        setIsModalOpen(false);
        setIsOpen("none");
        console.log("home onClick");
    }
    const getData = async () => {
        setLoading(true);
        let res = await getAirportName();
        setFlightArray(res);
        let resp= await getHotelName();
        setHotelArray(resp.data.data.hotels);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    console.log(isOpen,isModalOpen);
    return (
        <>
            <section onClick={modals} className=" overflow-hidden">
                <img className="mainBannerImg" src="https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg6.jpg" alt="" />
                {currentTravelOption==="flight"?
                <Flight loading={loading}/>:
                currentTravelOption==="hotel"?
                <Hotel loading={loading} />:
                currentTravelOption==="train"?
                <Train/>:<Bus/>
                }
            </section>
        </>
    )
}

export default Home;