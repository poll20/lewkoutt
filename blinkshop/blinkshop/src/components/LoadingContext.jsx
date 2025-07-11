// // src/context/LoadingContext.js
// import React, { createContext, useContext, useState } from "react";

// const LoadingContext = createContext();

// export const LoadingProvider = ({ children }) => {
//   const [isLoading, setIsLoading] = useState(false);

//   return (
//     <LoadingContext.Provider value={{ isLoading, setIsLoading }}>
//       {children}
//     </LoadingContext.Provider>
//   );
// };

// export const useLoading = () => useContext(LoadingContext);

// src/context/LoadingContext.js
import React, { createContext, useContext, useState, useRef } from "react";

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(false);

  // Prevent rapid toggle loops (e.g., multiple async calls overlapping)
  const loadingCounter = useRef(0);

  const safeSetIsLoading = (state) => {
    if (state === true) {
      loadingCounter.current++;
      setIsLoading(true);
    } else {
      loadingCounter.current = Math.max(loadingCounter.current - 1, 0);
      if (loadingCounter.current === 0) {
        setIsLoading(false);
      }
    }
  };

  return (
    <LoadingContext.Provider value={{ isLoading, setIsLoading: safeSetIsLoading }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
