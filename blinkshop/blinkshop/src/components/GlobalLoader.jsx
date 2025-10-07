

import { useLoading } from "./LoadingContext";
import loading from "./image/loadingabh.gif";

const GlobalLoader = () => {
  const { isLoading } = useLoading();

  if (!isLoading) return null;

  console.log("GlobalLoader mounted. isLoading:", isLoading);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        zIndex: 9999,
        width: "100vw",
        height: "100vh",
        background: "transparent",

        // backgroundColor: "white", // ✅ poora white screen
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="h-16 w-16 flex items-center justify-center rounded-full"
        style={{
          backgroundColor: "transparent", // inner circle optional transparent
        }}
      >
        <img src={loading} alt="loading" style={{ height: "50px" }} />
      </div>
    </div>
  );
};

export default GlobalLoader;
// import { useLoading } from "./LoadingContext";
// import loading from "./image/loadingabh.gif";
// import { useState, useEffect } from "react";

// const GlobalLoader = () => {
//   const { isLoading } = useLoading();
//   const [show, setShow] = useState(isLoading);

//   useEffect(() => {
//     if (!isLoading) {
//       // Fade out smoothly
//       const timeout = setTimeout(() => setShow(false), 500); // 0.5s fade
//       return () => clearTimeout(timeout);
//     } else {
//       setShow(true); // Show loader when loading starts
//     }
//   }, [isLoading]);

//   if (!show) return null;

//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 9999,
//         width: "100vw",
//         height: "100vh",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         background: "linear-gradient(270deg, #fff, #ccc, #fff, #ccc)", // gradient
//         backgroundSize: "800% 800%", // animation size
//         animation: "gradientShift 6s ease infinite", // smooth animation
//         opacity: isLoading ? 1 : 0,
//         transition: "opacity 0.5s ease",
//       }}
//     >
//       <div
//         style={{
//           width: "80px",
//           height: "80px",
//           display: "flex",
//           justifyContent: "center",
//           alignItems: "center",
//           borderRadius: "50%",
//           backgroundColor: "rgba(255,255,255,0.7)",
//         }}
//       >
//         <img src={loading} alt="loading" style={{ height: "50px" }} />
//       </div>

//       <style>
//         {`
//           @keyframes gradientShift {
//             0% {background-position: 0% 50%;}
//             50% {background-position: 100% 50%;}
//             100% {background-position: 0% 50%;}
//           }
//         `}
//       </style>
//     </div>
//   );
// };

// export default GlobalLoader;
