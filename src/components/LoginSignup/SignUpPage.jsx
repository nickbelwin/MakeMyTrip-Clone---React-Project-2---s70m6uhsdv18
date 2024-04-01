import React, { useContext, useState } from 'react';
import { AppContext } from '../ContextAPI/AppContext';
import "./loginSignup.css";
import axios from 'axios';

function SignUpPage(props) {
    const {isLogin,setIsLogin, token, setToken, nameOfUser, setNameOfUser } = useContext(AppContext);
    const [user, setUser] = useState({ name: "", email: '', password: '', "appType": "bookingportals" });
    const [nameErrorMsg, setNameErrorMsg] = useState(false);
    const [emailErrorMsg, setEmailErrorMsg] = useState(false);
    const [passErrorMsg, setPassErrorMsg] = useState(false);
    const [userExistErrorMsg, setUserExistErrorMsg] = useState(false);

    const postSignup = async (e) => {
        e.preventDefault();
        if (user.password.length >= 4 && user.name.length >= 1 && user.email.includes("@gmail.com")) {
            try {
                let postData = await fetch("https://academics.newtonschool.co/api/v1/bookingportals/signup",
                    {
                        method: "POST",
                        headers: { 'projectID': 'ywhyenbsclpi', "Content-Type": "application/json", },
                        body: JSON.stringify({ ...user }),

                    });
                let jsonData = await postData.json();
                console.log("jsonData", jsonData);
                if (jsonData.status === "success") {
                    localStorage.setItem("mmtToken", jsonData.token);
                    localStorage.setItem("mmtName", jsonData.data.user.name);
                    setNameOfUser(localStorage.getItem("mmtName"));
                    setToken(localStorage.getItem("mmtToken"));
                    setUser({ name: "", email: '', password: '', "appType": "bookingportals" })
                    setIsLogin({ ...isLogin, status: false })
                }
                else if (jsonData.status == "fail") {
                    console.log("fail");
                    setUserExistErrorMsg(true);
                }
                clearForm();
            } catch (error) {
                console.log("Error:", error);
            }
        }
        else {
            if (!user.name.length >= 1) {
                setNameErrorMsg(true);
            }
            if (!user.email.includes("@gmail.com")) {
                setEmailErrorMsg(true);
            }
            if (!user.password.length < 4) {
                setPassErrorMsg(true);
            }
        }
    }
    const clearForm = () => { 
        console.log("clearForm enter");
        document.getElementById("signupForm").reset();
      }
    const handleChange = (e) => {
        if (e.target.id === "username") {
            if (e.target.value.length >= 1) {
                setNameErrorMsg(false)
            }
            let update = { ...user };
            update = { ...update, name: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "email") {
            if (e.target.value.includes("@gmail.com")) {
                setEmailErrorMsg(false);
            }
            let update = { ...user };
            update = { ...update, email: e.target.value }
            setUser(update);
        }
        else if (e.target.id === "password") {
            if (e.target.value.length >= 4) {
                setPassErrorMsg(false)
            }
            let update = { ...user };
            update = { ...update, password: e.target.value }
            setUser(update);
        }
    }
    console.log("setUserInfo", user);
    return (
        <div onClick={(e)=>{e.stopPropagation();}} className=' relative flex w-2/3 mx-9 signUpBox'>
            <div onClick={() => { setIsLogin({ ...isLogin, status: false }) }} className=' absolute p-2 cursor-pointer bg-white rounded-full logSignCancelBtn'><img className=' w-3' src="/img/cancel.png" alt="" /></div>
            <img className='mt-12 mb-3 rounded-s-xl loginImg' src="/img/loginPersuassionValley.avif" alt="" />
            <div className=' bg-white rounded-xl w-full mt-10 pt-10 px-3'>
                <div className='grid grid-cols-2 gap-3 p-2 rounded-full mb-10 grayBlurShadow'>
                    <p onClick={() => { setIsLogin({...isLogin, page:"login"}) }}  className=' cursor-pointer rounded-full py-1 text-gray-600 font-bold prevent-select'>LOGIN ACCOUNT</p>
                    <p className='cursor-pointer rounded-full py-1 font-bold text-white gradientBlueBack prevent-select'>SIGNUP ACCOUNT</p>
                </div>

                {userExistErrorMsg ? <div className="ml-4 font-semibold text-left text-lg text-red-600"><p>User Already Exists</p></div> : ""}
                <div className=' w-full'>
                    <form id="signupForm" className=" flex px-3 pb-3 flex-col gap-1 text-left w-full inputBox" onSubmit={postSignup}>
                        <div>
                            <label htmlFor="username" className=' text-gray-700 font-semibold'>Enter Name</label>
                            <input id="username" onChange={handleChange} className=" h-10 px-3 rounded loginsignInput inputBox" autoComplete="on" type="text" placeholder="Enter your name" autoFocus />
                            {nameErrorMsg ? <span className=" text-xs ml-1 font-semibold text-red-600">Please Enter Your Name!!!</span> : ""}
                        </div>
                        <div>
                            <label htmlFor="username" className=' text-gray-700 font-semibold'>Enter Email</label>
                            <input id="email" onChange={handleChange} className=" h-10  px-3 rounded loginsignInput inputBox" autoComplete="on" type="email" placeholder="Enter your email" />
                            {emailErrorMsg ? <span className=" text-xs ml-1 font-semibold text-red-600">Enter Correct E-mail!!!</span> : ""}
                        </div>
                        <div>
                            <label htmlFor="username" className=' text-gray-700 font-semibold'>Enter Password</label>
                            <input id="password" onChange={handleChange} className=" h-10  px-3 rounded loginsignInput" autoComplete="current-password" type="password" placeholder="Enter your password" />
                            {passErrorMsg ? <span className=" text-xs ml-1 font-semibold text-red-600">minimum 4 character required for password!!!</span> : ""}
                        </div>
                        <button type="submit" className=" font-semibold py-3 mt-4 rounded-full blueBack text-white loginButton prevent-select">SIGNUP</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUpPage;