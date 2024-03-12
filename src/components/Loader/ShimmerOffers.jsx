import React from 'react';

function ShimmerOffers(props) {
    return (
        <div >
            <div className='flex rounded-lg mb-4 text-left p-2 offerCard cardBorder' >
                <div className='offerCardImgBox'>
                    <img className=' rounded-lg' src="" alt="" />
                    <p className=' text-center text-xs mt-2 text-gray-500'></p>
                </div>
                <div className=' pl-4'>
                    <p className=' text-gray-600 font-bold'></p>
                    <h2 className=' font-extrabold'></h2>
                    <p className=' my-3 redborder'></p>
                    <p className=' text-xs font-semibold text-gray-500'></p>
                </div>
            </div>
            <div className='flex rounded-lg text-left p-2 offerCard cardBorder' >
                <div className='offerCardImgBox'>
                    <img className=' rounded-lg' src="" alt="" />
                    <p className=' text-center text-xs mt-2 text-gray-500'></p>
                </div>
                <div className=' pl-4'>
                    <p className=' text-gray-600 font-bold'></p>
                    <h2 className=' font-extrabold'></h2>
                    <p className=' my-3 redborder'></p>
                    <p className=' text-xs font-semibold text-gray-500'></p>
                </div>
            </div>
        </div>
    );
}

export default ShimmerOffers;