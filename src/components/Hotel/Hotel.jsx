import { memo, useContext, useEffect, useState } from "react";
import "./hotel.css";
import { AppContext } from "../ContextAPI/AppContext";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { useNavigate } from "react-router";

const Hotel = (props) => {
    const { loading, } = props;
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, } = useContext(AppContext);
    const [rooms, setRooms] = useState({ room: 1, guest: 2 });
    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const navigate=useNavigate();

    const handleHotel = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setIsModalOpen(true);
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    useEffect(() => {
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    const searchHotelsHandle=()=>{
        navigate(`/hotels/${hotelLocation}`);
    }

    return (
        <>
            <BrowserView>
                <section className=" absolute top-20 flex justify-center subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" bg-white  rounded-2xl pt-16 pb-12 px-6 text-left mt-12 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book Domestic and International Property Online.</p>
                            <div className=" grid borderGray rounded-lg w-full cursor-pointer hotelBookingBox">
                                <div onClick={handleHotel} className=" relative px-6 py-3 borderRight  hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">City, Property Name Or Location <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>

                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className=" mt-2">
                                                            <h1 className=" font-extrabold text-3xl">{val.name}</h1>
                                                            <p className=" text-gray-800">{val.location}</p>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
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
                                        {hotelPerNightPrice?.map((price, idx) => {
                                            return (
                                                <>{idx <= 2 ?
                                                    idx <= 1 ? <span className=" text-sm font-bold text-gray-700" >{price},</span> : "..." : ""}
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button onClick={searchHotelsHandle} className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
            <section className=" flex justify-center m-auto subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full  bg-white  rounded-2xl pt-3 pb-12 px-2 text-left mt-20 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book Domestic and International Property Online.</p>
                            <div className=" rounded-lg w-full cursor-pointer hotelBookingBox">
                                <div onClick={handleHotel} className=" relative px-3 py-1  borderGray mb-2 hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800 text-xs ">City, Property Name Or Location <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className=" ">
                                                            <h1 className=" font-extrabold text-base">{val.name}</h1>
                                                            <p className=" text-gray-800 text-xs">{val.location}</p>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <HotelModal />
                                        </div> : ""}
                                </div>

                                <div className=" px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Check-In</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                                <div className=" px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Check-Out</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date + 1}</span>
                                        <span className=" font-semibold ">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                                <div className=" px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Rooms & Guestes</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{rooms.room}</span>
                                        <span className=" font-semibold">Room</span>
                                        <span className=" font-extrabold text-xl">{rooms.guest}</span>
                                        <span className=" font-semibold">Adults</span>
                                    </p>
                                </div>
                                <div className=" px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Price Per Night</span>
                                    <div>
                                        {hotelPerNightPrice?.map((price, idx) => {
                                            return (
                                                <>{idx <= 2 ?
                                                    idx <= 1 ? <span className="text-xs font-bold text-gray-700" >{price},</span> : "..." : ""}
                                                </>
                                            )
                                        })}
                                    </div>
                                </div>
                            </div>
                            <button onClick={searchHotelsHandle} className=" w-full px-6 py-1 mt-4 text-lg font-bold text-white blueSearch rounded-lg">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Hotel);