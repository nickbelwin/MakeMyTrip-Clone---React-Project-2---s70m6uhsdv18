import React, { memo, useContext, useEffect, useState } from 'react';
import { getAirportName } from '../Constant/constant';
import ReactDOM from "react-dom";
import "./flightAndTrainModal.css";
import { debounce } from 'lodash';
import { AppContext } from '../ContextAPI/AppContext';
function FlightModal(props) {
    const { isOpen, onClose } = props;
    const { flightArray, isModalOpen, fromOrTo, setFromOrTo, setIsModalOpen,source, setSource,destination, setDestination } = useContext(AppContext);
    const [airportName, setAirportName] = useState(flightArray);
    const [filterAirportName, setFilterAirportName] = useState(flightArray);
    const [searchCityName, setSearchCityName] = useState("");

    const handleText = debounce((text) => {
        setSearchCityName(text);
    }, 700);
    const searchAirport = () => {
        if (searchCityName) {
            const filterCity = airportName?.filter((val) => {
                let wordArr = val.city.toLocaleLowerCase();
                wordArr = wordArr.split("");
                let word = wordArr.slice(0, searchCityName.length);
                word = word.join("");
                if (word === searchCityName.toLocaleLowerCase()) {
                    return val;
                }
            });
            console.log(filterCity);
            setFilterAirportName(filterCity);
        }
        else if (!searchCityName) {
            setFilterAirportName(airportName);
        }
    }
    const handleModal = (e, city) => {
        e.stopPropagation();
        if (fromOrTo === "from") {
            setSource(city);
            setIsModalOpen(false);
        }
        else if (fromOrTo === "to") {
            setDestination(city);
            setIsModalOpen(false);
        }

    }
    useEffect(() => {
        searchAirport();
    }, [searchCityName]);

    useEffect(() => {
        console.log("Modal", isModalOpen);
    }, [isModalOpen]);
    return (
        <div className='bg-white py-1 px-1 grayBlurShadow '>
            <div className=' flex alignCenter' ><img className=' h-6 w-6' src="/img/graySearch.png" alt="search" />
                <input type="text" className=' p-1  w-full' onChange={(e) => { handleText(e.target.value) }} placeholder={fromOrTo === "from" ? 'From' : 'To'} /></div>
                <p className=' text-xs'>POPULAR CITIES</p>
            <div className=' overflow-y-scroll no-scrollbar cityList'>
                
                {filterAirportName.length>=1?
                filterAirportName?.map((val) => {
                    return (
                        <>
                            {
                                val.city!==source && val.city!==destination?
                                <div key={val.id} onClick={(e) => { handleModal(e, val.city) }} className=' flex alignCenter w-full px-1 hoverGrayShadow'>
                                    <img className=' h-6 w-6 mr-1' src="/img/flightOff.png" alt="flight" />
                                    <div className='px-1'>
                                        <p className=' text-base font-semibold'>{val.city}</p>
                                        <p className=' w-full text-sm text-gray-400 textOverflowHide'>{val.name}</p>
                                    </div>
                                </div>:""
                            }</>
                    )
                }):<img src="/img/textShimmer.gif" alt="" />}
            </div>
        </div>
    );
}

export default memo(FlightModal);