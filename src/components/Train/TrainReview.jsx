import React, { memo, useContext, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { monthNames, trainTickets, weekInitials, weekName } from '../Constant/constant';
import { AppContext } from "../ContextAPI/AppContext";
import "./train.css";
import { BrowserView, MobileView } from 'react-device-detect';

function TrainReview(props) {
    const { from, to, trainId, trainClass } = useParams();
    const navigate = useNavigate();
    const { hotelLocation, isModalOpen, setIsModalOpen, hotelArray, setHotelArray, setHotelLocation, source, setSource, fromOrTo, setFromOrTo, setFlightArray,
        destination, setDestination, currentTravelOption, setCurrentTravelOption, flightdate, setFlightDate, setBookingStatus, setPaymentOption,trainPassangers, setTrainPassangers } = useContext(AppContext);
    const [loading, setLoading] = useState(false);
    const [ticket, setTicket] = useState([]);
    const [ticketType, setTicketType] = useState("");
    
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    useEffect(() => {
        // setLoading(true);
        // setTimeout(() => {
        //     setLoading(false);
        // }, 600);
        let getTicket = trainTickets?.filter((val) => {
            return val._id == trainId;
        });
        console.log(getTicket);
        setTicket(getTicket[0]);
        let getType = getTicket[0].availableTicket.filter((val) => {
            return val.class === trainClass
        });
        console.log(getType);
        setTicketType(getType[0]);
        setCurrentTravelOption("RAILS");
        let date = new Date();
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    console.log(ticket);
    const handlePay = () => {
        navigate(`/payment/RAILS/${trainId}/${(ticketType?.price * trainPassangers) + 40 + 58 + 308}`);
        setBookingStatus(false);
        setPaymentOption(false);
    }
    return (
        <div>
            <BrowserView>
                <div className='mb-20'>
                    <div className=' relative pt-5 pb-5 gradientBackgroundBlue'>
                        <h1 className=' text-white font-bold mb-2 text-2xl payWidth m-auto text-left'>Review Your Booking</h1>
                    </div>
                    <div className='grid justify-between mt-6 m-auto px-2 trainWidth trainReviewBox'>
                        <div className=' '>
                            <div className='flex gap-6 mb-8'>
                                <div className=' text-left mr-8'>
                                    <h1 className=' font-bold text-xl'>{ticket?.name}</h1>
                                    <h3 className=' text-xs text-gray-400 '><span className=' mr-2'>{ticket?.trainCode}</span> | <span className='ml-2'>Departs on:</span>{ticket?.departOn?.map((val, idx) => {
                                        return val != weekInitials[idx] ? <span className=' text-gray-300 font-semibold pl-1'>{weekInitials[idx]}</span> : <span className='greenText font-semibold pl-1'>{val}</span>
                                    })}</h3>
                                </div>
                                <div className=' w-2/4'>
                                    <div className='flex alignCenter justify-between'>
                                        <h1 className=' font-bold'>{ticket?.arrivalTime},{weekName[day]}</h1>
                                        <div className='h-0.5 w-12 bg-gray-300'></div>
                                        <h3 className=' text-xs text-gray-400 font-semibold'>{ticket?.duration}</h3>
                                        <div className='h-0.5 w-12 bg-gray-300'></div>
                                        <h1 className=' font-bold'>{ticket?.departureTime},{ticket?.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                    </div>
                                    <div className='flex text-sm text-gray-600 justify-between'>
                                        <h1>{from}</h1>
                                        <h1>{to}</h1>
                                    </div>
                                </div>
                            </div>
                            <div className='flex gap-14'>
                                <div>
                                    <h1 className=' text-left font-semibold mb-2'>Availability Status</h1>
                                    <div className=' py-1 px-5 rounded-md borderGray '>
                                        <div className='flex justify-between alignCenter mb-2'>
                                            <h1 className=' font-semibold mr-6'>{ticketType.class}</h1>
                                            <h1 className=' flex flex-row greenText font-medium '>AVAILABLE-<span>{ticketType.seats}</span> </h1>
                                        </div>
                                        <h3 className=' text-left text-xs text-gray-400'>moments ago</h3>
                                    </div>
                                </div>
                                <div className=' w-full pr-5 ml-5'>
                                    <h1 className=' text-left mb-2 font-semibold'>Your Boarding Station</h1>
                                    <div className='flex justify-between alignCenter p-2 rounded-md borderGray'>
                                        <h1>{from} - {ticket.arrivalTime}({date} {monthNames[month]}) </h1>
                                        <div className=' flex alignCenter'>
                                            <h1>Person</h1>
                                            <select onChange={(e) => { setTrainPassangers(e.target.value); }} className='w-12 borderGray rounded-md ml-2' name="" id="">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className=' rounded-md borderGray fareWidth'>
                            <div className=' bg-blue-50 p-4 borderBottomGray'>
                                <button onClick={handlePay} className=' w-full text-center gradientBlueBack rounded-md text-white font-bold py-2'>PAY & BOOK NOW</button>
                            </div>
                            <div className='flex flex-col gap-3 p-4'>
                                <div className='flex justify-between alignCenter'>
                                    <h1>Base fare per adult</h1>
                                    <h1 className=' font-bold'>₹{ticketType?.price}</h1>
                                </div>
                                {ticketType?.price > 1000 ?
                                    <div className='flex justify-between alignCenter'>
                                        <h1>Catering charge</h1>
                                        <h1 className=' font-bold'>₹308</h1>
                                    </div> : ""}
                                <div className='flex justify-between alignCenter'>
                                    <h1>Tax</h1>
                                    <h1 className=' font-bold'>₹58</h1>
                                </div>
                                <div className='flex justify-between alignCenter'>
                                    <h1>Reservation charge</h1>
                                    <h1 className=' font-bold'>₹40</h1>
                                </div>

                            </div>
                            <div className='flex justify-between alignCenter p-4 bg-gray-50'>
                                <h1>Total Price per adult</h1>
                                <h1 className=' font-bold'>₹{(ticketType?.price * trainPassangers) + 40 + 58 + 308}</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </BrowserView>
            <MobileView className='gradientBackgroundBlue'>
                <div className=' pb-20 pt-5  text-white'>
                    <img className=' mb-3 m-auto w-20' src="/img/mmt_logo_rt.png" alt="" />
                    <h3 className=' text-white text-xs'>Trip to</h3>
                    <h1 className=' font-semibold text-xl mb-5'>{to}</h1>
                    {/* <div className=' relative pt-5 pb-5 '>
                        <h1 className=' text-white font-bold mb-2 text-2xl payWidth m-auto text-left'>Review Your Booking</h1>
                    </div> */}
                    <div className=' justify-between mt-2 m-auto px-2 '>
                        <div className=' '>
                            <div className=' gap-6 mb-8'>
                                <div className=' text-left mb-4'>
                                    <h1 className=' font-bold text-xl'>{ticket?.name}</h1>
                                    <h3 className=' text-xs text-gray-400 '><span className=' mr-2'>{ticket?.trainCode}</span> | <span className='ml-2'>Departs on:</span>{ticket?.departOn?.map((val, idx) => {
                                        return val != weekInitials[idx] ? <span className=' text-gray-300 font-semibold pl-1'>{weekInitials[idx]}</span> : <span className='greenText font-semibold pl-1'>{val}</span>
                                    })}</h3>
                                </div>
                                <div className=''>
                                    <div className='flex alignCenter justify-between'>
                                        <h1 className=' font-bold'>{ticket?.arrivalTime},{weekName[day]}</h1>

                                        <h3 className='flex alignCenter gap-1 text-xs text-gray-400 font-semibold'> <div className='h-0.5 w-5 mt-1 bg-gray-300'></div>{ticket?.duration}<div className='h-0.5 w-5 mt-1 bg-gray-300'></div></h3>

                                        <h1 className=' font-bold'>{ticket?.departureTime},{ticket?.travelDayDuration === 1 ? weekName[day + 1] : weekName[day]}</h1>
                                    </div>
                                    <div className='flex text-sm font-medium justify-between'>
                                        <h1>{from}</h1>
                                        <h1>{to}</h1>
                                    </div>
                                </div>
                            </div>
                            <>
                                <div className='mb-5'>
                                    <h1 className=' text-left font-semibold mb-2'>Availability Status</h1>
                                    <div className=' py-1 px-5 rounded-md borderGray '>
                                        <div className='flex justify-between alignCenter mb-2'>
                                            <h1 className=' font-semibold mr-6'>{ticketType.class}</h1>
                                            <h1 className=' flex flex-row greenText font-medium '>AVAILABLE-<span>{ticketType.seats}</span> </h1>
                                        </div>
                                        <h3 className=' text-left text-xs text-gray-400'>moments ago</h3>
                                    </div>
                                </div>
                                <div className=' mb-5'>
                                    <h1 className=' text-left mb-2 font-semibold'>Your Boarding Station</h1>
                                    <div className='flex justify-between alignCenter p-3 rounded-md borderGray'>
                                        <h1>{from} - {ticket.arrivalTime}({date} {monthNames[month]}) </h1>
                                        <div className=' flex alignCenter'>
                                            <h1>Person</h1>
                                            <select onChange={(e) => { setTrainPassangers(e.target.value); }} className='w-12 borderGray bg-transparent text-gray-400 pl-1 rounded-md ml-2' name="" id="">
                                                <option value="1">1</option>
                                                <option value="2">2</option>
                                                <option value="3">3</option>
                                                <option value="4">4</option>
                                                <option value="5">5</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                            </>
                        </div>
                        {/* fare breakup */}
                        <div className=' rounded-md borderGray '>
                            <div className='flex flex-col gap-3 p-4'>
                                <div className='flex justify-between alignCenter'>
                                    <h1>Base fare per adult</h1>
                                    <h1 className=' font-bold'>₹{ticketType?.price}</h1>
                                </div>
                                {ticketType?.price > 1000 ?
                                    <div className='flex justify-between alignCenter'>
                                        <h1>Catering charge</h1>
                                        <h1 className=' font-bold'>₹308</h1>
                                    </div> : ""}
                                <div className='flex justify-between alignCenter'>
                                    <h1>Tax</h1>
                                    <h1 className=' font-bold'>₹58</h1>
                                </div>
                                <div className='flex justify-between alignCenter'>
                                    <h1>Reservation charge</h1>
                                    <h1 className=' font-bold'>₹40</h1>
                                </div>

                            </div>
                            <div className='flex justify-between alignCenter p-4 borderTopGray'>
                                <h1>Total Price</h1>
                                <h1 className=' font-bold'>₹{(ticketType?.price * trainPassangers) + 40 + 58 + (ticketType?.price > 1000? 308:0)}</h1>
                            </div>
                        </div>
                    </div>
                    <div className=' fixed flex justify-between alignCenter bottom-0 w-full bg-gray-900 px-4 py-3 z-20'>
                        <h2 className=' font-bold text-white text-3xl'>₹ {(ticketType?.price * trainPassangers) + 40 + 58 + (ticketType?.price > 1000? 308:0)}<span className=' text-xs font-normal ml-1'>DUE</span></h2>
                        <button onClick={() => { setBookingStatus(false); setPaymentOption(false); navigate(`/payment/RAILS/${trainId}/${trainClass}`) }} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 px-4 '>CONTINUE</button>
                    </div>
                </div>
            </MobileView>
        </div>
    );
}

export default memo(TrainReview);