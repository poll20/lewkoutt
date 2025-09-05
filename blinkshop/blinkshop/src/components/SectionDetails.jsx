// import React from "react";
import "./UserProfile.css";

const SectionDetails = ({ section, onBack }) => {
  return (
    <div className="section-details">
      <button className="back-btn" onClick={onBack}>
        &larr; Back
      </button>
      <h2>{section.name}</h2>
      <ul>
        {section.details.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
};

export default SectionDetails;
