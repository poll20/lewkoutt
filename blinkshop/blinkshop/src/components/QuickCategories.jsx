import React from "react";
import { NavLink } from "react-router-dom";
import "./QuickCategories.css";
import cara1 from "../components/image/cara1.jpeg";
import cara2 from "../components/image/cara2.jpeg";
import cara3 from "../components/image/cara3.jpeg";
import cara4 from "../components/image/cara4.jpeg";
import cara5 from "../components/image/cara5.jpeg";
import cara6 from "../components/image/cara6.jpeg";

const CATEGORIES = [
  { emoji: cara5, label: "Tops & Tunics",  path: "/productmodel/Tops%20&%20Tunics"  },
  { emoji:cara6, label: "Vacation Vibes",     path: "productmodel/Vacation%20Vibes"     },
  { emoji:cara3, label: "Co-ord Sets",  path: "/productmodel/Co-ord%20Sets"  },
  { emoji:cara2, label: "The Evening Edits",   path: "/productmodel/The%20Evening%20Edit"   },
  { emoji:cara1, label: "Pretty In Pastels",   path: "/productmodel/Pretty%20In%20Pastels"   },
];

export default function QuickCategories({images}) {
    console.log("quickimg",images)
  return (
    <section className="qcat-section">
      <div className="qcat-header">
        <h2 className="qcat-title">Shop by look</h2>
      </div>
      <div className="qcat-scroll">
       {CATEGORIES.map(({emoji, label, path }, index) => (
  <NavLink to={path} key={label} className="qcat-item">
    <div className="qcat-circle">
      <img
        src={emoji}
        alt={label}
        className="qcat-img"
      />
    </div>
    <span className="qcat-label">{label}</span>
  </NavLink>
))}
      </div>
    </section>
  );
}