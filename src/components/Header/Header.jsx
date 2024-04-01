import { Outlet, useNavigate } from "react-router";
import "./header.css";
import { headerNavlist } from "../Constant/constant";
import { useContext, useEffect, useState } from "react";
import { AppContext } from "../ContextAPI/AppContext";
import { BrowserView, MobileView } from "react-device-detect";
const Header = () => {
    const { token, setToken, nameOfUser, setNameOfUser, isLogin, setIsLogin, currentTravelOption, setCurrentTravelOption } = useContext(AppContext);
    const navigate = useNavigate();
    const isSticky = (e) => {
        const header = document.getElementById('showHeader');
        const scrollTop = window.scrollY;
        scrollTop < 81 ? header?.classList.add('noSticky') : header.classList.remove('noSticky') 
        scrollTop >= 80 ? header?.classList.add('sticky') : header.classList.remove('sticky');
    };
    const handleNav = (id) => {
        setCurrentTravelOption(id);
        navigate("/");
        window.scrollTo(0, 0);
    }
    useEffect(() => {
        window.addEventListener('scroll', isSticky);
        return () => {
            window.removeEventListener('scroll', isSticky);
        };
    });
    return (
        <>
            <BrowserView>
                <header className=" overflow-hidden headerOne">
                    <div className=" flex flex-row m-auto alignCenter justify-between headerBox">
                        <div className=" cursor-pointer mmtlogo">
                            <img className=" w-28 mt-2" src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png" alt="" />
                        </div>
                        <ul className=" flex flex-row gap-6 text-white">
                            <li onClick={()=>{window.scrollTo(400, 400);}} className=" flex flex-row alignCenter cursor-pointer">
                                <span className=" w-6 mx-2 relative flex alignCenter justify-center "><img className=" text-white rotating " src="/img/offerIcon.png" alt="" />
                                    <span className=" absolute text-white font-bold" >%</span></span>
                                <span className=" text-xs text-left">
                                    <p className=" font-bold">Super Offer</p>
                                    <p className=" text-gray-300">Explore great deals & offers</p>
                                </span>
                            </li>
                            
                            <li onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className=" flex flex-row alignCenter p-3 rounded cursor-pointer loginBtn">
                                <span className=" w-6 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white " src="/img/loginLogo.png" alt="" />
                                </span>
                                <span className="flex alignCenter justify-between w-full text-xs text-left">
                                    <p className="font-bold ">{token ? <h1 className=''>Hi, {nameOfUser}</h1> : "Login or Create Account"}</p>
                                    <span><img className=" w-3 opacity-80" src="/img/downArrow.png" alt="" /></span>
                                </span>
                            </li>
                        </ul>
                    </div>
                </header>
                <header id="showHeader" className=" overflow-hidden bg-white headerTwo noSticky">
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
                        <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className=" flex flex-row alignCenter p-3 rounded cursor-pointer loginGreenBtn grayBlurShadow">
                            <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex alignCenter justify-between w-full text-xs text-left">
                                <p className=" font-bold">{token ? <h1 className=''>{nameOfUser}</h1> : "Login or Create Account"}</p>
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
                            <div onClick={()=>{navigate("/")}} className=" cursor-pointer ">
                                <img className=" w-28 " src="/img/mmtBlueLogo.png" alt="" />
                            </div>
                            {/* <ul className=" flex flex-row justify-around alignCenter ml-3 gap-2 ">
                                {headerNavlist?.map((val) => {
                                    return (
                                        <li className="flex flex-col justify-center alignCenter cursor-pointer h-full" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                            <img className={val.id === "HOTELS"? "w-4":"w-5"} src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                            {currentTravelOption === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
                                                <p className=" text-xs text-gray-500">{val.name}</p>}
                                        </li>
                                    )
                                })}
                            </ul> */}
                        </div>
                        <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className=" flex flex-row alignCenter p-1 rounded-lg cursor-pointer grayBlurShadow loginGreenBtn">
                            <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex alignCenter justify-between w-full text-xs text-left">
                                <p className=" font-bold text-base">{token ? <h1 className=' userNameWidth'>{nameOfUser.split(" ")[0]}</h1> : "Login" }</p>
                                <span><img className=" w-3 opacity-80" src="/img/blueDownArrow.png" alt="" /></span>
                            </span>
                        </div>
                    </div>
                </header>
                <header id="showHeader" className=" overflow-hidden bg-white headerTwo noSticky">
                    <div className=" flex flex-row m-auto alignCenter justify-between py-3 px-3 headerBox">
                        <div className=" flex flex-row alignCenter">
                            <div onClick={()=>{navigate("/");window.scrollTo(0, 0);}} className=" cursor-pointer ">
                                <img className=" w-28 " src="/img/mmtBlueLogo.png" alt="" />
                            </div>
                            {/* <ul className=" flex flex-row alignCenter ml-3 gap-2">
                                {headerNavlist?.map((val) => {
                                    return (
                                        <li className="flex flex-col justify-center alignCenter cursor-pointer h-full" onClick={() => { handleNav(val.id) }} key={val.id} id={val.id}>
                                            <img className={val.id === "HOTELS"? "w-4":"w-5"} src={currentTravelOption === val.id ? val.imageOn : val.imageOff} alt="" />
                                            {currentTravelOption === val.id ? <p className=" text-xs blueText font-bold">{val.name}</p> :
                                                <p className=" text-xs text-gray-500">{val.name}</p>}
                                        </li>
                                    )
                                })}
                            </ul> */}
                        </div>
                        <div onClick={() => { setIsLogin({ ...isLogin, status: true }) }} className=" flex flex-row alignCenter p-1 rounded-lg cursor-pointer grayBlurShadow loginGreenBtn">
                            <span className=" w-8 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white" src="/img/mmtLoginLogoGreen.png" alt="" />
                            </span>
                            <span className="flex alignCenter justify-between w-full text-xs text-left">
                                <p className=" text-base font-bold">{token ? <h1 className=' userNameWidth'>{nameOfUser.split(" ")[0]}</h1> : "Login"}</p>
                                <span><img className=" w-3 opacity-80" src="/img/blueDownArrow.png" alt="" /></span> 
                            </span>
                        </div>
                    </div>
                </header>
                
            </MobileView>
            <Outlet />
        </>
    )
}

export default Header;