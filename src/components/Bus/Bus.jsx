import { memo, useContext, useEffect, useState } from "react";
import "./bus.css"
import { AppContext } from "../ContextAPI/AppContext";
import { cityListArray, monthNames, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import BusModal from "../Modals/BusModal";
import { useNavigate } from "react-router";
function Bus(props) {
    const { isModalOpen, setIsModalOpen, source,
        destination, fromOrTo, setFromOrTo } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const navigate = useNavigate();
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
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
        document.getElementById("toArrow").style.transform = "rotate(0deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("fromArrow").style.transform = "rotate(0deg)";
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
            document.getElementById("toArrow").style.transform = "rotate(0deg)";
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
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Bus Ticket Booking.</p>
                            <div className=" grid borderGray rounded-lg w-full cursor-pointer busBookingBox">
                                <div onClick={handleFrom} className=" relative px-6 py-3 borderRight  hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === source ?
                                                    <p key={val.name} className=" mt-2">
                                                        <h1 className=" font-extrabold text-3xl">{val.name}</h1>
                                                        <p className=" text-gray-800">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">To <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === destination ?
                                                    <p className=" mt-2">
                                                        <h1 className=" font-extrabold text-3xl">{val.name}</h1>
                                                        <p className=" text-gray-800">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {destinationModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div className=" px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Travel Date</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => { navigate(`/Buses/${source}/${destination}/${weekName[day]}`) }} className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className=" flex justify-center  m-auto subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full bg-white  rounded-2xl pt-3 pb-12 px-3 text-left mt-20 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Bus Ticket Booking.</p>
                            <div className=" rounded-lg w-full cursor-pointer busBookingBox">
                                <div onClick={handleFrom} className=" relative px-3 py-1 borderGray mb-2  hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs alignCenter text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === source ?
                                                    <p key={val.name} className="">
                                                        <h1 className=" font-extrabold text-lg">{val.name}</h1>
                                                        <p className=" text-gray-800 text-xs">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-3 py-1  borderGray mb-2  hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs alignCenter text-gray-800">To <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === destination ?
                                                    <p className="">
                                                        <h1 className=" font-extrabold text-lg">{val.name}</h1>
                                                        <p className=" text-gray-800 text-xs">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {destinationModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div className=" px-3 py-1  borderGray mb-2  hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Travel Date</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[day - 1]}</p>
                                    </p>
                                </div>
                            </div>
                            <button onClick={() => { navigate(`/Buses/${source}/${destination}/${weekName[day]}`) }} className=" w-full px-6 py-2 text-lg font-bold text-white blueSearch rounded-lg mt-3">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    );
}

export default memo(Bus);