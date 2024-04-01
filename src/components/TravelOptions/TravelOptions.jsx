import { memo, useContext, useEffect, useState } from "react";
import "./travelOption.css"
import { AppContext } from "../ContextAPI/AppContext";
import { monthNames, weekName } from "../Constant/constant";
import { Link } from "react-router-dom";
import { BrowserView, MobileView } from "react-device-detect";

function TravelOptions(props) {
    const { currentTravelOption, setCurrentTravelOption, source, setSource,
        destination, setDestination, } = useContext(AppContext);
    return (
        <>
            <BrowserView className="absolute m-auto bg-white rounded-2xl px-5 py-3  w-3/4 bookingIcons">
                <div className="flex justify-around alignCenter">
                    <div onClick={() => { setCurrentTravelOption('FLIGHTS') }} className=" w-10 cursor-pointer">
                        {currentTravelOption === "FLIGHTS" ? <img src="/img/flightOn.png" alt="flight img" /> : <img src="/img/flightOff.png" alt="flight img" />}
                        <p>{currentTravelOption === "FLIGHTS" ? <span className=" blueText font-bold pb-2 blueBottomBorder">Flights</span> : <span>Flights</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('HOTELS') }} className=" w-7 cursor-pointer">
                        {currentTravelOption === "HOTELS" ? <img src="/img/hotelOn.png" alt="hotel img" /> : <img src="/img/hotelOff.png" alt="hotel img" />}
                        <p>{currentTravelOption === "HOTELS" ? <span className=" blueText font-bold blueBottomBorder">Hotels</span> : <span>Hotels</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('RAILS') }} className=" w-10 cursor-pointer">
                        {currentTravelOption === "RAILS" ? <img src="/img/trainOn.png" alt="train img" /> : <img src="/img/trainOff.png" alt="train img" />}
                        <p>{currentTravelOption === "RAILS" ? <span className=" blueText font-bold pb-2 blueBottomBorder">Trains</span> : <span>Trains</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('BUSES') }} className=" w-9 cursor-pointer">
                        {currentTravelOption === "BUSES" ? <img src="/img/busOn.png" alt="bus img" /> : <img src="/img/busOff.png" alt="bus img" />}
                        <p>{currentTravelOption === "BUSES" ? <span className=" blueText font-bold pb-2 blueBottomBorder">Buses</span> : <span>Buses</span>}</p>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className=" absolute mt-2 pr-3 pl-1 m-auto rounded-2xl grid grid-cols-4 gap-2 w-full alignCenter ">
                    <div onClick={() => { setCurrentTravelOption('FLIGHTS') }} className=" bg-white cursor-pointer flex justify-center flex-col alignCenter rounded-lg py-1">
                        {currentTravelOption === "FLIGHTS" ? <img className="w-10" src="/img/flightOn.png" alt="flight img" /> : <img className="w-10" src="/img/flightOff.png" alt="flight img" />}
                        <p>{currentTravelOption === "FLIGHTS" ? <span className=" blueText font-bold  blueBottomBorder">Flights</span> : <span>Flights</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('HOTELS') }} className=" bg-white  cursor-pointer flex justify-center flex-col alignCenter rounded-lg py-1">
                        {currentTravelOption === "HOTELS" ? <img className="w-7" src="/img/hotelOn.png" alt="hotel img" /> : <img className="w-7" src="/img/hotelOff.png" alt="hotel img" />}
                        <p>{currentTravelOption === "HOTELS" ? <span className=" blueText font-bold blueBottomBorder">Hotels</span> : <span>Hotels</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('RAILS') }} className=" bg-white  cursor-pointer flex justify-center flex-col alignCenter rounded-lg py-1">
                        {currentTravelOption === "RAILS" ? <img className="w-10" src="/img/trainOn.png" alt="train img" /> : <img className="w-10" src="/img/trainOff.png" alt="train img" />}
                        <p>{currentTravelOption === "RAILS" ? <span className=" blueText font-bold blueBottomBorder">Trains</span> : <span>Trains</span>}</p>
                    </div>

                    <div onClick={() => { setCurrentTravelOption('BUSES') }} className=" bg-white cursor-pointer flex justify-center flex-col alignCenter rounded-lg py-1">
                        {currentTravelOption === "BUSES" ? <img className="w-9" src="/img/busOn.png" alt="bus img" /> : <img className="w-9" src="/img/busOff.png" alt="bus img" />}
                        <p>{currentTravelOption === "BUSES" ? <span className=" blueText font-bold blueBottomBorder">Buses</span> : <span>Buses</span>}</p>
                    </div>
                </div>
            </MobileView>
        </>
    );
}

export default TravelOptions;