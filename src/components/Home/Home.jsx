import "./home.css";
import "../Header/header.css";
import Flight from "../Flight/Flight";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import Hotel from "../Hotel/Hotel";
import Train from "../Train/Train";
import Bus from "../Bus/Bus";
import { getAirportName, getHotelName } from "../Constant/constant";
import Offers from "../Offers/Offers";

const Home = () => {
    const {currentTravelOption,setFlightArray,setHotelArray, setCurrentTravelOption,isModalOpen,setIsModalOpen}=useContext(AppContext);
    const [isOpen,setIsOpen]=useState("none");
    const [loading, setLoading] = useState(false);
    const modals=()=>{
        setIsModalOpen(false);
    }
    const getData = async () => {
        setLoading(true);
        let res = await getAirportName();
        setFlightArray(res);
        let resp= await getHotelName();
        let hotelData=resp.data.data.cities;
        let hotelPlace=hotelData?.map((val)=>{
            return val.cityState;
        });
        hotelPlace=hotelPlace.map((val)=>{
            return val.split(",");
        });
        hotelPlace=hotelPlace.map((val,idx)=>{
            return {_id:hotelData[idx]._id,name:val[0], location:val[0]+","+val[1]}
        });
        setHotelArray(hotelPlace);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <section onClick={modals} className=" overflow-hidden no-scrollbar home">
                <img className="mainBannerImg" src="https://imgak.mmtcdn.com/pwa_v3/pwa_commons_assets/desktop/bg6.jpg" alt="" />
                {currentTravelOption==="FLIGHTS"?
                <Flight loading={loading}/>:
                currentTravelOption==="HOTELS"?
                <Hotel loading={loading} />:
                currentTravelOption==="RAILS"?
                <Train/>:<Bus/>
                }
                <Offers/>
            </section>
        </>
    )
}

export default Home;