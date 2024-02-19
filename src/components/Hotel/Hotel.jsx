import { memo, useContext, useEffect, useState } from "react";
import "./hotel.css";
import { AppContext } from "../ContextAPI/AppContext";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";
import { BrowserView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";

const Hotel = (props) => {
    const {loading, } = props;
    const { hotelLocation,isModalOpen,setIsModalOpen,hotelArray,setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, } = useContext(AppContext);
    const [rooms,setRooms]=useState({room:1,guest:2});
    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName,setHotelName]=useState(hotelArray);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    const handleHotel = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setIsModalOpen(true);
        document.getElementById("fromArrow").style.transform="rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            document.getElementById("fromArrow").style.transform="rotate(0deg)";
        }
    }, [isModalOpen]);
    useEffect(() => {
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, [])

    return (
        <>
            <BrowserView>
                <section className=" absolute top-20 flex justify-center subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" bg-white  rounded-2xl pt-16 pb-12 px-6 text-left mt-12 ">
                            <div className=" grid borderGray rounded-lg w-full cursor-pointer hotelBookingBox">
                                <div onClick={handleHotel} className=" relative px-6 py-3 borderRight  hoverLightBlue">
                                <span className="flex flex-row gap-1 alignCenter text-gray-800">City, Property Name Or Location <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                        
                                    {!loading?
                                    hotelName?.map((val) => {
                                        return (
                                            <>
                                            {val?.location===hotelLocation?
                                                <p className=" mt-2">
                                                <h1 className=" font-extrabold text-3xl">{val.name}</h1>
                                                <p className=" text-gray-800">{val.location}</p>
                                            </p>:""}</>
                                        )
                                    }):<ShimmerLocation/>}
                                    {sourceModal ?
                                        <div className=" absolute z-20 top-28 flightModal" >
                                            <HotelModal />
                                        </div> : ""}
                                </div>

                                <div className=" px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Check-In</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                                <div className=" px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Check-Out</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                                <div className=" px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Rooms & Guestes</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{rooms.room}</span>
                                        <span className=" font-semibold">Room</span>
                                        <span className=" font-extrabold text-3xl">{rooms.guest}</span>
                                        <span className=" font-semibold">Adults</span>
                                    </p>
                                </div>
                                <div className=" px-6 py-3  hoverLightBlue">
                                    <span className=" text-gray-800">Price Per Night</span>
                                    <div>
                                        {hotelPerNightPrice?.map((price,idx)=>{
                                            return (
                                                <>{idx<=2?
                                                   idx<=1?<span className=" text-sm font-bold text-gray-700" >{price},</span>:"..." :""}
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
        </>
    )
}

export default memo(Hotel);