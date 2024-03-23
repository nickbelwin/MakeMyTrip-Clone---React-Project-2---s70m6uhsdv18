import { memo, useContext, useEffect, useState } from "react";
import "./train.css";
import { AppContext } from "../ContextAPI/AppContext";
import { cityListArray, monthNames, trainClassArray, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import TrainModal from "../Modals/TrainModal";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";

function Train(props) {
    const navigate = useNavigate();
    const { trainClassCode, setTrainClassesCode, source, setSource,
        destination, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, flightdate, setFlightDate } = useContext(AppContext);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [trainDateModal, setTrainDateModal] = useState(false);
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
        setIsModalOpen(false);
        setTrainDateModal(false);
        // Add any additional logic you need when the date changes
    };

    const handleFrom = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setDestinationModal(false);
        setTrainDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("toArrow").style.transform = "rotate(0deg)";
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setDestinationModal(true);
        setSourceModal(false);
        setTrainDateModal(false);
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
        document.getElementById("fromArrow").style.transform = "rotate(0deg)";
    }
    const handleDate = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setSourceModal(false);
        setTrainDateModal(true);
        setIsModalOpen(true);
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setDestinationModal(false);
            setTrainDateModal(false);
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

    return (
        <>
            <BrowserView>
                <section className=" absolute top-20 flex justify-center subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" bg-white  rounded-2xl pt-16 pb-12 px-6 text-left mt-12 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Train Ticket Booking
                                IRCTC Authorized e-ticketing.</p>
                            <div className=" grid borderGray rounded-lg w-full cursor-pointer trainbookingBox">
                                <div onClick={handleFrom} className=" relative px-6 py-3 borderRight  hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === source ?
                                                    <p className=" mt-2">
                                                        <h1 className=" font-extrabold text-3xl">{val.name}</h1>
                                                        <p className=" text-gray-800">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <TrainModal />
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
                                        <div className=" absolute z-20 w-full left-0 top-10 flightModal" >
                                            <TrainModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDate} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Travel Date</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date + 1}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day - 1]}</p>
                                    </p>
                                    {trainDateModal ?
                                        <div className=" absolute w-full z-10 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=' absolute p-2 cursor-pointer bg-white rounded-full top-0 right-0'><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <Calendar onChange={onChange} />
                                        </div> : ""}

                                </div>
                                {/* <div className=" px-6 py-3 hoverLightBlue">
                                    <span className=" text-gray-800">Class</span>
                                    <p>
                                        {trainClassArray?.map((val) => {
                                            return (
                                                <>{
                                                    val.code === trainClassCode ?
                                                        <>
                                                            <span className=" font-extrabold text-3xl">{val.code}</span>
                                                            <p className=" text-gray-800">{val.class}</p></> : ""
                                                }</>
                                            )
                                        })}

                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate("/trains") }} className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className=" flex justify-center m-auto subNavbarBox">
                    <div className="  flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full bg-white rounded-xl pt-3 pb-4 px-4 text-left mt-20 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Train Ticket Booking
                                IRCTC Authorized e-ticketing.</p>
                            <div className=" w-full cursor-pointer">
                                <div onClick={handleFrom} className="w-full rounded-lg mb-2 px-3 py-1  borderGray  hoverLightBlue">
                                    <span className="flex flex-row gap-1 text-xs alignCenter text-gray-800">From <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === source ?
                                                    <p className="">
                                                        <h1 className=" font-extrabold text-base">{val.name}</h1>
                                                        <p className=" text-gray-800 text-sm ">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {sourceModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <TrainModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative rounded-lg mb-2 px-3 py-1 borderGray hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-xs  text-gray-800">To <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {cityListArray?.map((val) => {
                                        return (
                                            <>
                                                {val?.name === destination ?
                                                    <p className="">
                                                        <h1 className=" font-extrabold text-base">{val.name}</h1>
                                                        <p className=" text-gray-800 text-sm">{val.location}</p>
                                                    </p> : ""}</>
                                        )
                                    })}
                                    {destinationModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <TrainModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDate} className=" rounded-lg mb-2 px-3 py-1 borderGray hoverLightBlue">
                                    <span className=" text-gray-800 text-xs ">Travel Date</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date}</span>
                                        <span className=" font-semibold text-sm">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-sm">{weekName[day]}</p>
                                    </p>
                                    {trainDateModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  pt-5 px-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <h1 className=" px-2 font-extrabold text-xl">Travel Date</h1>
                                            <h1 className=" font-medium px-2 mb-2"><span className=" font-extrabold text-xl">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                            <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar className={"m-auto"} onChange={onChange} />
                                            </div>
                                        </div> : ""}
                                </div>
                                {/* <div className="rounded-lg mb-2 px-3 py-1 borderGray hoverLightBlue">
                                    <span className=" text-gray-800 text-xs ">Class</span>
                                    <p>
                                        {trainClassArray?.map((val) => {
                                            return (
                                                <>{
                                                    val.code === trainClassCode ?
                                                        <>
                                                            <span className=" font-extrabold text-xl">{val.code}</span>
                                                            <p className=" text-gray-800 text-sm">{val.class}</p></> : ""
                                                }</>
                                            )
                                        })}

                                    </p>
                                </div> */}
                            </div>
                            <button onClick={() => { navigate("/trains") }} className=" w-full py-2 mt-3 text-xl font-bold text-white blueSearch rounded-md">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Train);