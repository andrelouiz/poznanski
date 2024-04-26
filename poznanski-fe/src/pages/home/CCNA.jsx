import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

const CCNA = () => {
    const { isDarkMode } = useTheme();
    return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 py-40 bg-gradient-to-r from-0% from-[#FAFAFA] to-[#FCFCFC] to-100% ${isDarkMode ? 'dark' : ''}`}>
            <div className="flex flex-col md:flex-row items-center justify-between gap-12">
                <div className="md:w-1/2">
                    <div className="text-left mx-11 md:w-4/5">
                        <p className="subtitle">CCNA training</p>
                        <h2 className="title">Learn CCNA with JeremyIT</h2>
                        <p className="my-5 text-secondary leading-[30px]" >                
                        Studying for the Cisco Certified Network Associate (CCNA) certification opens doors to a world of networking expertise. CCNA training equips learners with the fundamental knowledge and practical skills needed to design, implement, and troubleshoot network infrastructure. Whether you're delving into the basics of networking or seeking to advance your career in IT, CCNA offers a comprehensive curriculum covering topics such as network fundamentals, routing and switching, security, automation, and more.
                        </p>
                        
                        <Link mailto="customerservice@poznanski.com"><button className="bg-red mt-9 font-semibold btn text-white px-8 py-3 flex justify-between rounded-full">
                            Contact Us
                        </button></Link>
                    </div>
                </div>
                <div className="md:w-1/2">
                <iframe width="560" height="315" src="https://www.youtube.com/embed/H8W9oMNSuwo?si=y8ptyHH-IyzmbAiV" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
                </div>
            </div>
        </div>
    );
};

export default CCNA;
