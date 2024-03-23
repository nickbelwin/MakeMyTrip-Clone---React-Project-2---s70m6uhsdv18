import { memo, useContext, useEffect, useState } from "react";
import "./hotel.css";
import { AppContext } from "../ContextAPI/AppContext";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, roomAndGuestArr, weekName } from "../Constant/constant";
import { BrowserView, MobileView } from "react-device-detect";
import TravelOptions from "../TravelOptions/TravelOptions";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { useNavigate } from "react-router";
import Calendar from "react-calendar";

const Hotel = (props) => {
    const { loading, } = props;
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, hotelInDate, setHotelInDate,
        hotelOutDate, setHotelOutDate, roomAndGuest, setRoomAndGuest, } = useContext(AppContext);

    const [sourceModal, setSourceModal] = useState(false);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [hotelDateInModal, setHotelDateInModal] = useState(false);
    const [hotelDateOutModal, setHotelDateOutModal] = useState(false);
    const [roomGuestModal, setRoomGuestModal] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [monthOut, setMonthOut] = useState("");
    const [yearOut, setYearOut] = useState("");
    const [dayOut, setDayOut] = useState("");
    const navigate = useNavigate();

    const onChange = (newDate) => {
        let chek = newDate;
        setHotelInDate(chek);
        setDate(chek.getDate());
        setMonth(chek.getMonth());
        setYear(chek.getFullYear());
        setDay(chek.getDay());
        setIsModalOpen(false);
        setHotelDateInModal(false);
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
        setHotelDateInModal(false);
        setHotelDateOutModal(false);
        setRoomGuestModal(false);
        document.getElementById("fromArrow").style.transform = "rotate(180deg)";
    }
    useEffect(() => {
        if (!isModalOpen) {
            setSourceModal(false);
            setHotelDateInModal(false);
            setHotelDateOutModal(false);
            setRoomGuestModal(false);
            document.getElementById("fromArrow").style.transform = "rotate(0deg)";
        }
    }, [isModalOpen]);
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
    const handleDateModal = (e) => {
        e.stopPropagation();
        setSourceModal(false);
        setHotelDateOutModal(false);
        setRoomGuestModal(false);
        setHotelDateInModal(true);
        setIsModalOpen(true);

    }
    const handleDateOutModal = (e) => {
        e.stopPropagation();
        setHotelDateOutModal(true);
        setSourceModal(false);
        setRoomGuestModal(false);
        setHotelDateInModal(false);
        setIsModalOpen(true);

    }
    const handleRoomGuestModal = (e) => {
        e.stopPropagation();
        setHotelDateOutModal(false);
        setSourceModal(false);
        setHotelDateInModal(false);
        setRoomGuestModal(true);
        setIsModalOpen(true);
    }
    const searchHotelsHandle = () => {
        navigate(`/hotels/${hotelLocation}`);
    }

    return (
        <>
            <BrowserView>
                <section className=" absolute top-20 flex justify-center subNavbarBox">
                    <div className=" relative flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" bg-white  rounded-2xl pt-16 pb-12 px-6 text-left mt-12 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book Domestic and International Property Online.</p>
                            <div className=" grid borderGray rounded-lg w-full cursor-pointer hotelBookingBox">
                                <div onClick={handleHotel} className=" relative px-6 py-3 borderRight  hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800">City, Property Name Or Location <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>

                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className=" mt-2">
                                                            <h1 className=" font-extrabold text-3xl">{val.name}</h1>
                                                            <p className=" text-gray-800">{val.location}</p>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div className=" absolute w-full z-20 left-0 top-10 flightModal" >
                                            <HotelModal />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Check-In</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{date}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800">{weekName[day]}</p>
                                    </p>
                                    {hotelDateInModal ?
                                        <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <Calendar onChange={onChange} />
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateOutModal} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Check-Out</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{dateOut}</span>
                                        <span className=" font-semibold">{monthNames[monthOut]}'{yearOut}</span>
                                        <p className=" text-gray-800">{weekName[dayOut]}</p>
                                    </p>
                                    {hotelDateOutModal ?
                                        <div onClick={() => { setIsModalOpen(false); }} className=" absolute w-full z-20 left-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <Calendar onChange={onChangeOut} />
                                        </div> : ""}
                                </div>
                                <div onClick={handleRoomGuestModal} className=" relative px-6 py-3 borderRight hoverLightBlue">
                                    <span className=" text-gray-800">Rooms & Guestes</span>
                                    <p>
                                        <span className=" font-extrabold text-3xl">{roomAndGuest.room}</span>
                                        <span className=" font-semibold">Room</span>
                                        <span className=" font-extrabold text-3xl">{roomAndGuest.guest}</span>
                                        <span className=" font-semibold">Adults</span>
                                    </p>
                                    {roomGuestModal ?
                                        <div className=" absolute w-full z-20 right-0 top-10 bg-white p-2 grayBlurShadow rounded-lg calenderBox" >
                                            <div className="p-5">
                                                <div className="flex justify-between mb-5">
                                                    <h1 className=" font-bold">Room</h1>
                                                    <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, room: e.target.value }); }} name="" id="">
                                                        {roomAndGuestArr?.map((val, idx) => {
                                                            return idx <= 20 ? <option value={val}>{val}</option> : "";
                                                        })}
                                                    </select>
                                                </div>
                                                <div className="flex justify-between mb-6">
                                                    <h1 className=" font-bold">Guest</h1>
                                                    <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, guest: e.target.value }); }} name="" id="">
                                                        {roomAndGuestArr?.map((val, idx) => {
                                                            return <option value={val}>{val}</option>;
                                                        })}
                                                    </select>
                                                </div>
                                                <p className=" text-xs">Please provide right number of Guests for best options and prices.</p>
                                                <div>
                                                </div>
                                            </div>
                                        </div> : ""
                                    }
                                </div>

                            </div>
                            <button onClick={searchHotelsHandle} className=" absolute px-6 w-1/6 py-1 text-2xl font-bold text-white blueSearch rounded-full">SEARCH</button>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView>
                <section className=" flex justify-center m-auto subNavbarBox">
                    <div className="  flex justify-center subNavbarBoxCover">
                        <TravelOptions />
                        <div className=" w-full  bg-white  rounded-2xl pt-3 pb-12 px-2 text-left mt-20 ">
                            <p className=" w-full mb-2 text-center font-bold text-gray-700">Book Domestic and International Property Online.</p>
                            <div className=" rounded-lg w-full cursor-pointer ">
                                <div onClick={handleHotel} className="  px-3 py-1  borderGray mb-2 hoverLightBlue">
                                    <span className="flex flex-row gap-1 alignCenter text-gray-800 text-xs ">City, Property Name Or Location <img id="fromArrow" className=" w-3 h-2 mt-1 arrowAnime" src="/img/blueDownArrow.png" alt="" /></span>
                                    {!loading ?
                                        hotelName?.map((val) => {
                                            return (
                                                <>
                                                    {val?.name === hotelLocation ?
                                                        <div key={val._id} className=" ">
                                                            <h1 className=" font-extrabold text-base">{val.name}</h1>
                                                            <p className=" text-gray-800 text-xs">{val.location}</p>
                                                        </div> : ""}</>
                                            )
                                        }) : <ShimmerLocation />}
                                    {sourceModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div onClick={(e) => { e.stopPropagation() }}>
                                                <HotelModal />
                                            </div>
                                        </div> : ""}
                                </div>
                                <div onClick={handleDateModal} className=" relative px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Check-In</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{date}</span>
                                        <span className=" font-semibold">{monthNames[month]}'{year}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[day]}</p>
                                        {hotelDateInModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                                <div className='flex justify-end  pt-5 px-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                                <h1 className=" px-2 font-extrabold text-xl">Check-In Date</h1>
                                                <h1 className=" font-medium px-2 mb-2"><span className=" font-extrabold text-xl">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChange} />
                                                </div>
                                            </div> : ""}
                                    </p>
                                </div>
                                <div onClick={handleDateOutModal} className=" relative px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Check-Out</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{dateOut}</span>
                                        <span className=" font-semibold ">{monthNames[monthOut]}'{yearOut}</span>
                                        <p className=" text-gray-800 text-xs">{weekName[dayOut]}</p>
                                        {hotelDateOutModal ?
                                            <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                                <div className='flex justify-end  pt-5 px-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                                <h1 className=" px-2 font-extrabold text-xl">Check-Out Date</h1>
                                                <h1 className=" font-medium px-2 mb-2"><span className=" font-extrabold text-xl">{date}</span> {monthNames[month]} {year}, {weekName[day]}</h1>
                                                <div className="ml-1 mr-2 rounded-md borderGray" onClick={(e) => { e.stopPropagation() }}>
                                                    <Calendar onChange={onChangeOut} />
                                                </div>
                                            </div> : ""}
                                    </p>
                                </div>
                                <div onClick={handleRoomGuestModal} className=" px-3 py-1 borderGray mb-2 hoverLightBlue">
                                    <span className=" text-gray-800 text-xs">Rooms & Guestes</span>
                                    <p>
                                        <span className=" font-extrabold text-xl">{roomAndGuest.room}</span>
                                        <span className=" font-semibold">Room</span>
                                        <span className=" font-extrabold text-xl">{roomAndGuest.guest}</span>
                                        <span className=" font-semibold">Adults</span>
                                    </p>
                                    {roomGuestModal ?
                                        <div onClick={() => { setTimeout(() => { setIsModalOpen(false); }, 10) }} className=" fixed fullHeightInVh w-full z-40 left-0 top-0 bg-white flightModal" >
                                            <div className='flex justify-end  p-5 cursor-pointer bg-white rounded-full '><img className=' w-3' src="/img/cancel.png" alt="" /></div>
                                            <div className=" borderblack rounded-md" onClick={(e) => { e.stopPropagation() }}>
                                                <div className="p-5">
                                                    <div className="flex justify-between mb-5">
                                                        <h1 className=" font-bold">Room</h1>
                                                        
                                                        <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, room: e.target.value }); }} className="w-20 rounded-md py-1 pl-3 borderblack" name="" id="">
                                                            {roomAndGuestArr?.map((val, idx) => {
                                                                return idx <= 20 ? <option value={val}>{val}</option> : "";
                                                            })}
                                                        </select>

                                                    </div>
                                                    <div className="flex justify-between mb-6">
                                                        <h1 className=" font-bold">Guest</h1>
                                                        <select onChange={(e) => { setRoomAndGuest({ ...roomAndGuest, guest: e.target.value }); }} className="w-20 rounded-md py-1 pl-3 borderblack" name="" id="">
                                                            {roomAndGuestArr?.map((val, idx) => {
                                                                return <option value={val}>{val}</option>;
                                                            })}
                                                        </select>
                                                    </div>
                                                    <p className=" text-xs">Please provide right number of Guests for best options and prices.</p>
                                                    <div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> : ""
                                    }
                                </div>
                            </div>
                            <button onClick={searchHotelsHandle} className=" w-full px-6 py-2 mt-4 text-lg font-bold text-white blueSearch rounded-lg">SEARCH</button>
                        </div>
                    </div>
                </section>
            </MobileView>
        </>
    )
}

export default memo(Hotel);