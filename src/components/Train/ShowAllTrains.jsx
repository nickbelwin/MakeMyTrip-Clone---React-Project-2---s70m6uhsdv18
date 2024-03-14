import React, { memo, useContext, useEffect, useState } from 'react';
import { cityListArray, flightCodeArray, headerNavlist, monthNames, suggetionFilterArray, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate } from 'react-router';
import ShimmerLocation from '../Loader/ShimmerLocation';
import FlightModal from '../Modals/FlightModal';
import TrainModal from '../Modals/TrainModal';
import Calendar from 'react-calendar';

function ShowAllTrains(props) {
    const navigate = useNavigate();
    const [rooms, setRooms] = useState({ room: 1, guest: 2 });
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightDateModal, setFlightDateModal] = useState(false);
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,fromOrTo, setFromOrTo, setFlightArray,
        destination, setDestination,currentTravelOption, setCurrentTravelOption,flightdate, setFlightDate, } = useContext(AppContext);
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
        setDestinationModal(false);
        setFlightDateModal(false);
        setSourceModal(true);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setFlightDateModal(false);
        setDestinationModal(true)
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
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

    const handleSearch = () => {
       
    }
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        setCurrentTravelOption("RAILS");
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);

    return (
        <div className=" bg-blue-50 h-full" onClick={() => { setIsModalOpen(false); }}>
            {/* <header id="showHeader" className=" overflow-hidden bg-white headerTwo">
                <div className=" flex flex-row m-auto alignCenter justify-between py-3 headerBox">
                    <div className=" flex flex-row alignCenter">
                        <div className=" cursor-pointer mmtlogo">
                            <img className=" w-28 " src="/img/mmtBlueLogo.png" alt="" />
                        </div>
                        <ul className=" flex flex-row alignCenter ml-8 gap-10">
                            {headerNavlist?.map((val) => {
                                return (
                                    <li className="flex flex-col cursor-pointer h-full justify-between" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                        <img className=" w-9" src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                        {currentTravelOption === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
                                            <p className=" text-xs text-gray-500">{val.name}</p>}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div className=" flex flex-row alignCenter p-3 rounded cursor-pointer loginGreenBtn">
                        <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                        </span>
                        <span className="flex alignCenter justify-between w-full text-xs text-left">
                            <p className=" font-bold">Login or Create Account</p>
                            <span><img className=" w-3 opacity-80" src="/img/downArrow.png" alt="" /></span>
                        </span>
                    </div>
                </div>
            </header> */}
            <div className="gradientBackgroundBlue mb-6">
                <div id="showBookingBar" className=" flex alignCenter justify-center gap-9  pt-2 pb-2 px-6 text-left">
                    <div className=" grid gap-2 rounded-lg cursor-pointer allFlightsBookingBox">
                        <div onClick={handleFrom} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                            <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">FROM <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                            {!loading ?
                                flightCodeArray?.map((val) => {
                                    return (
                                        <>
                                            {val?.city === source ?
                                                <div key={val.code} className=" mt-2">
                                                    <h1 className=" font-bold text-sm text-white">{val?.city}</h1>
                                                </div> : ""}</>
                                    )
                                }) : <ShimmerLocation />}
                            {sourceModal ?
                                <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                    <TrainModal />
                                </div> : ""}
                        </div>
                        <div onClick={handleTo} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                            <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">TO <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                            {!loading ?
                                flightCodeArray?.map((val) => {
                                    return (
                                        <>
                                            {val?.city === destination ?
                                                <div key={val.code} className=" mt-2">
                                                    <h1 className=" font-bold text-sm text-white">{val?.city}</h1>
                                                </div> : ""}</>
                                    )
                                }) : <ShimmerLocation />}
                            {destinationModal ?
                                <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                    <TrainModal />
                                </div> : ""}
                        </div>
                        <div onClick={handleDateModal} className=" relative px-3 py-0 rounded-lg borderRight lightWhite">
                            <span className=" text-blue-600 text-xs">DEPART</span>
                            <div className="text-white">
                                <span className=" font-extrabold text-sm">{date} </span>
                                <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                <span className=" ">{weekName[day]}</span>
                                {flightDateModal ?
                                    <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white text-black p-2 grayBlurShadow rounded-lg calenderBox" >
                                        <Calendar onChange={onChange} value={flightdate} />
                                    </div> : ""}
                            </div>
                        </div>
                    </div>
                    <button onClick={handleSearch} className=" px-10 h-10 text-lg my-1 font-bold text-white blueSearch rounded-full">SEARCH</button>
                </div>
            </div>
            <main className="grid gap-2 allCardMainBox">
                {/* filter */}
                <aside className=" filterBox">
                    <h1 className=" text-2xl font-bold text-left mb-4">Select Filters</h1>
                    <div className=" text-left">
                        <h1 className=" font-semibold mb-2">Suggested For You</h1>
                        {suggetionFilterArray?.map((val) => {
                            return (
                                <div key={val.id} onClick={() => { filterdata(val.id, val.name) }} className="flex alignCenter text-left checkbox">
                                    <input id={val.id} type="checkbox" />
                                    <label className=" ml-3">{val.name}</label>
                                </div>
                            )
                        })}
                    </div>
                    <div className=" mt-5 text-left">
                        <h1 className=" font-semibold mb-2">Budget</h1>
                        <div className="flex alignCenter justify-between">
                            <input id="minBudget" className="w-20 pl-1 h-10 rounded-md borderGray" type="number" placeholder="min" />
                            <span>to</span>
                            <input id="maxBudget" className="w-20 pl-1 h-10 rounded-md borderGray" type="number" placeholder="max" />
                            <button id="budgetBtn" className=" h-10 px-2 rounded-md blueBack"><img className=" w-6" src="/img/rightArrow.png" alt="" /></button>
                        </div>
                    </div>
                </aside>
                {/* flight cards div */}
                <div className="flex flex-col gap-3 ">
                    {!cardLoading ?
                        ""
                        : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                </div>
            </main>
        </div>
    );
}

export default memo(ShowAllTrains);