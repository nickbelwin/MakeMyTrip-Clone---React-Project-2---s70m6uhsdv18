import { memo, useContext, useEffect, useState } from "react";
import "./bus.css"
import { AppContext } from "../ContextAPI/AppContext";
import { cityListArray, monthNames, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import BusModal from "../Modals/BusModal";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";
function Bus(props) {
    const { isModalOpen, setIsModalOpen, source,
        destination, fromOrTo, setFromOrTo } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const navigate = useNavigate();
    const [destinationModal, setDestinationModal] = useState(false);
    const [busDateModal, setBusDateModal] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

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
        setBusDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
        document.getElementById("toArrow").style.transform = "rotate(0deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setBusDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("fromArrow").style.transform = "rotate(0deg)";
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
    }
    const handleDate = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setBusDateModal(true);
        setIsModalOpen(true);
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setBusDateModal(false);
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
                                <div onClick={handleDate} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Travel Date</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
                                    {busDateModal ?
                                        <div className=" absolute w-full z-10 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=' absolute p-2 cursor-pointer bg-white rounded-full top-0 right-0'><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <Calendar onChange={onChange} />
                                        </div> : ""}
                                </div>
                            </div>
                            <button onClick={() => { navigate(`/Buses/${source}/${destination}/${weekName[day]}`) }} className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className=" flex justify-center  m-auto subNavbarBox">
                    <div className="  flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full bg-white  rounded-2xl pt-3 pb-12 px-3 text-left mt-20 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Bus Ticket Booking.</p>
                            <div className=" w-full cursor-pointer">
                                <div onClick={handleFrom} className="  px-3 py-1 borderGray mb-2  hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs alignCenter text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === source ?
                                                    <p key={val.name} className="">
                                                        <h1 className=" font-extrabold text-base">{val.name}</h1>
                                                        <p className=" text-gray-800 text-xs">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <BusModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-3 py-1  borderGray mb-2  hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs alignCenter text-gray-800">To <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === destination ?
                                                    <p className="">
                                                        <h1 className=" font-extrabold text-base">{val.name}</h1>
                                                        <p className=" text-gray-800 text-xs">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {destinationModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <BusModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDate} className=" px-3 py-1  borderGray mb-2  hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Travel Date</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[day - 1]}</p>
                                    </p>
                                    {busDateModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  pt-5 px-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <h1 className=" px-2 font-extrabold text-xl">Travel Date</h1>
                                            <h1 className=" font-medium px-2 mb-2"><span className=" font-extrabold text-xl">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar className={"m-auto"} onChange={onChange} />
                                            </div>
                                        </div> : ""}
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