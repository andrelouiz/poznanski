import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "../../hooks/ThemeContext";

const teamHighlights = [
    {id: 1, title: "What are the Key Differences Between Cisco, Juniper, and D-Link Network Devices?", des: "Explore the unique features and functionalities offered by each brand's network devices to help you make an informed decision.", img: "/images/home/faq.png"},
    {id: 2, title: "How to Configure VLANs on Cisco Switches?", des: "Learn step-by-step instructions on setting up Virtual LANs (VLANs) on Cisco switches to optimize network traffic management.", img: "/images/home/faq.png"},
    {id: 3, title: "What are the Benefits of Using Juniper Routers in Enterprise Networks?", des: "Discover the advantages of deploying Juniper routers, such as enhanced security features and high-performance routing capabilities.", img: "/images/home/faq.png"},
    {id: 4, title: "How to Troubleshoot Common Issues with D-Link Wireless Access Points?", des: "Find solutions to frequently encountered problems with D-Link wireless access points, including connectivity issues and signal interference.", img: "/images/home/faq.png"},
    {id: 5, title: "What is the Role of Cisco Catalyst Switches in Network Infrastructure?", des: "Understand the significance of Cisco Catalyst switches in network architecture and their impact on data transmission and network management.", img: "/images/home/faq.png"},
    {id: 6, title: "How to Secure Juniper Firewalls Against Cyber Threats?", des: "Get expert tips on configuring and optimizing Juniper firewalls to protect your network from cyberattacks and unauthorized access attempts.", img: "/images/home/faq.png"},
    {id: 7, title: "What are the Latest Innovations in D-Link Network Devices?", des: "Stay updated on the newest features and technologies introduced by D-Link in their network devices, including advancements in Wi-Fi standards and management capabilities.", img: "/images/home/faq.png"},
    {id: 8, title: "How to Scale Cisco Routers for Large-Scale Network Deployments?", des: "Learn scalable deployment strategies for Cisco routers to accommodate growing network demands and ensure optimal performance across enterprise environments.", img: "/images/home/faq.png"},
    {id: 9, title: "How to Implement Quality of Service (QoS) on Juniper Routers?", des: "Discover techniques for configuring Quality of Service (QoS) on Juniper routers to prioritize network traffic and ensure optimal performance for critical applications.", img: "/images/home/faq.png"},
    {id: 10, title: "What are the Advantages of Cisco Meraki for Cloud-Managed Networking?", des: "Learn about the benefits of Cisco Meraki's cloud-managed networking solutions, including simplified deployment, centralized management, and enhanced security features.", img: "/images/home/faq.png"},
    {id: 11, title: "How to Expand Wireless Coverage with D-Link Mesh Wi-Fi Systems?", des: "Explore strategies for extending wireless coverage and eliminating dead zones using D-Link Mesh Wi-Fi systems, which provide seamless connectivity and scalability for home and business environments.", img: "/images/home/faq.png"},
    {id: 12, title: "What are the Key Features of Cisco Nexus Data Center Switches?", des: "Gain insights into the advanced features and capabilities of Cisco Nexus data center switches, including high availability, virtualization support, and deep visibility for network monitoring and management.", img: "/images/home/faq.png"},
];




  
  const FAQ = () => {
      const { isDarkMode } = useTheme();
      return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 py-40 ${isDarkMode ? 'bg-dark' : 'bg-transparent'}`}>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {teamHighlights.map((highlight) => (
              <div key={highlight.id} className={`shadow-md rounded-lg flex flex-col justify-between py-5 px-4 text-center transition-all duration-200 ${isDarkMode ? 'bg-opacity-20 bg-gray-600' : 'bg-white'}`}>
                <img src={highlight.img} alt={highlight.title} className="mx-auto mb-4 md:mb-6 max-w-full h-auto" />
                <h5 className="pt-3 font-semibold">{highlight.title}</h5>
                                    <p className={`my-5 text-secondary text-${isDarkMode ? 'white' : 'black'}`}> 
                                    {highlight.des}</p>
              </div>
            ))}
          </div>
        </div>
      );
  };
  
  export default FAQ;
  