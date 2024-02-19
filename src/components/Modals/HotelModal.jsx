import React, { memo, useContext, useEffect, useState } from 'react';
import "./flightAndTrainModal.css";
import { debounce } from 'lodash';
import { AppContext } from '../ContextAPI/AppContext';
import { cityListArray } from '../Constant/constant';

function HotelModal(props) {
    const {hotelLocation,setHotelLocation,hotelArray, isModalOpen, fromOrTo, setFromOrTo, setIsModalOpen,source, setSource,destination, setDestination } = useContext(AppContext);
    const [hotelName, setHotelName] = useState(hotelArray);
    const [filterHotelName, setFilterHotelName] = useState(hotelArray);
    const [searchCityName, setSearchCityName] = useState("");

    const handleText = debounce((text) => {
        setSearchCityName(text);
    }, 700);
    const searchAirport = () => {
        if (searchCityName) {
            const filterCity = hotelName?.filter((val) => {
                let wordArr = val.name?.toLocaleLowerCase();
                let wordArr2= val.location?.toLocaleLowerCase();
                wordArr = wordArr.split("");
                wordArr2= wordArr2.split("");
                let word = wordArr.slice(0, searchCityName.length);
                let word2 = wordArr2.slice(0, searchCityName.length);
                word = word.join("");
                word2 = word2.join("");
                if (word === searchCityName?.toLocaleLowerCase() || word2 === searchCityName?.toLocaleLowerCase()) {
                    return val;
                }
            });
            console.log(filterCity);
            setFilterHotelName(filterCity);
        }
        else if (!searchCityName) {
            setFilterHotelName(hotelName);
        }
    }
    const handleModal = (e, hotel) => {
        e.stopPropagation();
            setHotelLocation(hotel);
            setIsModalOpen(false);
        

    }
    useEffect(() => {
        searchAirport();
    }, [searchCityName]);

    return (
        <div className='bg-white py-1 px-1 grayBlurShadow '>
            <div className=' flex alignCenter' ><img className=' h-6 w-6' src="/img/graySearch.png" alt="search" />
                <input type="text" className=' p-1  w-full' onChange={(e) => { handleText(e.target.value) }} placeholder={fromOrTo === "from" ? 'From' : 'To'} /></div>
                <p className=' text-xs mb-1'>Hotels</p>
            <div className=' overflow-y-scroll no-scrollbar cityList'>
                {filterHotelName.length>=1?
                filterHotelName?.map((val) => {
                    return (
                        <>
                            {
                                val.location!==hotelLocation?
                                <div key={val.id} onClick={(e) => { handleModal(e, val.location) }} className=' flex alignCenter w-full px-1 hoverGrayShadow'>
                                    <img className=' w-6 h-6 mr-1' src="/img/hotelOff.png" alt="hotel img" />
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

export default memo(HotelModal);