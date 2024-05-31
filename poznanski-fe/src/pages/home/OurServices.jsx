import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";


const serviceLists = [
    {id:1, title: "Hardware", des: "We bring technologies that solve your business problems", img: "/images/home/services/icon1.png"},
    {id:2, title: "Fast delivery", des: "We deliver your order promptly to your company", img: "/images/home/services/icon2.png"},
    {id:3, title: "Online Ordering", des: "Explore our catalogue and place orders online", img: "/images/home/services/icon3.png"},
    {id:4, title: "Gift Cards", des: "Get discounts when ordering in batches", img: "/images/home/services/icon4.png"},
]

const OurServices = () => {
  const { isDarkMode } = useTheme();
  return (
    <div className="section-container my-16">
      <div className="flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="md:w-1/2">
          <div className="text-left md:w-4/5">
            <p className="subtitle">Choose Poznanski</p>
            <h2 className="title">Customer Service Excellence</h2>
            <p className={`my-5 leading-[30px] text-${isDarkMode ? 'white' : 'black'}`}> Immersed in our dedication, we meticulously select cutting-edge network solutions for enterprises,
                        delivering unparalleled performance and support, 
                        seamlessly integrating technological innovation with attentive service.
            </p>
            
            <Link to="/menu"><button className="bg-red mt-9 font-semibold btn text-white px-8 py-3 rounded-full">
            Shop now
          </button></Link>
            
          </div>
        </div>
        <div className="md:w-1/2">
            <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                {
                    serviceLists.map((service) => (
                        <div key={service.id} className="shadow-md rounded-sm py-5 px-4 text-center space-y-2 text-red transition-all duration-200">
                            <img src={service.img} alt="" className=" mx-auto"/>
                            <h5 className="pt-3 font-semibold"> {service.title}</h5>
                            <p className={`text-${isDarkMode ? 'white' : 'black'} my-5 leading-[30px] `}>{service.des}</p>
                        </div>
                    ))
                }
            </div>
        </div>
      </div>
    </div>
  );
};

export default OurServices;
