import React from 'react';

function AboutUs() {
  return (
    <div style={{
      maxWidth: '800px',
      margin: 'auto',
      padding: '20px',
      fontFamily: '"Arial", sans-serif'
    }}>
      <h1 style={{ color: '#0A66C2', textAlign: 'center' }}>About Us</h1>
      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
        Welcome to <strong>ConnectAll Networks</strong>, the premier destination for high-quality network devices. Since our inception in 2010, we've dedicated ourselves to supplying businesses and tech enthusiasts with the tools they need to build reliable and efficient network infrastructures.
      </p>
      <h2 style={{ color: '#0A66C2' }}>Our Mission</h2>
      <p style={{ fontSize: '16px', lineHeight: '1.6' }}>
        At ConnectAll Networks, our goal is to enhance your digital communications through top-tier technology. We believe in making powerful, durable, and user-friendly network devices accessible to everyone from small startups to large corporations.
      </p>
      <h2 style={{ color: '#0A66C2' }}>Why Choose Us?</h2>
      <ul style={{ listStyleType: 'none', paddingLeft: '0' }}>
        <li style={{ marginBottom: '10px' }}>
          <strong>Expertise:</strong> Our team has decades of combined experience in the networking field, ensuring that you receive both cutting-edge and practical solutions.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Quality:</strong> Every product in our portfolio is rigorously tested to meet stringent quality standards.
        </li>
        <li style={{ marginBottom: '10px' }}>
          <strong>Support:</strong> We pride ourselves on offering exceptional after-sales support and comprehensive warranties to ensure your peace of mind.
        </li>
      </ul>
    </div>
  );
}

export default AboutUs;
