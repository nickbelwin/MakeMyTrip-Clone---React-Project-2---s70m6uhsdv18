import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { flightCodeArray, getAirportName, getFLightTicket, monthNames, weekName } from '../Constant/constant';
import { AppContext } from '../ContextAPI/AppContext';
import { useNavigate, useParams } from 'react-router';
import { BrowserView, MobileView } from 'react-device-detect';

function FlightBooking(props) {
    const { flightId } = useParams();
    const navigate = useNavigate();
    const { currentTravelOption, setCurrentTravelOption, hotelLocation, isModalOpen, setIsModalOpen, fromOrTo, setFromOrTo, source, setSource, flightArray, setFlightArray,
        destination, setDestination, flightdate, setFlightDate,setBookingStatus,paymentOption, setPaymentOption } = useContext(AppContext);
    const [flightTicket, setFlightTicket] = useState([]);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");

    useEffect(() => {
        setCurrentTravelOption("FLIGHTS")
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    const getTicket = async () => {
        try {
            let res = await getFLightTicket(flightId);
            setFlightTicket(res);
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }
    console.log(flightTicket?.source);
    useEffect(() => {
        getTicket();
        (
            async () => {
                let res = await getAirportName();
                console.log(res);
                setFlightArray(res);
            }
        )();
    }, []);
    return (
        <>
            <BrowserView>
                <section className='fullHeightInVh bg-blue-50 mb-20'>
                    <div className=' relative pt-5 pb-16 gradientBackgroundBlue'>
                        <h1 className=' text-white font-bold mb-2 text-2xl payWidth m-auto text-left'>Complete Your Booking</h1>
                        <div className=' absolute  top-16 w-full z-10 '>
                            <div className='grid gap-5 bg-white payWidth m-auto p-5 flightBookingBox'>
                                <div className='grayBlurShadow p-3'>
                                    <div className='flex alignCenter '>
                                        <h1>{flightCodeArray?.map((val) => {
                                            return flightTicket?.source === val.code ? val.city : "";
                                        })
                                        }</h1>
                                        <img className='w-4' src="/img/blueRightArrow.png" alt="" />
                                        <h1>{flightCodeArray?.map((val) => {
                                            return flightTicket?.destination === val.code ? val.city : "";
                                        })
                                        }</h1>
                                    </div>
                                    <div className='flex alignCenter pb-4 '>
                                        <h1 className=' bg-red-50 px-2 font-semibold'>{weekName[day]}, {monthNames[month]} {date}</h1>
                                        <h1 className=" ml-2 text-sm">{flightTicket?.stops != 0 ? flightTicket?.stops + " stop" : "Non stop"}</h1>
                                        <span className='mx-1'>-</span>
                                        <h1 className="text-sm ">0{flightTicket?.duration}h 00m</h1>
                                    </div>
                                    <div className="flex text-left  pb-3">
                                        <img className=" w-8 h-8 mr-1" src="/img/flightLogo.jpg" alt="" />
                                        <h1 className=" font-bold text-xl">IndiGo <span className=" flightIdText text-gray-400 borderGray rounded-full px-1">{flightTicket?.flightID}</span></h1>
                                    </div>
                                    <div className='mt-3 p-4 grayBack'>
                                        <div className='flex alignCenter text-sm'>
                                            <h1 className=' font-bold'>{flightTicket?.arrivalTime}</h1>
                                            <div className='w-3 h-3 rounded-full borderblack mt-1 mx-4'></div>
                                            <h1 className=' font-bold'>{flightCodeArray?.map((val) => {
                                                return flightTicket?.source === val.code ? val.city : "";
                                            })},</h1>
                                            <h1>{flightArray?.map((val) => {
                                                return flightTicket?.source === val.iata_code ? val.name : "";
                                            })}, Terminal 3</h1>
                                        </div>
                                        <div><h1 className="text-sm text-gray-500 font-semibold py-2 ">0{flightTicket?.duration}h 00m</h1></div>
                                        <div className='flex alignCenter text-sm pb-4 borderBottomGray'>
                                            <h1 className=' font-bold'>{flightTicket?.departureTime}</h1>
                                            <div className='w-3 h-3 rounded-full borderblack mt-1 mx-4'></div>
                                            <h1 className=' font-bold'>{flightCodeArray?.map((val) => {
                                                return flightTicket?.destination === val.code ? val.city : "";
                                            })},</h1>
                                            <h1>{flightArray?.map((val) => {
                                                return flightTicket?.destination === val.iata_code ? val.name : "";
                                            })}, Terminal 2</h1>
                                        </div>
                                        <div className='flex alignCenter py-3 text-sm'>
                                            <img className=' w-6 yellowback' src="/img/cabinBag.png" alt="" />
                                            <h1 className=' font-semibold ml-2'>Cabin Baggage: <span className=' font-normal'>8Kgs / Adult</span></h1>
                                            <img className='w-4 ml-4' src="/img/checkInBag.png" alt="" />
                                            <h1 className=' font-semibold ml-2'>Check-In Baggage: <span className=' font-normal'>25 Kgs / Adult</span></h1>
                                        </div>
                                    </div>
                                </div>
                                <div className='p-3 grayBlurShadow'>
                                    <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                    <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                        <div className='flex alignCenter'>
                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                            <h2>Base Fare</h2>
                                        </div>
                                        <h2 className='text-gray-500'>₹ {flightTicket?.ticketPrice+888}</h2>
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
                                        <h2 className=' font-bold '>₹ {flightTicket?.ticketPrice + 369+888}</h2>
                                    </div>
                                    <div className=' text-right'>
                                        <button onClick={() => { setBookingStatus(false); setPaymentOption(false); navigate(`/payment/FLIGHTS/${flightId}/""`) }} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 payBtn'>Book Now</button>
                                    </div>
                                    <img className=' w-1/2 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </BrowserView>
            <MobileView className='gradientBackgroundBlue'>
                <section className='pb-6'>
                    <div className=' relative pt-5 pb-16 '>
                        <img className=' mb-5 m-auto w-20' src="/img/mmt_logo_rt.png" alt="" />
                        <h3 className=' text-white text-xs'>Trip to</h3>
                        <h1 className=' text-white mb-5 font-bold m-auto text-3xl'>{flightCodeArray?.map((val) => {
                            return flightTicket?.destination === val.code ? val.city : "";
                        })
                        }</h1>
                        <div className="flex alignCenter text-left text-white px-5">
                            <img className=" w-5 h-5 mr-1 mb-1" src="/img/flightLogo.jpg" alt="" />
                            <h1 className=" font-bold text-xl">IndiGo|<span className=" flightIdText">{flightTicket?.flightID}</span></h1>
                        </div>
                        {/* ---------------------------------- */}
                        <div className=' w-full text-white z-10 '>
                            <div className='  m-auto flightBookingBox'>
                                <div className=''>
                                    <div className=' grid grid-cols-3 mt-3 px-5'>
                                        <div className='  text-left'>
                                            <h1 className='text-2xl font-bold'>{flightTicket?.departureTime}</h1>
                                            <h3 className=' text-xs mb-3'>{weekName[day]},{date}{monthNames[month]}{year}</h3>
                                            <h1 className='text-sm font-bold'>{flightCodeArray?.map((val) => {
                                                return flightTicket?.source === val.code ? val.city : "";
                                            })} ,</h1>
                                            <h1 className=' text-sm'>{flightArray?.map((val) => {
                                                return flightTicket?.source === val.iata_code ? val.name : "";
                                            })}</h1>
                                        </div>
                                        <div>
                                            <h1 className="text-sm font-semibold mb-1">0{flightTicket?.duration}h 00m</h1>
                                            <img className=' m-auto w-10' src="/img/stop_info_icon.png" alt="" />
                                        </div>
                                        <div className=' text-right'>
                                            <h1 className='text-2xl font-bold'>{flightTicket?.arrivalTime}</h1>
                                            <h3 className=' text-xs mb-3'>{weekName[day]},{date}{monthNames[month]}{year}</h3>
                                            <h1 className=' text-sm font-bold'>{flightCodeArray?.map((val) => {
                                                return flightTicket?.destination === val.code ? val.city : "";
                                            })} ,</h1>
                                            <h1 className=' text-sm'>{flightArray?.map((val) => {
                                                return flightTicket?.destination === val.iata_code ? val.name : "";
                                            })}</h1>
                                        </div>
                                    </div>
                                    <div className=' bg-white text-black p-3 mx-3 rounded-lg mt-6 text-sm'>
                                        <div className='flex alignCenter justify-between mb-3'>
                                            <div className='flex alignCenter'>
                                                <img className=' w-6 ' src="/img/cabinBag.png" alt="" />
                                                <h1 className=' font-semibold ml-2'>Cabin Baggage</h1>
                                            </div>
                                            <span className=' font-normal'>8 Kgs(1 Piece only) / Adult</span>
                                        </div>
                                        <div className='flex alignCenter justify-between'>
                                            <div className='flex alignCenter'>
                                                <img className='w-4 ml-1.5' src="/img/checkInBag.png" alt="" />
                                                <h1 className=' font-semibold ml-2'>Check-In Baggage</h1>
                                            </div>
                                            <span className=' font-normal '>25 Kgs(1 Piece only) / Adult</span>
                                        </div>
                                    </div>
                                </div>
                                <div className='px-3 pt-2 mx-3 rounded-lg mt-4 bg-white text-black grayBlurShadow'>
                                    <h1 className='text-left text-xl font-bold'>Fare Summary</h1>
                                    <div className='flex alignCenter justify-between py-4 borderBottomGray'>
                                        <div className='flex alignCenter'>
                                            <img className='w-4 h-4 mr-3' src="/img/addIcon.png" alt="" />
                                            <h2>Base Fare</h2>
                                        </div>
                                        <h2 className='text-gray-500'>₹ {flightTicket?.ticketPrice}</h2>
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
                                        <h2 className=' font-bold '>₹ {flightTicket?.ticketPrice + 369}</h2>
                                    </div>
                                    <img className=' w-1/3 pr-2 m-auto' src="/img/mmtbackWhiteImage.png" alt="" />
                                </div>
                            </div>
                        </div>
                        <div className=' fixed flex justify-between alignCenter bottom-0 w-full bg-gray-900 px-4 py-3 z-20'>
                            <h2 className=' font-bold text-white text-3xl'>₹ {flightTicket?.ticketPrice + 369}<span className=' text-xs font-normal ml-1'>DUE</span></h2>
                            <button onClick={() => { setBookingStatus(false); setPaymentOption(false); navigate(`/payment/FLIGHTS/${flightId}/""`) }} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 px-4 '>CONTINUE</button>
                        </div>
                    </div>

                </section>
            </MobileView>
        </>
    );
}

export default FlightBooking;