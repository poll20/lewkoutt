// // src/components/GlobalLoader.js
// // import React from "react";
// import { useLoading } from "./LoadingContext";
// import loading from "./image/loadingabh.gif"

// const GlobalLoader = () => {
//   const { isLoading } = useLoading();

//   if (!isLoading) return null;
//   console.log("GlobalLoader mounted. isLoading:", isLoading);
//   return (
//     <div
//       style={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         zIndex: 9999,
//         width: "100vw",
//         height: "100vh",
//         background: "transparent",
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//       }}
//     >
// <div className="h-16 w-16 bg-black text-black text-center flex items-center justify-center rounded-full"  >
//   <img src={loading} alt="loading" style={{height:"50px"}}></img>
// </div>
//     </div>
//   );
// };

// export default GlobalLoader;

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
