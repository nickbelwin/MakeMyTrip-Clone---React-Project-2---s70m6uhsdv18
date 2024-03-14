import { memo, useContext, useEffect, useState } from "react";
import "./flight.css";
import { AppContext } from "../ContextAPI/AppContext";
import { flightCodeArray, getAirportName, monthNames, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import FlightModal from "../Modals/FlightModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import Calendar from "react-calendar";
import { useNavigate } from "react-router";


const Flight = (props) => {
    const { loading, } = props;
    const { flightArray, setFlightArray, source, destination, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, flightdate, setFlightDate } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightSourceCode, setFlightSourceCode] = useState("DEL");
    const [flightDestinationCode, setFlightDestinationCode] = useState("BOM");
    const [flightDateModal, setFlightDateModal] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        let from = flightCodeArray?.filter((val) => {
            if (source === val.city) {
                return val.code;
            }
        });
        let to = flightCodeArray?.filter((val) => {
            if (destination === val.city) {
                return val.code;
            }
        });
        setFlightSourceCode(from[0]?.code);
        setFlightDestinationCode(to[0]?.code);
        console.log(from[0]?.code, to[0]?.code);
    }, [source, destination])
    const onChange = (newDate) => {
        let chek = newDate;
        setFlightDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        // Add any additional logic you need when the date changes
    };
    const handleFrom = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setDestinationModal(false);
        setFlightDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
        document.getElementById("toArrow").style.transform = "rotate(0deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setFlightDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
        document.getElementById("fromArrow").style.transform = "rotate(0deg)";
    }
    const handleDateModal = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setFlightDateModal(true);
        setIsModalOpen(true);
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setFlightDateModal(false);
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
    }, []);
    console.log(day);
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
                                    }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
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
                                    }) : <ShimmerLocation />}
                                    {destinationModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-6 py-3 hoverLightBlue">
                                    <span className=" text-gray-800">Departure</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day]}</p>
                                        {flightDateModal ?
                                            <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                                <Calendar onChange={onChange} />
                                            </div> : ""}
                                        <p>{ }</p>
                                    </p>
                                </div>
                                {/* <div className=" px-6 py-3 hoverLightBlue">
                                    <span className=" text-gray-800">Travellers & Class</span>
                                    <p>
                                        
                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate(`/flights/${flightSourceCode}/${flightDestinationCode}/${weekName[day]}`) }} className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className=" absolute top-20 flex justify-center subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full bg-white  rounded-2xl pt-16 pb-12 px-6 text-left mt-12 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book International and Domestic Flights.</p>
                            <div className=" relative  borderGray rounded-lg w-full cursor-pointer  ">
                                <div onClick={handleFrom} className=" px-6 py-3 relative borderBottomGray  hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === source ?
                                                    <p key={val.city} className=" ">
                                                        <h1 className=" font-extrabold text-base">{val.city}</h1>
                                                        <p className=" text-gray-800 text-xs">{val.name}</p>
                                                    </p> : ""}</>
                                        )
                                    }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-6 py-3 borderBottomGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-gray-800">To <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ? flightArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.city === destination ?
                                                    <p key={val.name} className="">
                                                        <h1 className=" font-extrabold text-base">{val.city}</h1>
                                                        <p className=" text-gray-800 text-xs">{val.name}</p>
                                                    </p> : ""}</>
                                        )
                                    }) : <ShimmerLocation />}
                                    {destinationModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <FlightModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-6 py-3 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Departure</span>
                                    <p>
                                        <span className=" font-extrabold text-base">{date}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[day]}</p>
                                        {flightDateModal ?
                                            <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                                <Calendar onChange={onChange} />
                                            </div> : ""}
                                        <p>{ }</p>
                                    </p>
                                </div>
                                {/* <div className=" px-6 py-3 hoverLightBlue">
                                    <span className=" text-gray-800">Travellers & Class</span>
                                    <p>
                                        
                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate(`/flights/${flightSourceCode}/${flightDestinationCode}/${weekName[day]}`) }} className=" absolute px-6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Flight);