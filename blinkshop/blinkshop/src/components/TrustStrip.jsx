import React from "react";
import "./TrustStrip.css";

const TRUST_ITEMS = [
  { icon: "⚡", label: "60 min",   sub: "delivery"  },
  { icon: "↩️", label: "Easy",     sub: "returns"   },
  { icon: "🔒", label: "Secure",   sub: "payment"   },
  { icon: "🌸", label: "100%",     sub: "authentic" },
];

export default function TrustStrip() {
  return (
    <div className="trust-strip">
      {TRUST_ITEMS.map(({ icon, label, sub }) => (
        <div key={sub} className="trust-item">
          <span className="trust-icon">{icon}</span>
          <span className="trust-label">{label}</span>
          <span className="trust-sub">{sub}</span>
        </div>
      ))}
    </div>
  );
}