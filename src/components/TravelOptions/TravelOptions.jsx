import { memo, useContext, useEffect, useState } from "react";
import "./travelOption.css"
import { AppContext } from "../ContextAPI/AppContext";
import { monthNames, weekName } from "../Constant/constant";
import { Link } from "react-router-dom";

function TravelOptions(props) {
    const { currentTravelOption, setCurrentTravelOption, source, setSource,
        destination, setDestination, } = useContext(AppContext);
    return (
        <div className=" absolute m-auto bg-white rounded-2xl px-5 py-3 flex justify-around w-3/4 alignCenter bookingIcons">
            
                <div onClick={()=>{setCurrentTravelOption('flight')}} className=" w-10 cursor-pointer">
                    {currentTravelOption === "flight" ? <img src="/img/flightOn.png" alt="flight img" /> : <img src="/img/flightOff.png" alt="flight img" />}
                    <p>{currentTravelOption === "flight" ? <span className=" blueText font-bold pb-2 blueBottomBorder">Flights</span> : <span>Flights</span>}</p>
                </div>
            
                <div onClick={()=>{setCurrentTravelOption('hotel')}} className=" w-10 cursor-pointer">
                    {currentTravelOption === "hotel" ? <img src="/img/hotelOn.png" alt="hotel img" /> : <img src="/img/hotelOff.png" alt="hotel img" />}
                    <p>{currentTravelOption === "hotel" ? <span className=" blueText font-bold blueBottomBorder">Hotels</span> : <span>Hotels</span>}</p>
                </div>
            
            <div onClick={()=>{setCurrentTravelOption('train')}} className=" w-10 cursor-pointer">
                {currentTravelOption === "train" ? <img src="/img/trainOn.png" alt="train img" /> : <img src="/img/trainOff.png" alt="train img" />}
                <p>{currentTravelOption === "train" ? <span className=" blueText font-bold pb-2 blueBottomBorder">Trains</span> : <span>Trains</span>}</p>
            </div>
            
            <div onClick={()=>{setCurrentTravelOption('bus')}} className=" w-10 cursor-pointer">
                {currentTravelOption === "bus" ? <img src="/img/busOn.png" alt="bus img" /> : <img src="/img/busOff.png" alt="bus img" />}
                <p>{currentTravelOption === "bus" ? <span className=" blueText font-bold pb-2 blueBottomBorder">Buses</span> : <span>Buses</span>}</p>
            </div>
        </div>
    );
}

export default TravelOptions;