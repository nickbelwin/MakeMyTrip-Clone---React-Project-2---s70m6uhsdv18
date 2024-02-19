import React from 'react';
import "./loader.css"

function ShimmerLocation() {
    return (
        <div className="  mt-2 overflow-hidden ">
            <h1 className="relative overflow-hidden mb-2 loader">
            <div className=' z-10 shimmer'></div>
            </h1>
            <p className=" relative overflow-hidden loader">
            <div className=' z-10 shimmer'></div>
            </p>
            
        </div>
    );
}

export default ShimmerLocation;