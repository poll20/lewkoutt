// export default Faq;
import React, { useState } from "react";
import "./Faq.css"; // Custom CSS import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const faqData = [

  {
    category: "SHIPPING AND DELIVERY",
    questions: [
      {
        question: "When will my order be dispatched in Jaipur?",
        answer: "Jaipur orders are dispatched within 15–20 minutes of confirmation.",
      },
      {
        question: "Do you really deliver within 60 minutes?",
        answer: "Yes! We deliver within 60 minutes in Jaipur.",
      },
      {
        question: "Which areas in Jaipur are covered under 60-minute delivery?",
        answer: "We offer 60-minute delivery in major parts of Jaipur. You can check the 60-minute delivery at checkout to confirm availability.",
      },
      {
        question: "What if my order is not delivered within 60 minutes?",
        answer: "If we fail to deliver within 60 minutes (except for uncontrollable delays like weather or traffic), we may offer you a special discount on your next order.",
      },
      {
        question: "Do you provide delivery outside Jaipur?",
        answer: "Yes, we deliver all over India.",
      },
      {
        question: "When are Pan India orders dispatched?",
        answer: "Pan India orders are dispatched within 1–3 working days.",
      },
      {
        question: "When will Pan India orders be delivered?",
        answer: "The average delivery time across India is 2 to 6 working days after dispatch. Delivery times may vary depending on your location, local courier availability, and external factors.",
      },
      {
        question: "Can I schedule my delivery for a later time?",
        answer: "Yes! You can schedule your delivery at a preferred time during checkout. Just select the time slot that works best for you.",
      },
      {
        question: "What happens if I'm not available when the delivery arrives?",
        answer: `
          <b>For Jaipur Deliveries:</b>
          <p>Since we deliver through third-party services, our delivery partner cannot wait or reattempt the delivery. If you are unavailable at the time of delivery:</p>
          <ul>
            <li>The rider will try to contact you.</li>
            <li>If you do not answer or cannot receive the order, it will be marked as delivered, and no refund will be provided.</li>
            <li>We recommend scheduling your delivery at a convenient time or providing an alternate contact person to receive the order.</li>
          </ul>
          
          <b>For Pan India Deliveries:</b>
          <p>Our courier partners usually attempt delivery more than once. If you are unavailable during the first attempt, they may try again. However:</p>
          <ul>
            <li>If you still do not answer or cannot receive the order after reattempts, it will be marked as delivered, and no refund will be provided.</li>
            <li>We strongly suggest tracking your shipment.</li>
          </ul>
        `,
      },
      {
        question: "How can I track my order?",
        answer: "You can easily track your order status directly on our website. Simply log in to your account, go to the “My Orders” section, and check the live status of your delivery there.",
      },
      {
        question: "Can I change my address after placing an order?",
        answer: "No, since we process and dispatch orders instantly, address changes are not possible after placing an order.",
      },
    ],
  },
 
];

const ShippingDelivery = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);

  const phoneNumber = "+917014996104";
  const supportEmail = "team.lewkout@gmail.com";

  const containerStyle = {
    display: "flex",
    gap: "40px",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: "16px",
    width: "100%",
    maxWidth: "400px",
    margin: "40px auto",
  };

  const iconStyle = {
    color: "#555",
    fontSize: "28px",
    cursor: "pointer",
    textAlign: "center",
    transition: "color 0.3s ease",
  };

  const labelStyle = {
    fontSize: "12px",
    marginTop: "4px",
    color: "#333",
  };

  const toggleCategory = (index) => {
    setOpenCategory(openCategory === index ? null : index);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <div className="fq-container">
      {/* Contact Section */}
      <div style={containerStyle}>
        <a
          href={`tel:${phoneNumber}`}
          style={{ ...iconStyle, textDecoration: "none", color: "#555" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#007BFF")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#555")}
        >
          <div>
            <FontAwesomeIcon icon={faPhone} />
            <div style={labelStyle}>Call</div>
          </div>
        </a>

        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=Support Request from Lewkout`}
          target="_blank"
          rel="noopener noreferrer"
          style={{ ...iconStyle, textDecoration: "none" }}
          onMouseOver={(e) => (e.currentTarget.style.color = "#28a745")}
          onMouseOut={(e) => (e.currentTarget.style.color = "#555")}
        >
          <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <div style={labelStyle}>Email</div>
          </div>
        </a>
      </div>

      {/* FAQ Section */}
      <h2 className="fq-title">FAQs</h2>
      <div className="fq-wrapper">
        {faqData.map((category, catIndex) => (
          <div key={catIndex} className="fq-category">
            <button
              className="fq-category-btn hvr"
              onClick={() => toggleCategory(catIndex)}
            >
              {category.category}
              <span>{openCategory === catIndex ? "▲" : "▼"}</span>
            </button>

            {openCategory === catIndex && (
              <div className="fq-questions">
                {category.questions.map((q, qIndex) => (
                  <div key={qIndex} className="fq-question">
                    <button
                      className="fq-question-btn hvr"
                      onClick={() => toggleQuestion(qIndex)}
                    >
                      {q.question}
                      <span>{openQuestion === qIndex ? "−" : "+"}</span>
                    </button>

                    {openQuestion === qIndex && (
                      <div
                        className="fq-answer"
                        dangerouslySetInnerHTML={{ __html: q.answer }}
                      />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
       <NavLink
       to='/faq'
              className="fq-category-btn hvr navlink"
            //   onClick={() => toggleCategory(catIndex)}
            >
              MY ACCOUNT & ORDERS
              <span>--</span>
            </NavLink>
            <NavLink
            to='/payment-mode'
              className="fq-category-btn hvr navlink"
            //   onClick={() => toggleCategory(catIndex)}
            >
              PAYMENT MODE
              <span>--</span>
            </NavLink>
            <NavLink
            to='/return-exchange-refund'
              className="fq-category-btn hvr navlink"
            //   onClick={() => toggleCategory(catIndex)}
            >
              RETURN, EXCHANGE AND REFUND
              <span>--</span>
            </NavLink>
    </div>
  );
};

export default ShippingDelivery;
