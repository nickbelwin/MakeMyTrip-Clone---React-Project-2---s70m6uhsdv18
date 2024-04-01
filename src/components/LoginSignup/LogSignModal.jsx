import React, { useContext } from 'react';
import { AppContext } from '../ContextAPI/AppContext';
import "./loginSignup.css";
import SignUpPage from './SignUpPage';
import LoginPage from './LoginPage';


function LogSignModal(props) {
    const { token,setToken, isLogin, setIsLogin } = useContext(AppContext);
    const logout=()=>{
        setIsLogin({...isLogin,status:false});
        setToken(""); 
        localStorage.removeItem("mmtToken");
    }
    return (
        <>
            {!token?
            isLogin.status ?
                <div onClick={() => { setIsLogin({ ...isLogin, status: false }) }} className="flex justify-center alignCenter fixed left-0 top-0 py-9 modalBox z-50">
                    {isLogin.page === "login" ? <LoginPage /> : <SignUpPage />}
                </div>
             : "":
             isLogin.status? <div className="flex justify-center alignCenter fixed left-0 top-0 modalBox z-50">
                <div className='flex alignCenter justify-evenly flex-col rounded-lg px-5 bg-white w-72 h-1/4'>
                    <h1 className=' font-bold text-lg'>Want to Logout?</h1>
                    <div className='grid grid-cols-2 gap-2 w-full'>
                        <button onClick={() => { setIsLogin({...isLogin, status:false}) }} className=' bg-green-500 font-bold py-2 text-white rounded-md'>No</button><button onClick={() => { logout() }} className=' bg-red-500 text-white py-2 font-bold rounded-md'>Yes</button>
                    </div>
                </div>
            </div>:""}
        </>
    );
}

export default LogSignModal;