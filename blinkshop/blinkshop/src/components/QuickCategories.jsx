import React from "react";
import { NavLink } from "react-router-dom";
import "./QuickCategories.css";
import cara1 from "../components/image/cara1.jpeg";
import cara2 from "../components/image/cara2.jpeg";
import cara3 from "../components/image/cara3.jpeg";
import cara4 from "../components/image/cara4.jpeg";
import cara5 from "../components/image/cara5.jpeg";
import cara6 from "../components/image/cara6.jpeg";
import cara7 from "../components/image/desi.png";
import cara8 from "../components/image/bags.png";
import vacation from "../components/image/vacation.webp";
import pretty from "../components/image/pretty.webp";
import evening from "../components/image/evening.png";
import kurti from "../components/image/kurti.jpeg";
import jumpsiut from "../components/image/jumpsuit.jpeg";


const CATEGORIES = [
    { emoji:pretty, label: "Pretty In Pastels",   path: "/productmodel/Pretty%20In%20Pastels"   },
     { emoji:evening, label: "The Evening Edits",   path: "/productmodel/The%20Evening%20Edit"   },
  { emoji:vacation, label: "Vacation Vibes",     path: "productmodel/Vacation%20Vibes"     },
  { emoji:jumpsiut, label: "Jumpsuit",  path: "/productmodel/Co-ord%20Sets"  },
 
{ emoji: cara5, label: "Tops & Tunics",  path: "/productmodel/Tops%20&%20Tunics"  },
  { emoji:kurti, label: "Desi Edit",   path: "/productmodel/Desi%20Edit"   },
  
  { emoji:cara8, label: "Handbags",   path: "/productmodel/Handbags"   },


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