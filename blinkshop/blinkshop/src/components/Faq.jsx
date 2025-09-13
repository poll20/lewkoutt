// import React, { useState } from "react";
// import "./Faq.css"; // Custom CSS import
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';
// const faqData = [
//   {
    
//     category: "MY ACCOUNT & MY ORDER",
//     questions: [
//       {
//         question: "Do I need to create an account to place an order?",
//         answer:
//           "Yes, you need to sign up to place an order. This helps track your orders and provide better support.",
//       },
//       {
//         question: "How do I create an account?",
//         answer:
//           "You can sign up using your mobile number on our website.",
//       },
      
     
//       {
//         question: "Can I save multiple addresses in my account?",
//         answer:
//           "Yes, you can save multiple delivery addresses and select one at checkout.",
//       },
//       {
//         question: "Will my payment details be saved in my account?",
//         answer:
//           "Yes, but only if you choose to save them. Lewkout securely encrypts saved details for faster checkout, and you can remove them anytime from your account settings.",
//       },
//       {
//         question: "How can I update my profile details?",
//         answer:
//           "You can edit your name, address, and other details in the “Profile” section of your account.",
//       },
//       {
//         question: "Do I need to log in every time I place an order?",
//         answer:
//           "No, if you stay logged in, you don’t need to enter your details again.",
//       },
//       {
//         question: "How can I place an order on Lewkout?",
//         answer:
//           "You can place an order on Lewkout by browsing our website, selecting your favorite outfit, choosing your preferred size and color, and proceeding to checkout. Once you complete the payment, your order will be confirmed.",
//       },
      
//       {
//         question: "How do I know if my order is confirmed?",
//         answer:
//           "Once your order is placed successfully, you will receive WhatsApp message with your order details. You can also check the order status in your account.",
//       },
//       {
//         question: "Can I modify or cancel my order after placing it?",
//         answer:
//           "Once an order is placed, it is processed immediately to ensure fast delivery. Unfortunately, modifications or cancellations are not possible after confirmation.",
//       },
     
//       {
//         question: "Can I place multiple orders at the same time?",
//         answer:
//           "Yes, you can place multiple orders. However, each order will be processed and delivered separately based on availability."
// ,
//       },
//       {
//         question: "Is there a minimum order value?",
//         answer:
//           "There is no minimum order value to place an order. However, free shipping is available only for orders above ₹799. If your order amount is below this, a standard shipping charge will apply.",
//       },
//       {
//         question: "How can I track my order?",
//         answer:
//           `You can track your order from the "My Orders" section on our website. You will also receive tracking updates via Whatsapp.`,
//       },
//       {
//         question: "Can I change my delivery address after placing an order?",
//         answer:
//           "No, once an order is placed, the delivery address cannot be changed. Please double-check your details before confirming the order.",
//       },
//     ],
//   },
//   {
//     category: "PAYMENT MODE",
//     questions: [
//       {
//         question: "What payment methods do you accept?",
//         answer:
//           "We accept UPI (Google Pay, PhonePe, Paytm), debit/credit cards, net banking.",
//       },
     
//       {
//         question: "Do you charge for shipping?",
//         answer:
//           "• Orders above ₹799: Free shipping\• Orders below ₹799: ₹49 shipping fee",
//       },
//       {
//         question: "My payment failed, but the amount was deducted. What should I do?",
//         answer:
//           "If the amount was deducted, it will be automatically refunded within 5-7 business days. If you don’t receive it, please contact our support team.",
//       },
//       {
//         question: "Do you offer EMI or Buy Now, Pay Later options?",
//         answer: "Currently, we do not offer EMI or BNPL options.",
//       },
//       {
//         question: "How do I apply a discount code?",
//         answer:
//           "You can enter the discount code at checkout before making the payment.",
//       },
//       {
//         question: "My payment got deducted twice. What should I do?",
//         answer:
//           "In case of double deduction, the extra amount will be refunded within 5-7 business days. Contact support if the refund is delayed.",
//       },
//       {
//         question: "Is my payment information secure?",
//         answer:
//           "Yes, we use secure payment gateways to protect your information.",
//       },
//       {
//         question: "Can I change my payment method after placing an order?",
//         answer:
//           "No, once an order is placed, the payment method cannot be changed.",
//       },
//       {
//         question: "What should I do if my payment fails?",
//         answer:
//           "If your payment fails, please try again with a different payment method. If the issue persists, contact our support team for assistance.",
//       },
//     ],
//   },
//   {
//     category: "SHIPPING AND DELIVERY",
//     questions: [
//       {
//         question: "When will my order be dispatched in Jaipur?",
//         answer: "Jaipur orders are dispatched within 15–20 minutes of confirmation.",
//       },
     
//       {
//         question: "Do you really deliver within 60 minutes?",
//         answer: "Yes! We deliver within 60 minutes in Jaipur.",
//       },
//       {
//         question: "Which areas in Jaipur are covered under 60-minute delivery?",
//         answer:
//           "We offer 60-minute delivery in major parts of Jaipur. You can check the 60-minute delivery at checkout to confirm availability.",
//       },
//       {
//         question: "What if my order is not delivered within 60 minutes?",
//         answer:
//           "If we fail to deliver within 60 minutes (except for uncontrollable delays like weather or traffic), we may offer you a special discount on your next order.",
//       },
//       {
//         question: "Do you provide delivery outside Jaipur?",
//         answer:
//           "Yes, We deliver all over India.",
//       },
//        {
//         question: "When are Pan India orders dispatched?",
//         answer: "Pan India orders are dispatched within 1–3 working days.",
//       },
//        {
//         question: "When will Pan India orders be delivered?",
//         answer: "The average delivery time across India is 2 to 6 working days after dispatch.Delivery times may vary depending on your location, local courier availability, and external factors.",
//       },

//       {
//         question: "Can I schedule my delivery for a later time?",
//         answer:
//           "Yes! You can schedule your delivery at a preferred time during checkout. Just select the time slot that works best for you.",
//       },
//      {
//   question: "What happens if I'm not available when the delivery arrives?",
//   answer: `
//     <b>For Jaipur Deliveries:</b><br/>
//     Since we deliver through third-party services, our delivery partner cannot wait or reattempt the delivery. If you are unavailable at the time of delivery.<br/><br/>
//     • The rider will try to contact you.<br/>
//     • If you do not answer or cannot receive the order, it will be marked as delivered, and no refund will be provided.<br/>
//     • We recommend scheduling your delivery at a convenient time or providing an alternate contact person to receive the order.<br/><br/>
    
//     <b>For Pan India Deliveries:</b><br/>
//     Our courier partners usually attempt delivery more than once. If you are unavailable during the first attempt, they may try again. However:<br/><br/>
//     • If you still do not answer or cannot receive the order after reattempts, it will be marked as delivered, and no refund will be provided.<br/>
//     • We strongly suggest tracking your shipment.
//   `,
// }


// ,
//       {
//         question: "How can I track my order?",
//         answer:
//           "You can easily track your order status directly on our website. Simply log in to your account, go to the “My Orders” section, and check the live status of your delivery there.",
//       },
//       {
//         question: "Can I change my address after placing an order?",
//         answer:
//           "No, since we process and dispatch orders instantly, address changes are not possible after placing an order.",
//       },
//     ],
//   },
//   {
//     "category": "RETURNS, EXCHANGE & REFUND",
//     "questions": [
//       {
//         "question": "What is the return window for my order in Jaipur?",
//         "answer": "You must request a return within 60 minutes of delivery."
//       },
//        {
//         "question": "What is the return window for Pan India orders?",
//         "answer": "You must request a return within 2 days of delivery"
//       },
//       {
//         "question": "Why is the return window only 60 minutes?",
//         "answer": "Since we offer 60-minute delivery, we also maintain a quick return process to ensure a smooth experience for both customers and partnered stores."
//       },
//       {
//         "question": "How can I request a return?",
//         "answer": "You can request a return through our website within 60 minutes of receiving your order."
//       },
//       {
//         "question": "What are the conditions for returning a product?",
//         "answer": "The product must be unused, unwashed, and in its original condition. Tags and packaging should be intact."
//       },
//       {
//         "question": "Can I exchange my product instead of returning it?",
//         "answer": "Currently, we do not offer exchanges. You can return the item and place a new order."
//       },
//     {
//   question: "Is there a return pickup service?",
//   answer: 
//     "Yes, our team will arrange a pickup for eligible returns.\n\nHowever, sometimes pickups may fail due to courier or delivery boy issues. In such cases, we kindly request you to self-ship the product back to our warehouse.\n\nTo appreciate your time and effort:\n• **For Returns →** We'll compensate you with ₹100 towards your shipping cost.\n\nWe truly value your patience and cooperation, and this way, we can ensure your request is processed smoothly and without delays. 💙",
// }
// ,
      
//       {
//         "question": "What if I miss the 60-minute return window?",
//         "answer": "Unfortunately, returns cannot be processed after 60 minutes."
//       },
//       {
//         "question": "Will I get a full refund?",
//         "answer": "Once we receive and verify the returned item, you will receive a refund as per our refund policy."
//       },
//       {
//         "question": "Will I get a refund for the delivery charges if I return my order?",
//          "answer": "Delivery charges are non-refundable for orders below ₹799. If you choose to return a product from such an order, only the product cost will be refunded. This helps us cover the standard logistics and handling expenses that occur with every shipment."
//       },
//       {
//         "question": "How long does it take to process a refund?",
//         "answer": "Refunds will be processed within 3-5 business days."
//       },
//       {
//         "question": "What if I receive a defective or wrong product?",
//         "answer": "Please raise a return request within 60 minutes, and we will resolve the issue immediately."
//       },
//       {
//         "question": "What should I do if I receive the wrong product or size?",
//         "answer": "If you receive the wrong product or size, you must report it within 60 minutes of delivery through our support team. We will arrange a free Return."
//       },
//       {
//         "question": "When can my return request be rejected?",
//         "answer":"Returns may be rejected if\n\n 1.The product tag is missing\n\n 2.The product is damaged after delivery.\n\n 3.The product shows signs of being worn or used."
//       }
//     ]
//   }
  
// ];

// const Faq = () => {
//   const [openCategory, setOpenCategory] = useState(null);
//   const [openQuestion, setOpenQuestion] = useState(null);
//   const phoneNumber = '+917014996104';
//   const supportEmail = 'sharmaabhay1549@gmail.com';

//   const containerStyle = {
//     display: 'flex',
//     gap: '40px',
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: '20px',
//     backgroundColor: '#fff',
//     boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
//     borderRadius: '16px',
//     width: '100%',
//     maxWidth: '400px',
//     margin: '40px auto'
//   };

//   const iconStyle = {
//     color: '#555',
//     fontSize: '28px',
//     cursor: 'pointer',
//     textAlign: 'center',
//     transition: 'color 0.3s ease'
//   };

//   const labelStyle = {
//     fontSize: '12px',
//     marginTop: '4px',
//     color: '#333'
//   };
//   const toggleCategory = (index) => {

//     setOpenCategory(openCategory === index ? null : index);
//     setOpenQuestion(null);
//   };

//   const toggleQuestion = (index) => {
//     setOpenQuestion(openQuestion === index ? null : index);
//   };

//   return (
//     <>
    
//     <div className="fq-container">
//     <div style={containerStyle}>
//       {/* Phone Icon */}
//       <a
    
//         href={`tel:${phoneNumber}`}
//         style={{ ...iconStyle, textDecoration: 'none',color:"#555" }}
//         onMouseOver={(e) => (e.currentTarget.style.color = '#007BFF')}
//         onMouseOut={(e) => (e.currentTarget.style.color = '#555')}
//       >
//         <div>
//           <FontAwesomeIcon icon={faPhone} />
//           <div style={labelStyle}>Call</div>
//         </div>
//       </a>

//       {/* Email Icon */}
//       <a
//         href={`https://mail.google.com/mail/?view=cm&fs=1&to=${supportEmail}&su=Support Request from Lewkout`}
//         target="_blank"
//         rel="noopener noreferrer"
//         style={{ ...iconStyle, textDecoration: 'none' }}
//         onMouseOver={(e) => (e.currentTarget.style.color = '#28a745')}
//         onMouseOut={(e) => (e.currentTarget.style.color = '#555')}
//       >
//         <div>
//           <FontAwesomeIcon icon={faEnvelope} />
//           <div style={labelStyle}>Email</div>
//         </div>
//       </a>
//     </div>
//       <h2 className="fq-title">FAQs</h2>
//       <div className="fq-wrapper">
//         {faqData.map((category, catIndex) => (
//           <div key={catIndex} className="fq-category">
//             <button
//               className="fq-category-btn hvr"
//               onClick={() => toggleCategory(catIndex)}
//             >
//               {category.category}
//               <span>{openCategory === catIndex ? "▲" : "▼"}</span>
//             </button>
//             {openCategory === catIndex && (
//               <div className="fq-questions">
//                 {category.questions.map((q, qIndex) => (
//                   <div key={qIndex} className="fq-question">
//                     <button
//                       className="fq-question-btn hvr"
//                       onClick={() => toggleQuestion(qIndex)}
//                     >
//                       {q.question}
//                       <span>{openQuestion === qIndex ? "−" : "+"}</span>
//                     </button>
//                     {openQuestion === qIndex && (
//   <p
//     className="fq-answer"
//     dangerouslySetInnerHTML={{ __html: q.answer }}
//   />
// )}
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         ))}
//       </div>
//     </div>
//     </>
//   );
// };

// export default Faq;
import React, { useState } from "react";
import "./Faq.css"; // Custom CSS import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPhone, faEnvelope } from "@fortawesome/free-solid-svg-icons";

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
    ],
  },
  {
    category: "PAYMENT MODE",
    questions: [
      {
        question: "What payment methods do you accept?",
        answer: `
          <ul>
            <li>UPI (Google Pay, PhonePe, Paytm)</li>
            <li>Debit/Credit Cards</li>
            <li>Net Banking</li>
          </ul>
        `,
      },
      {
        question: "Do you charge for shipping?",
        answer: `
          <ul>
            <li>Orders above ₹799: Free shipping</li>
            <li>Orders below ₹799: ₹49 shipping fee</li>
          </ul>
        `,
      },
      {
        question: "My payment failed, but the amount was deducted. What should I do?",
        answer: "If the amount was deducted, it will be automatically refunded within 5-7 business days. If you don’t receive it, please contact our support team.",
      },
      {
        question: "Do you offer EMI or Buy Now, Pay Later options?",
        answer: "Currently, we do not offer EMI or BNPL options.",
      },
      {
        question: "How do I apply a discount code?",
        answer: "You can enter the discount code at checkout before making the payment.",
      },
      {
        question: "My payment got deducted twice. What should I do?",
        answer: "In case of double deduction, the extra amount will be refunded within 5-7 business days. Contact support if the refund is delayed.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Yes, we use secure payment gateways to protect your information.",
      },
      {
        question: "Can I change my payment method after placing an order?",
        answer: "No, once an order is placed, the payment method cannot be changed.",
      },
      {
        question: "What should I do if my payment fails?",
        answer: "If your payment fails, please try again with a different payment method. If the issue persists, contact our support team for assistance.",
      },
    ],
  },
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
  {
    category: "RETURNS, EXCHANGE & REFUND",
    questions: [
      {
        question: "What is the return window for my order in Jaipur?",
        answer: "You must request a return within 60 minutes of delivery.",
      },
      {
        question: "What is the return window for Pan India orders?",
        answer: "You must request a return within 2 days of delivery.",
      },
      {
        question: "Why is the return window only 60 minutes?",
        answer: "Since we offer 60-minute delivery, we also maintain a quick return process to ensure a smooth experience for both customers and partnered stores.",
      },
      {
        question: "How can I request a return?",
        answer: "You can request a return through our website within 60 minutes of receiving your order.",
      },
      {
        question: "What are the conditions for returning a product?",
        answer: `
          <ul>
            <li>The product must be unused, unwashed, and in its original condition.</li>
            <li>Tags and packaging should be intact.</li>
          </ul>
        `,
      },
      {
        question: "Can I exchange my product instead of returning it?",
        answer: "Currently, we do not offer exchanges. You can return the item and place a new order.",
      },
      {
        question: "Is there a return pickup service?",
        answer: `
          Yes, our team will arrange a pickup for eligible returns.<br/><br/>
          However, sometimes pickups may fail due to courier or delivery boy issues. In such cases, we kindly request you to self-ship the product back to our warehouse.<br/><br/>
          <b>To appreciate your time and effort:</b>
          <ul>
            <li><b>For Returns →</b> We'll compensate you with ₹100 towards your shipping cost.</li>
          </ul>
          We truly value your patience and cooperation, and this way, we can ensure your request is processed smoothly and without delays. 💙
        `,
      },
      {
        question: "What if I miss the 60-minute return window?",
        answer: "Unfortunately, returns cannot be processed after 60 minutes.",
      },
      {
        question: "Will I get a full refund?",
        answer: "Once we receive and verify the returned item, you will receive a refund as per our refund policy.",
      },
      {
        question: "Will I get a refund for the delivery charges if I return my order?",
        answer: "Delivery charges are non-refundable for orders below ₹799. If you choose to return a product from such an order, only the product cost will be refunded.",
      },
      {
        question: "How long does it take to process a refund?",
        answer: "Refunds will be processed within 3-5 business days.",
      },
      {
        question: "What if I receive a defective or wrong product?",
        answer: "Please raise a return request within 60 minutes, and we will resolve the issue immediately.",
      },
      {
        question: "What should I do if I receive the wrong product or size?",
        answer: "If you receive the wrong product or size, you must report it within 60 minutes of delivery through our support team. We will arrange a free Return.",
      },
      {
        question: "When can my return request be rejected?",
        answer: `
          Returns may be rejected if:
          <ul>
            <li>The product tag is missing.</li>
            <li>The product is damaged after delivery.</li>
            <li>The product shows signs of being worn or used.</li>
          </ul>
        `,
      },
    ],
  },
];

const Faq = () => {
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
    </div>
  );
};

export default Faq;
