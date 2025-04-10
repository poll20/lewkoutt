import React, { useState } from "react";
import "./Faq.css"; // Custom CSS import
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
const faqData = [
  {
    
    category: "MY ACCOUNT & MY ORDER",
    questions: [
      {
        question: "Do I need to create an account to place an order?",
        answer:
          "Yes, you need to sign up to place an order. This helps track your orders and provide better support.",
      },
      {
        question: "How do I create an account?",
        answer:
          "You can sign up using your mobile number, email, or Google login on our website.",
      },
      {
        question: "I forgot my password. How can I reset it?",
        answer:
          "Click on “Forgot Password” on the login page and follow the instructions to reset your password.",
      },
      {
        question: "Can I update my phone number or email after signing up?",
        answer:
          `Yes, you can update your phone number or email from the "Profile" section in your account settings.`,
      },
      {
        question: "Can I save multiple addresses in my account?",
        answer:
          "Yes, you can save multiple delivery addresses and select one at checkout.",
      },
      {
        question: "Will my payment details be saved in my account?",
        answer:
          "Yes, but only if you choose to save them. Lewkout securely encrypts saved details for faster checkout, and you can remove them anytime from your account settings.",
      },
      {
        question: "How can I update my profile details?",
        answer:
          "You can edit your name, address, and other details in the “Profile” section of your account.",
      },
      {
        question: "Do I need to log in every time I place an order?",
        answer:
          "No, if you stay logged in, you don’t need to enter your details again.",
      },
      {
        question: "How can I place an order on Lewkout?",
        answer:
          "You can place an order on Lewkout by browsing our website, selecting your favorite outfit, choosing your preferred size and color, and proceeding to checkout. Once you complete the payment, your order will be confirmed.",
      },
      {
        question: "Do I need to create an account to place an order?",
        answer:
          "Yes, you need to create an account before placing an order. This helps you track your orders, save your preferences, and receive exclusive offers.",

      },
      {
        question: "How do I know if my order is confirmed?",
        answer:
          "Once your order is placed successfully, you will receive a confirmation email and WhatsApp with your order details. You can also check the order status in your account.",
      },
      {
        question: "Can I modify or cancel my order after placing it?",
        answer:
          "Once an order is placed, it is processed immediately to ensure fast delivery. Unfortunately, modifications or cancellations are not possible after confirmation.",
      },
      {
        question: "What should I do if I receive the wrong product or size?",
        answer:
          "If you receive the wrong product or size, you must report it within 60 minutes of delivery through our support team. We will arrange a free exchange, and you won’t have to pay shipping fees again. However, returns or exchanges won't be accepted after 60 minutes.",
      },
      {
        question: "Can I place multiple orders at the same time?",
        answer:
          "Yes, you can place multiple orders. However, each order will be processed and delivered separately based on availability."
,
      },
      {
        question: "Is there a minimum order value?",
        answer:
          "There is no minimum order value to place an order. However, free shipping is available only for orders above ₹799. If your order amount is below this, a standard shipping charge will apply.",
      },
      {
        question: "How can I track my order?",
        answer:
          `You can track your order from the "My Orders" section on our website. You will also receive tracking updates via email and SMS.`,
      },
      {
        question: "Can I change my delivery address after placing an order?",
        answer:
          "No, once an order is placed, the delivery address cannot be changed. Please double-check your details before confirming the order.",
      },
    ],
  },
  {
    category: "PAYMENT MODE",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept UPI (Google Pay, PhonePe, Paytm), debit/credit cards, net banking, and cash on delivery (COD).",
      },
      {
        question: "Is there an extra charge for COD?",
        answer: "Yes, a ₹25 fee is applicable for COD orders.",
      },
      {
        question: "Do you charge for shipping?",
        answer:
          "• Orders above ₹799: Free shipping\n• Orders below ₹799: ₹25 shipping fee",
      },
      {
        question: "My payment failed, but the amount was deducted. What should I do?",
        answer:
          "If the amount was deducted, it will be automatically refunded within 5-7 business days. If you don’t receive it, please contact our support team.",
      },
      {
        question: "Do you offer EMI or Buy Now, Pay Later options?",
        answer: "Currently, we do not offer EMI or BNPL options.",
      },
      {
        question: "How do I apply a discount code?",
        answer:
          "You can enter the discount code at checkout before making the payment.",
      },
      {
        question: "My payment got deducted twice. What should I do?",
        answer:
          "In case of double deduction, the extra amount will be refunded within 5-7 business days. Contact support if the refund is delayed.",
      },
      {
        question: "Is my payment information secure?",
        answer:
          "Yes, we use secure payment gateways to protect your information.",
      },
      {
        question: "Can I change my payment method after placing an order?",
        answer:
          "No, once an order is placed, the payment method cannot be changed.",
      },
      {
        question: "What should I do if my payment fails?",
        answer:
          "If your payment fails, please try again with a different payment method. If the issue persists, contact our support team for assistance.",
      },
    ],
  },
  {
    category: "DELIVERY",
    questions: [
      {
        question: "Do you really deliver within 60 minutes?",
        answer: "Yes! We deliver within 60 minutes in Jaipur.",
      },
      {
        question: "Which areas in Jaipur are covered under 60-minute delivery?",
        answer:
          "We offer 60-minute delivery in major parts of Jaipur. You can check your pin code at checkout to confirm availability.",
      },
      {
        question: "What if my order is not delivered within 60 minutes?",
        answer:
          "If we fail to deliver within 60 minutes (except for uncontrollable delays like weather or traffic), we may offer you a special discount on your next order.",
      },
      {
        question: "Do you provide delivery outside Jaipur?",
        answer:
          "Currently, we only deliver in Jaipur with a 60-minute guarantee. We are expanding city by city, and soon, we will offer 60-minute delivery in more cities. Stay tuned!",
      },
      {
        question: "Can I schedule my delivery for a later time?",
        answer:
          "Yes! You can schedule your delivery at a preferred time during checkout. Just select the time slot that works best for you.",
      },
      {
        question: "What happens if I'm not available when the delivery arrives?",
        answer:
          "Since we deliver through third-party services, our delivery partner cannot wait or reattempt the delivery. If you are unavailable at the time of delivery:\n\n• The rider will try to contact you.\n• If you do not answer or cannot receive the order, it will be marked as delivered, and no refund will be provided.\n• If you think you might not be available, we recommend scheduling your delivery at a convenient time or providing an alternate contact person to receive the order.",
      },
      {
        question: "How can I track my order?",
        answer:
          "Once your order is placed, you’ll receive a tracking link via SMS or email. You can check the live status of your delivery there.",
      },
      {
        question: "Can I change my address after placing an order?",
        answer:
          "No, since we process and dispatch orders instantly, address changes are not possible after placing an order.",
      },
    ],
  },
  {
    "category": "RETURNS, EXCHANGE & REFUND",
    "questions": [
      {
        "question": "What is the return window for my order?",
        "answer": "You must request a return within 60 minutes of delivery."
      },
      {
        "question": "Why is the return window only 60 minutes?",
        "answer": "Since we offer 60-minute delivery, we also maintain a quick return process to ensure a smooth experience for both customers and partnered stores."
      },
      {
        "question": "How can I request a return?",
        "answer": "You can request a return through our website within 60 minutes of receiving your order."
      },
      {
        "question": "What are the conditions for returning a product?",
        "answer": "The product must be unused, unwashed, and in its original condition. Tags and packaging should be intact."
      },
      {
        "question": "Can I exchange my product instead of returning it?",
        "answer": "Currently, we do not offer exchanges. You can return the item and place a new order."
      },
      {
        "question": "Is there a return pickup service?",
        "answer": "Yes, our team will arrange a pickup within Jaipur for eligible returns."
      },
      {
        "question": "What if I miss the 60-minute return window?",
        "answer": "Unfortunately, returns cannot be processed after 60 minutes."
      },
      {
        "question": "Will I get a full refund?",
        "answer": "Once we receive and verify the returned item, you will receive a refund as per our refund policy."
      },
      {
        "question": "How long does it take to process a refund?",
        "answer": "Refunds will be processed within 3-5 business days."
      },
      {
        "question": "What if I receive a defective or wrong product?",
        "answer": "Please raise a return request within 60 minutes, and we will resolve the issue immediately."
      },
      {
        "question": "What should I do if I receive the wrong product or size?",
        "answer": "If you receive the wrong product or size, you must report it within 60 minutes of delivery through our support team. We will arrange a free exchange."
      }
    ]
  }
  
];

const Faq = () => {
  const [openCategory, setOpenCategory] = useState(null);
  const [openQuestion, setOpenQuestion] = useState(null);
  const phoneNumber = '6377563527';
  const supportEmail = 'sharmaabhay1549@gmail.com';

  const containerStyle = {
    display: 'flex',
    gap: '40px',
    justifyContent: 'center',
    alignItems: 'center',
    padding: '20px',
    backgroundColor: '#fff',
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
    borderRadius: '16px',
    width: '100%',
    maxWidth: '400px',
    margin: '40px auto'
  };

  const iconStyle = {
    color: '#555',
    fontSize: '28px',
    cursor: 'pointer',
    textAlign: 'center',
    transition: 'color 0.3s ease'
  };

  const labelStyle = {
    fontSize: '12px',
    marginTop: '4px',
    color: '#333'
  };
  const toggleCategory = (index) => {

    setOpenCategory(openCategory === index ? null : index);
    setOpenQuestion(null);
  };

  const toggleQuestion = (index) => {
    setOpenQuestion(openQuestion === index ? null : index);
  };

  return (
    <>
    
    <div className="fq-container">
    <div style={containerStyle}>
      {/* Phone Icon */}
      <a
        href={`tel:${phoneNumber}`}
        style={{ ...iconStyle, textDecoration: 'none' }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#007BFF')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#555')}
      >
        <div>
          <FontAwesomeIcon icon={faPhone} />
          <div style={labelStyle}>Call</div>
        </div>
      </a>

      {/* Email Icon */}
      <a
        href={`https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=Support Request from Lewkout`}
        target="_blank"
        rel="noopener noreferrer"
        style={{ ...iconStyle, textDecoration: 'none' }}
        onMouseOver={(e) => (e.currentTarget.style.color = '#28a745')}
        onMouseOut={(e) => (e.currentTarget.style.color = '#555')}
      >
        <div>
          <FontAwesomeIcon icon={faEnvelope} />
          <div style={labelStyle}>Email</div>
        </div>
      </a>
    </div>
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
                      <p className="fq-answer">{q.answer}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
    </>
  );
};

export default Faq;
