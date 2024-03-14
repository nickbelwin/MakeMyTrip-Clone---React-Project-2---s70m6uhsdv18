import React, { useContext } from 'react';
import { headerNavlist } from '../Constant/constant';
import { Outlet, useNavigate } from 'react-router';
import { AppContext } from '../ContextAPI/AppContext';
import { BrowserView, MobileView } from 'react-device-detect';
import { BrowserRouter } from 'react-router-dom';

function HeaderWhite(props) {
    const { token, setToken, nameOfUser, setNameOfUser, isLogin, setIsLogin, currentTravelOption, setCurrentTravelOption } = useContext(AppContext);
    const navigate = useNavigate();
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    return (
        <>
            <BrowserView>
            <header id="showHeader" className=" overflow-hidden bg-white headerTwo">
                <div className=" flex flex-row m-auto alignCenter justify-between py-3 headerBox">
                    <div className=" flex flex-row alignCenter">
                        <div className=" cursor-pointer mmtlogo">
                            <img className=" w-28 " src="/img/mmtBlueLogo.png" alt="" />
                        </div>
                        <ul className=" flex flex-row alignCenter ml-8 gap-10">
                            {headerNavlist?.map((val) => {
                                return (
                                    <li className="flex flex-col cursor-pointer h-full justify-between" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                        <img className=" w-9" src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                        {currentTravelOption === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
                                            <p className=" text-xs text-gray-500">{val.name}</p>}
                                    </li>
                                )
                            })}
                        </ul>
                    </div>
                    <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className={`flex flex-row alignCenter p-3 rounded cursor-pointer loginGreenBtn ${token ? "borderGray grayBlurShadow" : ""}`}>
                        <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                        </span>
                        <span className="flex alignCenter justify-between w-full text-xs text-center">
                            <p className=" font-bold">{token ? <h1 className='text-base '>Hi {nameOfUser}</h1> : "Login or Create Account"}</p>
                            <span><img className=" w-3 opacity-80" src="/img/blueDownArrow.png" alt="" /></span>
                        </span>
                    </div>
                </div>
            </header>
            </BrowserView>
            <MobileView>
                <header className=" headerTwo">
                    <div className=" flex flex-row m-auto alignCenter justify-between py-3 px-3 headerBox">
                        <div className=" flex flex-row alignCenter">
                            <div className=" cursor-pointer ">
                                <img className=" w-20 " src="/img/mmtBlueLogo.png" alt="" />
                            </div>
                            <ul className=" flex flex-row justify-around alignCenter ml-3 gap-2 headerNavList">
                                {headerNavlist?.map((val) => {
                                    return (
                                        <li className="flex flex-col justify-center alignCenter cursor-pointer h-full" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                            <img className={val.id === "HOTELS" ? "w-4" : "w-5"} src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                            {currentTravelOption === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
                                                <p className=" text-xs text-gray-500">{val.name}</p>}
                                        </li>
                                    )
                                })}
                            </ul>
                        </div>
                        <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className=" flex flex-row alignCenter p-1 rounded-lg cursor-pointer grayBlurShadow loginGreenBtn">
                            <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex alignCenter justify-between w-full text-xs text-left">
                                <p className=" font-bold">{token ? <h1 className='text-lg'>{nameOfUser}</h1> : "Login or Create Account"}</p>
                                <span><img className=" w-3 opacity-80" src="/img/blueDownArrow.png" alt="" /></span>
                            </span>
                        </div>
                    </div>
                </header>
            </MobileView>
            <Outlet />
        </>
    );
}

export default HeaderWhite;