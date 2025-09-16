// export default Faq;
import React, { useState ,useEffect,useRef} from "react";
import "./Faq.css"; // Custom CSS import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";
// import { FaMapMarkerAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";
const faqData = [
  {
    category: "MY ACCOUNT & MY ORDER",
    questions: [
      {
        question: "Do I need to create an account to place an order?",
        answer: "Yes, you need to sign up to place an order. This helps track your orders and provide better support.",
      },
      {
        question: "How do I create an account?",
        answer: "You can sign up using your mobile number on our website.",
      },
      {
        question: "Can I save multiple addresses in my account?",
        answer: "Yes, you can save multiple delivery addresses and select one at checkout.",
      },
      {
        question: "Will my payment details be saved in my account?",
        answer: "Yes, but only if you choose to save them. Lewkout securely encrypts saved details for faster checkout, and you can remove them anytime from your account settings.",
      },
      {
        question: "How can I update my profile details?",
        answer: "You can edit your name, address, and other details in the “Profile” section of your account.",
      },
      {
        question: "Do I need to log in every time I place an order?",
        answer: "No, if you stay logged in, you don’t need to enter your details again.",
      },
      {
        question: "How can I place an order on Lewkout?",
        answer: "You can place an order on Lewkout by browsing our website, selecting your favorite outfit, choosing your preferred size and color, and proceeding to checkout. Once you complete the payment, your order will be confirmed.",
      },
      {
        question: "How do I know if my order is confirmed?",
        answer: "Once your order is placed successfully, you will receive a WhatsApp message with your order details. You can also check the order status in your account.",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer: "Once an order is placed, it is processed immediately to ensure fast delivery. Unfortunately, modifications or cancellations are not possible after confirmation.",
      },
      {
        question: "Can I place multiple orders at the same time?",
        answer: "Yes, you can place multiple orders. However, each order will be processed and delivered separately based on availability.",
      },
      {
        question: "Is there a minimum order value?",
        answer: `
          <ul>
            <li>No minimum order value to place an order.</li>
            <li>Free shipping on orders above ₹799.</li>
            <li>Orders below ₹799 will have a standard shipping charge.</li>
          </ul>
        `,
      },
      {
        question: "How can I track my order?",
        answer: `You can track your order from the "My Orders" section on our website. You will also receive tracking updates via WhatsApp.`,
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer: "No, once an order is placed, the delivery address cannot be changed. Please double-check your details before confirming the order.",
      },
    ]
  }
  
  
];


const Faq = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
 const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);
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
 const handleToggle = () => setShowPopup((prev) => !prev);

  useEffect(() => {
    if (!showPopup) return;

    const handleClickOutside = (event) => {
      if (popupRef.current && !popupRef.current.contains(event.target)) {
        setShowPopup(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [showPopup]);
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
      <div style={containerStyle} >
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
          href="mailto:team.lewkout@gmail.com?subject=Support%20Request%20from%20Lewkout"
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
          {/* <div>
            <FontAwesomeIcon icon={faEnvelope} />
            <div style={labelStyle}>Email</div>
          </div> */}
        </a>
        <div>
           {/* <FaMapMarkerAlt /> */}
           <div style={{ position: "relative", display: "inline-block"}} ref={popupRef}>
      {/* Icon with label */}
      <div
        onClick={handleToggle}
        style={{ cursor: "pointer", display: "flex", alignItems: "center", flexDirection:"column", paddingTop:"5px" }}
      >
       <FaMapMarkerAlt size={24} color="rgb(51, 51, 51)" />
        <div style={{...labelStyle, paddingTop:"10px"}}>Address</div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div
          style={{
            border:"2px solid red",
            position: "absolute",
            top: "40px",
            right: "-45px",
            background: "#fff",
            border: "1px solid #ddd",
            borderRadius: "8px",
            padding: "30px 15px",
            boxShadow: "0 4px 8px rgba(0,0,0,0.15)",
            zIndex: 1000,
            minWidth: "320px",
          }}
        >
          <strong>Our Office:</strong>
          <p style={{ margin: "5px 0 0" }}>
            117, Salasar Enclave Nandkishorepura, Mangyawas, Jaipur
          </p>
        </div>
      )}
    </div>
          </div>
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
       to='/payment-mode'
              className="fq-category-btn hvr navlink"
              // onClick={() => toggleCategor y(catIndex)}
            >
              PAYMENT MODE
              <span>--</span>
            </NavLink>
            <NavLink
            to='/shipping-delivery'
              className="fq-category-btn hvr navlink"
              // onClick={() => toggleCategory(catIndex)}
            >
              SHIPPING AND DELIVERY
              <span>--</span>
            </NavLink>
            <NavLink
            to='/return-exchange-refund'
              className="fq-category-btn hvr navlink"
              // onClick={() => toggleCategory(catIndex)}
            >
              RETURN, EXCHANGE AND REFUND
              <span>--</span>
            </NavLink>
    </div>
  );
};

export default Faq;
