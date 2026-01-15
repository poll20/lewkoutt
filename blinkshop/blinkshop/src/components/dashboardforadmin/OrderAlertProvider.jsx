
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import sound from "../../assets/ordervoice.ogg";
import returnsound from "../../assets/returnorder.ogg";
import { useDashboard } from "./DashboardContext";

const OrderAlertContext = createContext();

export const OrderAlertProvider = ({ children }) => {
  const { ordersound, setordersound, returnordersound, setreturnordersound } = useDashboard();
  

  const audioRef = useRef(null);
  const returnaudioRef = useRef(null);

  const [playing, setPlaying] = useState(false);

  const playAudio = () => {
    console.log("playAudio called");
    if (audioRef.current) {
      audioRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
      setPlaying(true);

      setTimeout(() => {
        const stop = window.confirm("⚡ New Order Received! Stop the alert sound?");
        if (stop && audioRef.current) {
          audioRef.current.pause();
          audioRef.current.currentTime = 0;
          setPlaying(false);
          setordersound(false); // stop karne ke baad ordersound false
        }
      }, 500);
    }
  };

  const playAudioreturn = () => {
    console.log("playAudio called");
    if (returnaudioRef.current) {
      returnaudioRef.current.play().catch((err) => {
        console.log("Autoplay blocked:", err);
      });
      setPlaying(true);

      setTimeout(() => {
        const stop = window.confirm("⚡ return request comming");
        if (stop && returnaudioRef.current) {
          returnaudioRef.current.pause();
          returnaudioRef.current.currentTime = 0;
          setPlaying(false);
          setreturnordersound(false); // stop karne ke baad ordersound false
        }
      }, 500);
    }
  };

  useEffect(() => {
    console.log("fuck ")
    if (ordersound) {
      console.log("fuck222")
      playAudio();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ordersound]); // sirf ordersound true hone pe chalega

  useEffect(() => {
    console.log("fuck ")
    if (returnordersound) {
      playAudioreturn();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [returnordersound]); // sirf ordersound true hone pe chalega

  return (
    <OrderAlertContext.Provider value={{ playAudio, playing,playAudioreturn }}>
      <audio ref={audioRef} src={sound} loop hidden />
      <audio ref={returnaudioRef} src={returnsound} loop hidden />

      {children}
    </OrderAlertContext.Provider>
  );
};

export const useOrderAlert = () => useContext(OrderAlertContext);
