
import "./hotel.css";
import { filterHotels, headerNavlist, searchHotels, suggetionFilterArray } from "../Constant/constant";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate, useParams } from "react-router";
import { memo } from "react";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { LazyLoadImage } from "react-lazy-load-image-component";
import Calendar from "react-calendar";
import { BrowserView, MobileView } from "react-device-detect";

function ShowAllHotels(props) {
    const { city } = useParams();
    const navigate = useNavigate();
    const { token, setToken, currentTravelOption, setCurrentTravelOption, hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, hotelInDate, setHotelInDate,
        hotelOutDate, setHotelOutDate,roomAndGuest, setRoomAndGuest, } = useContext(AppContext);
    const [rooms, setRooms] = useState({ room: 1, guest: 2 });
    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [hotelDateInModal, setHotelDateInModal] = useState(false);
    const [hotelDateOutModal, setHotelDateOutModal] = useState(false);
    const [listOfHotels, setListOfHotels] = useState([]);
    const [filterFields, setFilterFields] = useState(false);
    const [prevCheckbox, setPrevCheckbox] = useState("");
    const [sortByPrice, setSortByPrice] = useState("");
    const [prevSortByPrice, setPrevSortByPrice] = useState("");
    const [editHotel, setEditHotel] = useState(false);
    const [mobileFilter, setMobileFilter] = useState(false);
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [scrollUp,setScrollUp]=useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [monthOut, setMonthOut] = useState("");
    const [yearOut, setYearOut] = useState("");
    const [dayOut, setDayOut] = useState("");

    const onChange = (newDate) => {
        let chek = newDate;
        setHotelInDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        // Add any additional logic you need when the date changes
    };
    const onChangeOut = (newDate) => {
        let chek = newDate;
        setHotelOutDate(chek);
        setDateOut(chek.getDate());
        setMonthOut(chek.getMonth());
        setYearOut(chek.getFullYear());
        setDayOut(chek.getDay());
        setIsModalOpen(false);
        setHotelDateOutModal(false);
        // Add any additional logic you need when the date changes
    };
    const handleHotel = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setIsModalOpen(true);
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setHotelDateInModal(false);
            setHotelDateOutModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
    // get all hotels list
    const getSearchedHotel = async () => {
        setCardLoading(true);
        let res = await searchHotels(city);
        setListOfHotels(res.data.data.hotels);
        setCardLoading(false);
        console.log("list Hotels", res.data.data.hotels)
    }
    useEffect(() => {
        getSearchedHotel();
    }, [city]);
    const handleDateModal = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setHotelDateOutModal(false);
        setHotelDateInModal(true);
        setIsModalOpen(true);

    }
    const handleDateOutModal = (e) => {
        e.stopPropagation();
        setHotelDateOutModal(true);
        setSourceModal(false);
        setHotelDateInModal(false);
        setIsModalOpen(true);

    }
    // handle filters-----------------------------
    const handleFilter = async () => {
        setCardLoading(true);
        console.log("field", filterFields);
        let res = await filterHotels(city, filterFields);
        setListOfHotels(res.hotels);
        setCardLoading(false);
        console.log("filter list", res.hotels);
    }
    useEffect(() => {
        if (filterFields) {
            handleFilter();
        }
    }, [filterFields]);
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
    const isSticky = (e) => {
        const header = document.getElementById('showBookingBar');
        const sorting = document.getElementById("sortBox");
        const scrollTop = window.scrollY;
        scrollTop >= 60 ? header?.classList.add('sticky') : header.classList.remove('sticky');
        if(screen.width <= 768){
            scrollTop >= 60 ? sorting?.classList.add('sortSticky') : sorting.classList.remove('sortSticky');
            scrollTop >= 1000 ? setScrollUp(true): setScrollUp(false);;
        }
        console.log("screen", screen.width);
    };
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    useEffect(() => {
        let dateIn = hotelInDate;
        let dateOut = hotelOutDate;
        setDate(dateIn.getDate());
        setMonth(dateIn.getMonth());
        setYear(dateIn.getFullYear());
        setDay(dateIn.getDay());
        setDateOut(dateOut.getDate());
        setMonthOut(dateOut.getMonth());
        setYearOut(dateOut.getFullYear());
        setDayOut(dateOut.getDay());
    }, []);
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        setHotelLocation(city);
        setCurrentTravelOption("HOTELS");
    }, []);
    const getData = async () => {
        setLoading(true);
        let resp = await getHotelName();
        let hotelData = resp.data.data.cities;
        let hotelPlace = hotelData?.map((val) => {
            return val.cityState;
        });
        hotelPlace = hotelPlace.map((val) => {
            return val.split(",");
        });
        hotelPlace = hotelPlace.map((val, idx) => {
            return { _id: hotelData[idx]._id, name: val[0], location: val[0] + "," + val[1] }
        });
        setHotelArray(hotelPlace);
        setHotelName(hotelPlace);
        setLoading(false);
    }
    useEffect(() => {
        getData();
    }, []);
    const filterdata = (id, filterTag) => {
        setCardLoading(true);
        suggetionFilterArray.forEach((val) => {
            if (document.getElementById(val.id).checked) {
                document.getElementById(val.id).checked = false;
            }
        })
        if (prevCheckbox != id) {
            document.getElementById(id).checked = true;
            setFilterFields({ "amenities": filterTag });
            setPrevCheckbox(id);
        }
        else {
            document.getElementById(id).checked = false;
            setPrevCheckbox("");
            setFilterFields({});
        }

    }
    const budgetHandle = () => {
        let min = document.getElementById("minBudget");
        let max = document.getElementById("maxBudget");
        if (min.value && max.value) {
            let data = listOfHotels?.filter((val) => {
                if (Math.floor(val.avgCostPerNight) >= min.value && Math.floor(val.avgCostPerNight) <= max.value) {
                    return val;
                }
            });
            setListOfHotels(data);
        }
        else {
            getSearchedHotel();
        }
    }
    const sortHotelsHandle = () => {
        setCardLoading(true);
        if (sortByPrice === 1) {
            let sorting = listOfHotels.sort((a, b) => {
                return Math.floor(a?.avgCostPerNight) - Math.floor(b?.avgCostPerNight);
            });
            setListOfHotels(sorting);
        }
        else if (sortByPrice === -1) {
            let sorting = listOfHotels.sort((a, b) => {
                return Math.floor(b?.avgCostPerNight) - Math.floor(a?.avgCostPerNight);
            });
            setListOfHotels(sorting);
        }
        setCardLoading(false);
    }
    useEffect(() => {
        sortHotelsHandle();
    }, [sortByPrice]);
    const selectSortBy = (id, val) => {
        console.log(id);
        document.getElementById("mostPrice").style.color = "black";
        document.getElementById("mostPrice").style.borderBottom = "none";
        document.getElementById("lowPrice").style.color = "black";
        document.getElementById("lowPrice").style.borderBottom = "none";
        if (prevSortByPrice === val) {
            getSearchedHotel();
            setPrevSortByPrice("");
        }
        else {
            setCardLoading(true);
            document.getElementById(id).style.color = "#008CFF";
            document.getElementById(id).style.borderBottom = "2px solid #008CFF";
            setSortByPrice(val);
            setPrevSortByPrice(val);
        }
    }
    return (
        <>
            <BrowserView>
                <div onClick={() => { setIsModalOpen(false); }}>
                    <div id="showBookingBar" className="">
                        <div  className=" flex justify-center alignCenter gap-9  pt-2 pb-2 px-6 text-left gradientBackgroundBlue">
                            <div className=" grid gap-2 rounded-lg cursor-pointer allHotelsBookingBox">
                                <div onClick={handleHotel} className=" relative px-3 py-1 rounded-lg borderRight lightWhite ">
                                    <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">CITY, AREA OR PROPERTY <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className=" mt-2">
                                                            <h1 className=" font-bold text-sm text-white">{val?.name}</h1>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                            <HotelModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-3 py-0 rounded-lg borderRight lightWhite">
                                    <span className=" text-blue-600 text-xs">CHECK-IN</span>
                                    <div className="text-white">
                                        <span className=" font-extrabold text-sm">{date}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                        <span className=" ">{weekName[day]}</span>
                                    </div>
                                    {hotelDateInModal ?
                                        <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <Calendar onChange={onChange} />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateOutModal} className=" relative px-3 py-0 rounded-lg borderRight lightWhite">
                                    <span className=" text-blue-600 text-xs">CHECK-OUT</span>
                                    <div className="text-white">
                                        <span className=" font-extrabold text-sm">{dateOut}</span>
                                        <span className=" font-semibold">{monthNames[monthOut]}'{yearOut}, </span>
                                        <span className="">{weekName[dayOut]}</span>
                                    </div>
                                    {hotelDateOutModal ?
                                        <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <Calendar onChange={onChangeOut} />
                                        </div> : ""}
                                </div>
                                <div className=" px-3 py-0 rounded-lg borderRight lightWhite">
                                    <span className=" text-blue-600 text-xs">ROOMS_&_GUESTS</span>
                                    <div className=" text-white">
                                        <span className=" font-extrabold text-sm">{roomAndGuest.room}</span>
                                        <span className=" font-semibold">Room, </span>
                                        <span className=" font-extrabold text-sm">{roomAndGuest.guest}</span>
                                        <span className=" font-semibold">Adults</span>
                                    </div>
                                </div>

                            </div>
                            <button onClick={() => { navigate(`/hotels/${hotelLocation}`) }} className=" px-10 py-3 text-lg my-1 h-fit font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                        <div  className=" sortByBoxCover">
                            <div className="flex sortByBox">
                                <h1 className=" py-3">SORT BY:</h1>
                                <p className="flex alignCenter justify-center"><span id="mostPrice" onClick={() => { selectSortBy("mostPrice", -1) }} className=" py-3 cursor-pointer">Price <span>(Highest First)</span></span></p>
                                <p className="flex alignCenter justify-center"><span id="lowPrice" onClick={() => { selectSortBy("lowPrice", 1) }} className=" py-3 cursor-pointer">Price <span>(Lowest First)</span></span></p>
                            </div>
                        </div>
                    </div>

                    <main className="grid gap-2 px-4 allCardMainBox">
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
                                    <button id="budgetBtn" onClick={budgetHandle} className=" h-10 px-2 rounded-md blueBack"><img className=" w-6" src="/img/rightArrow.png" alt="" /></button>
                                </div>
                            </div>
                        </aside>
                        {/* hotel cards div */}
                        <div className="flex flex-col gap-3">
                            {!cardLoading ?
                                listOfHotels?.map((val) => {
                                    return (
                                        // hotel cards
                                        <>
                                            <div key={val?._id} id={val?._id} onClick={() => { navigate(`/hotels/hotel-details/${val?._id}`) }} className=" cursor-pointer overflow-hidden rounded-md borderGray grayBlurShadow hotelCard">
                                                <div className="flex justify-between ">
                                                    {/* card left side */}
                                                    <div className="flex gap-4 p-3  hotelCardLeftSide">
                                                        <div>
                                                            <LazyLoadImage className="hotelCardImg rounded-md" src={val?.images[0]} placeholderSrc="/img/mmtLoading.gif" />
                                                        </div>
                                                        <div >
                                                            <h2 className="flex alignCenter text-left"><span className=" font-bold text-2xl">{val?.name}</span></h2>
                                                            <p className=" text-left blueText font-semibold mb-2">{val?.location}</p>
                                                            <ul className="flex gap-2">
                                                                {val?.amenities?.map((amenity, idx) => {
                                                                    return <li className="borderblack rounded text-gray-500 text-xs font-semibold p-1">{amenity}</li>;
                                                                })}
                                                            </ul>
                                                            <p className=" mt-3 text-left font-semibold text-yellow-800">{val?.rooms.length} rooms available</p>
                                                        </div>

                                                    </div>
                                                    {/* card right side */}
                                                    <div className="flex flex-col justify-between p-3 text-right leftGrayBorder hotelCardRightSide">
                                                        <span>{val?.rating >= 4.5 ?
                                                            <span className="ratingColor font-bold">Excellent <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                            val?.rating >= 3.5 ?
                                                                <span className="ratingColor font-bold">Very Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                val?.rating >= 2.5 ?
                                                                    <span className="ratingColor font-bold"> Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                    <span className="ratingColor font-bold">Average <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span>
                                                        }</span>
                                                        <h2 className=" lineHeight"><span className=" font-bold text-2xl">₹{Math.floor(val?.avgCostPerNight)}</span><br /><span className=" text-gray-400 text-sm">+ ₹{val?.childAndExtraBedPolicy.extraBedCharge} taxes & fees</span><br /><span className=" text-gray-400 text-sm">For per bed chargees</span></h2>
                                                        <p className="blueText font-bold">{token ? "" : "Login to unlock the best deals"}</p>
                                                    </div>
                                                </div>
                                                <div className=" bg-green-200 px-3 py-2 text-left font-semibold text-green-900"><p>Exclusive discount of INR 1000 applied on your 1st Hotel booking.</p></div>
                                            </div>
                                        </>
                                    )
                                }) : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </BrowserView>
            <MobileView>
                <div className=" relative " onClick={() => { setIsModalOpen(false); }}>
                    {editHotel ?
                        <div className=" absolute w-full fullHeightInVh z-20 bg-gray-100">
                            <div id="showBookingBar" className=" fullHeightInVh bg-gray-100 gap-9  pt-2 pb-2 px-6 text-left">
                                <p onClick={() => { setEditHotel(false); }} className=" text-right text-blue-600 py-2">Cancel</p>
                                <div className=" gap-2 rounded-lg cursor-pointer">
                                    <div onClick={handleHotel} className=" w-full relative px-3 py-1 mb-2 rounded-lg borderGray lightWhite ">
                                        <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600">CITY, AREA OR PROPERTY <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                        {!loading ?
                                            hotelName?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === hotelLocation ?
                                                            <div key={val._id} className="">
                                                                <h1 className=" font-bold text-sm ">{val?.name}</h1>
                                                            </div> : ""}</>
                                                )
                                            }) : <ShimmerLocation />}
                                        {sourceModal ?
                                            <div className=" absolute w-64 z-20 left-0 top-10 flightModal" >
                                                <HotelModal />
                                            </div> : ""}
                                    </div>
                                    <div onClick={handleDateModal} className=" relative px-3 py-0 mb-2 rounded-lg borderGray lightWhite">
                                        <span className=" text-blue-600 text-xs">CHECK-IN</span>
                                        <div className="">
                                            <span className=" font-extrabold text-sm">{date}</span>
                                            <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                            <span className=" ">{weekName[day]}</span>
                                        </div>
                                        {hotelDateInModal ?
                                            <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                                <Calendar onChange={onChange} />
                                            </div> : ""}
                                    </div>
                                    <div onClick={handleDateOutModal} className=" relative px-3 py-0 mb-2 rounded-lg borderGray lightWhite">
                                        <span className=" text-blue-600 text-xs">CHECK-OUT</span>
                                        <div className="">
                                            <span className=" font-extrabold text-sm">{dateOut}</span>
                                            <span className=" font-semibold">{monthNames[monthOut]}'{yearOut}, </span>
                                            <span className="">{weekName[dayOut]}</span>
                                        </div>
                                        {hotelDateOutModal ?
                                            <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-7 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                                <Calendar onChange={onChangeOut} />
                                            </div> : ""}
                                    </div>
                                    <div className=" px-3 py-0 mb-2 rounded-lg borderGray lightWhite">
                                        <span className=" text-blue-600 text-xs">ROOMS_&_GUESTS</span>
                                        <div className=" ">
                                            <span className=" font-extrabold text-sm">{roomAndGuest.room}</span>
                                            <span className=" font-semibold">Room, </span>
                                            <span className=" font-extrabold text-sm">{roomAndGuest.guest}</span>
                                            <span className=" font-semibold">Adults</span>
                                        </div>
                                    </div>

                                </div>
                                <button onClick={() => { navigate(`/hotels/${hotelLocation}`) }} className=" px-10 py-2 w-full text-lg my-1 h-fit font-bold text-white blueSearch rounded-lg">SEARCH</button>
                            </div>
                        </div> :
                        <>
                            <div className=" bg-white px-2 py-2">
                                <div className="flex justify-between alignCenter bg-gray-100 rounded-md borderGray py-2 pl-2">
                                    <div>
                                        <h1 className="flex">
                                            {hotelName?.map((val) => {
                                                return (
                                                    <>
                                                        {val?.name === hotelLocation ?
                                                            <div key={val._id} className="">
                                                                <h1 className=" font-bold text-base">{val?.name}</h1>
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
                                    <div className="p-2" onClick={(e) => { e.stopPropagation(); setEditHotel(true); console.log("hello"); }}>
                                        <img className=" w-3 ml-1" src="/img/editIcon.png" alt="" />
                                        <h2 className=" text-xs text-blue-600">Edit</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <div id="showBookingBar" className=" text-left">
                                    <div className="  gap-2 rounded-lg cursor-pointer ">
                                        <div onClick={handleHotel} className=" relative rounded-lg borderRight lightWhite ">
                                            <span className="flex flex-row gap-1 alignCenter text-xs text-blue-600"><img id="fromArrow" className=" w-0 h-0 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </>}
                    <div id="sortBox" className="flex alignCenter z-10 pl-4 mb-4 top-0 py-3 grayBlurShadow bg-white">
                        <div onClick={() => { mobileFilterHandle("open"); }}><img className=" w-8" src="/img/filterIcon.png" alt="" /></div>
                        <div className="grid sortByBox  text-xs">
                            <h1 className=" py-3">SORT BY:</h1>
                            <p className="flex alignCenter justify-center"><span id="mostPrice" onClick={() => { selectSortBy("mostPrice", -1) }} className=" py-3 cursor-pointer">Price <span>(Highest First)</span></span></p>
                            <p className="flex alignCenter justify-center"><span id="lowPrice" onClick={() => { selectSortBy("lowPrice", 1) }} className=" py-3 cursor-pointer">Price <span>(Lowest First)</span></span></p>
                        </div>
                    </div>
                    {scrollUp? <div onClick={()=>{window.scrollTo(0, 0);}} className="fixed w-full top-20"><p className="flex alignCenter blueText w-fit m-auto px-3 py-1 rounded-lg font-bold bg-white grayBlurShadow">Scroll Top <img className="arrowUp h-2 ml-1" src="/img/blueDownArrow.png" alt="" /></p></div>:""}
                    <main className="  gap-2 allCardMainBox">
                        {/* filter */}
                        { }
                        <div onClick={() => { mobileFilterHandle("close"); }} id="mobFilter" className="fixed z-20 top-0 w-full fullHeightInVh lowOpacityGrayBack mobileFilterClose ">
                            <aside onClick={(e) => { e.stopPropagation(); }} className=" bg-white fullHeightInVh w-3/4 px-5 py-6 filterBox">
                                <h1 className="  text-right " > <span className="grayBlurShadow px-2 py-1 rounded-md" onClick={() => { mobileFilterHandle("close"); }}>Close</span></h1>
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
                                    <div className="flex alignCenter justify-start">
                                        <input id="minBudget" className="w-20 pl-1 mr-3 h-10 rounded-md borderGray" type="number" placeholder="min" />
                                        <span>to</span>
                                        <input id="maxBudget" className="w-20 pl-1 ml-3 h-10 rounded-md borderGray" type="number" placeholder="max" />
                                        <button id="budgetBtn" onClick={budgetHandle} className=" h-10 ml-3 px-2 rounded-md blueBack"><img className=" w-6" src="/img/rightArrow.png" alt="" /></button>
                                    </div>
                                </div>
                            </aside>
                        </div>
                        {/* hotel cards div */}
                        <div className="flex flex-col gap-3">
                            {!cardLoading ?
                                listOfHotels?.map((val) => {
                                    return (
                                        // hotel cards
                                        <>
                                            <div key={val?._id} id={val?._id} onClick={() => { navigate(`/hotels/hotel-details/${val?._id}`) }} className=" cursor-pointer overflow-hidden rounded-md borderGray grayBlurShadow hotelCard">
                                                <div className="  ">
                                                    <div>
                                                        <LazyLoadImage className="hotelCardImgMob rounded-md" src={val?.images[0]} placeholderSrc="/img/mmtLoading.gif" />
                                                    </div>
                                                    <div className="flex justify-between">
                                                        {/* card left side */}
                                                        <div className=" p-3 ">
                                                            <div >
                                                                <div className="text-left" >{val?.rating >= 4.5 ?
                                                                    <span className="ratingColor font-bold"><span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span> Excellent</span> :
                                                                    val?.rating >= 3.5 ?
                                                                        <span className="ratingColor font-bold"><span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>Very Good</span> :
                                                                        val?.rating >= 2.5 ?
                                                                            <span className="ratingColor font-bold"><span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>Good</span> :
                                                                            <span className="ratingColor font-bold"><span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>Average</span>
                                                                }</div>
                                                                <h2 className="flex alignCenter text-left"><span className=" font-bold text-2xl">{val?.name}</span></h2>
                                                                <p className=" text-left blueText font-semibold mb-2">{val?.location}</p>
                                                                <ul className="flex gap-2 flex-wrap">
                                                                    {val?.amenities?.map((amenity, idx) => {
                                                                        return <li className="borderblack rounded text-gray-500 text-xs font-semibold p-1">{amenity}</li>;
                                                                    })}
                                                                </ul>
                                                                <p className=" mt-3 text-left font-semibold text-yellow-800">{val?.rooms.length} rooms available</p>
                                                            </div>
                                                        </div>
                                                        {/* card right side */}
                                                        <div className="flex flex-col justify-end p-3 pb-7 text-right">
                                                            <h2 className=" lineHeight"><span className=" font-bold text-2xl">₹{Math.floor(val?.avgCostPerNight)}</span><br /><span className=" text-gray-400 text-sm">+ ₹{val?.childAndExtraBedPolicy.extraBedCharge} taxes & fees</span><br /><span className=" text-gray-400 text-sm">For per bed chargees</span></h2>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className=" bg-green-200 px-3 py-2 mx-5 mb-2 rounded-full text-left text-xs font-semibold text-green-900"><p>Exclusive discount of INR 1000 applied on your 1st Hotel booking.</p></div>
                                            </div>
                                        </>
                                    )
                                }) : <img className=' m-auto w-20 ' src="/img/mmtLoading.gif" alt="" />}
                        </div>
                    </main>
                </div>
            </MobileView>
        </>
    );
}

export default ShowAllHotels;