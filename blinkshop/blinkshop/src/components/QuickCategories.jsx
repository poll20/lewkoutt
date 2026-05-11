import React from "react";
import { NavLink } from "react-router-dom";
import "./QuickCategories.css";

const CATEGORIES = [
  { emoji: "👗", label: "Tops & Tunics",  path: "/productmodel/Tops%20&%20Tunics"  },
  { emoji: "👚", label: "Vacation Vibes",     path: "productmodel/Vacation%20Vibes"     },
  { emoji: "👖", label: "Co-ord Sets",  path: "/productmodel/Co-ord%20Sets"  },
  { emoji: "🧥", label: "The Evening Edits",   path: "/productmodel/The%20Evening%20Edit"   },
  { emoji: "👙", label: "Pretty In Pastels",   path: "/productmodel/Pretty%20In%20Pastels"   },
];

export default function QuickCategories({images}) {
    console.log("quickimg",images)
  return (
    <section className="qcat-section">
      <div className="qcat-header">
        <h2 className="qcat-title">Shop by look</h2>
      </div>
      <div className="qcat-scroll">
       {CATEGORIES.map(({ label, path }, index) => (
  <NavLink to={path} key={label} className="qcat-item">
    <div className="qcat-circle">
      <img
        src={images?.[index]?.image}
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