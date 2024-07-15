import React from "react";
import { useTheme } from "../../hooks/ThemeContext";

const enterpriseFAQs = [
    { id: 1, title: "What are the Key Differences Between Cisco, Juniper, and D-Link Network Devices?", 
      des: "Cisco is known for its robustness and extensive feature set, ideal for large-scale deployments. Juniper focuses on high-performance routing and security capabilities, crucial for enterprise networks. D-Link offers cost-effective solutions with good scalability, suitable for smaller enterprise setups.",
      img: "/images/home/faq.png" },
    
    { id: 2, title: "How to Configure VLANs on Cisco Switches?", 
      des: "To configure VLANs on Cisco switches, access the switch's CLI or web interface. Create VLANs using commands like 'vlan vlan-id' and assign ports to VLANs with 'switchport mode access' followed by 'switchport access vlan vlan-id'. Verify settings with 'show vlan brief'.",
      img: "/images/home/faq.png" },
    
    { id: 3, title: "What are the Benefits of Using Juniper Routers in Enterprise Networks?", 
      des: "Juniper routers offer advanced security features such as IPsec VPN, firewall filters, and DDoS protection, crucial for protecting enterprise data. They also provide high scalability, supporting thousands of routing instances and MPLS tunnels for complex network environments.",
      img: "/images/home/faq.png" },
    
    { id: 4, title: "How to Troubleshoot Common Issues with D-Link Wireless Access Points?", 
      des: "For connectivity issues, ensure AP placement optimizes coverage. Address signal interference by changing channels or using 5GHz band. Update firmware to fix bugs and improve performance. Use D-Link’s management tools for monitoring and diagnostics.",
      img: "/images/home/faq.png" },
    
    { id: 5, title: "What is the Role of Cisco Catalyst Switches in Network Infrastructure?", 
      des: "Cisco Catalyst switches are pivotal for enterprise networks, offering high reliability, scalability, and advanced features like Layer 3 routing, PoE support, and network segmentation via VLANs. They are crucial for data-intensive environments.",
      img: "/images/home/faq.png" },
    
    { id: 6, title: "How to Secure Juniper Firewalls Against Cyber Threats?", 
      des: "Secure Juniper firewalls by enabling features like stateful firewall filters, IPSec VPN, and Unified Threat Management (UTM) services. Regularly update firewall rules, review logs for suspicious activity, and implement multi-factor authentication for admin access.",
      img: "/images/home/faq.png" },
    
    { id: 7, title: "What are the Latest Innovations in D-Link Network Devices?", 
      des: "D-Link introduces innovations like MU-MIMO technology for improved wireless performance, cloud management solutions for centralized network control, and robust security features such as WPA3 encryption to enhance data protection in enterprise networks.",
      img: "/images/home/faq.png" },
    
    { id: 8, title: "How to Scale Cisco Routers for Large-Scale Network Deployments?", 
      des: "Scale Cisco routers by deploying modular chassis systems like Cisco ASR or ISR series. Use protocols like OSPF or BGP for dynamic routing scalability. Optimize memory, CPU, and interface configurations based on traffic patterns and growth projections.",
      img: "/images/home/faq.png" },
    
    { id: 9, title: "How to Implement Quality of Service (QoS) on Juniper Routers?", 
      des: "Implement QoS on Juniper routers to prioritize critical applications. Configure policies using commands like 'set class-of-service interfaces' for traffic shaping and 'set forwarding-classes' for prioritization. Monitor QoS performance with Juniper’s monitoring tools.",
      img: "/images/home/faq.png" },
    
    { id: 10, title: "What are the Advantages of Cisco Meraki for Cloud-Managed Networking?", 
      des: "Cisco Meraki simplifies enterprise network management with cloud-based solutions. It offers centralized control, automatic updates, and advanced security features like integrated firewall and content filtering, ideal for distributed networks.",
      img: "/images/home/faq.png" },
    
    { id: 11, title: "How to Expand Wireless Coverage with D-Link Mesh Wi-Fi Systems?", 
      des: "Extend wireless coverage using D-Link Mesh Wi-Fi systems by strategically placing nodes to eliminate dead zones. Nodes communicate with each other to maintain seamless connectivity. Use D-Link’s mobile app for easy setup and management of mesh networks.",
      img: "/images/home/faq.png" },
    
    { id: 12, title: "What are the Key Features of Cisco Nexus Data Center Switches?", 
      des: "Cisco Nexus switches offer high availability with features like virtual PortChannels and FabricPath for resilient data center architectures. They provide deep visibility into network traffic and support for virtualization technologies like VMware and Hyper-V.",
      img: "/images/home/faq.png" },
];

const FAQ = () => {
    const { isDarkMode } = useTheme();

    return (
        <div className={`max-w-screen-2xl container mx-auto xl:px-24 py-20 ${isDarkMode ? 'bg-dark' : 'bg-transparent'}`}>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                {enterpriseFAQs.map((faq) => (
                    <div key={faq.id} className={`shadow-md rounded-lg flex flex-col justify-between py-5 px-4 text-center transition-all duration-200 ${isDarkMode ? 'bg-opacity-20 bg-gray-600' : 'bg-white'}`}>
                        <img src={faq.img} alt={`Illustration for ${faq.title}`} className="mx-auto mb-4 md:mb-6 max-w-full h-auto" />
                        <h5 className="pt-3 font-semibold">{faq.title}</h5>
                        <p className={`my-5 text-secondary ${isDarkMode ? 'text-white' : 'text-black'}`}>{faq.des}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
