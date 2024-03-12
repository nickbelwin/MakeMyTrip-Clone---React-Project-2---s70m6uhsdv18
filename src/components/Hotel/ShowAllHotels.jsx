
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

function ShowAllHotels(props) {
    const { city } = useParams();
    const [selectedNav, setSelectedNav] = useState("HOTELS");
    const { setCurrentTravelOption } = useContext(AppContext);
    const navigate = useNavigate();
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, } = useContext(AppContext);
    const [rooms, setRooms] = useState({ room: 1, guest: 2 });
    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [listOfHotels, setListOfHotels] = useState([]);
    const [filterFields, setFilterFields] = useState(false);
    const [prevCheckbox, setPrevCheckbox] = useState("");
    const [sortByPrice, setSortByPrice] = useState("");
    const [prevSortByPrice, setPrevSortByPrice] = useState("");
    const [loading, setLoading] = useState(false);
    const [cardLoading, setCardLoading] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    const handleHotel = (e) => {
        e.stopPropagation();
        setSourceModal(true);
        setIsModalOpen(true);
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
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
    const isSticky = (e) => {
        const header = document.getElementById('showBookingBar');
        const sorting= document.getElementById("sortBox");
        const scrollTop = window.scrollY;
        scrollTop >= 60 ? header?.classList.add('sticky') : header.classList.remove('sticky');
        scrollTop >= 60 ? sorting?.classList.add('sortSticky') : sorting.classList.remove('sortSticky');
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
        console.log(hotelArray);
        let date = new Date();
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
        setSelectedNav("HOTELS");
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
        else{
            getSearchedHotel();
        }
    }
    const sortHotelsHandle=()=>{
        setCardLoading(true);
        if(sortByPrice===1){
            let sorting= listOfHotels.sort((a,b)=>{
                return Math.floor(a?.avgCostPerNight)- Math.floor(b?.avgCostPerNight);
            });
            setListOfHotels(sorting);
        }
        else if(sortByPrice===-1){
            let sorting= listOfHotels.sort((a,b)=>{
                return Math.floor(b?.avgCostPerNight) - Math.floor(a?.avgCostPerNight);
            });
            setListOfHotels(sorting);
        }
        setCardLoading(false);
    }
    useEffect(()=>{
        sortHotelsHandle();
    },[sortByPrice]);
    const selectSortBy = (id,val) => {
        console.log(id);
        document.getElementById("mostPrice").style.color = "black";
        document.getElementById("mostPrice").style.borderBottom = "none";
        document.getElementById("lowPrice").style.color = "black";
        document.getElementById("lowPrice").style.borderBottom = "none";
        if(prevSortByPrice === val){
            getSearchedHotel();
            setPrevSortByPrice("");
        }
        else{
            setCardLoading(true);
            document.getElementById(id).style.color = "#008CFF";
            document.getElementById(id).style.borderBottom = "2px solid #008CFF";
            setSortByPrice(val);
            setPrevSortByPrice(val);
        }
    }
    return (
        <div onClick={() => { setIsModalOpen(false); }}>
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
            <div className="gradientBackgroundBlue">
                <div id="showBookingBar" className=" flex justify-center gap-9  pt-2 pb-2 px-6 text-left">
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
                        <div className=" px-3 py-0 rounded-lg borderRight lightWhite">
                            <span className=" text-blue-600 text-xs">CHECK-IN</span>
                            <div className="text-white">
                                <span className=" font-extrabold text-sm">{date + 1}</span>
                                <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                <span className=" ">{weekName[day - 1]}</span>
                            </div>
                        </div>
                        <div className=" px-3 py-0 rounded-lg borderRight lightWhite">
                            <span className=" text-blue-600 text-xs">CHECK-OUT</span>
                            <div className="text-white">
                                <span className=" font-extrabold text-sm">{date + 1}</span>
                                <span className=" font-semibold">{monthNames[month]}'{year}, </span>
                                <span className="">{weekName[day - 1]}</span>
                            </div>
                        </div>
                        <div className=" px-3 py-0 rounded-lg borderRight lightWhite">
                            <span className=" text-blue-600 text-xs">ROOMS & GUESTS</span>
                            <div className=" text-white">
                                <span className=" font-extrabold text-sm">{rooms.room}</span>
                                <span className=" font-semibold">Room, </span>
                                <span className=" font-extrabold text-sm">{rooms.guest}</span>
                                <span className=" font-semibold">Adults</span>
                            </div>
                        </div>

                    </div>
                    <button onClick={() => { navigate(`/hotels/${hotelLocation}`) }} className=" px-10 text-lg my-1 font-bold text-white blueSearch rounded-full">SEARCH</button>
                </div>
            </div>
            <div id="sortBox" className="sortByBoxCover">
                <div  className="flex sortByBox">
                    <h1 className=" py-3">SORT BY:</h1>
                    <p className="flex alignCenter justify-center"><span id="mostPrice" onClick={() => { selectSortBy("mostPrice",-1) }} className=" py-3 cursor-pointer">Price <span>(Highest First)</span></span></p>
                    <p className="flex alignCenter justify-center"><span id="lowPrice" onClick={() => { selectSortBy("lowPrice",1) }} className=" py-3 cursor-pointer">Price <span>(Lowest First)</span></span></p>
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
                            <button id="budgetBtn" onClick={budgetHandle} className=" h-10 px-2 rounded-md blueBack"><img className=" w-6" src="/img/rightArrow.png" alt="" /></button>
                        </div>
                    </div>
                </aside>
                {/* hotel cards div */}
                <div className="flex flex-col gap-3">
                    {!cardLoading? 
                    listOfHotels?.map((val) => {
                        return (
                            // hotel cards
                            <div key={val?._id} id={val?._id} onClick={()=>{ navigate(`/hotels/hotel-details/${val?._id}`)}} className="flex justify-between rounded-md borderGray grayBlurShadow">
                                {/* card left side */}
                                <div className="flex gap-4 p-3  hotelCardLeftSide">
                                    <div>
                                        <LazyLoadImage className="hotelCardImg rounded-md" src={val?.images[0]} placeholderSrc="/img/mmtLoading.gif"/>
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
                                <div className="flex flex-col justify-between p-3 text-right leftGrayBorder">
                                    <span>{val?.rating >= 4.5 ?
                                        <span className="ratingColor font-bold">Excellent <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                        val?.rating >= 3.5 ?
                                            <span className="ratingColor font-bold">Very Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                            val?.rating >= 2.5 ?
                                                <span className="ratingColor font-bold"> Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                <span className="ratingColor font-bold">Average <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span>
                                    }</span>
                                    <h2 className=" lineHeight"><span className=" font-bold text-2xl">₹{Math.floor(val?.avgCostPerNight)}</span><br /><span className=" text-gray-400 text-sm">+ ₹{val?.childAndExtraBedPolicy.extraBedCharge} taxes & fees</span><br /><span className=" text-gray-400 text-sm">For per bed chargees</span></h2>
                                    <p className="blueText font-bold">Login to unlock the best deals</p>
                                </div>
                            </div>
                        )
                    }):<img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                </div>
            </main>
        </div>
    );
}

export default ShowAllHotels;