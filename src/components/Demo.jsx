import React from 'react';
import HeaderWhite from './Header/HeaderWhite';

function Demo(props) {
    return (
        <div>
            <><HeaderWhite />
                    <div className='pb-5 mt-20 bookingSuccess grayBlurShadow'>
                        <div className='bookFlightBlueBack py-2'>
                            <img className=' w-1/2 m-auto' src="/img/bookFlight.png" alt="" />
                        </div>
                        <h1 className=' text-3xl font-bold bg-green-100 text-green-500 py-4'>Booking Successful</h1>
                        <div className='grid grid-cols-2 borderDottedBottomGray borderDottedTopGray'>
                            <div className=' p-4'>
                                <h1 className=' text-gray-500 text-sm'>CHECK IN</h1>
                                <h1 className=' text-gray-600'>{}<span className=' text-xl font-bold text-black'></span></h1>
                                <h1 className=' font-medium'>12 AM</h1>
                            </div>
                            <div className='p-4 borderLeftGray'>
                                <h1 className=' text-gray-500 text-sm'>CHECK OUT</h1>
                                <h1 className=' text-gray-600'>{}<span className=' text-xl font-bold text-black'></span></h1>
                                <h1 className=' font-medium'>12 AM</h1>
                            </div>
                        </div>
                        <div className='grid grid-cols-2'>
                            <div className=' p-3 borderBottomGray'>
                                <h1 className=' font-semibold'>Source:</h1>
                                <h2 className=' text-gray-500 font-semibold'></h2>
                            </div>
                            <div className=' p-3 borderBottomGray borderLeftGray'>
                                <h1 className=' font-semibold'>Destination:</h1>
                                <h2 className=' text-gray-500 font-semibold'></h2>
                            </div>
                        </div>
                        <div className='p-3 borderBottomGray bg-green-200'>
                            <h1 className=' font-semibold'>Status:</h1>
                            <h2 className=' text-green-600 text-lg font-bold'></h2>
                        </div>
                        <div className=' px-3'>
                            <button className=' py-3 bg-red-600 text-white font-bold w-full px-10 rounded-lg mt-3'>Back to home</button>
                        </div>
                    </div></>
        </div>
    );
}

export default Demo;