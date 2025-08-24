// import React, { useState, useEffect } from 'react';
// import { Mail, Twitter, Github, Linkedin, CheckCircle, AlertCircle } from 'lucide-react';

// function App() {
//   const [email, setEmail] = useState('');
//   const [isSubscribed, setIsSubscribed] = useState(false);
//   const [isValidEmail, setIsValidEmail] = useState(true);
//   const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

//   // Launch date 30 days from now
//   const launchDate = new Date();
//   launchDate.setDate(launchDate.getDate() + 30);

//   useEffect(() => {
//     const timer = setInterval(() => {
//       const now = new Date().getTime();
//       const distance = launchDate.getTime() - now;

//       const days = Math.floor(distance / (1000 * 60 * 60 * 24));
//       const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//       const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
//       const seconds = Math.floor((distance % (1000 * 60)) / 1000);

//       setTimeLeft({ days, hours, minutes, seconds });
//     }, 1000);

//     return () => clearInterval(timer);
//   }, []);

//   const validateEmail = (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     return emailRegex.test(email);
//   };

//   const handleSubscribe = (e) => {
//     e.preventDefault();
//     if (!validateEmail(email)) {
//       setIsValidEmail(false);
//       return;
//     }

//     setIsValidEmail(true);
//     setIsSubscribed(true);
//     setEmail('');

//     setTimeout(() => {
//       setIsSubscribed(false);
//     }, 5000);
//   };

//   return (
//     <>
//       <style>
//         {`
//           body { margin: 0; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
//           .container {
//             min-height: 100vh;
//             background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
//             position: relative;
//             overflow: hidden;
//           }
//           .background-animation {
//             position: absolute;
//             top: 0; left: 0; right: 0; bottom: 0;
//             background:
//               radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
//               radial-gradient(circle at 80% 20%, rgba(255, 255, 255, 0.1) 0%, transparent 50%),
//               radial-gradient(circle at 40% 80%, rgba(120, 119, 198, 0.2) 0%, transparent 50%);
//             animation: float 20s ease-in-out infinite;
//           }
//           .content {
//             position: relative;
//             z-index: 1;
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             justify-content: center;
//             min-height: 100vh;
//             padding: 2rem 1rem;
//             text-align: center;
//           }
//           .logo {
//             font-size: 2rem;
//             font-weight: bold;
//             color: #fff;
//             margin-bottom: 3rem;
//             opacity: 0.9;
//             animation: fadeInUp 0.8s ease-out forwards;
//           }
//           h1 {
//             font-size: clamp(2.5rem, 5vw, 4rem);
//             font-weight: 800;
//             color: #fff;
//             margin-bottom: 1.5rem;
//             line-height: 1.1;
//             text-shadow: 0 4px 8px rgba(0,0,0,0.1);
//             animation: fadeInUp 0.8s ease-out forwards;
//           }
//           p.subtitle {
//             font-size: clamp(1.1rem, 2.5vw, 1.3rem);
//             color: rgba(255,255,255,0.9);
//             margin-bottom: 3rem;
//             max-width: 600px;
//             line-height: 1.6;
//             font-weight: 300;
//             animation: fadeInUp 0.8s ease-out forwards;
//           }
//           .countdown-container {
//             display: flex;
//             gap: 1rem;
//             margin-bottom: 3rem;
//             flex-wrap: wrap;
//             justify-content: center;
//             animation: fadeInUp 0.8s ease-out forwards;
//           }
//           .countdown-item {
//             background: rgba(255,255,255,0.1);
//             backdrop-filter: blur(10px);
//             border-radius: 16px;
//             padding: 1.5rem 1rem;
//             min-width: 80px;
//             border: 1px solid rgba(255,255,255,0.2);
//             transition: all 0.3s ease;
//           }
//           .countdown-item:hover {
//             transform: translateY(-5px);
//             background: rgba(255,255,255,0.15);
//           }
//           .countdown-number {
//             font-size: 2rem;
//             font-weight: bold;
//             color: #fff;
//             display: block;
//             line-height: 1;
//           }
//           .countdown-label {
//             font-size: 0.8rem;
//             color: rgba(255,255,255,0.7);
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             margin-top: 0.5rem;
//           }
//           form {
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 1rem;
//             margin-bottom: 3rem;
//             width: 100%;
//             max-width: 400px;
//             animation: fadeInUp 0.8s ease-out forwards;
//           }
//           .input-container { position: relative; width: 100%; }
//           input.email-input {
//             width: 100%;
//             padding: 1rem 3rem 1rem 1rem;
//             font-size: 1rem;
//             border: none;
//             border-radius: 12px;
//             background: rgba(255,255,255,0.9);
//             color: #333;
//             outline: none;
//             transition: all 0.3s ease;
//             box-shadow: 0 4px 20px rgba(0,0,0,0.1);
//           }
//           input.email-input.error {
//             border: 2px solid #ef4444;
//             background: rgba(239,68,68,0.1);
//           }
//           .email-icon {
//             position: absolute;
//             right: 1rem;
//             top: 50%;
//             transform: translateY(-50%);
//             color: #6b7280;
//             pointer-events: none;
//           }
//           button.submit-button {
//             width: 100%;
//             padding: 1rem 2rem;
//             font-size: 1rem;
//             font-weight: 600;
//             color: #fff;
//             background: linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%);
//             border: none;
//             border-radius: 12px;
//             cursor: pointer;
//             transition: all 0.3s ease;
//             text-transform: uppercase;
//             letter-spacing: 1px;
//             box-shadow: 0 4px 20px rgba(59,130,246,0.3);
//           }
//           button.submit-button:hover {
//             transform: translateY(-2px);
//             box-shadow: 0 8px 30px rgba(59,130,246,0.4);
//           }
//           button.submit-button:active { transform: translateY(0px); }
//           .success-message {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             padding: 1rem 1.5rem;
//             background: rgba(16,185,129,0.1);
//             border: 1px solid rgba(16,185,129,0.3);
//             border-radius: 12px;
//             color: #10b981;
//             font-size: 0.9rem;
//             font-weight: 500;
//             backdrop-filter: blur(10px);
//           }
//           .error-message {
//             display: flex;
//             align-items: center;
//             gap: 0.5rem;
//             color: #ef4444;
//             font-size: 0.8rem;
//             margin-top: 0.5rem;
//           }
//           .social-links { display: flex; gap: 1rem; margin-bottom: 2rem; animation: fadeInUp 0.8s ease-out forwards; }
//           .social-link {
//             display: flex;
//             align-items: center;
//             justify-content: center;
//             width: 48px;
//             height: 48px;
//             background: rgba(255,255,255,0.1);
//             border-radius: 12px;
//             color: #fff;
//             text-decoration: none;
//             transition: all 0.3s ease;
//             backdrop-filter: blur(10px);
//             border: 1px solid rgba(255,255,255,0.2);
//           }
//           .social-link:hover {
//             background: rgba(255,255,255,0.2);
//             transform: translateY(-3px);
//           }
//           .footer { color: rgba(255,255,255,0.6); font-size: 0.9rem; text-align: center; animation: fadeInUp 0.8s ease-out forwards; }

//           @keyframes float {
//             0%,100% { transform: translateY(0px) rotate(0deg); }
//             33% { transform: translateY(-20px) rotate(1deg); }
//             66% { transform: translateY(10px) rotate(-1deg); }
//           }
//           @keyframes fadeInUp {
//             from { opacity: 0; transform: translateY(30px); }
//             to { opacity: 1; transform: translateY(0); }
//           }
//           @media (max-width: 768px) {
//             .countdown-container { gap: 0.5rem; }
//             .countdown-item { padding: 1rem 0.5rem; min-width: 70px; }
//             .social-links { gap: 0.75rem; }
//             .social-link { width: 44px; height: 44px; }
//           }
//         `}
//       </style>

//       <div className="container">
//         <div className="background-animation"></div>
//         <div className="content">
//           <div className="logo">NEXUS</div>
//           <h1>Something Amazing<br />is Coming Soon</h1>
//           <p className="subtitle">
//             We're crafting an extraordinary experience that will revolutionize the way you work and connect. 
//             Be the first to know when we launch.
//           </p>

//           <div className="countdown-container">
//             <div className="countdown-item">
//               <span className="countdown-number">{String(timeLeft.days).padStart(2,'0')}</span>
//               <span className="countdown-label">Days</span>
//             </div>
//             <div className="countdown-item">
//               <span className="countdown-number">{String(timeLeft.hours).padStart(2,'0')}</span>
//               <span className="countdown-label">Hours</span>
//             </div>
//             <div className="countdown-item">
//               <span className="countdown-number">{String(timeLeft.minutes).padStart(2,'0')}</span>
//               <span className="countdown-label">Minutes</span>
//             </div>
//             <div className="countdown-item">
//               <span className="countdown-number">{String(timeLeft.seconds).padStart(2,'0')}</span>
//               <span className="countdown-label">Seconds</span>
//             </div>
//           </div>

//           <form onSubmit={handleSubscribe}>
//             {isSubscribed ? (
//               <div className="success-message">
//                 <CheckCircle size={20} />
//                 <span>Thanks! We'll notify you when we launch.</span>
//               </div>
//             ) : (
//               <>
//                 <div className="input-container">
//                   <input
//                     type="email"
//                     value={email}
//                     onChange={(e) => { setEmail(e.target.value); setIsValidEmail(true); }}
//                     placeholder="Enter your email address"
//                     className={`email-input ${!isValidEmail ? 'error' : ''}`}
//                     required
//                   />
//                   <Mail size={20} className="email-icon" />
//                 </div>
//                 {!isValidEmail && (
//                   <div className="error-message">
//                     <AlertCircle size={16} />
//                     <span>Please enter a valid email address</span>
//                   </div>
//                 )}
//                 <button type="submit" className="submit-button">Notify Me at Launch</button>
//               </>
//             )}
//           </form>

//           <div className="social-links">
//             <a href="#" className="social-link"><Twitter size={20} /></a>
//             <a href="#" className="social-link"><Github size={20} /></a>
//             <a href="#" className="social-link"><Linkedin size={20} /></a>
//           </div>

//           <div className="footer">
//             <p>© 2025 Nexus. All rights reserved.</p>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default App;

import React from "react";

function ComingSoon() {
  return (
    <>
      <style>
        {`
          body { margin:0; font-family: Arial, sans-serif; background:#6C63FF; }
          .container {
            min-height:100vh;
            display:flex;
            flex-direction:column;
            align-items:center;
            justify-content:center;
            padding:2rem 1rem;
            text-align:center;
            color:#fff;
          }
          h1 {
            font-size:2rem;
            margin-bottom:1rem;
          }
          p {
            font-size:1rem;
            margin-bottom:1rem;
            opacity:0.9;
          }
          .footer {
            margin-top:2rem;
            font-size:0.8rem;
            opacity:0.7;
          }
          @media(max-width:480px){
            h1 { font-size:1.5rem; }
            p { font-size:0.9rem; }
          }
        `}
      </style>

      <div className="container">
        <h1>Something Awesome is Coming</h1>
        <p>We are working hard to launch something amazing soon!</p>
        <p>Stay tuned for updates.</p>
        <div className="footer">© 2025 Nexus. All rights reserved.</div>
      </div>
    </>
  );
}

export default ComingSoon;
