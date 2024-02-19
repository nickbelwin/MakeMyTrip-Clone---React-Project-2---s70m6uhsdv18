import { memo, useContext, useEffect, useState } from "react";
import "./flight.css";
import { AppContext } from "../ContextAPI/AppContext";
import { getAirportName, monthNames, weekName } from "../Constant/constant";
import { BrowserView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import FlightModal from "../Modals/FlightModal";
import ShimmerLocation from "../Loader/ShimmerLocation";


const Flight = (props) => {
    const {loading,  } = props;
    const {flightArray,setFlightArray, source, destination, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    const handleFrom = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setDestinationModal(false);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform="rotate(180deg)";
        document.getElementById("toArrow").style.transform="rotate(0deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform="rotate(180deg)";
        document.getElementById("fromArrow").style.transform="rotate(0deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            document.getElementById("fromArrow").style.transform="rotate(0deg)";
            document.getElementById("toArrow").style.transform="rotate(0deg)";
        }
    }, [isModalOpen]);
    useEffect(() => {
    
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    return (
        <>
            <BrowserView>
                <section className=" absolute top-20 flex justify-center subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" bg-white  rounded-2xl pt-16 pb-12 px-6 text-left mt-12 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book International and Domestic Flights.</p>
                            <div className=" relative grid borderGray rounded-lg w-full cursor-pointer  bookingBox">
                                <div onClick={handleFrom} className=" px-6 py-3 relative borderRight  hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === source ?
                                                    <p key={val.city} className=" mt-2">
                                                        <h1 className=" font-extrabold text-3xl">{val.city}</h1>
                                                        <p className=" text-gray-800">{val.name}</p>
                                                    </p> : ""}</>
                                        )
                                    }) : <ShimmerLocation/>}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">To <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === destination ?
                                                    <p key={val.name} className=" mt-2">
                                                        <h1 className=" font-extrabold text-3xl">{val.city}</h1>
                                                        <p className=" text-gray-800">{val.name}</p>
                                                    </p> : ""}</>
                                        )
                                    }) : <ShimmerLocation/> }
                                    {destinationModal ?
                                        <div className=" absolute w-full z-20 top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div className=" px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Departure</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                                <div className=" px-6 py-3 hoverLightBlue">
                                    <span className=" text-gray-800">Travellers & Class</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
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

export default memo(Flight);