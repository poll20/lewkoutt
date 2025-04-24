import React from 'react';

const TermsAndConditions = () => {
  const containerStyle = {
    marginTop:"45px",
    padding: '20px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif',
    color: '#333',
    lineHeight: '1.6',
  };

  const headingStyle = {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
    textAlign: 'center',
  };

  const sectionTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginTop: '20px',
  };

  const paragraphStyle = {
    marginTop: '8px',
  };

  return (
    <div style={containerStyle}>
      <h1 style={headingStyle}>Terms and Conditions</h1>
      <p style={paragraphStyle}>
        Welcome to Lewkout. By accessing or using our website, you agree to comply with and be bound by the following Terms and Conditions.
      </p>

      <p style={sectionTitleStyle}>1. Service Overview</p>
      <p style={paragraphStyle}>
        We are a clothing delivery platform for girls’ western wear. We partner with popular local stores in Jaipur to bring the trendiest outfits directly to your doorstep.
      </p>

      <p style={sectionTitleStyle}>2. Order Timings</p>
      <p style={paragraphStyle}>Orders are accepted from 10 AM to 9 PM.</p>
      <p style={paragraphStyle}>Midnight orders are not accepted.</p>

      <p style={sectionTitleStyle}>3. Delivery Policy</p>
      <p style={paragraphStyle}>We currently deliver only within Jaipur.</p>
      <p style={paragraphStyle}>Delivery Charges:</p>
      <ul>
        <li>Free delivery on orders above ₹799.</li>
        <li>₹25 delivery fee on orders below ₹799.</li>
        <li>COD orders include an additional ₹25 COD charge.</li>
      </ul>

      <p style={sectionTitleStyle}>4. Return Policy</p>
      <p style={paragraphStyle}>Customers must request a return within 60 minutes of delivery.</p>
      <p style={paragraphStyle}>Items must be unworn, unwashed, and in original condition with all tags intact.</p>
      <p style={paragraphStyle}>Returns are subject to approval after a basic quality check.</p>

      <p style={sectionTitleStyle}>5. Payment Options</p>
      <p style={paragraphStyle}>We accept UPI, Credit/Debit Cards, and Net Banking.</p>
      <p style={paragraphStyle}>COD is available with a ₹25 fee.</p>

      <p style={sectionTitleStyle}>6. Account Responsibility</p>
      <p style={paragraphStyle}>Customers are responsible for maintaining the confidentiality of their account credentials and for all activities under their account.</p>

      <p style={sectionTitleStyle}>7. Product Representation</p>
      <p style={paragraphStyle}>We make every effort to accurately display product images and descriptions. However, actual colors may vary slightly due to screen settings and lighting conditions.</p>

      <p style={sectionTitleStyle}>8. Intellectual Property</p>
      <p style={paragraphStyle}>All content on this website, including images, text, graphics, and logos, is the property of Lewkout and may not be reproduced or used without permission.</p>

      <p style={sectionTitleStyle}>9. Limitation of Liability</p>
      <p style={paragraphStyle}>We are not liable for any indirect, incidental, or consequential damages resulting from the use of our platform or services.</p>

      <p style={sectionTitleStyle}>10. Updates to Terms</p>
      <p style={paragraphStyle}>These Terms and Conditions may be updated at any time. Continued use of our services implies acceptance of any revisions.</p>
    </div>
  );
};

export default TermsAndConditions;
