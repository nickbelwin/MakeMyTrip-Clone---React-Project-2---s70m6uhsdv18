import { Outlet } from "react-router";
import "./header.css";
const Header = () => {

    return (
        <>
            <header className=" overflow-hidden headerOne">
                <div className=" flex flex-row m-auto alignCenter justify-between headerBox">
                    <div className=" cursor-pointer mmtlogo">
                        <img className=" w-28 mt-2" src="https://imgak.mmtcdn.com/pwa_v3/pwa_hotel_assets/header/mmtLogoWhite.png" alt="" />
                    </div>
                    <ul className=" flex flex-row text-white gap-3">
                        <li className=" flex flex-row alignCenter cursor-pointer">
                            <span className=" w-6 mx-2 relative flex alignCenter justify-center "><img className=" text-white rotating " src="/img/offerIcon.png" alt="" />
                                <span className=" absolute text-white font-bold" >%</span></span>
                            <span className=" text-xs text-left">
                                <p className=" font-bold">Super Offer</p>
                                <p className=" text-gray-300">Explore great deals & offers</p>
                            </span>
                        </li>
                        {/* <li className=" flex flex-row alignCenter">
                            <span className=" w-10 relative flex alignCenter justify-center "><img className=" absolute text-white " src="/img/myBizz1.png" alt="" />
                            </span>
                            <span className=" text-xs">
                                <p>Super Offer</p>
                                <p>Explore great deals & offers</p>
                            </span>
                        </li> */}
                        <li className=" flex flex-row alignCenter cursor-pointer">
                            <span className=" w-4 relative flex alignCenter justify-center mx-2"><img className=" absolute text-white " src="/img/mytrip.png" alt="" />
                            </span>
                            <span className=" text-xs text-left">
                                <p className=" font-bold">My Trips</p>
                                <p className=" text-gray-300">Manage your bookings</p>
                            </span>
                        </li>
                        <li className=" flex flex-row alignCenter p-3 rounded cursor-pointer loginBtn">
                            <span className=" w-6 relative flex alignCenter justify-center mr-2"><img className=" absolute text-white " src="/img/loginLogo.png" alt="" />
                            </span>
                            <span className="flex alignCenter justify-between w-full text-xs text-left">
                                <p className=" ">Login or Create Account</p>
                                <span><img className=" w-3 opacity-80" src="/img/downArrow.png" alt="" /></span>
                            </span>
                        </li>
                    </ul>
                </div>
            </header>
            <Outlet />
        </>
    )
}

export default Header;