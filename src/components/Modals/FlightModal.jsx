import React, { memo, useContext, useEffect, useState } from 'react';
import { getAirportName } from '../Constant/constant';
import ReactDOM from "react-dom";
import "./flightAndTrainModal.css";
import { debounce } from 'lodash';
import { AppContext } from '../ContextAPI/AppContext';
import ShimmerLocation from '../Loader/ShimmerLocation';
function FlightModal(props) {
    const { isOpen, onClose } = props;
    const { flightArray, isModalOpen, fromOrTo, setFromOrTo, setIsModalOpen,source, setSource,destination, setDestination } = useContext(AppContext);
    const [airportName, setAirportName] = useState(flightArray);
    const [filterAirportName, setFilterAirportName] = useState(flightArray);
    const [searchCityName, setSearchCityName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleText = debounce((text) => {
        setSearchCityName(text);
    }, 700);
    const searchAirport = () => {
        if (searchCityName) {
            const filterCity = airportName?.filter((val) => {
                let wordArr = val.city?.toLocaleLowerCase();
                wordArr = wordArr?.split("");
                let word = wordArr?.slice(0, searchCityName.length);
                word = word?.join("");
                if (word === searchCityName?.toLocaleLowerCase()) {
                    return val;
                }
            });
            console.log(filterCity);
            if(filterAirportName[0]?.city!==source && filterAirportName[0]?.city!==destination){
                setFilterAirportName(filterCity);
            }
            else{
                setFilterAirportName([]);
            }
            setLoading(false);
        }
        else if (!searchCityName) {
            setLoading(false);
            setFilterAirportName(airportName);
        }
        setLoading(false);
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

    return (
        <div className='bg-white py-1 px-1 grayBlurShadow '>
            <div className=' flex alignCenter' ><img className=' h-6 w-6' src="/img/graySearch.png" alt="search" />
                <input type="text" className=' p-1  w-full cityNameSearchInput' onChange={(e) => { setLoading(true); handleText(e.target.value); }} autoFocus placeholder={fromOrTo === "from" ? 'From' : 'To'} /></div>
                <p className=' text-xs'>POPULAR CITIES</p>
            <div className=' overflow-y-scroll no-scrollbar cityList'> 
                {!loading && filterAirportName.length>=1?
                filterAirportName?.map((val) => {
                    return (
                        <>
                            {
                                val.city!==source && val.city!==destination?
                                <div key={val.id} onClick={(e) => { handleModal(e, val.city); }} className=' flex alignCenter w-full px-1 hoverGrayShadow'>
                                    <img className=' h-6 w-6 mr-1' src="/img/flightOff.png" alt="flight" />
                                    <div className='px-1'>
                                        <p className=' text-base font-semibold'>{val.city}</p>
                                        <p className=' w-full text-sm text-gray-400 textOverflowHide'>{val.name}</p>
                                    </div>
                                </div>:""
                            }</>
                    )
                }): !loading? <><h3 className=' font-semibold text-red-600' >Sorry!!</h3><p className=' font-semibold'>Your search is not available.</p></>: <ShimmerLocation/> }
            </div>
        </div>
    );
}

export default memo(FlightModal);