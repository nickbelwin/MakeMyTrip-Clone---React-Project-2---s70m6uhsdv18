
import "./flight.css";
import { filterHotels, flightCodeArray, getAirportName, getAirports, headerNavlist, searchHotels, suggetionFilterArray } from "../Constant/constant";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate, useParams } from "react-router";

import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";

import ShimmerLocation from "../Loader/ShimmerLocation";

import FlightModal from "../Modals/FlightModal";
import Calendar from "react-calendar";

function ShowAllFlights(props) {
    const { from, to, weekDay } = useParams();
    const [selectedNav, setSelectedNav] = useState("FLIGHTS");
    const { setCurrentTravelOption } = useContext(AppContext);
    const navigate = useNavigate();
    const { hotelLocation, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, source, setSource, setFlightArray,
        destination, setDestination, flightdate, setFlightDate, } = useContext(AppContext);
    const [rooms, setRooms] = useState({ room: 1, guest: 2 });
    const [fromCity, setFromCity] = useState(from);
    const [toCity, setToCity] = useState(to);
    const [week, setWeek] = useState(weekDay);
    const [sourceModal, setSourceModal] = useState(false);
    const [destinationModal, setDestinationModal] = useState(false);
    const [flightSourceCode, setFlightSourceCode] = useState("DEL");
    const [flightDestinationCode, setFlightDestinationCode] = useState("BOM");
    const [flightDateModal, setFlightDateModal] = useState(false);
    const [listOfFlights, setListOfFlights] = useState([]);
    const [lowPrice, setLowPrice] = useState([]);
    const [nonStopPrice, setNonStopPrice] = useState("");
    const [preferPrice, setPreferPrice] = useState("");
    const [showTicketBox, setShowTicketBox] = useState("");
    const [selectedFlightDetailsNav, setSelectedFlightDetailsNav] = useState("flightDetails");
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
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
    // get all flight list
    const getSearchedFlights = async () => {
        setCardLoading(true);
        let res = await getAirports(fromCity, toCity, week);
        setPreferPrice({ price: res?.flights[0]?.ticketPrice, time: res?.flights[0]?.duration });
        let sortingRes = res?.flights.sort((a, b) => {
            return a?.ticketPrice - b?.ticketPrice;
        });
        let noStop = res?.flights?.sort((a, b) => {
            return a?.stops - b?.stops;
        });
        setNonStopPrice({ price: noStop[0]?.ticketPrice, time: noStop[0]?.duration })
        setLowPrice({ price: sortingRes[0]?.ticketPrice, time: sortingRes[0]?.duration });
        setListOfFlights(sortingRes);
        setCardLoading(false);
        console.log("list Flights", res?.flights)
    }
    const handleSearch = () => {
        setFromCity(flightSourceCode);
        setToCity(flightDestinationCode);
        setWeek(weekName[day]);
        let sortArr = ["cheapest", "nonStop", "prefer"];
        sortArr.forEach((val) => {
            document.getElementById(val)?.classList.remove("flightSort");
            document.getElementById(val + "Icon")?.classList.remove("blueBack");
        });
        document.getElementById("cheapest")?.classList.add("flightSort");
        document.getElementById("cheapestIcon")?.classList.add("blueBack");
    }
    const getFlightData = async () => {
        let res = await getAirportName();
        setFlightArray(res);
    }
    useEffect(() => {
        getSearchedFlights();
        getFlightData();
    }, [fromCity, toCity, week]);
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
    useEffect(() => {
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    const handleNav = (id) => {
        setSelectedNav(id);
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        setSelectedNav("FLIGHTS");

        setCurrentTravelOption("FLIGHTS");
    }, []);
    const nonStopHandle = async () => {
        setCardLoading(true);
        let res = await getAirports(fromCity, toCity, week);
        let noStop = res?.flights?.sort((a, b) => {
            return a?.stops - b?.stops;
        });
        console.log("nonStop", noStop);
        setNonStopPrice({ price: noStop[0]?.ticketPrice, time: noStop[0]?.duration })
        setListOfFlights(noStop);
        setCardLoading(false);
    }
    const preferHandle = async () => {
        setCardLoading(true);
        let res = await getAirports(fromCity, toCity, week);
        setListOfFlights(res?.flights);
        setCardLoading(false);
    }
    const selectSortBy = (id) => {
        let sortArr = ["cheapest", "nonStop", "prefer"];
        sortArr.forEach((val) => {
            document.getElementById(val)?.classList.remove("flightSort");
            document.getElementById(val + "Icon")?.classList.remove("blueBack");
        });
        document.getElementById(id)?.classList.add("flightSort");
        document.getElementById(id + "Icon")?.classList.add("blueBack");
        if (id === "cheapest") {
            getSearchedFlights();
        }
        else if (id === "nonStop") {
            nonStopHandle();
        }
        else if (id === "prefer") {
            preferHandle();
        }
    }
    const flightDetailsNavHandle = (navId1, navId2) => {
        setSelectedFlightDetailsNav(navId1);
        document.getElementById(navId1).classList.add("flightDetailsNav");
        document.getElementById(navId2).classList.remove("flightDetailsNav");
    }
    return (
        <div className=" bg-blue-50 fullHeightInVh" onClick={() => { setIsModalOpen(false); }}>
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
                                    <FlightModal />
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
                                    <FlightModal />
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
            <main className=" allCardMainBox">
                {/* flight cards div */}
                <div className="flex flex-col gap-3 mx-2 ">
                    <div id="sortBox" className=" p-4 bg-white">
                        <div className="grid grid-cols-3 gap-2 ">
                            <div id="cheapest" onClick={() => { selectSortBy("cheapest") }} className="flex alignCenter p-3 rounded-md bg-gray-100 flightSort">
                                <div id="cheapestIcon" className=" rounded-md mr-2 bg-gray-300 blueBack">
                                    <img className=" w-10" src="/img/cheapest.png" alt="" />
                                </div>
                                <div>
                                    <h1 className=" font-bold text-left">CHEAPEST</h1>
                                    <p className=" text-xs">₹ {lowPrice.price + 888} | 0{lowPrice.time}h 00m</p>
                                </div>
                            </div>
                            <div id="nonStop" onClick={() => { selectSortBy("nonStop") }} className="flex alignCenter text-left  p-3 rounded-md bg-gray-100">
                                <div id="nonStopIcon" className=" rounded-md mr-2 bg-gray-300">
                                    <img className=" w-10" src="/img/fastest.png" alt="" />
                                </div>
                                <div>
                                    <h1 className=" font-bold text-left">NON STOP FIRST</h1>
                                    <p className=" text-xs">₹ {nonStopPrice.price + 888} | 0{nonStopPrice.time}h 00m</p>
                                </div>
                            </div>
                            <div id="prefer" onClick={() => { selectSortBy("prefer") }} className="flex alignCenter text-left p-3 rounded-md bg-gray-100">
                                <div id="preferIcon" className=" rounded-md mr-2 bg-gray-300">
                                    <img className=" w-10" src="/img/populer.png" alt="" />
                                </div>
                                <div>
                                    <h1 className=" font-bold text-left">YOU MAY PREFER</h1>
                                    <p className=" text-xs">₹ {preferPrice.price + 888} | 0{preferPrice.time}h 00m</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {!cardLoading ?
                        listOfFlights?.map((val) => {
                            return (
                                <div>
                                    <div className=" bg-white pt-5 px-3">
                                        <div className="flex alignCenter justify-around gap-3 p-4">
                                            <div className="flex text-left">
                                                <img className=" w-10 h-10 mr-1" src="/img/flightLogo.jpg" alt="" />
                                                <div>
                                                    <h1 className=" font-bold text-xl">IndiGo</h1>
                                                    <p className=" flightIdText text-gray-400">{val.flightID}</p>
                                                </div>
                                            </div>
                                            <div>
                                                <h1 className=" font-bold text-xl">{val.departureTime}</h1>
                                                <p className=" text-xs">{source}</p>
                                            </div>
                                            <div>
                                                <p className=" text-xs mb-2">0{val.duration} h 00 m</p>
                                                <div className=" w-full h-0.5 bg-green-500"></div>
                                                <p className=" mt-1 text-xs text-gray-500 font-semibold">{val.stops != 0 ? val.stops + " stop" : "Non stop"}</p>
                                            </div>
                                            <div>
                                                <h1 className=" font-bold text-xl">{val.arrivalTime}</h1>
                                                <p className=" text-xs">{destination}</p>
                                            </div>
                                            <div>
                                                <h1 className=" text-xl font-bold">₹ {val.ticketPrice + 888}</h1>
                                                <p className=" text-xs text-gray-400">per person</p>
                                            </div>
                                        </div>
                                        <div>
                                            <p className=" flex alignCenter justify-center bg-red-50 text-sm py-1"><div className=" w-2 h-2 rounded-full bg-red-400"></div> Get Rs 100 off using MMTBONUS</p>
                                        </div>
                                        <p onClick={() => { showTicketBox === val._id ? setShowTicketBox("") : setShowTicketBox(val._id) }} className=" text-xs blueText text-right py-3 cursor-pointer">{showTicketBox === val._id ? "Hide" : "Show"} Flight Details</p>
                                    </div>
                                    {showTicketBox === val._id ?
                                        <>
                                            <div className=" p-5 showFlightDetailsBox">
                                                <div className="flex mb-4 bg-white cursor-pointer text-xs w-fit">
                                                    <h1 id="flightDetails" onClick={() => { flightDetailsNavHandle("flightDetails", "fareSummary") }} className=" px-3 py-1 flightDetailsNav">FLIGHT DETAILS</h1>
                                                    <h1 id="fareSummary" onClick={() => { flightDetailsNavHandle("fareSummary", "flightDetails") }} className=" px-3 py-1">FARE SUMMARY</h1>
                                                </div>
                                                {selectedFlightDetailsNav === "flightDetails" ?
                                                    <div className="borderGray rounded-md">
                                                        <h1 className=" text-left font-bold px-2 py-3 borderBottomGray">{source} to {destination} , {date} {monthNames[month]}</h1>
                                                        <div className="flex text-sm alignCenter p-2">
                                                            <img className=" w-7 h-7 mr-1" src="/img/flightLogo.jpg" alt="" />
                                                            <h1 className=" font-bold mr-1">IndiGo</h1>
                                                            <p className=" text-gray-400">{val.flightID}</p>
                                                        </div>
                                                        <div className="flex justify-between text-left p-2">
                                                            <div>
                                                                <h1 className=" font-bold text-xl">{val.arrivalTime}</h1>
                                                                <p className=" text-xs font-bold mb-3">{weekDay}, {date} {monthNames[month]} {year}</p>
                                                                <p className=" text-xs text-gray-600">Terminal 2</p>
                                                                <p className=" text-xs">{source}, India</p>
                                                            </div>
                                                            <div>
                                                                <p className=" text-xs mb-2">02 h 10 m</p>
                                                                <div className=" w-full h-0.5 bg-green-500"></div>
                                                            </div>
                                                            <div>
                                                                <h1 className=" font-bold text-xl">{val.departureTime}</h1>
                                                                <p className=" text-xs font-bold mb-3">{weekDay}, {date} {monthNames[month]} {year}</p>
                                                                <p className=" text-xs text-gray-600">Terminal 2</p>
                                                                <p className=" text-xs">{destination}, India</p>
                                                            </div>
                                                            <div>
                                                                <h1 className=" font-bold">BAGGAGE:</h1>
                                                                <p className=" text-xs text-gray-600">ADULT</p>
                                                            </div>
                                                            <div>
                                                                <h1 className=" font-bold">CHECK IN</h1>
                                                                <p className=" text-xs text-gray-600">15 Kgs (1 piece only)</p>
                                                            </div>
                                                            <div>
                                                                <h1 className=" font-bold">CABIN</h1>
                                                                <p className=" text-xs text-gray-600">7 Kgs (1 piece only)</p>
                                                            </div>
                                                        </div>
                                                    </div> :
                                                    <div className="borderGray rounded-md pb-4">
                                                        <h1 className=" text-left font-bold px-2 py-3 borderBottomGray">Fare breakup</h1>
                                                        <div>
                                                            <table className=" text-left">
                                                                <tr>
                                                                    <th className=" font-medium">TOTAL</th>
                                                                    <th className=" font-medium">₹ {val.ticketPrice + 888}</th>
                                                                </tr>
                                                                <tr className=" text-xs text-gray-400">
                                                                    <td>Base Fare</td>
                                                                    <td>₹ {val.ticketPrice}</td>
                                                                </tr>
                                                                <tr className=" text-xs text-gray-400">
                                                                    <td>Surcharges</td>
                                                                    <td>₹ 888</td>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>}
                                            </div></>
                                        : ""
                                    }
                                </div>
                            );
                        }) : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                </div>
            </main>
        </div>
    );
}

export default ShowAllFlights;