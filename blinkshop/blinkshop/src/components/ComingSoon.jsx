



// function ComingSoon() {
//   return (
//     <>
//       <style>
//         {`
//           body { margin:0; font-family: Arial, sans-serif; background:#6C63FF; }
//           .container {
//             min-height:100vh;
//             display:flex;
//             flex-direction:column;
//             align-items:center;
//             justify-content:center;
//             padding:2rem 1rem;
//             text-align:center;
//             color:#fff;
//           }
//           h1 {
//             font-size:2rem;
//             margin-bottom:1rem;
//           }
//           p {
//             font-size:1rem;
//             margin-bottom:1rem;
//             opacity:0.9;
//           }
//           .footer {
//             margin-top:2rem;
//             font-size:0.8rem;
//             opacity:0.7;
//           }
//           @media(max-width:480px){
//             h1 { font-size:1.5rem; }
//             p { font-size:0.9rem; }
//           }
//         `}
//       </style>

//       <div className="container">
//         <h1>Something Awesome is Coming</h1>
//         <p>We are working hard to launch something amazing soon!</p>
//         <p>Stay tuned for updates.</p>
//         <div className="footer">© 2025 Nexus. All rights reserved.</div>
//       </div>
//     </>
//   );
// }

// export default ComingSoon;

import React from "react";

function ComingSoon() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem 1rem",
        textAlign: "center",
        color: "#fff",
        background: "#6C63FF",
        fontFamily: "Arial, sans-serif",
        margin: 0,
      }}
    >
      <h1
        style={{
          fontSize: "2rem",
          marginBottom: "1rem",
        }}
      >
        Something Awesome is Coming
      </h1>

      <p
        style={{
          fontSize: "1rem",
          marginBottom: "1rem",
          opacity: 0.9,
        }}
      >
        We are working hard to launch something amazing soon!
      </p>

      <p
        style={{
          fontSize: "1rem",
          marginBottom: "1rem",
          opacity: 0.9,
        }}
      >
        Stay tuned for updates.
      </p>

      <div
        style={{
          marginTop: "2rem",
          fontSize: "0.8rem",
          opacity: 0.7,
        }}
      >
        © 2025 Nexus. All rights reserved.
      </div>
    </div>
  );
}

export default ComingSoon;
