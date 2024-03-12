import React, { memo, useContext, useEffect, useState } from 'react';
import { cityListArray, flightCodeArray, getBuses, headerNavlist, monthNames, suggetionFilterArray, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate, useParams } from 'react-router';
import ShimmerLocation from '../Loader/ShimmerLocation';
import FlightModal from '../Modals/FlightModal';
import TrainModal from '../Modals/TrainModal';
import Calendar from 'react-calendar';
import BusModal from '../Modals/BusModal';

function ShowAllBuses(props) {
    const { from, to, weekDay } = useParams();
    const navigate = useNavigate();
    const [selectedNav, setSelectedNav] = useState("BUSES");
    const [fromCity, setFromCity] = useState(from);
    const [toCity, setToCity] = useState(to);
    const [listOfBuses, setListOfBuses] = useState([]);
    const [week, setWeek] = useState(weekDay);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [BusDateModal, setBusDateModal] = useState(false);
    const [amenity, setAmenity] = useState(false);
    const [prevAmenity, setPrevAmenity] = useState(false);
    const [ac, setAc] = useState(false);
    const [nonAc, setNonAc] = useState(false);
    const [lowHighPrice, setLowHighPrice] = useState("");
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource, fromOrTo, setFromOrTo, setFlightArray,
        destination, setDestination, setCurrentTravelOption, flightdate, setFlightDate, } = useContext(AppContext);
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
        scrollTop >= 60 ? header?.classList?.add('gradientBackgroundBlue') : header.classList.remove('gradientBackgroundBlue');
        scrollTop >= 60 ? header?.classList.add('grayBlurShadow') : header.classList.remove('grayBlurShadow');

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
        setFromCity(source);
        setToCity(destination);
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
    const handleNav = (id) => {
        setSelectedNav(id);
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
        <div className=" bg-gray-50 h-full" onClick={() => { setIsModalOpen(false); }}>
            <header id="showHeader" className=" overflow-hidden bg-white headerTwo">
                <div className=" flex flex-row m-auto alignCenter justify-between py-3 headerBox">
                    <div className=" flex flex-row alignCenter">
                        <div className=" cursor-pointer mmtlogo">
                            <img className=" w-28 " src="/img/mmtBlueLogo.png" alt="" />
                        </div>
                        <ul className=" flex flex-row alignCenter ml-8 gap-10">
                            {headerNavlist?.map((val) => {
                                return (
                                    <li className="flex flex-col cursor-pointer h-full justify-between" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                        <img className=" w-9" src={selectedNav === val.id ? val.imageOn : val.imageOff} alt="" />
                                        {selectedNav === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
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
            </header>
            <div className="gradientBackgroundBlue mb-6">
                <div id="showBookingBar" className=" flex alignCenter justify-center gap-9  pt-2 pb-2 px-6 text-left">
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
                                {BusDateModal ?
                                    <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white text-black p-2 grayBlurShadow rounded-lg calenderBox" >
                                        <Calendar onChange={onChange} value={flightdate} />
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
                                    <div id={val._id + 1} className='flex flex-col gap-2 py-3 px-5'>
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
    );
}

export default memo(ShowAllBuses);