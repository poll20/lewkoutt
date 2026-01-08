import { useEffect, useState } from "react";

const SixtyMinTimer = ({ order }) => {
  const [timeLeft, setTimeLeft] = useState(null);

  useEffect(() => {
    // ❌ condition fail → kuch render nahi
    
    if (
      order.timeslot !== "60 minutes or free" ||
      order.status.toLowerCase() === "delivered"
    ) {
      setTimeLeft(null);
      return;
    }

    const orderedTime = new Date(order.orderedAt).getTime();
    const ONE_HOUR = 60 * 60 * 1000;

    const tick = () => {
      const now = Date.now();
      const diff = ONE_HOUR - (now - orderedTime);

      if (diff <= 0) {
        setTimeLeft(null);
        return;
      }

      setTimeLeft(Math.floor(diff / 1000));
    };

    tick(); // initial
    const interval = setInterval(tick, 1000);

    return () => clearInterval(interval);
  }, [order.timeslot, order.status, order.orderedAt]);

  if (!timeLeft) return null;

  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div style={{
      background: "#ecfeff",
      border: "1px solid #67e8f9",
      padding: "8px 12px",
      borderRadius: "8px",
      marginBottom: "8px"
    }}>
      <small style={{ color: "#0369a1" }}>
        ⏱️ 60 Minutes or Free
      </small>
      <div style={{
        fontFamily: "monospace",
        fontSize: "15px",
        fontWeight: "600"
      }}>
        {minutes}:{seconds.toString().padStart(2, "0")}
      </div>
    </div>
  );
};

export default SixtyMinTimer;
