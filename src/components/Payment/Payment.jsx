import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../ContextAPI/AppContext';
import { flightCodeArray, getAirportName, getFLightTicket, getHotelDetails, monthNames, trainTickets, weekName } from '../Constant/constant';
import "./payment.css";
import { useNavigate, useParams } from 'react-router';
import HeaderWhite from '../Header/HeaderWhite';
import { BrowserRouter } from 'react-router-dom';
import { BrowserView, MobileView } from 'react-device-detect';

function Payment(props) {
    const { option, fareId, roomId } = useParams();
    console.log(option, fareId, roomId, hotelRoomId);
    const navigate = useNavigate();
    const { token, currentTravelOption, setCurrentTravelOption, hotelLocation, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, source, setSource, flightArray, setFlightArray,
        destination, setDestination, flightdate, setFlightDate, hotelInDate, setHotelInDate,
        hotelOutDate, setHotelOutDate, bookingStatus, setBookingStatus, hotelRoomId, setHotelRoomId, paymentOption, setPaymentOption } = useContext(AppContext);
    const [fare, setFare] = useState([]);
    const [bookingDetails, setBookingDetails] = useState([]);
    const [ticketType, setTicketType] = useState("");
    const [payErrorMsg, setPayErrorMsg] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    const [dateOut, setDateOut] = useState("");
    const [monthOut, setMonthOut] = useState("");
    const [yearOut, setYearOut] = useState("");
    const [dayOut, setDayOut] = useState("");
    const getTicket = async () => {
        console.log("1");
        try {
            if ("FLIGHTS" === option) {
                let res = await getFLightTicket(fareId);
                setFare(res);
                console.log(res);
            }
            else if ("HOTELS" === option) {
                let res = await getHotelDetails(fareId);
                setFare(res);
            }
            else if ("RAILS" === option) {
                let getTicket = trainTickets?.filter((val) => {
                    return val._id == fareId;
                });
                console.log(getTicket[0]);
                setFare(getTicket[0]);
            }
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getTicket();
        (
            async () => {
                let res = await getAirportName();
                console.log(res);
                setFlightArray(res);
            }
        )();
        if (option === "HOTELS") {
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
        }
        else if (option === "FLIGHTS") {
            let date = flightdate;
            setDate(date.getDate());
            setMonth(date.getMonth());
            setYear(date.getFullYear());
            setDay(date.getDay());
        }
        else if (option === "RAILS") {
            let date = flightdate;
            setDate(date.getDate());
            setMonth(date.getMonth());
            setYear(date.getFullYear());
            setDay(date.getDay());
        }
    }, []);
    const bookRoomHandle = async () => {
        setBookingStatus(false);
        try {
            if (paymentOption) {
                let res = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/booking",
                    {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}`, 'projectID': 'ywhyenbsclpi', "Content-Type": "application/json", },
                        body: JSON.stringify(
                            {
                                "bookingType": "hotel",
                                "bookingDetails": {
                                    "hotelId": fareId,
                                    "startDate": hotelInDate,
                                    "endDate": hotelOutDate
                                }
                            })
                    });
                let jsonRes = await res.json();
                if (jsonRes.status === "success") {
                    setBookingDetails(jsonRes);
                    setBookingStatus(true);
                }
                else {
                    setBookingStatus(false);
                }
            }
            else {
                setPayErrorMsg(true);
                document.getElementById("allPayOption").classList.add("payRedBorder");
                window.scroll(0, 0);
            }
            console.log("json:", jsonRes);
        } catch (err) {
            console.log(err);
        }
    }
    const bookFlightHandle = async () => {
        setBookingStatus(false);
        try {
            if (paymentOption) {
                let res = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/booking",
                    {
                        method: "POST",
                        headers: { Authorization: `Bearer ${token}`, 'projectID': 'ywhyenbsclpi', "Content-Type": "application/json", },
                        body: JSON.stringify(
                            {
                                "bookingType": "flight",
                                "bookingDetails": {
                                    "flightId": fareId,
                                    "startDate": flightdate,
                                    "endDate": flightdate
                                }
                            })
                    });
                let jsonRes = await res.json();
                if (jsonRes.status === "success") {
                    setBookingDetails(jsonRes);
                    setBookingStatus(true);
                }
                else {
                    alert(jsonRes.message);
                    setBookingStatus(false);
                }
            }
            else {
                setPayErrorMsg(true);
                document.getElementById("allPayOption").classList.add("payRedBorder");
                window.scroll(0, 0);
            }
            console.log("json:", jsonRes);
        } catch (err) {
            console.log(err);
        }
    }
    const bookTrainHandle = () => {
        if (paymentOption) {
            setBookingStatus(true);
        }
        else {
            setPayErrorMsg(true);
            document.getElementById("allPayOption").classList.add("payRedBorder");
            window.scroll(0, 0);
        }
    }
    console.log(bookingDetails);
    const paymentMode = (payId) => {
        setPayErrorMsg(false);
        document.getElementById("allPayOption").classList.remove("payRedBorder");
        const payArr = ["upi", "credit", "payLater", "netBanking", "giftCard", "emi", "googlePay"];
        payArr?.forEach((val) => {
            document.getElementById(val).classList.remove("paymentBoxOption");
        });
        document.getElementById(payId).classList.add("paymentBoxOption");
        setPaymentOption(payId);
    }
    return (
        <>
            <BrowserView>
                <div>
                    {!bookingStatus ?
                        <section className='paymentBox bg-gray-50'>
                            <div className=' relative pt-5  pb-36 gradientBackgroundBlue'>
                                <div className='flex justify-between alignCenter payWidth m-auto'>
                                    <div className='flex alignCenter gap-5'>
                                        <img className=' w-32' src="/img/mmtBlueLogo.png" alt="" />
                                        <h1 className=' text-white font-medium mb-2 w-3/4 m-auto text-lg text-left'>Hey, <span className=' greenText'>You are viewing this booking at the best price</span></h1>
                                    </div>
                                    <h2 className='text-white text-sm font-semibold'>SAFE & SECURE</h2>
                                </div>
                                <div className=' absolute  top-20 w-full z-10 '>
                                    <div className=' payWidth m-auto mb-5'>
                                        <div className=' bg-white rounded-2xl overflow-hidden blueBorder'>
                                            <div className=' w-fit text-xs px-3 bg-blue-800 text-white font-semibold'>Trip Secure</div>
                                            <div className='flex alignCenter gap-3 p-4'>
                                                <div>
                                                    <img className=' w-20' src="/img/Travel_insurance.webp" alt="" />
                                                </div>
                                                <div>
                                                    <img className=' w-14' src="/img/icici_assurance.avif" alt="" />
                                                    <p className=' text-left text-sm'>All inclusive cover with benefits upto Rs.1,00,000 for hospitalization expenses, Rs.3,000 for trip cancellation/interruption, including assistance for baggage delay/ loss, and more.</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='grid payWidth m-auto rounded-lg bg-white grayBlurShadow payFareBox'>
                                        <div className=' text-left'>
                                            <div className='p-4 bg-blue-50 borderBottomGray'>
                                                <h1 className=' text-xl font-bold '>Payment options</h1>
                                                {payErrorMsg ? <h3 className=' text-red-600 font-bold'>Payment Option is Not selected !!!</h3> : ""}
                                            </div>
                                            <ul id='allPayOption'>
                                                <li id='upi' onClick={() => { paymentMode("upi") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/upi_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>UPI Option</h1>
                                                        <p className=' font-medium text-sm'>Pay Directly From Your Bank Account</p>
                                                        <h2 className=' greenText font-medium'>Flat additional discount of Rs.25</h2>
                                                    </div>
                                                </li>
                                                <li id='credit' onClick={() => { paymentMode("credit") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/card_paymode.avif" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Credit/Debit/ATM Card</h1>
                                                        <p className=' font-medium text-sm'>Visa,MasterCard,Amex,Rupay And More</p>
                                                    </div>
                                                </li>
                                                <li id='payLater' onClick={() => { paymentMode("payLater") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/tripmoney_compact_logo.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Book Now Pay Later</h1>
                                                        <p className=' font-medium text-sm'>Tripmoney, Lazypay, Simpl, ZestMoney, ICICI, HDFC</p>
                                                    </div>
                                                </li>
                                                <li id='netBanking' onClick={() => { paymentMode("netBanking") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/netbanking_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Net Banking</h1>
                                                        <p className=' font-medium text-sm'>All Major Banks Available</p>
                                                    </div>
                                                </li>
                                                <li id='giftCard' onClick={() => { paymentMode("giftCard") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/wallet_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Gift Cards & e-wallets</h1>
                                                        <p className=' font-medium text-sm'>MMT Gift cards, Mobikwik & More</p>
                                                    </div>
                                                </li>
                                                <li id='emi' onClick={() => { paymentMode("emi") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/emi_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>EMI</h1>
                                                        <p className=' font-medium text-sm'>No Cost EMI available</p>
                                                    </div>
                                                </li>
                                                <li id='googlePay' onClick={() => { paymentMode("googlePay") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img src="/img/gpay.webp" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>GooglePay</h1>
                                                        <p className=' font-medium text-sm'>Pay with Google Pay</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className=' p-7'>
                                            {option === "FLIGHTS" ?
                                                <div className='p-3 '>
                                                    <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                                    <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                        <div className='flex alignCenter'>
                                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                            <h2>Base Fare</h2>
                                                        </div>
                                                        <h2 className='text-gray-500'>₹ {fare?.ticketPrice}</h2>
                                                    </div>
                                                    <div className='flex alignCenter justify-between py-4 borderBottomBlack'>
                                                        <div className='flex alignCenter'>
                                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                            <h2>Taxes and Surcharges</h2>
                                                        </div>
                                                        <h2 className='text-gray-500'>₹ 369</h2>
                                                    </div>
                                                    <div className='flex alignCenter justify-between py-4 '>
                                                        <h2 className=' font-bold'>Total Amount</h2>
                                                        <h2 className=' font-bold '>₹ {fare?.ticketPrice + 369}</h2>
                                                    </div>
                                                    <div className=' text-right'>
                                                        <button onClick={bookFlightHandle} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 payBtn'>Pay Now</button>
                                                    </div>

                                                    <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                                </div> :
                                                option === "HOTELS" ?
                                                    <div className='p-3 '>
                                                        <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                                        {fare.rooms?.map((val) => {
                                                            return (
                                                                val._id === roomId ?
                                                                    <>
                                                                        <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                            <div className='flex alignCenter'>
                                                                                <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                                <h2>Base Fare</h2>
                                                                            </div>
                                                                            <h2 className='text-gray-500'>₹ {val?.costPerNight}</h2>
                                                                        </div>
                                                                        <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                            <div className='flex alignCenter'>
                                                                                <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                                <h2>Discount</h2>
                                                                            </div>
                                                                            <h2 className=' text-green-500'>+₹ 749</h2>
                                                                        </div>
                                                                        <div className='flex alignCenter justify-between py-4 borderBottomBlack'>
                                                                            <div className='flex alignCenter'>
                                                                                <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                                <h2>Taxes and Surcharges</h2>
                                                                            </div>
                                                                            <h2 className=' text-red-500'>-₹ 369</h2>
                                                                        </div>
                                                                        <div className='flex alignCenter justify-between py-4 '>
                                                                            <h2 className=' font-bold'>Total Amount</h2>
                                                                            <h2 className=' font-bold '>₹ {val?.costPerNight - 749 + 369}</h2>
                                                                        </div></> : ""
                                                            );
                                                        })}
                                                        <button onClick={bookRoomHandle} className=' w-full text-center gradientBlueBack rounded-full text-white font-bold py-2'>Pay Now</button>

                                                        <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                                    </div> :
                                                    option === "RAILS" ?
                                                        <div className='p-3 '>
                                                            <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                                            <>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Base fare per adult</h2>
                                                                    </div>
                                                                    <h2 className='text-gray-500'>₹ {roomId - 308 - 58 - 40}</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Catering charge</h2>
                                                                    </div>
                                                                    <h2 className=' text-gray-500'>₹ 308</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Tax</h2>
                                                                    </div>
                                                                    <h2 className=' text-gray-500'>₹ 58</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomBlack'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Reservation charge</h2>
                                                                    </div>
                                                                    <h2 className=' text-gray-500'>₹ 40</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 '>
                                                                    <h2 className=' font-bold'>Total Amount</h2>
                                                                    <h2 className=' font-bold '>₹ {roomId}</h2>
                                                                </div></>
                                                            <button onClick={bookTrainHandle} className=' w-full text-center gradientBlueBack rounded-full text-white font-bold py-2'>Pay Now</button>

                                                            <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                                        </div> : <Bus />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> :
                        option === "HOTELS" ?
                            <><HeaderWhite />
                                <div className='pb-5 pt-6 bookingSuccess'>
                                    <div className=' grayBlurShadow'>
                                        <div className='bookingBlueBack'>
                                            <img className=' w-1/2 m-auto' src="/img/hotelImage.jpg" alt="" />
                                        </div>
                                        <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                                        <div className='grid grid-cols-4 text-left borderDottedBottomGray borderDottedTopGray'>
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

                                            <div className=' p-3 borderLeftGray'>
                                                <h1 className='text-gray-500 text-sm'>Hotel Name</h1>
                                                <h2 className=' text-gray-500 text-xl font-semibold'>{bookingDetails?.booking?.hotel.name}</h2>
                                            </div>
                                            <div className=' p-3 borderBottomGray borderLeftGray'>
                                                <h1 className='text-gray-500 text-sm'>Location</h1>
                                                <h2 className=' text-gray-500 text-xl font-semibold'>{bookingDetails?.booking?.hotel.location}</h2>
                                            </div>
                                        </div>
                                        <div className='p-3 borderBottomGray bg-green-200'>
                                            <h1 className=' font-semibold'>Status:</h1>
                                            <h2 className=' text-green-600 text-lg font-bold'>{bookingDetails?.booking?.status.toUpperCase()}</h2>
                                        </div>
                                    </div>
                                    <div className=' px-3'>
                                        <button onClick={() => { navigate("/"); }} className=' py-3 bg-red-600 text-white font-bold w-1/4 px-10 rounded-lg mt-5'>Back to home</button>
                                    </div>
                                </div></> :
                            option === "FLIGHTS" ?
                                <><HeaderWhite />
                                    <div className='pb-5 pt-6 bookingSuccess '>
                                        <div className='grayBlurShadow'>
                                            <img className=' m-auto' src="/img/flightBanner.avif" alt="" />
                                            <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                                            <div className='grid grid-cols-4 borderDottedBottomGray borderDottedTopGray text-left'>
                                                <div className=' p-4'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{bookingDetails?.booking?.flight.arrivalTime}</h1>
                                                </div>
                                                <div className='p-4 borderLeftGray'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{bookingDetails?.booking?.flight.departureTime}</h1>
                                                </div>
                                                <div className=' p-3 borderLeftGray'>
                                                    <h1 className='text-gray-500 font-semibold'>Source</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{flightCodeArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.source === val.code ? val.city : "";
                                                    })},</h2>
                                                    <h2 className=' text-gray-500 font-semibold'>{flightArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.source === val.iata_code ? val.name : "";
                                                    })}</h2>
                                                </div>
                                                <div className=' p-3 borderBottomGray borderLeftGray'>
                                                    <h1 className='text-gray-500 font-semibold'>Destination</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{flightCodeArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.destination === val.code ? val.city : "";
                                                    })},</h2>
                                                    <h2 className=' text-gray-500 font-semibold'>{flightArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.destination === val.iata_code ? val.name : "";
                                                    })}</h2>
                                                </div>
                                            </div>
                                            <div className='p-3 borderBottomGray bg-green-200'>
                                                <h1 className=' font-semibold'>Status:</h1>
                                                <h2 className=' text-green-600 text-lg font-bold'>{bookingDetails?.booking?.status}</h2>
                                            </div>
                                        </div>
                                        <div className=' px-3'>
                                            <button onClick={() => { navigate("/") }} className=' py-3 bg-red-600 text-white font-bold w-1/4 px-10 rounded-lg mt-3'>Back to home</button>
                                        </div>
                                    </div></> :
                                <><HeaderWhite />
                                    <div className='pb-5 pt-6 bookingSuccess '>
                                        <div className='grayBlurShadow'>
                                            <img className=' m-auto ' src="/img/trainBanner.avif" alt="" />
                                            <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                                            <div className='grid grid-cols-4 borderDottedBottomGray borderDottedTopGray text-left'>
                                                <div className=' p-4'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{fare?.arrivalTime}</h1>
                                                </div>
                                                <div className='p-4 borderLeftGray'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{fare?.departureTime}</h1>
                                                </div>
                                                <div className=' p-3 borderLeftGray'>
                                                    <h1 className='text-gray-500 ftext-sm'>Source</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{source}</h2>

                                                </div>
                                                <div className=' p-3 borderBottomGray borderLeftGray'>
                                                    <h1 className='text-gray-500 text-sm'>Destination</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{destination}</h2>

                                                </div>
                                            </div>
                                            <div className='p-3 borderBottomGray bg-green-200'>
                                                <h1 className=' font-semibold'>Status:</h1>
                                                <h2 className=' text-green-600 text-lg font-bold'>CONFIRMED</h2>
                                            </div>
                                        </div>
                                        <div className=' px-3'>
                                            <button onClick={() => { navigate("/") }} className=' py-3 bg-red-600 text-white font-bold w-1/4 px-10 rounded-lg mt-3'>Back to home</button>
                                        </div>
                                    </div></>}
                </div>
            </BrowserView>
            <MobileView>
                <div>
                    {!bookingStatus ?
                        <section className=' relative bg-gray-50 mb-14'>
                            <div className='  pt-5 pb-3 '>
                                <div className='  w-full z-10 '>
                                    <div className=' bg-white rounded-2xl overflow-hidden mx-4 mb-5 blueBorder'>
                                        <div className=' w-fit text-xs px-3 bg-blue-800 text-white font-semibold'>Trip Secure</div>
                                        <div className='flex alignCenter px-4 py-1'>
                                            <p className=' text-left text-xs'>All inclusive cover with benefits upto Rs.1,00,000 for hospitalization expenses, Rs.3,000 for trip cancellation/interruption, including assistance for baggage delay/ loss, and more.</p>
                                            <img className=' w-28' src="/img/Travel_insurance.webp" alt="" />
                                        </div>
                                        <img className=' px-4 pb-2 w-24' src="/img/icici_assurance.avif" alt="" />
                                    </div>
                                    <div className=' rounded-lg bg-white grayBlurShadow'>
                                        <div className=' text-left'>
                                            <div className='p-4 bg-blue-50 borderBottomGray'>
                                                <h1 className=' text-xl font-bold '>Payment options</h1>
                                                {payErrorMsg ? <h3 className=' text-red-600 font-bold'>Payment Option is Not selected !!!</h3> : ""}
                                            </div>
                                            <ul id='allPayOption'>
                                                <li id='upi' onClick={() => { paymentMode("upi") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/upi_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>UPI Option</h1>
                                                        <p className=' font-medium text-sm'>Pay Directly From Your Bank Account</p>
                                                        <h2 className=' greenText font-medium'>Flat additional discount of Rs.25</h2>
                                                    </div>
                                                </li>
                                                <li id='credit' onClick={() => { paymentMode("credit") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/card_paymode.avif" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Credit/Debit/ATM Card</h1>
                                                        <p className=' font-medium text-sm'>Visa,MasterCard,Amex,Rupay And More</p>
                                                    </div>
                                                </li>
                                                <li id='payLater' onClick={() => { paymentMode("payLater") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/tripmoney_compact_logo.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Book Now Pay Later</h1>
                                                        <p className=' font-medium text-sm'>Tripmoney, Lazypay, Simpl, ZestMoney, ICICI, HDFC</p>
                                                    </div>
                                                </li>
                                                <li id='netBanking' onClick={() => { paymentMode("netBanking") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/netbanking_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Net Banking</h1>
                                                        <p className=' font-medium text-sm'>All Major Banks Available</p>
                                                    </div>
                                                </li>
                                                <li id='giftCard' onClick={() => { paymentMode("giftCard") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/wallet_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>Gift Cards & e-wallets</h1>
                                                        <p className=' font-medium text-sm'>MMT Gift cards, Mobikwik & More</p>
                                                    </div>
                                                </li>
                                                <li id='emi' onClick={() => { paymentMode("emi") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img className=' w-9' src="/img/emi_paymode.png" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>EMI</h1>
                                                        <p className=' font-medium text-sm'>No Cost EMI available</p>
                                                    </div>
                                                </li>
                                                <li id='googlePay' onClick={() => { paymentMode("googlePay") }} className=' flex gap-3 p-4 bg-blue-50 borderBottomGray'>
                                                    <div>
                                                        <img src="/img/gpay.webp" alt="" />
                                                    </div>
                                                    <div>
                                                        <h1 className=' text-lg font-semibold blueText'>GooglePay</h1>
                                                        <p className=' font-medium text-sm'>Pay with Google Pay</p>
                                                    </div>
                                                </li>
                                            </ul>
                                        </div>
                                        <div className=''>
                                            {option === "FLIGHTS" ?
                                                <div className='p-3 '>
                                                    <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                                    <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                        <div className='flex alignCenter'>
                                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                            <h2>Base Fare</h2>
                                                        </div>
                                                        <h2 className='text-gray-500'>₹ {fare?.ticketPrice}</h2>
                                                    </div>
                                                    <div className='flex alignCenter justify-between py-4 borderBottomBlack'>
                                                        <div className='flex alignCenter'>
                                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                            <h2>Taxes and Surcharges</h2>
                                                        </div>
                                                        <h2 className='text-gray-500'>₹ 369</h2>
                                                    </div>
                                                    <div className='flex alignCenter justify-between pt-4 '>
                                                        <h2 className=' font-bold'>Total Amount</h2>
                                                        <h2 className=' font-bold '>₹ {fare?.ticketPrice + 369}</h2>
                                                    </div>
                                                    <div className=' fixed flex justify-between alignCenter bottom-0 left-0 w-full bg-gray-900 p-4 z-20'>
                                                        <h2 className=' font-bold text-white text-3xl'>₹ {fare?.ticketPrice + 369}<span className=' text-xs font-normal ml-1'>DUE</span></h2>
                                                        <button onClick={bookFlightHandle} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 px-4'>Pay Now</button>
                                                    </div>

                                                    <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                                </div> :
                                                option === "HOTELS" ?
                                                    <div className='p-3 '>
                                                        <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                                        {fare.rooms?.map((val) => {
                                                            return (
                                                                val._id === roomId ?
                                                                    <>
                                                                        <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                            <div className='flex alignCenter'>
                                                                                <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                                <h2>Base Fare</h2>
                                                                            </div>
                                                                            <h2 className='text-gray-500'>₹ {val?.costPerNight}</h2>
                                                                        </div>
                                                                        <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                            <div className='flex alignCenter'>
                                                                                <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                                <h2>Discount</h2>
                                                                            </div>
                                                                            <h2 className=' text-green-500'>+₹ 749</h2>
                                                                        </div>
                                                                        <div className='flex alignCenter justify-between py-4 borderBottomBlack'>
                                                                            <div className='flex alignCenter'>
                                                                                <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                                <h2>Taxes and Surcharges</h2>
                                                                            </div>
                                                                            <h2 className=' text-red-500'>-₹ 369</h2>
                                                                        </div>
                                                                        <div className='flex alignCenter justify-between pt-4 '>
                                                                            <h2 className=' font-bold'>Total Amount</h2>
                                                                            <h2 className=' font-bold '>₹ {val?.costPerNight - 749 + 369}</h2>
                                                                        </div>
                                                                        <div className=' fixed flex justify-between alignCenter bottom-0 left-0 w-full bg-gray-900 p-4 z-20'>
                                                                            <h2 className=' font-bold text-white text-3xl'>₹ {val?.costPerNight - 749 + 369}<span className=' text-xs font-normal ml-1'>DUE</span></h2>
                                                                            <button onClick={bookRoomHandle} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 px-4'>Pay Now</button>
                                                                        </div></> : ""
                                                            );
                                                        })}
                                                        <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                                    </div> :
                                                    option === "RAILS" ?
                                                        <div className='p-3 '>
                                                            <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                                            <>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Base fare per adult</h2>
                                                                    </div>
                                                                    <h2 className='text-gray-500'>₹ {roomId - 308 - 58 - 40}</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Catering charge</h2>
                                                                    </div>
                                                                    <h2 className=' text-gray-500'>₹ 308</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Tax</h2>
                                                                    </div>
                                                                    <h2 className=' text-gray-500'>₹ 58</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between py-4 borderBottomBlack'>
                                                                    <div className='flex alignCenter'>
                                                                        <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                                                        <h2>Reservation charge</h2>
                                                                    </div>
                                                                    <h2 className=' text-gray-500'>₹ 40</h2>
                                                                </div>
                                                                <div className='flex alignCenter justify-between pt-4 '>
                                                                    <h2 className=' font-bold'>Total Amount</h2>
                                                                    <h2 className=' font-bold '>₹ {roomId}</h2>
                                                                </div>
                                                                <div className=' fixed flex justify-between alignCenter bottom-0 left-0 w-full bg-gray-900 p-4 z-20'>
                                                                    <h2 className=' font-bold text-white text-3xl'>₹ {roomId}<span className=' text-xs font-normal ml-1'>DUE</span></h2>
                                                                    <button onClick={bookTrainHandle} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 px-4'>Pay Now</button>
                                                                </div></>
                                                            <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                                        </div> : <Bus />
                                            }
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section> :
                        // booking confirmed
                        option === "HOTELS" ?
                            <><HeaderWhite />
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
                                </div></> :
                            option === "FLIGHTS" ?
                                <><HeaderWhite />
                                    <div className='pb-5 '>
                                        <div className='grayBlurShadow'>
                                            <img className=' m-auto' src="/img/flightBanner.avif" alt="" />
                                            <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                                            <div className='grid grid-cols-2 borderDottedBottomGray borderDottedTopGray'>
                                                <div className=' p-4'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{bookingDetails?.booking?.flight.arrivalTime}</h1>
                                                </div>
                                                <div className='p-4 borderLeftGray'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{bookingDetails?.booking?.flight.departureTime}</h1>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className=' p-3 borderBottomGray'>
                                                    <h1 className=' font-semibold'>Source:</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{flightCodeArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.source === val.code ? val.city : "";
                                                    })},</h2>
                                                    <h2 className=' text-gray-500 font-semibold'>{flightArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.source === val.iata_code ? val.name : "";
                                                    })}</h2>
                                                </div>
                                                <div className=' p-3 borderBottomGray '>
                                                    <h1 className=' font-semibold'>Destination:</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{flightCodeArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.destination === val.code ? val.city : "";
                                                    })},</h2>
                                                    <h2 className=' text-gray-500 font-semibold'>{flightArray?.map((val) => {
                                                        return bookingDetails?.booking?.flight?.destination === val.iata_code ? val.name : "";
                                                    })}</h2>
                                                </div>
                                            </div>
                                            <div className='p-3 borderBottomGray bg-green-200'>
                                                <h1 className=' font-semibold'>Status:</h1>
                                                <h2 className=' text-green-600 text-lg font-bold'>{bookingDetails?.booking?.status.toUpperCase()}</h2>
                                            </div>
                                        </div>
                                        <div className=' px-3'>
                                            <button onClick={() => { navigate("/") }} className=' w-full py-3 bg-red-600 text-white font-bold px-10 rounded-lg mt-3'>Back to home</button>
                                        </div>
                                    </div></> :
                                <><HeaderWhite />
                                    <div className='pb-5 '>
                                        <div className='grayBlurShadow'>
                                            <img className=' m-auto' src="/img/trainBanner.avif" alt="" />
                                            <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                                            <div className='grid grid-cols-2 borderDottedBottomGray borderDottedTopGray'>
                                                <div className=' p-4'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{fare?.arrivalTime}</h1>
                                                </div>
                                                <div className='p-4 borderLeftGray'>
                                                    <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                                    <h1 className=' text-gray-600'>{weekName[day]}<span className=' text-xl font-bold text-black'>{date}{monthNames[month]}</span>{year}</h1>
                                                    <h1 className=' font-medium'>{fare?.departureTime}</h1>
                                                </div>
                                            </div>
                                            <div className=''>
                                                <div className=' p-3 borderBottomGray'>
                                                    <h1 className=' font-semibold'>Source:</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{source}</h2>
                                                    
                                                </div>
                                                <div className=' p-3 borderBottomGray '>
                                                    <h1 className=' font-semibold'>Destination:</h1>
                                                    <h2 className=' text-gray-700 font-bold'>{destination},</h2>
                                                    
                                                </div>
                                            </div>
                                            <div className='p-3 borderBottomGray bg-green-200'>
                                                <h1 className=' font-semibold'>Status:</h1>
                                                <h2 className=' text-green-600 text-lg font-bold'>CONFIRMED</h2>
                                            </div>
                                        </div>
                                        <div className=' px-3'>
                                            <button onClick={() => { navigate("/") }} className=' w-full py-3 bg-red-600 text-white font-bold px-10 rounded-lg mt-3'>Back to home</button>
                                        </div>
                                    </div></>}
                </div>
            </MobileView>
        </>
    );
}

export default Payment;