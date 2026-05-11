import React from "react";
import { NavLink } from "react-router-dom";
import "./PromoStrip.css";

export default function PromoStrip() {
  return (
    <div className="promo-strip">
      {/* decorative circle blobs */}
      <div className="promo-blob promo-blob--1" />
      <div className="promo-blob promo-blob--2" />

      <div className="promo-text">
        <span className="promo-eyebrow">First order deal</span>
        <p className="promo-headline">
          Get <em>25% off</em><br />your first 3 orders
        </p>
      </div>

      <NavLink to="/store/store" className="promo-btn">
        Grab it
      </NavLink>
    </div>
  );
}