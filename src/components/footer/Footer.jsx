import React from 'react';
import "./footer.css";
import { BrowserView, MobileView } from 'react-device-detect';

function Footer(props) {
    return (
        <>
            <BrowserView>
                <div className='flex alignCenter justify-between bg-black text-white py-14 px-28'>
                    <div className='flex alignCenter gap-8'>
                        <a href="https://twitter.com/makemytrip/" target='blank'><img className=' w-8' src="/img/twitter.png" alt="twitter" /></a>
                        <a href="https://www.facebook.com/makemytrip/" target='blank'><img className=' w-7' src="/img/facebook.png" alt="facebook" /></a>
                    </div>
                    <div>
                        <h1 className=' text-right'>©2024 MAKEMYTRIP PVT. LTD.</h1>
                        <p className=' text-right'>Country India USA UAE</p>
                    </div>
                </div>
            </BrowserView>
            <MobileView>
                <div className='flex flex-col alignCenter justify-between bg-black text-white footer pt-12 pb-1'>
                    <div className='flex flex-col alignCenter gap-4'>
                        <div className='flex alignCenter gap-8'>
                            <a href="https://twitter.com/makemytrip/" target='blank'><img className=' w-5' src="/img/twitter.png" alt="twitter" /></a>
                            <a href="https://www.facebook.com/makemytrip/" target='blank'><img className=' w-5' src="/img/facebook.png" alt="facebook" /></a>

                        </div>
                        <div className='flex gap-4'>
                            <a href="https://play.google.com/store/games?hl=en_IN&gl=US" target='blank'><img src="/img/playstore.avif" alt="playstore" /></a>
                            <a href="https://www.apple.com/in/app-store/" target='blank'><img src="/img/iosAppstore.avif" alt="app store" /></a>
                        </div>
                    </div>
                    <div>
                        <h1 className=' text-xs'>©2024 MAKEMYTRIP PVT. LTD.</h1>

                    </div>
                </div>
            </MobileView>
        </>
    );
}

export default Footer;