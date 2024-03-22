import React, { memo, useContext, useEffect, useState } from 'react';
import { cityListArray, flightCodeArray, headerNavlist, monthNames, suggetionFilterArray, trainTickets, weekInitials, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate } from 'react-router';
import ShimmerLocation from '../Loader/ShimmerLocation';
import FlightModal from '../Modals/FlightModal';
import TrainModal from '../Modals/TrainModal';
import Calendar from 'react-calendar';
import "./train.css";
import { BrowserView, MobileView } from 'react-device-detect';

function ShowAllTrains(props) {
    const navigate = useNavigate();
    const [allTrainTickets, setAllTrainTickets] = useState(trainTickets);
    const [fromTrain, setFromTrain] = useState(source);
    const [toTrain, setToTrain] = useState(destination);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [prevCheckbox, setPrevCheckbox] = useState("");
    const [prevCheckboxTicketType, setPrevCheckboxTicketType] = useState("");
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightDateModal, setFlightDateModal] = useState(false);
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource, fromOrTo, setFromOrTo, setFlightArray,
        destination, setDestination, currentTravelOption, setCurrentTravelOption, flightdate, setFlightDate, } = useContext(AppContext);
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
        setFromTrain(source);
        setToTrain(destination);
        setCardLoading(true);
        setTimeout(() => {
            setCardLoading(false);
        }, 300);
    }
    const filterdata = (id) => {
        setCardLoading(true);
        const filterArr = []
        document.getElementById("ac").checked = false;
        document.getElementById("nonAc").checked = false;
        document.getElementById("free").checked = false;
        document.getElementById("trip").checked = false;
        if (prevCheckbox != id) {
            document.getElementById(id).checked = true;
            if (id === "ac") {
                let arr = trainTickets?.filter((val) => {
                    return val.ac === true;
                });
                setAllTrainTickets(arr);
            }
            else if (id === "nonAc") {
                let arr = trainTickets?.filter((val) => {
                    return val.nonAc === true;
                });
                setAllTrainTickets(arr);
            }
            setPrevCheckbox(id);
        }
        else {
            document.getElementById(id).checked = false;
            setAllTrainTickets(trainTickets);
            setPrevCheckbox("");
        }
        setTimeout(() => {
            setCardLoading(false);
        }, 300);
    }
    const handleTicketType = (id) => {
        setCardLoading(true);
        document.getElementById("ac").checked = false;
        document.getElementById("nonAc").checked = false;
        document.getElementById("free").checked = false;
        document.getElementById("trip").checked = false;
        if (prevCheckboxTicketType != id) {
            document.getElementById(id).checked = true;
            if (id === "free") {
                let arr = trainTickets?.filter((val) => {
                    return val.tripFree === true;
                });

                setAllTrainTickets(arr);
            }
            else if (id === "trip") {
                let arr = trainTickets?.filter((val) => {
                    return val.tripGuarantee === true
                });

                setAllTrainTickets(arr);
            }
            setPrevCheckboxTicketType(id);
        }
        else {
            document.getElementById(id).checked = false;
            setAllTrainTickets(trainTickets);
            setPrevCheckboxTicketType("");
        }
        setTimeout(() => {
            setCardLoading(false);
        }, 300);
    }

    useEffect(() => {
        setFromTrain(source);
        setToTrain(destination);
        setCurrentTravelOption("RAILS");
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
        setCardLoading(true);
        setTimeout(() => {
            setCardLoading(false);
        }, 600);
    }, []);

    return (
        <><BrowserView>
            <div className=" h-full" onClick={() => { setIsModalOpen(false); }}>
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
                            <h1 className=" font-semibold mb-2">Quick Filter</h1>
                            <div onClick={() => { filterdata("ac") }} className="flex alignCenter text-left mb-4 checkbox">
                                <input id='ac' type="checkbox" />
                                <label className=" ml-3">AC</label>
                            </div>
                            <div onClick={() => { filterdata("nonAc") }} className="flex alignCenter text-left checkbox">
                                <input id='nonAc' type="checkbox" />
                                <label className=" ml-3">Non AC</label>
                            </div>

                        </div>
                        <div className=" text-left mt-6">
                            <h1 className=" font-semibold mb-2">Ticket Type</h1>
                            <div onClick={() => { handleTicketType("free") }} className="flex alignCenter text-left mb-4 checkbox">
                                <input id='free' type="checkbox" />
                                <label className=" ml-3">Free Cancellation</label>
                            </div>
                            <div onClick={() => { handleTicketType("trip") }} className="flex alignCenter text-left checkbox">
                                <input id='trip' type="checkbox" />
                                <label className=" ml-3">Trip Guarantee</label>
                            </div>
                        </div>
                    </aside>
                    {/* flight cards div */}
                    <div className="flex flex-col gap-7 mb-10">
                        {!cardLoading ?
                            allTrainTickets?.map((val) => {
                                return (
                                    <div key={val._id} className=' py-6 px-6 rounded-lg grayBlurShadow borderGray'>
                                        <div className='flex gap-6 mb-8'>
                                            <div className=' text-left mr-8'>
                                                <h1 className=' font-bold text-xl'>{val.name}</h1>
                                                <h3 className=' text-xs text-gray-400 '><span className=' mr-2'>{val.trainCode}</span> | <span className='ml-2'>Departs on:</span>{val.departOn?.map((val, idx) => {
                                                    return val != weekInitials[idx] ? <span className=' text-gray-300 font-semibold pl-1'>{weekInitials[idx]}</span> : <span className='greenText font-semibold pl-1'>{val}</span>
                                                })}</h3>
                                            </div>
                                            <div className=' w-2/4'>
                                                <div className='flex alignCenter justify-between'>
                                                    <h1 className=' font-bold'>{val.arrivalTime},{weekName[day]}</h1>
                                                    <div className='h-0.5 w-12 bg-gray-300'></div>
                                                    <h3 className=' text-xs text-gray-400 font-semibold'>{val.duration}</h3>
                                                    <div className='h-0.5 w-12 bg-gray-300'></div>
                                                    <h1 className=' font-bold'>{val.departureTime},{val.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                                </div>
                                                <div className='flex text-sm text-gray-600 justify-between'>
                                                    <h1>{fromTrain}</h1>
                                                    <h1>{toTrain}</h1>
                                                </div>
                                            </div>
                                        </div>
                                        <div className='flex gap-5'>
                                            {val.availableTicket?.map((ticket) => {
                                                return (
                                                    <div onClick={() => { navigate(`/train/review/${fromTrain}/${toTrain}/${val._id}/${ticket.class}`) }} className=' cursor-pointer p-3 rounded-md grayBlurShadow borderGray text-left'>
                                                        <div className='flex justify-between alignCenter font-bold mb-1'>
                                                            <h1>{ticket.class}</h1>
                                                            <h1>₹{ticket.price}</h1>
                                                        </div>
                                                        <h3 className=' text-xs text-green-500'>AVAILABLE {ticket.seats}</h3>
                                                        <h3 className=' text-xs mt-3'>{ticket.extra}</h3>
                                                        <h4 className=' text-xs mt-1 text-gray-300 pr-16'>Updated {ticket.updated}</h4>
                                                    </div>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )
                            })
                            : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                    </div>
                </main>
            </div>
        </BrowserView>
            <MobileView>
            <div className=' fixed flex gap-2 px-3 justify-around text-white bottom-0 py-2 bg-black w-full'>
                    <div id='lowPrice' onClick={() => { mobSortBox("lowPrice") }} className='flex alignCenter justify-center filterblackBack cursor-pointer gap-3 rounded-lg py-1 px-2 '>
                        <h2>Lowest First</h2>
                    </div>
                    <div id='highPrice' onClick={() => { mobSortBox("highPrice") }} className='flex alignCenter justify-center filterblackBack gap-3 cursor-pointer rounded-lg py-1 px-2 '>
                        <h2>Highest First</h2>
                    </div>
                    <div className='filterblackBack px-2 rounded-md' onClick={()=>{ mobileFilterHandle("open")}}>
                        <img src="/img/busFilter.png" alt="" />
                    </div>
                </div>
                <div className=" h-full" onClick={() => { setIsModalOpen(false); }}>
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
                                <h1 className=" font-semibold mb-2">Quick Filter</h1>
                                <div onClick={() => { filterdata("ac") }} className="flex alignCenter text-left mb-4 checkbox">
                                    <input id='ac' type="checkbox" />
                                    <label className=" ml-3">AC</label>
                                </div>
                                <div onClick={() => { filterdata("nonAc") }} className="flex alignCenter text-left checkbox">
                                    <input id='nonAc' type="checkbox" />
                                    <label className=" ml-3">Non AC</label>
                                </div>

                            </div>
                            <div className=" text-left mt-6">
                                <h1 className=" font-semibold mb-2">Ticket Type</h1>
                                <div onClick={() => { handleTicketType("free") }} className="flex alignCenter text-left mb-4 checkbox">
                                    <input id='free' type="checkbox" />
                                    <label className=" ml-3">Free Cancellation</label>
                                </div>
                                <div onClick={() => { handleTicketType("trip") }} className="flex alignCenter text-left checkbox">
                                    <input id='trip' type="checkbox" />
                                    <label className=" ml-3">Trip Guarantee</label>
                                </div>
                            </div>
                        </aside>
                        {/* flight cards div */}
                        <div className="flex flex-col gap-7 mb-10">
                            {!cardLoading ?
                                allTrainTickets?.map((val) => {
                                    return (
                                        <div key={val._id} className=' py-6 px-6 rounded-lg grayBlurShadow borderGray'>
                                            <div className='flex gap-6 mb-8'>
                                                <div className=' text-left mr-8'>
                                                    <h1 className=' font-bold text-xl'>{val.name}</h1>
                                                    <h3 className=' text-xs text-gray-400 '><span className=' mr-2'>{val.trainCode}</span> | <span className='ml-2'>Departs on:</span>{val.departOn?.map((val, idx) => {
                                                        return val != weekInitials[idx] ? <span className=' text-gray-300 font-semibold pl-1'>{weekInitials[idx]}</span> : <span className='greenText font-semibold pl-1'>{val}</span>
                                                    })}</h3>
                                                </div>
                                                <div className=' w-2/4'>
                                                    <div className='flex alignCenter justify-between'>
                                                        <h1 className=' font-bold'>{val.arrivalTime},{weekName[day]}</h1>
                                                        <div className='h-0.5 w-12 bg-gray-300'></div>
                                                        <h3 className=' text-xs text-gray-400 font-semibold'>{val.duration}</h3>
                                                        <div className='h-0.5 w-12 bg-gray-300'></div>
                                                        <h1 className=' font-bold'>{val.departureTime},{val.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                                    </div>
                                                    <div className='flex text-sm text-gray-600 justify-between'>
                                                        <h1>{fromTrain}</h1>
                                                        <h1>{toTrain}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-5'>
                                                {val.availableTicket?.map((ticket) => {
                                                    return (
                                                        <div onClick={() => { navigate(`/train/review/${fromTrain}/${toTrain}/${val._id}/${ticket.class}`) }} className=' cursor-pointer p-3 rounded-md grayBlurShadow borderGray text-left'>
                                                            <div className='flex justify-between alignCenter font-bold mb-1'>
                                                                <h1>{ticket.class}</h1>
                                                                <h1>₹{ticket.price}</h1>
                                                            </div>
                                                            <h3 className=' text-xs text-green-500'>AVAILABLE {ticket.seats}</h3>
                                                            <h3 className=' text-xs mt-3'>{ticket.extra}</h3>
                                                            <h4 className=' text-xs mt-1 text-gray-300 pr-16'>Updated {ticket.updated}</h4>
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    )
                                })
                                : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </MobileView></>
    );
}

export default memo(ShowAllTrains);