import axios from 'axios';
import "./hotel.css";
import React, { useEffect, useState } from 'react';
import { getHotelDetails } from '../Constant/constant';
import "./hotel.css";
import { filterHotels, headerNavlist, searchHotels, suggetionFilterArray } from "../Constant/constant";
import { useContext } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { useNavigate, useParams } from "react-router";
import { memo } from "react";
import { HotelListArray, cityListArray, getHotelName, hotelPerNightPrice, monthNames, weekName } from "../Constant/constant";
import HotelModal from "../Modals/HotelModal";
import ShimmerLocation from "../Loader/ShimmerLocation";
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { BrowserView, MobileView } from 'react-device-detect';

function HotelDetails(props) {
    const {hotelId}=useParams();
    const [hotelInfo, sethotelInfo] = useState([]);
    const [selectedNav, setSelectedNav] = useState("HOTELS");
    const { currentTravelOption, setCurrentTravelOption } = useContext(AppContext);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextImg = () => {
        if (currentIndex < hotelInfo[0].images?.length - 1) {
            setCurrentIndex(currentIndex + 1);
        }
        else if(currentIndex === hotelInfo[0].images?.length - 1){
            setCurrentIndex(0);
        }
    }
    const prevImg = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
        else if(currentIndex===0){
            setCurrentIndex(hotelInfo[0].images?.length - 1)
        }
    }

    const getval = async () => {
        setLoading(true);
        let res = await getHotelDetails(hotelId);
        sethotelInfo([res]);
        setLoading(false);
        console.log(res);
    }
    useEffect(() => {
        getval();
    }, [])

    return (
        <main>
            <BrowserView>
                <header id="showHeader" className=" overflow-hidden mb-3 bg-white headerTwo">
                    <div className=" flex flex-row m-auto alignCenter justify-between py-3 headerBox">
                        <div className=" flex flex-row alignCenter">
                            <div className="  cursor-pointer mmtlogo">

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
                {!loading ?
                    hotelInfo?.map((val) => {
                        return (
                            <div className=' grid gap-4 hotelDetailBox' key={val._id}>
                                <div className=''>
                                    <div className=' grid gap-3 hotelImageBox  w-full'>
                                        <div className='flex alignCenter justify-center arrowBack rounded-md relative'>
                                            <img onClick={prevImg} className=' arrowBack cursor-pointer absolute left-1 top-1/2 w-7 transformLeftArrow grayBlurShadow' src="/img/downArrow.png" alt="" />
                                            <img onClick={nextImg} className=' arrowBack cursor-pointer absolute right-1 top-1/2 w-7 transformRightArrow grayBlurShadow' src="/img/downArrow.png" alt="" />
                                            {/* <img className=' grayBlurShadow rounded-md ' src={val?.images[currentIndex]} alt="" /> */}
                                            <LazyLoadImage className=' mainImage grayBlurShadow rounded-md ' src={val?.images[currentIndex]} placeholderSrc='/img/mmtLoading.gif' />
                                        </div>
                                        <div className='grid grid-cols-1 gap-2 grid-flow-row overflow-y-scroll no-scrollbar allHotelImageBox'>
                                            {val?.images.map((image, idx) => {
                                                return <LazyLoadImage key={idx} onClick={() => { setCurrentIndex(idx) }} className='  cursor-pointer rounded-md ' src={image} placeholderSrc='/img/mmtLoading.gif' />

                                            })}
                                        </div>
                                    </div>
                                    <div className=' text-left'>
                                        <h1 className=' text-3xl font-semibold'>{val?.name}</h1>
                                        <p className='flex alignCenter text-gray-600'><img className=' w-2 h-3 mr-1' src="/img/locationLogoGray.png" alt="" />{val?.location}</p>
                                    </div>
                                </div>
                                <div>
                                    <div className=' text-left p-3 mb-4 rounded-md grayBlurShadow borderGray'>
                                        <h1 className=' font-semibold'>Superior Room</h1>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p>For 2 Adults</p>
                                                <p className=' text-red-600'>x Non-Refundable</p>
                                                <p>✓ Rooms only</p>
                                            </div>
                                            <div className=' text-right'>
                                                <p>Per Night</p>
                                                <h1>₹ {Math.floor(val?.avgCostPerNight)}</h1>
                                                <p className=' text-xs text-gray-500'>+{val?.childAndExtraBedPolicy.extraBedCharge} Taxes & fees</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between p-3 text-left rounded-md grayBlurShadow borderGray">
                                        <span className=" rounded-md p-2 mb-2 text-3xl font-bold w-fit ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>
                                        <span className=' text-xl mb-2'>{val?.rating >= 4.5 ?
                                            <span className="ratingColor font-bold">Excellent</span> :
                                            val?.rating >= 3.5 ?
                                                <span className="ratingColor font-bold">Very Good </span> :
                                                val?.rating >= 2.5 ?
                                                    <span className="ratingColor font-bold"> Good </span> :
                                                    <span className="ratingColor font-bold">Average</span>
                                        }</span>

                                        <p className=" text-gray-500 font-bold">Based on <span className=' text-gray-700'>{656} Ratings</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                    <section className='fullWidth m-auto borderGray'>
                        <div className=' bg-slate-200 borderGray font-bold grid grid-cols-3'>
                            <p>ROOM</p>
                            <p>ROOM INFO</p>
                            <p>PRICE</p>
                        </div>
                        {hotelInfo[0]?.rooms?.map((val)=>{
                            return(
                                <div className='grid grid-cols-3 borderGray text-left'>
                                    <div className=' p-5 '>
                                        <LazyLoadImage src={hotelInfo[0]?.images[0]}  placeholderSrc='/img/mmtLoading.gif' />
                                    </div>
                                    <div className=' p-3 borderLeftGray'>
                                        <h1 className='text-xl font-bold'>{val?.roomType} Room</h1>
                                        <p>Area : {val?.roomSize}sq.ft</p>
                                        <p>Bed Detail : {val?.bedDetail}</p>
                                        
                                    </div>
                                    <div className='p-3 borderLeftGray'>
                                        <p className=' text-xs text-slate-400'>Per Night</p>
                                        <h1 className='text-2xl font-bold'>₹ {val.price}</h1>
                                        <p className=' text-sm font-semibold'>+₹ {val.costDetails.taxesAndFees} taxes & fees</p>
                                        <p className=' text-blue-400'>{val?.cancellationPolicy}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
            </BrowserView>
            <MobileView>
                <header id="showHeader" className=" mb-3 bg-white ">
                    <div className=" flex flex-row m-auto alignCenter justify-between py-1 px-1 headerTwo">
                        <div className=" flex flex-row alignCenter">
                            <div className="  cursor-pointer mmtlogo">

                                <img className=" w-20 " src="/img/mmtBlueLogo.png" alt="" />
                            </div>
                            <ul className=" flex flex-row alignCenter ml-8 gap-3">
                                {headerNavlist?.map((val) => {
                                    return (
                                        <li className="flex flex-col cursor-pointer h-full justify-between" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                            <img className=" w-7" src={selectedNav === val.id ? val.imageOn : val.imageOff} alt="" />
                                            {selectedNav === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
                                                <p className=" text-xs text-gray-500">{val.name}</p>}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div className=" flex flex-row alignCenter p-1 rounded cursor-pointer mr-3 loginGreenBtn">
                            <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex alignCenter justify-between w-full text-xs text-left">
                                <p className=" font-bold">Login or Create Account</p>
                                <span><img className=" w-3 opacity-80" src="/img/downArrow.png" alt="" /></span>
                            </span>
                        </div>
                    </div>
                </header>
                {!loading ?
                    hotelInfo?.map((val) => {
                        return (
                            <div className=' ' key={val._id}>
                                <div className='flex alignCenter w-fit mainImage relative'>
                                    <img onClick={prevImg} className=' cursor-pointer absolute left-1 top-1/2 w-7 transformLeftArrow grayBlurShadow' src="/img/downArrow.png" alt="" />
                                    <img onClick={nextImg} className=' cursor-pointer absolute right-1 top-1/2 w-7 transformRightArrow grayBlurShadow' src="/img/downArrow.png" alt="" />
                                    {/* <img className=' grayBlurShadow rounded-md ' src={val?.images[currentIndex]} alt="" /> */}
                                    <LazyLoadImage className=' mb-3 grayBlurShadow rounded-md ' src={val?.images[currentIndex]} placeholderSrc='/img/mmtLoading.gif"' />
                                </div>
                                <div className='flex  gap-2 no-scrollbar allHotelImageBox'>
                                    {val?.images.map((image, idx) => {
                                        return (
                                            <div className=''>
                                                <LazyLoadImage onClick={() => { setCurrentIndex(idx) }} className=' h-16 cursor-pointer rounded-md ' src={image} placeholderSrc='/img/mmtLoading.gif"' />
                                            </div>
                                        )

                                    })}
                                </div>
                                <div className=' text-left p-3'>
                                    <h1 className=' text-xl font-semibold'>{val?.name}</h1>
                                    <p className='flex alignCenter text-gray-600'><img className=' w-2 h-3 mr-1' src="/img/locationLogoGray.png" alt="" />{val?.location}</p>
                                </div>
                                <div>
                                    <div className=' text-left p-3 mb-4 rounded-md grayBlurShadow borderGray'>
                                        <h1 className=' font-semibold'>Superior Room</h1>
                                        <div className='flex justify-between'>
                                            <div>
                                                <p>For 2 Adults</p>
                                                <p className=' text-red-600'>x Non-Refundable</p>
                                                <p>✓ Rooms only</p>
                                            </div>
                                            <div className=' text-right'>
                                                <p>Per Night</p>
                                                <h1>₹ {Math.floor(val?.avgCostPerNight)}</h1>
                                                <p className=' text-xs text-gray-500'>+{val?.childAndExtraBedPolicy.extraBedCharge} Taxes & fees</p>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex flex-col justify-between p-3 text-left rounded-md grayBlurShadow borderGray">
                                        <span className=" rounded-md p-2 mb-2 text-3xl font-bold w-fit ratingBackColor text-white">{Number.isInteger(val?.rating) ? `${val?.rating}.0` : val?.rating}</span>
                                        <span className=' text-xl mb-2'>{val?.rating >= 4.5 ?
                                            <span className="ratingColor font-bold">Excellent</span> :
                                            val?.rating >= 3.5 ?
                                                <span className="ratingColor font-bold">Very Good </span> :
                                                val?.rating >= 2.5 ?
                                                    <span className="ratingColor font-bold"> Good </span> :
                                                    <span className="ratingColor font-bold">Average</span>
                                        }</span>

                                        <p className=" text-gray-500 font-bold">Based on <span className=' text-gray-700'>{656} Ratings</span></p>
                                    </div>
                                </div>
                            </div>
                        )
                    }) : <img className=' m-auto w-32 ' src="/img/mmtLoading.gif" alt="" />}
                <section className='fullWidth m-auto borderGray'>
                        <div className=' bg-slate-200 borderGray font-bold grid grid-cols-3'>
                            <p>ROOM</p>
                            <p className='borderLeftGray'>ROOM INFO</p>
                            <p className='borderLeftGray'>PRICE</p>
                        </div>
                        {hotelInfo[0]?.rooms?.map((val)=>{
                            return(
                                <div className='grid grid-cols-3 borderGray text-left'>
                                    <div className=' p-5 '>
                                        <img className='' src={hotelInfo[0]?.images[0]} alt="" />
                                    </div>
                                    <div className=' p-3 borderLeftGray'>
                                        <h1 className='text-xl font-bold'>{val?.roomType} Room</h1>
                                        <p>Area : {val?.roomSize}</p>
                                        <p>Bed Detail : {val?.bedDetail}</p>
                                        
                                    </div>
                                    <div className='p-3 borderLeftGray'>
                                        <p className=' text-xs text-slate-400'>Per Night</p>
                                        <h1 className='text-2xl font-bold'>₹ {val.price}</h1>
                                        <p className=' text-sm font-semibold'>+₹ {val.costDetails.taxesAndFees} taxes & fees</p>
                                        <p className=' text-blue-400'>{val?.cancellationPolicy}</p>
                                    </div>
                                </div>
                            );
                        })}
                    </section>
            </MobileView>
        </main>
    );
}

export default HotelDetails;