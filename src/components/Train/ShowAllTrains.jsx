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
    const [editTrain, setEditTrain] = useState(false);
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
    const isSticky = () => {
        const header = document.getElementById('showBookingBar');
        const scrollTop = window.scrollY;
        console.log(scrollTop);
        scrollTop >= 60 ? header?.classList.add('sticky') : header.classList.remove('sticky');
        scrollTop >= 60 ? header?.classList.add('grayBlurShadow') : header.classList.remove('grayBlurShadow');

    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
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
        if (screen.width <= 720) {
            document.getElementById("freeTag").classList.remove("mobSortPriceBox");
            document.getElementById("tripTag").classList.remove("mobSortPriceBox");
        }
        if (prevCheckboxTicketType != id) {
            document.getElementById(id).checked = true;
            if (id === "free") {
                let arr = trainTickets?.filter((val) => {
                    return val.tripFree === true;
                });
                if (screen.width <= 720) {
                    document.getElementById("freeTag").classList.add("mobSortPriceBox");
                }
                setAllTrainTickets(arr);
            }
            else if (id === "trip") {
                let arr = trainTickets?.filter((val) => {
                    return val.tripGuarantee === true
                });
                if (screen.width <= 720) {
                    document.getElementById("tripTag").classList.add("mobSortPriceBox");
                }
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
    const mobileFilterHandle = (check) => {
        if (check === "open") {
            document.getElementById("mobFilter").classList.remove("mobileFilterClose")
            document.getElementById("mobFilter").classList.add("mobileFilterOpen");
        }
        else {
            document.getElementById("mobFilter").classList.add("mobileFilterClose")
            document.getElementById("mobFilter").classList.remove("mobileFilterOpen");
        }
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
                <div className=' fixed flex gap-2 px-3 text-xs font-medium justify-around text-white bottom-0 py-3 bg-black w-full'>
                    <div id='free' onClick={() => { handleTicketType("free") }} className='flex alignCenter justify-center filterblackBack cursor-pointer gap-3 rounded-lg py-1 px-2 '>
                        <h2 id='freeTag'>Free Cencellation</h2>
                    </div>
                    <div id='trip' onClick={() => { handleTicketType("trip") }} className='flex alignCenter justify-center filterblackBack gap-3 cursor-pointer rounded-lg py-1 px-2 '>
                        <h2 id='tripTag'>Trip Guarantee</h2>
                    </div>
                    <div className='filterblackBack px-2 rounded-md' onClick={() => { mobileFilterHandle("open") }}>
                        <img src="/img/busFilter.png" alt="" />
                    </div>
                </div>
                <div className=" h-full pb-8" onClick={() => { setIsModalOpen(false); }}>
                    {editTrain ?
                        <div className="  absolute top-0 fullHeightInVh z-20 w-full">
                            <div className=" mb-6">
                                <div id="showBookingBar" className="bg-gray-100 fullHeightInVh py-4 px-6 text-left">
                                    <p onClick={() => { setEditTrain(false); }} className=" text-right text-blue-600 py-2">Cancel</p>
                                    <div className="  gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={handleFrom} className=" relative bg-white px-3 py-2 mb-3 rounded-lg  ">
                                            <span className="flex flex-row gap-1 alignCenter text-sm text-blue-600">FROM <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                flightCodeArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.city === source ?
                                                                <div key={val.code} className="">
                                                                    <h1 className="font-bold text-xl">{val?.city}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {sourceModal ?
                                                <div className=" absolute w-64 z-20 left-0 top-8 flightModal" >
                                                    <TrainModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleTo} className=" relative bg-white px-3 py-2 mb-3 rounded-lg ">
                                            <span className="flex flex-row gap-1 alignCenter text-sm text-blue-600">TO <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                flightCodeArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.city === destination ?
                                                                <div key={val.code} className="">
                                                                    <h1 className="font-bold text-xl">{val?.city}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {destinationModal ?
                                                <div className=" absolute w-64 z-20 left-0 top-8 flightModal" >
                                                    <TrainModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleDateModal} className=" relative bg-white px-3 py-2 mb-3 rounded-lg ">
                                            <span className=" text-blue-600 text-sm">DEPART</span>
                                            <div className="">
                                                <span className=" font-extrabold text-xl">{date} </span>
                                                <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                                <span className=" ">{weekName[day]}</span>
                                                {flightDateModal ?
                                                    <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-8 bg-white text-black p-2 grayBlurShadow rounded-lg calenderBox" >
                                                        <Calendar onChange={onChange} value={flightdate} />
                                                    </div> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { handleSearch(e); setEditTrain(false); }} className=" px-10 py-2 w-full text-lg my-1 font-bold text-white blueSearch rounded-lg">SEARCH</button>
                                </div>
                            </div>
                        </div> :
                        <>
                            <div className=" bg-white px-2 py-2 mb-3">
                                <div className="flex justify-between alignCenter bg-gray-100 rounded-md borderGray py-2 pl-2">
                                    <div>
                                        <h1 className="flex">
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === source ?
                                                            <div key={val.name} className="">
                                                                <h1 className=" font-bold text-xl">{val?.name}-</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === destination ?
                                                            <div key={val.name} className=" ">
                                                                <h1 className=" font-bold text-xl ">{val?.name}</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                        </h1>
                                        <div className=" text-left text-xs text-gray-400">
                                            <span className=" font-semibold">{date} </span>
                                            <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                            <span className=" ">{weekName[day]}</span>
                                        </div>
                                    </div>
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditTrain(true); }}>
                                        <img className=" w-3 ml-1" src="/img/editIcon.png" alt="" />
                                        <h2 className=" text-xs text-blue-600">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <div className=" opacity-0 bg-gray-100 z-20">
                                <div className="">
                                    <div id="showBookingBar" className="bg-gray-100 w-2 text-left">
                                        <div className="  gap-2 rounded-lg cursor-pointer ">
                                            <div onClick={handleFrom} className=" relative bg-white rounded-lg ">
                                                <span className="flex flex-row gap-1 alignCenter text-sm text-blue-600"><img id="fromArrow" className=" w-0 h-0 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            </div>
                                            <div onClick={handleTo} className=" relativerounded-lg borderRight bg-white ">
                                                <span className="flex flex-row gap-1 alignCenter text-sm text-blue-600"> <img id="toArrow" className=" w-0 h-0 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    }
                    {/* <div className="gradientBackgroundBlue mb-6">
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
                    </div> */}
                    <main className=" gap-2 allCardMainBox">
                        {/* filter */}
                        <div onClick={() => { mobileFilterHandle("close"); }} id="mobFilter" className="fixed z-20 top-0 w-full fullHeightInVh lowOpacityGrayBack mobileFilterClose ">
                            <aside className=" filterBox bg-white p-4 fullHeightInVh w-3/4 rounded-lg grayBlurShadow">
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
                                {/* <div className=" text-left mt-6">
                                    <h1 className=" font-semibold mb-2">Ticket Type</h1>
                                    <div onClick={() => { handleTicketType("free") }} className="flex alignCenter text-left mb-4 checkbox">
                                        <input id='free' type="checkbox" />
                                        <label className=" ml-3">Free Cancellation</label>
                                    </div>
                                    <div onClick={() => { handleTicketType("trip") }} className="flex alignCenter text-left checkbox">
                                        <input id='trip' type="checkbox" />
                                        <label className=" ml-3">Trip Guarantee</label>
                                    </div>
                                </div> */}
                            </aside>
                        </div>
                        {/* flight cards div */}
                        <div className="flex flex-col gap-7 mb-10">
                            {!cardLoading ?
                                allTrainTickets?.map((val) => {
                                    return (
                                        <div key={val._id} className=' py-6 px-2 rounded-lg grayBlurShadow borderGray'>
                                            <div className=' mb-8'>
                                                <div className=' text-left mb-3'>
                                                    <h1 className=' font-bold text-xl'>{val.name}</h1>
                                                    <h3 className=' text-xs text-gray-400 '><span className=' mr-2'>{val.trainCode}</span> | <span className='ml-2'>Departs on:</span>{val.departOn?.map((val, idx) => {
                                                        return val != weekInitials[idx] ? <span className=' text-gray-300 font-semibold pl-1'>{weekInitials[idx]}</span> : <span className='greenText font-semibold pl-1'>{val}</span>
                                                    })}</h3>
                                                </div>
                                                <div className=''>
                                                    <div className='flex alignCenter justify-between'>
                                                        <h1 className=' font-bold'>{val.arrivalTime},{weekName[day]}</h1>
                                                        <div className='h-0.5 w-3 bg-gray-300'></div>
                                                        <h3 className=' text-xs text-gray-400 font-semibold'>{val.duration}</h3>
                                                        <div className='h-0.5 w-3 bg-gray-300'></div>
                                                        <h1 className=' font-bold'>{val.departureTime},{val.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                                    </div>
                                                    <div className='flex text-sm text-gray-600 justify-between'>
                                                        <h1>{fromTrain}</h1>
                                                        <h1>{toTrain}</h1>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-5 overflow-x-scroll no-scrollbar'>
                                                {val.availableTicket?.map((ticket) => {
                                                    return (
                                                        <div>
                                                            <div onClick={() => { navigate(`/train/review/${fromTrain}/${toTrain}/${val._id}/${ticket.class}`) }} className=' cursor-pointer  p-3 rounded-md grayBlurShadow borderGray text-left mobTicketTypeCard'>
                                                            <div className='flex justify-between alignCenter font-bold mb-1'>
                                                                <h1 className='text-sm'>{ticket.class}</h1>
                                                                <h1 className='text-sm'>₹{ticket.price}</h1>
                                                            </div>
                                                            <h3 className=' text-xs text-green-500'>AVAILABLE {ticket.seats}</h3>
                                                            <h3 className=' text-xs mt-1'>{ticket.extra}</h3>
                                                            <h4 className=' text-xs mt-1 text-gray-300'>Updated {ticket.updated}</h4>
                                                        </div>
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