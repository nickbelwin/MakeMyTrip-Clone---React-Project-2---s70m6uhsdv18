import React, { memo, useContext, useEffect, useState } from 'react';
import { cityListArray, flightCodeArray, getBuses, headerNavlist, monthNames, suggetionFilterArray, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate, useParams } from 'react-router';
import ShimmerLocation from '../Loader/ShimmerLocation';
import FlightModal from '../Modals/FlightModal';
import TrainModal from '../Modals/TrainModal';
import Calendar from 'react-calendar';
import BusModal from '../Modals/BusModal';
import { BrowserView, MobileView } from 'react-device-detect';

function ShowAllBuses(props) {
    const { from, to, weekDay } = useParams();
    const navigate = useNavigate();
    const [fromCity, setFromCity] = useState(from);
    const [toCity, setToCity] = useState(to);
    const [listOfBuses, setListOfBuses] = useState([]);
    const [week, setWeek] = useState(weekDay);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [editBus, setEditBus] = useState(false);
    const [busDateModal, setBusDateModal] = useState(false);
    const [amenity, setAmenity] = useState(false);
    const [prevAmenity, setPrevAmenity] = useState(false);
    const [ac, setAc] = useState(false);
    const [nonAc, setNonAc] = useState(false);
    const [lowHighPrice, setLowHighPrice] = useState("");
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation,  sourceBusTrain,
        destinationBusTrain, fromOrTo, setFromOrTo, setFlightArray,
         currentTravelOption, setCurrentTravelOption, flightdate, setFlightDate, trainPassangers, setTrainPassangers } = useContext(AppContext);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    const getAllBuses = async () => {
        setCardLoading(true);
        let res = await getBuses(fromCity, toCity, week);
        setListOfBuses(res?.buses);
        setCardLoading(false);
    }
    useEffect(() => {
        getAllBuses();
    }, [fromCity, toCity]);
    const isSticky = (e) => {
        const header = document.getElementById('showBookingBar');
        const scrollTop = window.scrollY;
        scrollTop >= 60 ? header?.classList.add('sticky') : header.classList.remove('sticky');
    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    const onChange = (newDate) => {
        let chek = newDate;
        setFlightDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        setIsModalOpen(false);
        setBusDateModal(false);
        // Add any additional logic you need when the date changes
    };
    const handleFrom = (e) => {
        e.stopPropagation();
        setDestinationModal(false);
        setBusDateModal(false);
        setSourceModal(true);
        setIsModalOpen(true);
        setFromOrTo("from");
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    const handleTo = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setBusDateModal(false);
        setDestinationModal(true)
        setIsModalOpen(true);
        setFromOrTo("to");
        document.getElementById("toArrow").style.transform = "rotate(180deg)";
    }
    const handleDateModal = (e) => {
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

    const handleSearch = () => {
        setFromCity(sourceBusTrain);
        setToCity(destinationBusTrain);
    }
    const amenityHandle = (id) => {
        if (prevAmenity !== id) {
            document.getElementById(id + 1).style.background = "#EAF5FF";
            document.getElementById(id).style.border = "1px solid #008CFF";
            document.getElementById(id + 2)?.classList.add("amenityBox");
            document.getElementById("busAmenitiesArrow").style.transform = "rotate(180deg)";
            setAmenity(id);
            setPrevAmenity(id);
        }
        else {
            document.getElementById(id + 1).style.background = "white";
            document.getElementById(id).style.border = "1px solid rgba(128, 128, 128, 0.293)";
            document.getElementById(id + 2)?.classList.remove("amenityBox");
            document.getElementById("busAmenitiesArrow").style.transform = "rotate(0deg)";
            setAmenity("");
            setPrevAmenity("");
        }
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
    const handleAc = async (id) => {
        document.getElementById("acBox")?.classList.remove("sortPriceBox");
        document.getElementById("nonAcBox")?.classList.remove("sortPriceBox")
        if (id === "acBox" && ac != id) {
            setCardLoading(true);
            setAc(id);
            document.getElementById(id)?.classList.add("sortPriceBox");
            setNonAc(false);
            let res = await getBuses(fromCity, toCity, week);
            let acArr = res?.buses?.filter((val) => {
                return val.type === "AC";
            });
            setListOfBuses(acArr);
            setCardLoading(false);
        }
        else if (id === "nonAcBox" && ac != id) {
            setCardLoading(true);
            setAc(id);
            document.getElementById(id)?.classList.add("sortPriceBox")
            setNonAc(true);
            let res = await getBuses(fromCity, toCity, week);
            let acArr = res?.buses?.filter((val) => {
                return val.type === "Non-AC";
            });
            setListOfBuses(acArr);
            setCardLoading(false);
        }
        else {
            setAc("");
            setNonAc(false);
            getAllBuses();
        }

    }
    const handleMobAc = async (id) => {
        document.getElementById("acBox")?.classList.remove("mobSortPriceBox");
        document.getElementById("nonAcBox")?.classList.remove("mobSortPriceBox")
        if (id === "acBox" && ac != id) {
            setCardLoading(true);
            setAc(id);
            document.getElementById(id)?.classList.add("mobSortPriceBox");
            setNonAc(false);
            let res = await getBuses(fromCity, toCity, week);
            let acArr = res?.buses?.filter((val) => {
                return val.type === "AC";
            });
            setListOfBuses(acArr);
            setCardLoading(false);
        }
        else if (id === "nonAcBox" && ac != id) {
            setCardLoading(true);
            setAc(id);
            document.getElementById(id)?.classList.add("mobSortPriceBox")
            setNonAc(true);
            let res = await getBuses(fromCity, toCity, week);
            let acArr = res?.buses?.filter((val) => {
                return val.type === "Non-AC";
            });
            setListOfBuses(acArr);
            setCardLoading(false);
        }
        else {
            setAc("");
            setNonAc(false);
            getAllBuses();
        }
    }
    const sortPrice = async (id) => {
        document.getElementById("lowPrice")?.classList.remove("sortPriceBox");
        document.getElementById("highPrice")?.classList.remove("sortPriceBox");
        if (id === "lowPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("sortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return a?.fare - b?.fare;
            });
            setListOfBuses(sortArr);
        }
        else if (id === "highPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("sortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return b?.fare - a?.fare;
            });
            setListOfBuses(sortArr);
        }
        else {
            setLowHighPrice("");

            if (!ac) {
                getAllBuses();
            }
            else {

                if (ac === "acBox") {
                    setCardLoading(true);

                    setNonAc(false);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
                else {
                    setCardLoading(true);
                    setNonAc(true);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "Non-AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
            }
        }
    }
    const mobSortBox = async (id) => {
        document.getElementById("lowPrice")?.classList.remove("mobSortPriceBox");
        document.getElementById("highPrice")?.classList.remove("mobSortPriceBox");
        if (id === "lowPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("mobSortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return a?.fare - b?.fare;
            });
            setListOfBuses(sortArr);
        }
        else if (id === "highPrice" && lowHighPrice != id) {
            setLowHighPrice(id);
            document.getElementById(id)?.classList.add("mobSortPriceBox");
            let sortArr = listOfBuses?.sort((a, b) => {
                return b?.fare - a?.fare;
            });
            setListOfBuses(sortArr);
        }
        else {
            setLowHighPrice("");

            if (!ac) {
                getAllBuses();
            }
            else {

                if (ac === "acBox") {
                    setCardLoading(true);

                    setNonAc(false);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
                else {
                    setCardLoading(true);
                    setNonAc(true);
                    let res = await getBuses(fromCity, toCity, week);
                    let acArr = res?.buses?.filter((val) => {
                        return val.type === "Non-AC";
                    });
                    setListOfBuses(acArr);
                    setCardLoading(false);
                }
            }
        }
    }
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }

    useEffect(() => {
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);

    return (
        <>
            <BrowserView>
                <div className=" bg-gray-50 h-full" onClick={() => { setIsModalOpen(false); }}>
                    <div className="  mb-6">
                        <div id="showBookingBar" className=" flex alignCenter justify-center gap-9  pt-2 pb-2 px-6 text-left gradientBackgroundBlue">
                            <div className=" grid gap-2 rounded-lg cursor-pointer allFlightsBookingBox">
                                <div onClick={handleFrom} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">FROM <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === sourceBusTrain ?
                                                        <div key={val.name} className=" mt-2">
                                                            <h1 className=" font-bold text-sm text-white">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className=' m-auto w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {sourceModal ?
                                        <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">TO <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === destinationBusTrain ?
                                                        <div key={val.name} className=" mt-2">
                                                            <h1 className=" font-bold text-sm text-white">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <img className=' m-auto w-7' src="/img/loadingBlue.webp" alt="" />}
                                    {destinationModal ?
                                        <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-3 py-0 rounded-lg borderRight lightWhite">
                                    <span className=" text-blue-600 text-xs">DEPART</span>
                                    <div className="text-white">
                                        <span className=" font-extrabold text-sm">{date} </span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                        <span className=" ">{weekName[day]}</span>
                                        {busDateModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" absolute w-full z-10 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <div className="ml-1 mr-2 rounded-md text-black borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                <Calendar onChange={onChange} value={flightdate} />
                                                </div>
                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSearch} className=" px-10 h-10 text-lg my-1 font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                    <main className="grid gap-2 allBusCardMainBox">
                        {/* filter */}
                        <aside className=" filterBox bg-white p-4 h-fit rounded-lg grayBlurShadow">
                            <h1 className=" text-2xl font-bold text-left pb-2 mb-2 borderBottomGray">Filters</h1>
                            <div className=" text-left">
                                <h1 className=" font-semibold mb-2 text-xl">AC</h1>
                                <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                    <>
                                        <div id='acBox' onClick={() => { handleAc("acBox") }} className='flex alignCenter justify-center cursor-pointer gap-3 rounded-lg py-1 borderGray hoverLightBlue'>
                                            <img className=' w-4' src={ac === "acBox" ? "/img/acOn.png" : "/img/acOff.png"} alt="" />
                                            <h2>AC</h2>
                                        </div>
                                    </>
                                    <>
                                        <div id='nonAcBox' onClick={() => { handleAc("nonAcBox") }} className='flex alignCenter justify-center gap-3 cursor-pointer rounded-lg py-1 borderGray hoverLightBlue'>
                                            <img className=' w-4' src={ac === "nonAcBox" ? "/img/nonAcOn.png" : "/img/nonAcOff.png"} alt="" />
                                            <h2>Non AC</h2>
                                        </div>
                                    </>

                                </div>
                                <h1 className=" font-semibold mb-2 mt-2 text-xl">Sort by price</h1>
                                <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                    <>
                                        <div id='lowPrice' onClick={() => { sortPrice("lowPrice") }} className='flex alignCenter justify-center cursor-pointer gap-3 rounded-lg py-1 borderGray hoverLightBlue'>
                                            <h2>Lowest First</h2>
                                        </div>
                                    </>
                                    <>
                                        <div id='highPrice' onClick={() => { sortPrice("highPrice") }} className='flex alignCenter justify-center gap-3 cursor-pointer rounded-lg py-1 borderGray hoverLightBlue'>
                                            <h2>Highest First</h2>
                                        </div>
                                    </>

                                </div>
                                <div>
                                </div>
                            </div>
                        </aside>
                        {/* flight cards div */}
                        <div className="flex flex-col gap-3 ">
                            {!cardLoading ?
                                listOfBuses?.map((val) => {
                                    return (
                                        <div key={val._id} id={val._id} className=' bg-white rounded-2xl overflow-hidden grayBlurShadow borderGray'>
                                            <div id={val._id + 1} onClick={()=>{ setTrainPassangers(1); navigate(`/Bus-review/${val._id}`)}} className='flex flex-col gap-2 py-3 px-5'>
                                                <div className='grid grid-cols-5 text-left alignCenter'>
                                                    <h1 className=' font-bold text-lg'>{val.name}</h1>
                                                    <div className=' text-right font-bold text-lg'>
                                                        <h1>{val.departureTime} <span className=' text-sm font-normal text-gray-500'>{fromCity}</span></h1>

                                                    </div>
                                                    <div className='flex alignCenter justify-center '>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                        <p className=' text-gray-500 px-1'>To</p>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                    </div>
                                                    <div className=' text-left font-bold text-lg'>
                                                        <h1>{val.arrivalTime} <span className=' text-sm font-normal text-gray-500'>{toCity}</span></h1>
                                                    </div>
                                                    <div className=' text-right font-bold text-lg'>
                                                        <h1>₹ {val.fare}</h1>
                                                    </div>
                                                </div>
                                                <div className=' text-left'>
                                                    <h1>{val.type}</h1>
                                                </div>
                                                <div className='flex justify-between font-bold'>
                                                    <div className='flex alignCenter pr-1 text-white rounded-md w-fit ratingBack'><img className=' w-5 mt-0.5' src="/img/populer.png" alt="" /><span>3.4</span></div>
                                                    <div>
                                                        <p className=' text-gray-500 font-normal text-sm'>{val.seats} Available seats</p>
                                                    </div>
                                                </div>

                                            </div>
                                            <div className='flex gap-3 px-5 py-3 borderTopGray prevent-select'>
                                                <h1 id={val._id + 2} onClick={() => { amenityHandle(val._id) }} className='flex alignCenter px-3 py-1 text-sm cursor-pointer rounded-lg'>Amenities <img id="busAmenitiesArrow" className=" w-3 h-2 mt-1 ml-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></h1>
                                            </div>
                                            {amenity === val._id ?
                                                <div className=' text-left px-5 py-3 borderTopGray'>
                                                    {val?.amenities?.map((ameni) => {
                                                        return <li>{ameni}</li>
                                                    })}
                                                </div> : ""}
                                        </div>
                                    )
                                })
                                : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </BrowserView>
            <MobileView>
                <div className=' fixed flex gap-2 px-3 rounded-t-lg justify-around text-sm text-white bottom-0 py-2 bg-black w-full'>
                    <div id='lowPrice' onClick={() => { mobSortBox("lowPrice") }} className='flex alignCenter justify-center filterblackBack cursor-pointer gap-3 rounded-lg px-2 '>
                        <h2>Lowest First</h2>
                    </div>
                    <div id='highPrice' onClick={() => { mobSortBox("highPrice") }} className='flex alignCenter justify-center filterblackBack gap-3 cursor-pointer rounded-lg px-2 '>
                        <h2>Highest First</h2>
                    </div>
                    <div className='filterblackBack px-2 rounded-md' onClick={() => { mobileFilterHandle("open") }}>
                        <img src="/img/busFilter.png" alt="" />
                    </div>
                </div>
                <div className=" bg-gray-50 h-full" onClick={() => { setIsModalOpen(false); }}>
                    {editBus ?
                        <div className="  absolute top-0 fullHeightInVh z-20 w-full">
                            <div className=" mb-6">
                                <div id="showBookingBar" className="bg-gray-100 fullHeightInVh py-4 px-6 text-left">
                                    <p onClick={() => { setEditBus(false); }} className=" text-right text-blue-600 py-2">Cancel</p>
                                    <div className="  gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={(e) => { handleFrom(e) }} className=" relative bg-white px-3 py-2 mb-3 rounded-lg ">
                                            <span className="flex flex-row gap-1 alignCenter text-sm text-blue-600">FROM <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                cityListArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.name === source ?
                                                                <div key={val.name} className="">
                                                                    <h1 className=" font-bold text-xl">{val?.name}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {sourceModal ?
                                                <div className=" absolute w-64 z-20 left-0 top-9 flightModal" >
                                                    <BusModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleTo} className=" relative px-3 py-2 mb-3 rounded-lg borderRight bg-white ">
                                            <span className="flex flex-row gap-1 alignCenter text-sm text-blue-600">TO <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                            {!loading ?
                                                cityListArray?.map((val) => {
                                                    return (
                                                        <>
                                                            {val?.name === destination ?
                                                                <div key={val.name} className=" ">
                                                                    <h1 className=" font-bold text-xl ">{val?.name}</h1>
                                                                </div> : ""}</>
                                                    )
                                                }) : <ShimmerLocation />}
                                            {destinationModal ?
                                                <div className=" absolute w-64 z-20 left-0 top-9 flightModal" >
                                                    <BusModal />
                                                </div> : ""}
                                        </div>
                                        <div onClick={handleDateModal} className=" relative px-3 py-2 mb-3 rounded-lg borderRight bg-white">
                                            <span className=" text-blue-600 text-sm">DEPART</span>
                                            <div className="">
                                                <span className=" font-extrabold text-xl">{date} </span>
                                                <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                                <span className=" ">{weekName[day]}</span>
                                                {busDateModal ?
                                                    <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white text-black p-2 grayBlurShadow rounded-lg calenderBox" >
                                                        <Calendar onChange={onChange} value={flightdate} />
                                                    </div> : ""}
                                            </div>
                                        </div>
                                    </div>
                                    <button onClick={(e) => { handleSearch(e); setEditBus(false); }} className=" px-10 py-2 w-full text-lg my-1 font-bold text-white blueSearch rounded-lg">SEARCH</button>
                                </div>
                            </div>
                        </div> :
                        <>
                            <div id="showBookingBar" className=" bg-white px-2 rounded-b-md py-2 mb-3">
                                <div className="flex justify-between alignCenter bg-gray-100 rounded-md borderGray py-0 pl-2">
                                    <div>
                                        <h1 className="flex">
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === sourceBusTrain ?
                                                            <div key={val.name} className="">
                                                                <h1 className=" font-bold">{val?.name}-</h1>
                                                            </div> : ""}</>
                                                )
                                            })}
                                            {cityListArray?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === destinationBusTrain ?
                                                            <div key={val.name} className=" ">
                                                                <h1 className=" font-bold  ">{val?.name}</h1>
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
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditBus(true); console.log("hello"); }}>
                                        <img className=" w-3 ml-1" src="/img/editIcon.png" alt="" />
                                        <h2 className=" text-xs text-blue-600">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <span id="fromArrow"></span>
                            <span id="toArrow" > </span>
                        </>
                    }
                    {/* <div className=" mb-6">
                        <div id="showBookingBar" className=" flex alignCenter justify-center gap-9  pt-2 pb-2 px-6 text-left gradientBackgroundBlue">
                            <div className=" grid gap-2 rounded-lg cursor-pointer allFlightsBookingBox">
                                <div onClick={handleFrom} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">FROM <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === source ?
                                                        <div key={val.name} className=" mt-2">
                                                            <h1 className=" font-bold text-sm text-white">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleTo} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">TO <img id="toArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        cityListArray?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === destination ?
                                                        <div key={val.name} className=" mt-2">
                                                            <h1 className=" font-bold text-sm text-white">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {destinationModal ?
                                        <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                            <BusModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-3 py-0 rounded-lg borderRight lightWhite">
                                    <span className=" text-blue-600 text-xs">DEPART</span>
                                    <div className="text-white">
                                        <span className=" font-extrabold text-sm">{date} </span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                        <span className=" ">{weekName[day]}</span>
                                        {busDateModal ?
                                            <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white text-black p-2 grayBlurShadow rounded-lg calenderBox" >
                                                <Calendar onChange={onChange} value={flightdate} />
                                            </div> : ""}
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleSearch} className=" px-10 h-10 text-lg my-1 font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div> */}
                    <main className=" gap-2 px-2">
                        {/* filter */}
                        <div onClick={() => { mobileFilterHandle("close"); }} id="mobFilter" className="fixed z-20 top-0 w-full fullHeightInVh lowOpacityGrayBack mobileFilterClose ">
                            <aside className=" filterBox bg-white p-4 fullHeightInVh w-3/4 rounded-lg grayBlurShadow">
                                <h1 className=" text-2xl font-bold text-left pb-2 mb-2 borderBottomGray">Filters</h1>
                                <div className=" text-left">
                                    <h1 className=" font-semibold mb-2 text-xl">AC</h1>
                                    <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                        <>
                                            <div id='acBox' onClick={() => { handleAc("acBox") }} className='flex alignCenter justify-center cursor-pointer gap-3 rounded-lg py-1 borderGray hoverLightBlue'>
                                                <img className=' w-4' src={ac === "acBox" ? "/img/acOn.png" : "/img/acOff.png"} alt="" />
                                                <h2>AC</h2>
                                            </div>
                                        </>
                                        <>
                                            <div id='nonAcBox' onClick={() => { handleAc("nonAcBox") }} className='flex alignCenter justify-center gap-3 cursor-pointer rounded-lg py-1 borderGray hoverLightBlue'>
                                                <img className=' w-4' src={ac === "nonAcBox" ? "/img/nonAcOn.png" : "/img/nonAcOff.png"} alt="" />
                                                <h2>Non AC</h2>
                                            </div>
                                        </>

                                    </div>
                                    {/* <h1 className=" font-semibold mb-2 mt-2 text-xl">Sort by price</h1>
                                    <div className='grid grid-cols-2 gap-3 pb-4 borderBottomGray'>
                                        <>
                                            <div id='lowPrice' onClick={() => { sortPrice("lowPrice") }} className='flex alignCenter justify-center cursor-pointer gap-3 rounded-lg py-1 borderGray hoverLightBlue'>
                                                <h2>Lowest First</h2>
                                            </div>
                                        </>
                                        <>
                                            <div id='highPrice' onClick={() => { sortPrice("highPrice") }} className='flex alignCenter justify-center gap-3 cursor-pointer rounded-lg py-1 borderGray hoverLightBlue'>
                                                <h2>Highest First</h2>
                                            </div>
                                        </>

                                    </div> */}
                                </div>
                            </aside>
                        </div>
                        {/* flight cards div */}
                        <div className="flex w-full flex-col gap-3 pb-20">
                            {!cardLoading ?
                                listOfBuses?.map((val) => {
                                    return (
                                        <div key={val._id} id={val._id} className=' bg-white w-full rounded-2xl overflow-hidden grayBlurShadow borderGray'>
                                            <div id={val._id + 1}  onClick={()=>{ setTrainPassangers(1); navigate(`/Bus-review/${val._id}`)}} className='flex flex-col gap-2 py-3 px-2'>
                                                <div className='flex justify-between alignCenter'>
                                                <h1 className=' font-bold text-lg text-left'>{val.name}</h1>
                                                <div className=' text-right font-bold text-lg'>
                                                    <h1>₹ {val.fare}</h1>
                                                </div>
                                                </div>
                                                <div className='flex justify-between text-left alignCenter'>

                                                    <div className=' text-right font-bold text-lg'>
                                                        <h1>{val.departureTime} <span className=' text-sm font-normal text-gray-500'>{fromCity}</span></h1>

                                                    </div>
                                                    <div className='flex alignCenter justify-center '>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                        <p className=' text-gray-500 px-1'>To</p>
                                                        <div className=" w-5 h-0.5 mt-0.5 bg-green-500"></div>
                                                    </div>
                                                    <div className=' text-left font-bold text-lg'>
                                                        <h1>{val.arrivalTime} <span className=' text-sm font-normal text-gray-500'>{toCity}</span></h1>
                                                    </div>

                                                </div>
                                                <div className=' text-left'>
                                                    <h1>{val.type}</h1>
                                                </div>
                                                <div className='flex justify-between font-bold'>
                                                    <div className='flex alignCenter pr-1 text-white rounded-md w-fit ratingBack'><img className=' w-5 mt-0.5' src="/img/populer.png" alt="" /><span>3.4</span></div>
                                                    <div>
                                                        <p className=' text-gray-500 font-normal text-sm'>{val.seats} Available seats</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className='flex gap-3 px-4 py-1 borderTopGray prevent-select'>
                                                <h1 id={val._id + 2} onClick={() => { amenityHandle(val._id) }} className='flex alignCenter px-3 py-1 text-sm cursor-pointer rounded-lg'>Amenities <img id="busAmenitiesArrow" className=" w-3 h-2 mt-1 ml-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></h1>
                                            </div>
                                            {amenity === val._id ?
                                                <div className=' text-left px-5 py-3 borderTopGray'>
                                                    {val?.amenities?.map((ameni) => {
                                                        return <li>{ameni}</li>
                                                    })}
                                                </div> : ""}
                                        </div>
                                    )
                                })
                                : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div >
            </MobileView >
        </>
    );
}

export default memo(ShowAllBuses);