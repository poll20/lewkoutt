// OrderAlertContext.js
import React, { createContext, useContext, useRef, useState } from "react";
import sound from "../../assets/ordervoice.ogg";
const OrderAlertContext = createContext();

export const OrderAlertProvider = ({ children }) => {
  console.log("orderalertprovider rendered",sound);
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
      setPlaying(true);

      // Alert show karo
      setTimeout(() => {
        const stop = window.confirm("⚡ New Order Received! Stop the alert sound?");
        if (stop && audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setPlaying(false);
        }
      }, 500); // thoda delay taki audio start ho jaye
    }
  };

  return (
    <OrderAlertContext.Provider value={{ playAudio, playing }}>
      {/* Hidden Audio Tag */}
      {/* <audio ref={audioRef} src={sound} loop /> */}
      <audio ref={audioRef}  loop>
        <source  src={sound} type="audio/ogg" />
        {/* Your browser does not support the audio element. */}
      </audio>
       {/* <audio >
        <source ref={audioRef} src={sound}  />
        
      </audio> */}
      {children}
    </OrderAlertContext.Provider>
  );
};

export const useOrderAlert = () => useContext(OrderAlertContext);
