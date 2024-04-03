import React, { useContext, useState } from 'react';
import { getBusTicket, monthNames, weekName } from '../Constant/constant';
import { useNavigate, useParams } from 'react-router';
import { AppContext } from '../ContextAPI/AppContext';
import { BrowserView, MobileView } from 'react-device-detect';

function BusReview(props) {
    const { busId } = useParams();
    const navigate = useNavigate();
    const { token, sourceBusTrain, destinationBusTrain, isLogin, setIsLogin,
        setCurrentTravelOption, flightdate, setBookingStatus, setPaymentOption,
        trainPassangers, setTrainPassangers } = useContext(AppContext);
    const [busTicket, setBusTicket] = useState([]);
    const [loading, setLoading] = useState(false);
    const [date, setDate] = useState("");
    const [month, setMonth] = useState("");
    const [year, setYear] = useState("");
    const [day, setDay] = useState("");
    // get bus ticket info
    const getTicket = async () => {
        setLoading(true);
        let res = await getBusTicket(busId);
        console.log(res);
        setBusTicket(res);
        setLoading(false);
    }
    // set date and travel option
    useState(() => {
        getTicket();
        setCurrentTravelOption("BUSES")
        let date = flightdate;
        setDate(date.getDate());
        setMonth(date.getMonth());
        setYear(date.getFullYear());
        setDay(date.getDay());
    }, []);
    // move to payment section if user login
    const handlePay = () => {
        if (token) {
            navigate(`/payment/BUSES/${busId}/"`)
            setBookingStatus(false);
            setPaymentOption(false);
        }
        else {
            setIsLogin({ ...isLogin, status: true });
        }

    }
    return (
        <div>
            <BrowserView>
                <div className='mb-20'>
                    <div className=' relative pt-5 pb-5 gradientBackgroundBlue'>
                        <h1 className=' text-white font-bold mb-2 text-2xl payWidth m-auto text-left'>Review Your Booking</h1>
                    </div>
                    {!loading ?
                        <div className='grid justify-between gap-3 mt-6 m-auto px-2 trainWidth trainReviewBox'>
                            <div className='borderGray rounded-2xl'>
                                <div className='flex gap-8 text-left px-5 pt-3 pb-5'>
                                    <div>
                                        <h1 className=' font-bold text-xl'>{busTicket?.name}</h1>
                                        <h1 className=' font-semibold mr-6 w-20'>{busTicket?.type}</h1>
                                    </div>
                                    <div className=' w-3/4 '>
                                        <h1 className=' text-left font-semibold'>Your Boarding Station</h1>
                                        <div className='flex justify-between alignCenter py-1 px-2 rounded-md borderGray'>
                                            <h1>{sourceBusTrain} - {busTicket?.destinationBusTrain}({date} {monthNames[month]}) </h1>
                                            <div className=' flex alignCenter ml-5'>
                                                <h1>Passangers</h1>
                                                <select onChange={(e) => { setTrainPassangers(e.target.value); }} className='w-12 borderGray rounded-md ml-2' >
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

                                <div className=' mb-8'>
                                    <div className=' py-1 px-5 mb-5 bg-gray-200'>
                                        <div className='flex alignCenter pr-1 text-white rounded-md  w-fit ratingBack'><img className=' w-5 mt-0.5' src="/img/populer.png" alt="" /><span>3.4</span></div>
                                    </div>
                                    <div className='px-5 '>
                                        <div className='flex alignCenter justify-between'>
                                            <h1 className=' font-bold'>{busTicket?.departureTime}, <span className=' font-normal text-gray-600'>{date} {monthNames[month]}'{year}, {weekName[day]}</span></h1>
                                            <div className='flex alignCenter gap-2'>
                                                <div className='h-0.5 w-12 bg-gray-300'></div>
                                                <h3 className=' text-xs text-gray-400 font-semibold'>To</h3>
                                                <div className='h-0.5 w-12 bg-gray-300'></div>
                                            </div>
                                            <h1 className=' font-bold'>{busTicket?.arrivalTime}, <span className=' font-normal text-gray-600'>{date} {monthNames[month]}'{year}, {weekName[day]}</span></h1>
                                        </div>
                                        <div className='flex text-sm  justify-between'>
                                            <div className=' text-left w-28'>
                                                <h1 className=' font-bold'>{sourceBusTrain},</h1>
                                                <h2 className='text-gray-500'>{busTicket?.source}</h2>
                                            </div>
                                            <div className=' text-right w-28'>
                                                <h1 className=' font-bold'>{destinationBusTrain},</h1>
                                                <h2 className=' text-gray-500'>{busTicket?.destination}</h2>
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
                                        <h1 className=' font-bold'>₹{busTicket?.fare}</h1>
                                    </div>

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
                                    <h1>Total Price</h1>
                                    <h1 className=' font-bold'>₹{(busTicket?.fare * trainPassangers) + 40 + 58}</h1>
                                </div>
                            </div>
                        </div> : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                </div>
            </BrowserView>
            <MobileView>
                <div className=' pb-20 pt-5  text-white fullHeightInVh gradientBackgroundBlue'>
                    <img className=' mb-3 m-auto w-20' src="/img/mmt_logo_rt.png" alt="" />
                    <h3 className=' text-white text-xs'>Trip to</h3>
                    <h1 className=' font-semibold text-xl mb-5'>{destinationBusTrain}</h1>
                    <div className=' justify-between mt-2 m-auto px-2 '>
                        <div className=' '>
                            <div className=' gap-6 mb-8'>
                                <div className=' text-left mb-4'>
                                    <h1 className=' font-bold text-xl'>{busTicket?.name}</h1>

                                </div>
                                <div className=''>
                                    <div className='flex alignCenter justify-between'>
                                        <h1 className=' font-bold'>{busTicket?.departureTime},{weekName[day]}</h1>

                                        <h3 className='flex alignCenter gap-1 text-xs text-gray-400 font-semibold'> <div className='h-0.5 w-5 mt-1 bg-gray-300'></div>To<div className='h-0.5 w-5 mt-1 bg-gray-300'></div></h3>

                                        <h1 className=' font-bold'>{busTicket?.arrivalTime},{weekName[day]}</h1>
                                    </div>
                                    <div className='flex text-sm font-medium justify-between'>
                                        <h1>{sourceBusTrain}</h1>
                                        <h1>{destinationBusTrain}</h1>
                                    </div>
                                </div>
                            </div>
                            <>
                                <div className='mb-5'>
                                    <h1 className=' text-left font-semibold mb-2'>Availability Status</h1>
                                    <div className=' py-1 px-5 rounded-md borderGray '>
                                        <div className='flex justify-between alignCenter mb-2'>
                                            <h1 className=' font-semibold mr-6'>{busTicket?.type}</h1>
                                            <h1 className=' flex flex-row greenText font-medium '>AVAILABLE-<span>{busTicket?.seats}</span> </h1>
                                        </div>
                                        <h3 className=' text-left text-xs text-gray-400'>moments ago</h3>
                                    </div>
                                </div>
                                <div className=' mb-5'>
                                    <h1 className=' text-left mb-2 font-semibold'>Your Boarding Stop</h1>
                                    <div className='flex justify-between alignCenter p-3 rounded-md borderGray'>
                                        <h1>{sourceBusTrain} - {busTicket?.departureTime}({date} {monthNames[month]}) </h1>
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
                                    <h1 className=' font-bold'>₹{busTicket?.fare}</h1>
                                </div>

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
                                <h1 className=' font-bold'>₹{(busTicket?.fare * trainPassangers) + 40 + 58}</h1>
                            </div>
                        </div>
                    </div>
                    <div className=' fixed flex justify-between alignCenter bottom-0 w-full bg-gray-900 px-4 py-3 z-20'>
                        <h2 className=' font-bold text-white text-3xl'>₹ {(busTicket?.fare * trainPassangers) + 40 + 58}<span className=' text-xs font-normal ml-1'>DUE</span></h2>
                        <button onClick={handlePay} className=' text-center gradientBlueBack rounded-full text-white font-bold py-2 px-4 '>CONTINUE</button>
                    </div>
                </div>
            </MobileView>
        </div>
    );
}

export default BusReview;