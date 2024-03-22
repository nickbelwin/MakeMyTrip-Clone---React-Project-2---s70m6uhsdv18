import React, { useContext, useEffect, useState } from 'react';
import { getHotelDetails, monthNames, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { Navigate, useNavigate, useParams } from 'react-router';
import { BrowserView, MobileView } from 'react-device-detect';

function HotelReviewPage(props) {
    const { hotelId, roomId } = useParams();
    console.log("room", roomId);
    const { token, setToken, currentTravelOption, setCurrentTravelOption, hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource,
        destination, setDestination, hotelInDate, setHotelInDate,
        hotelOutDate, setHotelOutDate, bookingStatus, setBookingStatus, hotelRoomId, setHotelRoomId,paymentOption, setPaymentOption,roomAndGuest, setRoomAndGuest, } = useContext(AppContext);
    const navigate = useNavigate();
    const [hotelInfo, sethotelInfo] = useState([]);
    const [hotelRooms, setHotelRooms] = useState([]);
    const [loading, setLoading] = useState(false);
    const [bookingDetails, setBookingDetails] = useState([]);


    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [monthOut, setMonthOut] = useState("");
    const [yearOut, setYearOut] = useState("");
    const [dayOut, setDayOut] = useState("");

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

    const bookRoomHandle = async () => {
        navigate(`/payment/HOTELS/${hotelId}/${roomId}`);
        setBookingStatus(false);
        setPaymentOption(false);
    }
    const getHotelData = async () => {
        setLoading(true);
        let res = await getHotelDetails(hotelId);
        sethotelInfo([res]);
        setHotelRooms(res.rooms);
        setLoading(false);
        console.log([res], res.rooms);
    }
    useEffect(() => {
        setHotelRoomId(roomId);
        getHotelData();
    }, []);

    const [userInfo, setUserInfo] = useState({
        title: "Mr",
        firstname: "",
        lastName: "",
        email: "",
        number: "",
    });

    console.log("userInfo", userInfo);
    const UserHandler = (e) => {

    }

    return (
        <>
            <BrowserView>
                {!bookingStatus ?
                    <div className='fullHeightInVh mb-20'>
                        <div className=' relative pt-5 pb-16 gradientBackgroundBlue'>
                            <h1 className=' text-white font-bold mb-2 text-2xl payWidth m-auto text-left'>Review Your Booking</h1>
                            <div className=' absolute  top-16 w-full z-10 '>
                                {hotelInfo?.map((val) => {
                                    return (
                                        <div key={val._id} className='payWidth m-auto reviewBox'>
                                            <div className=' bg-white grayBlurShadow rounded-lg overflow-hidden'>
                                                <div className='flex justify-between p-5'>
                                                    <div className=' text-left '>
                                                        <h1 className=' text-3xl font-bold'>{val.name}</h1>
                                                        <span>{val?.rating >= 4.5 ?
                                                            <span className="ratingColor font-bold">Excellent <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                            val?.rating >= 3.5 ?
                                                                <span className="ratingColor font-bold">Very Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                val?.rating >= 2.5 ?
                                                                    <span className="ratingColor font-bold"> Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                    <span className="ratingColor font-bold">Average <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span>
                                                        }</span>
                                                        <h2 className=' text-gray-500'>{val.location}, India</h2>
                                                    </div>
                                                    <div>
                                                        <img className=' w-20 h-20' src={val?.images[0]} alt="" />
                                                    </div>
                                                </div>
                                                <div className='grid grid-cols-2 gap-1 borderDottedTopGray borderDottedBottomGray'>
                                                    <div className='flex alignCenter justify-between text-left bg-gray-50 p-4'>
                                                        <div>
                                                            <h1 className=' text-gray-400 text-sm'>CHECK IN</h1>
                                                            <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                            <h1 className=' font-medium'>12 AM</h1>
                                                        </div>
                                                        <div className=" bg-white px-2 text-xs text-gray-500 rounded-full borderGray">{dateOut - date <= 0 ? 1 + " NIGHT" : dateOut - date + " NIGHTS"}</div>
                                                        <div>
                                                            <h1 className=' text-gray-400 text-sm'>CHECK OUT</h1>
                                                            <h1 className=' text-gray-600'>{weekName[dayOut]}<span className=' text-xl font-bold text-black'>{dateOut}{monthNames[monthOut]}</span>{yearOut}</h1>
                                                            <h1 className=' font-medium'>12 AM</h1>
                                                        </div>
                                                    </div>
                                                    <div className='flex alignCenter p-4 bg-gray-50'>
                                                        <h1 className=' font-semibold'>{dateOut - date <= 0 ? 1 + " NIGHT" : dateOut - date + " NIGHTS"} | </h1>
                                                        <h1> {roomAndGuest.guest} Adult |</h1>
                                                        <h1>{roomAndGuest.room} Room</h1>
                                                    </div>
                                                </div>
                                                <div>
                                                    {hotelRooms?.map((val) => {
                                                        return (
                                                            <>{val._id === roomId ?
                                                                <div className='grid grid-cols-3 text-left'>
                                                                    <div className='p-4'>
                                                                        <h1 className=' font-bold text-3xl'>{val.roomType}</h1>
                                                                        <h1 className=' text-gray-500'>2 Adults</h1>
                                                                    </div>
                                                                    <div className='p-4 text-gray-500'>
                                                                        <li>Room Only</li>
                                                                        <li>No meals included</li>
                                                                        <p className=' text-red-600'><span className='mr-3'>x</span> Non-Refundable</p>
                                                                    </div>
                                                                    <div className='p-4'>
                                                                        <h1 className=' text-xl font-bold'>Amenities</h1>
                                                                        <div className=' text-gray-500'>
                                                                            {hotelInfo[0]?.amenities?.map((val) => {
                                                                                return <li>{val}</li>;
                                                                            })}
                                                                        </div>
                                                                    </div>
                                                                </div> : ""}</>
                                                        );
                                                    })}
                                                </div>
                                                <div>
                                                    {hotelRooms?.map((val) => {
                                                        return (
                                                            <>{val._id === roomId ?
                                                                <div className=' p-5 borderDottedTopGray borderDottedBottomGray'>
                                                                    <h1 className=' text-left text-2xl font-bold'>Price Breakup</h1>
                                                                    <div className='grid grid-cols-4 text-xl font-semibold alignCenter text-gray-600'>
                                                                        <h1 className=' text-left'>Price: ₹{Math.floor(val?.costPerNight)}</h1>
                                                                        <h1 className=' text-left text-green-500'>Discount: -₹749</h1>
                                                                        <h1 className=' text-left'>Total: {Math.floor(val?.costPerNight - 749)}</h1>
                                                                        <button onClick={bookRoomHandle} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2'>Book Now</button>
                                                                    </div>
                                                                </div> : ""}</>
                                                        )
                                                    })}
                                                </div>
                                                <div className=' bg-red-50 p-5 borderDottedTopBottomRed'>
                                                    <h1 className=' text-yellow-600 text-left pb-3 font-bold text-xl'>Important information</h1>
                                                    <div className='flex flex-col text-gray-700 text-left text-xs'>
                                                        <li>This rate and cancellation policy is only applicable for booking upto 5 rooms. Bookings with more than 5 rooms (By Single or Multiple Bookings) are considered group bookings & the right to admission is reserved by hotel with separate cancellation and deposit policy.</li>
                                                        <li>Guests below 18 years of age are not allowed at the property.</li>
                                                        <li>Passport, Aadhar, Govt. ID and Driving License are accepted as ID proof(s)</li>
                                                        <li>Pets are not allowed.</li>
                                                    </div>
                                                </div>
                                            </div>
                                            <div></div>
                                        </div>
                                    )
                                })}        
                            </div>
                        </div>
                    </div> :
                    <div className='pb-5 bookingSuccess grayBlurShadow'>
                        <div className='bookingBlueBack'>
                            <img className=' w-1/2 m-auto' src="/img/hotelImage.jpg" alt="" />
                        </div>
                        <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                        <div className='grid grid-cols-2 borderDottedBottomGray borderDottedTopGray'>
                            <div className=' p-4'>
                                <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                <h1 className=' font-medium'>12 AM</h1>
                            </div>
                            <div className='p-4 borderLeftGray'>
                                <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                <h1 className=' text-gray-600'>{weekName[dayOut]}<span className=' text-xl font-bold text-black'>{dateOut}{monthNames[monthOut]}</span>{yearOut}</h1>
                                <h1 className=' font-medium'>12 AM</h1>
                            </div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className=' p-3 borderBottomGray'>
                                <h1 className=' font-semibold'>Hotel Name:</h1>
                                <h2 className=' text-gray-500 font-semibold'>{bookingDetails?.booking?.hotel.name}</h2>
                            </div>
                            <div className=' p-3 borderBottomGray borderLeftGray'>
                                <h1 className=' font-semibold'>Location:</h1>
                                <h2 className=' text-gray-500 font-semibold'>{bookingDetails?.booking?.hotel.location}</h2>
                            </div>
                        </div>
                        <div className='p-3 borderBottomGray bg-green-200'>
                            <h1 className=' font-semibold'>Status:</h1>
                            <h2 className=' text-green-600 text-lg font-bold'>{bookingDetails?.booking?.status.toUpperCase()}</h2>
                        </div>
                        <div className=' px-3'>
                            <button onClick={() => { navigate("/"); }} className=' py-3 bg-red-600 text-white font-bold w-full px-10 rounded-lg mt-3'>Back to home</button>
                        </div>
                    </div>}

            </BrowserView>
            <MobileView>
                {!bookingStatus ?
                    <div className=' bg-gray-50'>
                        <div className=' relative pt-2 pb-2 bg-white grayBlurShadow mb-5'>
                            <h1 className=' font-bold mb-2 text-xl pl-5 text-left'>Review Your Booking</h1>
                        </div>
                        <div className='pb-14 '>
                            {hotelInfo?.map((val) => {
                                return (
                                    <div key={val._id} className=' mx-3 blueBorder rounded-lg reviewBox'>
                                        <div className=' bg-white grayBlurShadow rounded-lg overflow-hidden'>
                                            <div className='flex justify-between px-2 py-4'>
                                                <div className=' text-left '>
                                                    <h1 className=' text-3xl font-bold'>{val.name}</h1>
                                                    <span>{val?.rating >= 4.5 ?
                                                        <span className="ratingColor font-bold">Excellent <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                        val?.rating >= 3.5 ?
                                                            <span className="ratingColor font-bold">Very Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                            val?.rating >= 2.5 ?
                                                                <span className="ratingColor font-bold"> Good <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span> :
                                                                <span className="ratingColor font-bold">Average <span className=" rounded-md px-1 ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span></span>
                                                    }</span>
                                                    <h2 className=' text-gray-500'>{val.location}, India</h2>
                                                </div>
                                                <div>
                                                    <img className=' w-24 h-20 rounded-md' src={val?.images[0]} alt="" />
                                                </div>
                                            </div>
                                            <div className=' borderDottedTopGray borderDottedBottomGray'>
                                                <div className='flex alignCenter justify-between text-left py-4 px-2'>
                                                    <div>
                                                        <h1 className=' text-gray-400 text-sm'>CHECK IN</h1>
                                                        <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                        <h1 className=' font-medium'>12 AM</h1>
                                                    </div>
                                                    <div className=" bg-white px-2 text-xs text-gray-500 rounded-full borderGray">{dateOut - date <= 0 ? 1 + " NIGHT" : dateOut - date + " NIGHTS"}</div>
                                                    <div>
                                                        <h1 className=' text-gray-400 text-sm'>CHECK OUT</h1>
                                                        <h1 className=' text-gray-600'>{weekName[dayOut]}<span className=' text-xl font-bold text-black'>{dateOut}{monthNames[monthOut]}</span>{yearOut}</h1>
                                                        <h1 className=' font-medium'>12 AM</h1>
                                                    </div>
                                                </div>
                                                <div className='flex alignCenter justify-center p-4  borderDottedTopGray'>
                                                    <h1 className=' font-semibold'>{dateOut - date <= 0 ? 1 + " NIGHT" : dateOut - date + " NIGHTS"} | </h1>
                                                    <h1> 1 Adult |</h1>
                                                    <h1>1 Room</h1>
                                                </div>
                                            </div>
                                            <div>
                                                {hotelRooms?.map((val) => {
                                                    return (
                                                        <>{val._id === roomId ?
                                                            <div className='grid grid-cols-2 text-left'>
                                                                <div className='py-4 px-2'>
                                                                    <h1 className=' font-bold text-xl'>{val.roomType}</h1>
                                                                    <h1 className=' text-gray-500'>2 Adults</h1>
                                                                </div>
                                                                <div className='py-4 px-2 text-gray-500'>
                                                                    <li>Room Only</li>
                                                                    <li>No meals included</li>
                                                                    <p className=' text-red-600'><span className='mr-3'>x</span> Non-Refundable</p>
                                                                </div>

                                                            </div> : ""}</>
                                                    );
                                                })}
                                            </div>
                                            <div>
                                                {hotelRooms?.map((val) => {
                                                    return (
                                                        <>{val._id === roomId ?
                                                            <div className='py-4 px-4 borderDottedTopGray borderDottedBottomGray'>
                                                                <h1 className=' text-left text-xl font-semibold'>Price Breakup</h1>
                                                                <div className='grid grid-cols-2 text-sm font-semibold alignCenter text-gray-600'>
                                                                    <div>
                                                                        <h1 className=' text-left'>Price: </h1>
                                                                        <h1 className=' text-left text-green-500 borderBottomGray py-2'>Discount: </h1>
                                                                        <h1 className=' text-left pt-2'>Total:</h1>
                                                                    </div>
                                                                    <div>
                                                                        <h1 className=' text-right'>₹{Math.floor(val?.costPerNight)}</h1>
                                                                        <h1 className=' text-right text-green-500 borderBottomGray py-2'>-₹749</h1>
                                                                        <h1 className=' text-right pt-2'>₹{Math.floor(val?.costPerNight - 749)}</h1>
                                                                    </div>
                                                                </div>
                                                            </div> : ""}</>
                                                    )
                                                })}
                                            </div>
                                            <div className=' bg-red-50 p-5 borderDottedTopBottomRed'>
                                                <h1 className=' text-yellow-600 text-left pb-3 font-bold text-xl'>Important information</h1>
                                                <div className='flex flex-col text-gray-700 text-left text-xs'>
                                                    <li>This rate and cancellation policy is only applicable for booking upto 5 rooms. Bookings with more than 5 rooms (By Single or Multiple Bookings) are considered group bookings & the right to admission is reserved by hotel with separate cancellation and deposit policy.</li>
                                                    <li>Guests below 18 years of age are not allowed at the property.</li>
                                                    <li>Passport, Aadhar, Govt. ID and Driving License are accepted as ID proof(s)</li>
                                                    <li>Pets are not allowed.</li>
                                                </div>
                                            </div>
                                        </div>
                                        <div>
                                        </div>
                                    </div>
                                )
                            })}
                            <div className=' mx-3 mt-4'>
                                <button onClick={bookRoomHandle} className=' text-center w-full gradientBlueBack rounded-lg text-lg text-white font-bold py-3'>CONTINUE</button>
                            </div>
                            {/* <div className=' w-3/4 m-auto'>
                <h1 className=' text-left font-bold text-xl mb-5'>Guest Details</h1>
                <div>
                    <div className='flex gap-3 mb-5'>
                        <div className='flex flex-col'>
                            <label htmlFor="title" className=' text-xs text-left mb-1'>TITLE</label>
                            <select className='borderGray rounded-lg p-3' id='titles' onChange={(e) => { setUserInfo({ ...userInfo, title: e.target.value }) }}>
                                <option value="Mr">Mr</option>
                                <option value="Mrs">Mrs</option>
                                <option value="Ms">Ms</option>
                            </select>
                        </div>
                        <div className=' w-2/4'>
                            <h1 className=' text-xs text-left mb-1'>FULL NAME</h1>
                            <div className='grid grid-cols-2'>
                            <input className='borderGray rounded-md p-3 mr-3' type="text" placeholder='First Name' />
                            <input className='borderGray rounded-md p-3' type="text" placeholder='Last Name' />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 w-3/4 gap-3'>
                        <div className='flex flex-col'>
                            <label className=' text-xs text-left' htmlFor="email">EMAIL ADDRESS <span className=' text-gray-400'>(Booking voucher will be sent to this email ID)</span></label>
                            <input className='borderGray rounded-md p-3' type="email" id="email" placeholder='Email ID' />
                        </div>
                        <div className='flex flex-col'>
                            <label className=' text-xs text-left' htmlFor="number">MOBLIE NUMBER</label>
                            <input className='borderGray rounded-md p-3' type="number" id="number" placeholder='Contact Number' />
                        </div>
                    </div>
                </div>
            </div> */}
                        </div>
                    </div> :
                    <div className='mb-5'>
                        <img className='' src="/img/hotelImage.jpg" alt="" />
                        <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                        <div className='grid grid-cols-2 borderDottedBottomGray borderDottedTopGray'>
                            <div className=' p-4'>
                                <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                <h1 className=' font-medium'>12 AM</h1>
                            </div>
                            <div className='p-4 borderLeftGray'>
                                <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                <h1 className=' text-gray-600'>{weekName[dayOut]}<span className=' text-xl font-bold text-black'>{dateOut}{monthNames[monthOut]}</span>{yearOut}</h1>
                                <h1 className=' font-medium'>12 AM</h1>
                            </div>
                        </div>
                        <div className=''>
                            <div className=' p-3 borderBottomGray'>
                                <h1 className=' font-semibold'>Hotel Name:</h1>
                                <h2 className=' text-gray-500 font-semibold'>{bookingDetails?.booking?.hotel.name}</h2>
                            </div>
                            <div className=' p-3 borderBottomGray'>
                                <h1 className=' font-semibold'>Location:</h1>
                                <h2 className=' text-gray-500 font-semibold'>{bookingDetails?.booking?.hotel.location}</h2>
                            </div>
                        </div>
                        <div className='p-3 borderBottomGray bg-green-200'>
                            <h1 className=' font-semibold'>Status:</h1>
                            <h2 className=' text-green-600 text-lg font-bold'>{bookingDetails?.booking?.status.toUpperCase()}</h2>
                        </div>
                        <div className=' px-3'>
                            <button onClick={() => { navigate("/"); }} className=' py-3 bg-red-600 text-white font-bold w-full px-10 rounded-lg mt-3'>Back to home</button>
                        </div>
                    </div>}
            </MobileView></>
    );
}

export default HotelReviewPage;