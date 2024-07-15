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
                        <p className={`my-5 text-secondary leading-[30px] text-${isDarkMode ? 'white' : 'black'}`}>
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
            <div className="mt-20 mx-11 md:w-4/5 text-left">
                <h3 className="subtitle">Exam Description</h3>
                <p className={`my-5 text-secondary leading-[30px] text-${isDarkMode ? 'white' : 'black'}`}>
                    To earn your CCNA certification, you must pass the 200-301 CCNA exam. This 120-minute exam tests your knowledge of:
                </p>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>Network Fundamentals</li>
                    <li>Network Access</li>
                    <li>IP Connectivity</li>
                    <li>IP Services</li>
                    <li>Security Fundamentals</li>
                    <li>Automation and Programmability</li>
                </ul>
                <h4 className="mt-10 subtitle">1.0 Network Fundamentals</h4>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>1.1 Explain the role and function of network components
                        <ul className="list-disc ml-8">
                            <li>1.1.a Routers</li>
                            <li>1.1.b Layer 2 and Layer 3 switches</li>
                            <li>1.1.c Next-generation firewalls and IPS</li>
                            <li>1.1.d Access points</li>
                            <li>1.1.e Controllers (Cisco DNA Center and WLC)</li>
                            <li>1.1.f Endpoints</li>
                            <li>1.1.g Servers</li>
                            <li>1.1.h PoE</li>
                        </ul>
                    </li>
                    <li>1.2 Describe characteristics of network topology architectures
                        <ul className="list-disc ml-8">
                            <li>1.2.a Two-tier</li>
                            <li>1.2.b Three-tier</li>
                            <li>1.2.c Spine-leaf</li>
                            <li>1.2.d WAN</li>
                            <li>1.2.e Small office/home office (SOHO)</li>
                            <li>1.2.f On-premise and cloud</li>
                        </ul>
                    </li>
                    <li>1.3 Compare physical interface and cabling types
                        <ul className="list-disc ml-8">
                            <li>1.3.a Single-mode fiber, multimode fiber, copper</li>
                            <li>1.3.b Connections (Ethernet shared media and point-to-point)</li>
                        </ul>
                    </li>
                    <li>1.4 Identify interface and cable issues (collisions, errors, mismatch duplex, and/or speed)</li>
                    <li>1.5 Compare TCP to UDP</li>
                    <li>1.6 Configure and verify IPv4 addressing and subnetting</li>
                    <li>1.7 Describe the need for private IPv4 addressing</li>
                    <li>1.8 Configure and verify IPv6 addressing and prefix</li>
                    <li>1.9 Describe IPv6 address types
                        <ul className="list-disc ml-8">
                            <li>1.9.a Unicast (global, unique local, and link local)</li>
                            <li>1.9.b Anycast</li>
                            <li>1.9.c Multicast</li>
                            <li>1.9.d Modified EUI 64</li>
                        </ul>
                    </li>
                    <li>1.10 Verify IP parameters for Client OS (Windows, Mac OS, Linux)</li>
                    <li>1.11 Describe wireless principles
                        <ul className="list-disc ml-8">
                            <li>1.11.a Nonoverlapping Wi-Fi channels</li>
                            <li>1.11.b SSID</li>
                            <li>1.11.c RF</li>
                            <li>1.11.d Encryption</li>
                        </ul>
                    </li>
                    <li>1.12 Explain virtualization fundamentals (server virtualization, containers, and VRFs)</li>
                    <li>1.13 Describe switching concepts
                        <ul className="list-disc ml-8">
                            <li>1.13.a MAC learning and aging</li>
                            <li>1.13.b Frame switching</li>
                            <li>1.13.c Frame flooding</li>
                            <li>1.13.d MAC address table</li>
                        </ul>
                    </li>
                </ul>
                <h4 className="mt-10 subtitle">2.0 Network Access</h4>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>2.1 Configure and verify VLANs (normal range) spanning multiple switches
                        <ul className="list-disc ml-8">
                            <li>2.1.a Access ports (data and voice)</li>
                            <li>2.1.b Default VLAN</li>
                            <li>2.1.c InterVLAN connectivity</li>
                        </ul>
                    </li>
                    <li>2.2 Configure and verify interswitch connectivity
                        <ul className="list-disc ml-8">
                            <li>2.2.a Trunk ports</li>
                            <li>2.2.b 802.1Q</li>
                            <li>2.2.c Native VLAN</li>
                        </ul>
                    </li>
                    <li>2.3 Configure and verify Layer 2 discovery protocols (Cisco Discovery Protocol and LLDP)</li>
                    <li>2.4 Configure and verify (Layer 2/Layer 3) EtherChannel (LACP)</li>
                    <li>2.5 Interpret basic operations of Rapid PVST+ Spanning Tree Protocol
                        <ul className="list-disc ml-8">
                            <li>2.5.a Root port, root bridge (primary/secondary), and other port names</li>
                            <li>2.5.b Port states (forwarding/blocking)</li>
                            <li>2.5.c PortFast</li>
                        </ul>
                    </li>
                    <li>2.6 Describe Cisco Wireless Architectures and AP modes</li>
                    <li>2.7 Describe physical infrastructure connections of WLAN components (AP, WLC, access/trunk ports, and LAG)</li>
                    <li>2.8 Describe AP and WLC management access connections (Telnet, SSH, HTTP, HTTPS, console, and TACACS+/RADIUS)</li>
                    <li>2.9 Interpret the wireless LAN GUI configuration for client connectivity, such as WLAN creation, security settings, QoS profiles, and advanced settings</li>
                </ul>
                <h4 className="mt-10 subtitle">3.0 IP Connectivity</h4>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>3.1 Interpret the components of routing table
                        <ul className="list-disc ml-8">
                            <li>3.1.a Routing protocol code</li>
                            <li>3.1.b Prefix</li>
                            <li>3.1.c Network mask</li>
                            <li>3.1.d Next hop</li>
                            <li>3.1.e Administrative distance</li>
                            <li>3.1.f Metric</li>
                            <li>3.1.g Gateway of last resort</li>
                        </ul>
                    </li>
                    <li>3.2 Determine how a router makes a forwarding decision by default
                        <ul className="list-disc ml-8">
                            <li>3.2.a Longest prefix match</li>
                            <li>3.2.b Administrative distance</li>
                            <li>3.2.c Routing protocol metric</li>
                        </ul>
                    </li>
                    <li>3.3 Configure and verify IPv4 and IPv6 static routing
                        <ul className="list-disc ml-8">
                            <li>3.3.a Default route</li>
                            <li>3.3.b Network route</li>
                            <li>3.3.c Host route</li>
                            <li>3.3.d Floating static</li>
                        </ul>
                    </li>
                    <li>3.4 Configure and verify single area OSPFv2
                        <ul className="list-disc ml-8">
                            <li>3.4.a Neighbor adjacencies</li>
                            <li>3.4.b Point-to-point</li>
                            <li>3.4.c Broadcast (DR/BDR selection)</li>
                            <li>3.4.d Router ID</li>
                        </ul>
                    </li>
                    <li>3.5 Describe the purpose, functions, and concepts of first hop redundancy protocols</li>
                </ul>
                <h4 className="mt-10 subtitle">4.0 IP Services</h4>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>4.1 Configure and verify inside source NAT using static and pools</li>
                    <li>4.2 Configure and verify NTP operating in a client and server mode</li>
                    <li>4.3 Explain the role of DHCP and DNS within the network</li>
                    <li>4.4 Explain the function of SNMP in network operations</li>
                    <li>4.5 Describe the use of syslog features including facilities and levels</li>
                    <li>4.6 Configure and verify DHCP client and relay</li>
                    <li>4.7 Explain the forwarding per-hop behavior (PHB) for QoS, such as classification, marking, queuing, congestion, policing, and shaping</li>
                    <li>4.8 Configure network devices for remote access using SSH</li>
                    <li>4.9 Describe the capabilities and functions of TFTP/FTP in the network</li>
                </ul>
                <h4 className="mt-10 subtitle">5.0 Security Fundamentals</h4>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>5.1 Define key security concepts (threats, vulnerabilities, exploits, and mitigation techniques)</li>
                    <li>5.2 Describe security program elements (user awareness, training, and physical access control)</li>
                    <li>5.3 Configure and verify device access control using local passwords</li>
                    <li>5.4 Describe security password policies elements, such as management, complexity, and password alternatives (multifactor authentication, certificates, and biometrics)</li>
                    <li>5.5. Describe IPsec remote access and site-to-site VPNs</li>
                    <li>5.6 Configure and verify access control lists</li>
                    <li>5.7 Configure and verify Layer 2 security features (DHCP snooping, dynamic ARP inspection, and port security)</li>
                    <li>5.8 Compare authentication, authorization, and accounting concepts</li>
                    <li>5.9 Describe wireless security protocols (WPA, WPA2, and WPA3)</li>
                    <li>5.10 Configure and verify WLAN within the GUI using WPA2 PSK</li>
                </ul>
                <h4 className="mt-10 subtitle">6.0 Automation and Programmability</h4>
                <ul className={`list-disc ml-8 text-${isDarkMode ? 'white' : 'black'}`}>
                    <li>6.1 Explain how automation impacts network management</li>
                    <li>6.2 Compare traditional networks with controller-based networking</li>
                    <li>6.3 Describe controller-based, software defined architecture (overlay, underlay, and fabric)
                        <ul className="list-disc ml-8">
                            <li>6.3.a Separation of control plane and data plane</li>
                            <li>6.3.b Northbound and Southbound APIs</li>
                        </ul>
                    </li>
                    <li>6.4 Compare traditional campus device management with Cisco DNA Center enabled device management</li>
                    <li>6.5 Describe characteristics of REST-based APIs (CRUD, HTTP verbs, and data encoding)</li>
                    <li>6.6 Recognize the capabilities of configuration management mechanisms Puppet, Chef, and Ansible</li>
                    <li>6.7 Recognize components of JSON-encoded data</li>
                </ul>
            </div>
        </div>
    );
};

export default CCNA;
