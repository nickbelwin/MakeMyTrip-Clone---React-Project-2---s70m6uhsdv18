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
    const [flightDateModal, setFlightDateModal] = useState(true);
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
    console.log(isModalOpen);
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
                                            <div className=" absolute w-full z-10 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                                <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=' absolute p-2 cursor-pointer bg-white rounded-full top-0 right-0'><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                                <Calendar onChange={onChange} />
                                            </div> : ""}
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
                <section className=" m-auto flex justify-center subNavbarBox">
                    <div className="  flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full bg-white pt-3 pb-6 px-2 text-left mt-20 rounded-2xl">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book International and Domestic Flights.</p>
                            <div className="   w-full cursor-pointer  ">
                                <div onClick={handleFrom} className=" px-3 py-1 mb-3 relative borderGray  hoverLightBlue">
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
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <FlightModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" px-3 py-1 mb-3 borderGray hoverLightBlue">
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
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <FlightModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-3 py-1 mb-4 borderGray hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Departure</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date}</span>
                                        <span className=" font-semibold text-sm">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-sm">{weekName[day]}</p>
                                        {flightDateModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                                <div className='flex justify-end  pt-5 px-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                                <h1 className=" px-2 font-extrabold text-xl">Departure</h1>
                                                <h1 className=" font-medium px-2 mb-2"><span className=" font-extrabold text-xl">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar className={"m-auto"} onChange={onChange} />
                                                </div>
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
                            <button onClick={() => { navigate(`/flights/${flightSourceCode}/${flightDestinationCode}/${weekName[day]}`) }} className=" px-6 py-2 text-xl font-bold rounded-md text-white blueSearch w-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Flight);