import React from "react";
import bannerImg from "/images/home/banner.png";
import { useTheme } from "../hooks/ThemeContext";
import { Link } from "react-router-dom";

const Banner = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className={`max-w-screen-2xl container mx-auto xl:px-24 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
      <div className={`py-24 flex flex-col md:flex-row-reverse items-center justify-between gap-8 ${isDarkMode ? 'text-white' : ''}`}>

        {/* img */}
        <div className="md:w-1/2">
          <img src={bannerImg} alt="" />
          <div className="flex flex-col md:flex-row items-center justify-around -mt-14 gap-4">
            <div className="items-center gap-3 shadow-sm">
            </div>
         
          </div>
        </div>

        {/* texts */}
        <div className="md:w-1/2 px-4 space-y-7">
        <h2 className="md:text-5xl text-4xl font-bold md:leading-snug leading-snug">
           Reliable Network Devices For Your <span className="text-red">Business Needs</span> 
          </h2>
          <p className={`text-xl text-${isDarkMode ? 'white' : 'black'}`}> Meticulously selected cutting-edge network solutions for enterprises
            </p>
          <Link to="/menu"><button className="bg-red mt-9 font-semibold btn text-white px-8 py-3 rounded-full">
            Shop now
          </button></Link>
          
        </div>
        
      </div>
    </div>
  );
};

export default Banner;
