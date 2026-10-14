// import React from "react";
// import { BiArrowBack } from "react-icons/bi";
// import { useNavigate, useParams } from "react-router-dom";

// const SizeChart = () => {
//   let navigate = useNavigate();
//   let { cate } = useParams();

//   let btnClick = () => {
//     navigate(-1);
//   };

//   const containerStyle = {
//     marginTop:"70px",
//     padding: "20px",
//     textAlign: "center",
//     fontFamily: "Arial, sans-serif",
//     background: "#fff",
//     minHeight: "100vh",
//   };

//   const titleStyle = {
//     fontSize: "28px",
//     fontWeight: "bold",
//     margin: "15px 0 25px",
//     color: "#222",
//     letterSpacing: "1px",
//   };

//   const tableStyle = {
//     width: "100%",
//     maxWidth: "700px",
//     margin: "0 auto",
//     borderCollapse: "collapse",
//     background: "#fff",
//     boxShadow: "0px 2px 10px rgba(0,0,0,0.05)",
//   };

//   const thStyle = {
//     border: "1px solid #ddd",
//     padding: "12px 16px",
//     textAlign: "center",
//     backgroundColor: "#f9f9f9",
//     fontWeight: "bold",
//     fontSize: "16px",
//   };

//   const tdStyle = {
//     border: "1px solid #ddd",
//     padding: "12px 16px",
//     textAlign: "center",
//     fontSize: "15px",
//     color: "#333",
//   };

//   const backBtnStyle = {
//     cursor: "pointer",
//     marginBottom: "10px",
//   };

//   return (
//     <div style={containerStyle}>
//       {/* Back button */}
//       <div style={{ textAlign: "left" }}>
//         <BiArrowBack size={30} onClick={btnClick} style={backBtnStyle} />
//       </div>

//       {/* Title */}
//       <h2 style={titleStyle}>SIZE GUIDE</h2>

//       {/* Table */}
//       {cate === "bottom" ? (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Size</th>
//               <th style={thStyle}>Waist</th>
//               <th style={thStyle}>Hips</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td style={tdStyle}>XS</td><td style={tdStyle}>24-25</td><td style={tdStyle}>34-35</td></tr>
//             <tr><td style={tdStyle}>S</td><td style={tdStyle}>26-27</td><td style={tdStyle}>36-37</td></tr>
//             <tr><td style={tdStyle}>M</td><td style={tdStyle}>28-29</td><td style={tdStyle}>38-39</td></tr>
//             <tr><td style={tdStyle}>L</td><td style={tdStyle}>30-31</td><td style={tdStyle}>40-41</td></tr>
//             {/* <tr><td style={tdStyle}>XL</td><td style={tdStyle}>32-33</td><td style={tdStyle}>42-43</td></tr>
//             <tr><td style={tdStyle}>XXL</td><td style={tdStyle}>34-35</td><td style={tdStyle}>44-45</td></tr> */}
//           </tbody>
//         </table>
//       ) : (
//         <table style={tableStyle}>
//           <thead>
//             <tr>
//               <th style={thStyle}>Size</th>
//               <th style={thStyle}>Bust</th>
//               <th style={thStyle}>Waist</th>
//               <th style={thStyle}>Hips</th>
//             </tr>
//           </thead>
//           <tbody>
//             <tr><td style={tdStyle}>XS</td><td style={tdStyle}>32-33</td><td style={tdStyle}>24-25</td><td style={tdStyle}>34-35</td></tr>
//             <tr><td style={tdStyle}>S</td><td style={tdStyle}>34-35</td><td style={tdStyle}>26-27</td><td style={tdStyle}>36-37</td></tr>
//             <tr><td style={tdStyle}>M</td><td style={tdStyle}>36-37</td><td style={tdStyle}>28-29</td><td style={tdStyle}>38-39</td></tr>
//             <tr><td style={tdStyle}>L</td><td style={tdStyle}>38-39</td><td style={tdStyle}>30-31</td><td style={tdStyle}>40-41</td></tr>
//             {/* <tr><td style={tdStyle}>XL</td><td style={tdStyle}>40-41</td><td style={tdStyle}>32-33</td><td style={tdStyle}>42-43</td></tr>
//             <tr><td style={tdStyle}>XXL</td><td style={tdStyle}>42-43</td><td style={tdStyle}>34-35</td><td style={tdStyle}>44-45</td></tr> */}
//           </tbody>
//         </table>
//       )}
//     </div>
//   );
// };

// export default SizeChart;

import React from "react";
import { BiArrowBack } from "react-icons/bi";
import { useNavigate, useParams } from "react-router-dom";

/*
  Fonts (optional but recommended): add this once in index.html <head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
*/

const SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif";
const SANS = "'Jost', 'Helvetica Neue', Arial, sans-serif";

const COLORS = {
  page: "#efece6",
  headBg: "#ddd5cb",
  line: "#d6cfc5",
  border: "#b9aa9b",
  text: "#1f1d1b",
  soft: "#3b3835",
  accent: "#8a7766",
};

// ---- DATA ----
const dressChart = {
  columns: ["Size", "Bust", "Waist", "Dress Length"],
  rows: [
    ["XS", '32"', '26"', '57"'],
    ["S", '34"', '28"', '57"'],
    ["M", '36"', '30"', '57"'],
    ["L", '38"', '32"', '57"'],
    ["XL", '40"', '34"', '58"'],
    ["XXL", '42"', '36"', '58"'],
    ["XXXL", '44"', '38"', '59"'],
  ],
  note: "Note: Bust & waist measurements are approximate and may vary slightly depending on the fit and fabric.",
};

const bottomChart = {
  columns: ["Size", "Waist", "Hips"],
  rows: [
    ["XS", "24-25", "34-35"],
    ["S", "26-27", "36-37"],
    ["M", "28-29", "38-39"],
    ["L", "30-31", "40-41"],
  ],
  note: "Note: Waist & hip measurements are approximate and may vary slightly depending on the fit and fabric.",
};

const SizeChart = () => {
  const navigate = useNavigate();
  const { cate } = useParams();

  const chart = cate === "bottom" ? bottomChart : dressChart;
  const lastRow = chart.rows.length - 1;
  const lastCol = chart.columns.length - 1;

  // ---- STYLES (fluid sizes via clamp so it works on mobile without media queries) ----
  const pageStyle = {
    marginTop: "70px",
    minHeight: "100vh",
    background: COLORS.page,
    padding: "clamp(14px, 4vw, 40px)",
    boxSizing: "border-box",
    fontFamily: SANS,
    color: COLORS.text,
  };

  const backBtnStyle = {
    cursor: "pointer",
    display: "block",
    color: COLORS.text,
  };

  const wrapStyle = {
    maxWidth: "820px",
    margin: "0 auto",
  };

  const titleStyle = {
    fontFamily: SERIF,
    fontStyle: "italic",
    fontWeight: 500,
    fontSize: "clamp(20px, 5vw, 34px)",
    lineHeight: 1.1,
    textAlign: "center",
    margin: "clamp(8px, 3vw, 24px) 0 0",
    color: COLORS.text,
  };

  const subtitleRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px, 3vw, 28px)",
    margin: "clamp(10px, 2.5vw, 18px) 0 clamp(20px, 5vw, 44px)",
  };

  const ruleStyle = {
    flex: 1,
    height: "1px",
    background: COLORS.border,
    opacity: 0.8,
  };

  const subtitleStyle = {
    fontSize: "clamp(4px, 2.7vw, 8px)",
    letterSpacing: "0.32em",
    textTransform: "uppercase",
    fontWeight: 400,
    whiteSpace: "nowrap",
    margin: 0,
    paddingLeft: "0.32em", // balances trailing letter-spacing
  };

  const tableWrapStyle = {
    border: `1px solid ${COLORS.border}`,
    borderRadius: "clamp(10px, 2.5vw, 18px)",
    overflow: "hidden",
    background: "#f3f0eb",
  };

  const tableStyle = {
    width: "100%",
    borderCollapse: "collapse",
    tableLayout: "fixed",
  };

  const cellBase = {
    textAlign: "center",
    verticalAlign: "middle",
    padding: "clamp(12px, 3.4vw, 24px) clamp(2px, 1vw, 10px)",
    fontSize: "clamp(7px, 3.7vw, 11px)",
    lineHeight: 1.25,
  };

  const thStyle = (i) => ({
    ...cellBase,
    background: COLORS.headBg,
    fontWeight: 500,
    fontFamily: SERIF,
    borderBottom: `1px solid ${COLORS.line}`,
    borderRight: i === lastCol ? "none" : `1px solid ${COLORS.line}`,
  });

  const tdStyle = (r, c) => ({
    ...cellBase,
    fontWeight: c === 0 ? 600 : 300,
    fontSize: c === 0 ? "clamp(7px, 4.2vw, 13px)" : cellBase.fontSize,
    letterSpacing: c === 0 ? "0.02em" : "0.06em",
    color: c === 0 ? COLORS.text : COLORS.soft,
    borderBottom: r === lastRow ? "none" : `1px solid ${COLORS.line}`,
    borderRight: c === lastCol ? "none" : `1px solid ${COLORS.line}`,
  });

  const footerRowStyle = {
    display: "flex",
    alignItems: "center",
    gap: "clamp(10px, 3vw, 24px)",
    margin: "clamp(18px, 4vw, 34px) auto 0",
    maxWidth: "700px",
  };

  const heartStyle = {
    color: COLORS.accent,
    fontSize: "clamp(10px, 4vw, 21px)",
    lineHeight: 1,
  };

  const noteStyle = {
    maxWidth: "560px",
    margin: "clamp(10px, 2.5vw, 18px) auto 0",
    textAlign: "center",
    fontSize: "clamp(11px, 3vw, 17px)",
    lineHeight: 1.7,
    letterSpacing: "0.03em",
    color: COLORS.soft,
    fontWeight: 300,
  };

  return (
    <div style={pageStyle}>
      {/* Back button */}
      <BiArrowBack size={30} onClick={() => navigate(-1)} style={backBtnStyle} />

      <div style={wrapStyle}>
        {/* Title */}
        <h1 style={titleStyle}>Size Chart</h1>

        <div style={subtitleRowStyle}>
          <span style={ruleStyle} />
          <p style={subtitleStyle}>Find your perfect fit</p>
          <span style={ruleStyle} />
        </div>

        {/* Table */}
        <div style={tableWrapStyle}>
          <table style={tableStyle}>
            <thead>
              <tr>
                {chart.columns.map((col, i) => (
                  <th key={col} style={thStyle(i)}>
                    {col}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {chart.rows.map((row, r) => (
                <tr key={row[0]}>
                  {row.map((val, c) => (
                    <td key={c} style={tdStyle(r, c)}>
                      {val}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div style={footerRowStyle}>
          <span style={ruleStyle} />
          <span style={heartStyle}>♥</span>
          <span style={ruleStyle} />
        </div>

        <p style={noteStyle}>{chart.note}</p>
      </div>
    </div>
  );
};

export default SizeChart;