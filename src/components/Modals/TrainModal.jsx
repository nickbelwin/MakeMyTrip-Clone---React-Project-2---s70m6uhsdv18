import React, { memo, useContext, useEffect, useState } from 'react';
import "./flightAndTrainModal.css";
import { debounce } from 'lodash';
import { AppContext } from '../ContextAPI/AppContext';
import { cityListArray } from '../Constant/constant';

function TrainModal(props) {
    const { flightArray, isModalOpen, fromOrTo, setFromOrTo, setIsModalOpen,source, setSource,destination, setDestination } = useContext(AppContext);
    const [trainName, setTrainName] = useState(cityListArray);
    const [filterTrainName, setFilterTrainName] = useState(cityListArray);
    const [searchCityName, setSearchCityName] = useState("");

    const handleText = debounce((text) => {
        setSearchCityName(text);
    }, 700);
    const searchAirport = () => {
        if (searchCityName) {
            const filterCity = trainName?.filter((val) => {
                let wordArr = val.city.toLocaleLowerCase();
                wordArr = wordArr.split("");
                let word = wordArr.slice(0, searchCityName.length);
                word = word.join("");
                if (word === searchCityName.toLocaleLowerCase()) {
                    return val;
                }
            });
            console.log(filterCity);
            setFilterTrainName(filterCity);
        }
        else if (!searchCityName) {
            setFilterTrainName(trainName);
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
                <p className=' text-xs mb-1'>POPULAR CITIES</p>
            <div className=' overflow-y-scroll no-scrollbar cityList'>
                
                {filterTrainName.length>=1?
                filterTrainName?.map((val) => {
                    return (
                        <>
                            {
                                val.name!==source && val.location!==destination?
                                <div key={val.name} onClick={(e) => { handleModal(e, val.name) }} className=' flex alignCenter w-full px-1 hoverGrayShadow'>
                                    <img className=' w-6 h-6 mr-1' src="/img/trainOff.png" alt="train img" />
                                    <div className='px-1'>
                                        <p className=' text-base font-semibold'>{val.name}</p>
                                        <p className=' w-full text-sm text-gray-400 textOverflowHide'>{val.location}</p>
                                    </div>
                                </div>:""
                            }</>
                    )
                }):<img src="/img/textShimmer.gif" alt="" />}
            </div>
        </div>
    );
}

export default memo(TrainModal);