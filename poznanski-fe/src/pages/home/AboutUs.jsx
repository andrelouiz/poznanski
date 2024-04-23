import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

const teamHighlights = [
    {id: 1, title: "Experienced Engineers", des: "Highly skilled professionals with extensive networking expertise.", img: "/images/home/engineer.png"},
    {id: 2, title: "Cutting-Edge Technology", des: "We use the latest technology to ensure the best performance and reliability.", img: "images/home/virtual.png"},
    {id: 3, title: "Customer-Focused Support", des: "We provide dedicated support to ensure your networking needs are met efficiently.", img: "/images/home/service.png"},
    {id: 4, title: "Global Reach", des: "We power businesses worldwide, ensuring a global standard of quality.", img: "images/home/targeting.png"},
]

const AboutUs = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 py-72 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <div className="text-left md:w-4/5">
                        <p className="subtitle">Why Choose Us</p>
                        <h2 className="title">Driven by Innovation, Committed to Excellence</h2>
                        <p className="my-5 text-secondary leading-[30px]" >
                            At Poznanski, we are committed to delivering state-of-the-art network devices that empower modern businesses and enthusiasts alike. Our innovative solutions are designed to enhance efficiency and security across your network infrastructure.
                        </p>
                        
                        <Link mailto="customerservice@poznanski.com"><button className="bg-red mt-9 font-semibold btn text-white px-8 py-3 flex justify-between rounded-full">
                            Contact Us
                        </button></Link>
                    </div>
                </div>
                <div className="md:w-1/2">
                    <div className="grid sm:grid-cols-2 grid-cols-1 gap-8 items-center">
                        {
                            teamHighlights.map((highlight) => (
                                <div key={highlight.id} className="shadow-md rounded-lg py-5 px-4 text-center space-y-1 text-red cursor-pointer hover:border hover:border-indigo-600 transition-all duration-200 bg-gray-800">
                                    <img src={highlight.img} alt="" className="mx-auto"/>
                                    <h5 className="pt-3 font-semibold">{highlight.title}</h5>
                                    <p className="text-white">{highlight.des}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AboutUs;
