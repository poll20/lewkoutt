import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

const SizeChart = () => {
  let navigate = useNavigate();
  let { cate } = useParams();

  let btnClick = () => {
    navigate(-1);
  };

  const containerStyle = {
    marginTop:"70px",
    padding: "20px",
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
    background: "#fff",
    minHeight: "100vh",
  };

  const titleStyle = {
    fontSize: "28px",
    fontWeight: "bold",
    margin: "15px 0 25px",
    color: "#222",
    letterSpacing: "1px",
  };

  const tableStyle = {
    width: "100%",
    maxWidth: "700px",
    margin: "0 auto",
    borderCollapse: "collapse",
    background: "#fff",
    boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
  };

  const thStyle = {
    border: "1px solid #ddd",
    padding: "12px 16px",
    textAlign: "center",
    backgroundColor: "#f9f9f9",
    fontWeight: "bold",
    fontSize: "16px",
  };

  const tdStyle = {
    border: "1px solid #ddd",
    padding: "12px 16px",
    textAlign: "center",
    fontSize: "15px",
    color: "#333",
  };

  const backBtnStyle = {
    cursor: "pointer",
    marginBottom: "10px",
  };

  return (
    <div style={containerStyle}>
      {/* Back button */}
      <div style={{ textAlign: "left" }}>
        <BiArrowBack size={30} onClick={btnClick} style={backBtnStyle} />
      </div>

      {/* Title */}
      <h2 style={titleStyle}>SIZE GUIDE</h2>

      {/* Table */}
      {cate === "bottom" ? (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Waist</th>
              <th style={thStyle}>Hips</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>XS</td><td style={tdStyle}>24-25</td><td style={tdStyle}>34-35</td></tr>
            <tr><td style={tdStyle}>S</td><td style={tdStyle}>26-27</td><td style={tdStyle}>36-37</td></tr>
            <tr><td style={tdStyle}>M</td><td style={tdStyle}>28-29</td><td style={tdStyle}>38-39</td></tr>
            <tr><td style={tdStyle}>L</td><td style={tdStyle}>30-31</td><td style={tdStyle}>40-41</td></tr>
            {/* <tr><td style={tdStyle}>XL</td><td style={tdStyle}>32-33</td><td style={tdStyle}>42-43</td></tr>
            <tr><td style={tdStyle}>XXL</td><td style={tdStyle}>34-35</td><td style={tdStyle}>44-45</td></tr> */}
          </tbody>
        </table>
      ) : (
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Size</th>
              <th style={thStyle}>Bust</th>
              <th style={thStyle}>Waist</th>
              <th style={thStyle}>Hips</th>
            </tr>
          </thead>
          <tbody>
            <tr><td style={tdStyle}>XS</td><td style={tdStyle}>32-33</td><td style={tdStyle}>24-25</td><td style={tdStyle}>34-35</td></tr>
            <tr><td style={tdStyle}>S</td><td style={tdStyle}>34-35</td><td style={tdStyle}>26-27</td><td style={tdStyle}>36-37</td></tr>
            <tr><td style={tdStyle}>M</td><td style={tdStyle}>36-37</td><td style={tdStyle}>28-29</td><td style={tdStyle}>38-39</td></tr>
            <tr><td style={tdStyle}>L</td><td style={tdStyle}>38-39</td><td style={tdStyle}>30-31</td><td style={tdStyle}>40-41</td></tr>
            {/* <tr><td style={tdStyle}>XL</td><td style={tdStyle}>40-41</td><td style={tdStyle}>32-33</td><td style={tdStyle}>42-43</td></tr>
            <tr><td style={tdStyle}>XXL</td><td style={tdStyle}>42-43</td><td style={tdStyle}>34-35</td><td style={tdStyle}>44-45</td></tr> */}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default SizeChart;
