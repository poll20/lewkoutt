

// import React from "react";
// import { BiArrowBack } from "react-icons/bi";
// import { useNavigate, useParams } from "react-router-dom";

// /*
//   Fonts (optional but recommended): add this once in index.html <head>
//   <link rel="preconnect" href="https://fonts.googleapis.com">
//   <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@1,500&family=Jost:wght@300;400;500&display=swap" rel="stylesheet">
// */

// const SERIF = "'Playfair Display', 'Cormorant Garamond', Georgia, 'Times New Roman', serif";
// const SANS = "'Jost', 'Helvetica Neue', Arial, sans-serif";

// const COLORS = {
//   page: "#efece6",
//   headBg: "#ddd5cb",
//   line: "#d6cfc5",
//   border: "#b9aa9b",
//   text: "#1f1d1b",
//   soft: "#3b3835",
//   accent: "#8a7766",
// };

// // ---- DATA ----
// const dressChart = {
//   columns: ["Size", "Bust", "Waist", "Dress Length"],
//   rows: [
//     ["XS", '32"', '26"', '57"'],
//     ["S", '34"', '28"', '57"'],
//     ["M", '36"', '30"', '57"'],
//     ["L", '38"', '32"', '57"'],
//     ["XL", '40"', '34"', '58"'],
//     ["XXL", '42"', '36"', '58"'],
//     ["XXXL", '44"', '38"', '59"'],
//   ],
//   note: "Note: Bust & waist measurements are approximate and may vary slightly depending on the fit and fabric.",
// };

// const bottomChart = {
//   columns: ["Size", "Waist", "Hips"],
//   rows: [
//     ["XS", "24-25", "34-35"],
//     ["S", "26-27", "36-37"],
//     ["M", "28-29", "38-39"],
//     ["L", "30-31", "40-41"],
//   ],
//   note: "Note: Waist & hip measurements are approximate and may vary slightly depending on the fit and fabric.",
// };

// const SizeChart = () => {
//   const navigate = useNavigate();
//   const { cate } = useParams();

//   const chart = cate === "bottom" ? bottomChart : dressChart;
//   const lastRow = chart.rows.length - 1;
//   const lastCol = chart.columns.length - 1;

//   // ---- STYLES (fluid sizes via clamp so it works on mobile without media queries) ----
//   const pageStyle = {
//     marginTop: "70px",
//     minHeight: "100vh",
//     background: COLORS.page,
//     padding: "clamp(14px, 4vw, 40px)",
//     boxSizing: "border-box",
//     fontFamily: SANS,
//     color: COLORS.text,
//   };

//   const backBtnStyle = {
//     cursor: "pointer",
//     display: "block",
//     color: COLORS.text,
//   };

//   const wrapStyle = {
//     maxWidth: "820px",
//     margin: "0 auto",
//   };

//   const titleStyle = {
//     fontFamily: SERIF,
//     fontStyle: "italic",
//     fontWeight: 500,
//     fontSize: "clamp(20px, 5vw, 34px)",
//     lineHeight: 1.1,
//     textAlign: "center",
//     margin: "clamp(8px, 3vw, 24px) 0 0",
//     color: COLORS.text,
//   };

//   const subtitleRowStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "clamp(10px, 3vw, 28px)",
//     margin: "clamp(10px, 2.5vw, 18px) 0 clamp(20px, 5vw, 44px)",
//   };

//   const ruleStyle = {
//     flex: 1,
//     height: "1px",
//     background: COLORS.border,
//     opacity: 0.8,
//   };

//   const subtitleStyle = {
//     fontSize: "clamp(4px, 2.7vw, 8px)",
//     letterSpacing: "0.32em",
//     textTransform: "uppercase",
//     fontWeight: 400,
//     whiteSpace: "nowrap",
//     margin: 0,
//     paddingLeft: "0.32em", // balances trailing letter-spacing
//   };

//   const tableWrapStyle = {
//     border: `1px solid ${COLORS.border}`,
//     borderRadius: "clamp(10px, 2.5vw, 18px)",
//     overflow: "hidden",
//     background: "#f3f0eb",
//   };

//   const tableStyle = {
//     width: "100%",
//     borderCollapse: "collapse",
//     tableLayout: "fixed",
//   };

//   const cellBase = {
//     textAlign: "center",
//     verticalAlign: "middle",
//     padding: "clamp(12px, 3.4vw, 24px) clamp(2px, 1vw, 10px)",
//     fontSize: "clamp(7px, 3.7vw, 11px)",
//     lineHeight: 1.25,
//   };

//   const thStyle = (i) => ({
//     ...cellBase,
//     background: COLORS.headBg,
//     fontWeight: 500,
//     fontFamily: SERIF,
//     borderBottom: `1px solid ${COLORS.line}`,
//     borderRight: i === lastCol ? "none" : `1px solid ${COLORS.line}`,
//   });

//   const tdStyle = (r, c) => ({
//     ...cellBase,
//     fontWeight: c === 0 ? 600 : 300,
//     fontSize: c === 0 ? "clamp(7px, 4.2vw, 13px)" : cellBase.fontSize,
//     letterSpacing: c === 0 ? "0.02em" : "0.06em",
//     color: c === 0 ? COLORS.text : COLORS.soft,
//     borderBottom: r === lastRow ? "none" : `1px solid ${COLORS.line}`,
//     borderRight: c === lastCol ? "none" : `1px solid ${COLORS.line}`,
//   });

//   const footerRowStyle = {
//     display: "flex",
//     alignItems: "center",
//     gap: "clamp(10px, 3vw, 24px)",
//     margin: "clamp(18px, 4vw, 34px) auto 0",
//     maxWidth: "700px",
//   };

//   const heartStyle = {
//     color: COLORS.accent,
//     fontSize: "clamp(10px, 4vw, 21px)",
//     lineHeight: 1,
//   };

//   const noteStyle = {
//     maxWidth: "560px",
//     margin: "clamp(10px, 2.5vw, 18px) auto 0",
//     textAlign: "center",
//     fontSize: "clamp(11px, 3vw, 17px)",
//     lineHeight: 1.7,
//     letterSpacing: "0.03em",
//     color: COLORS.soft,
//     fontWeight: 300,
//   };

//   return (
//     <div style={pageStyle}>
//       {/* Back button */}
//       <BiArrowBack size={30} onClick={() => navigate(-1)} style={backBtnStyle} />

//       <div style={wrapStyle}>
//         {/* Title */}
//         <h1 style={titleStyle}>Size Chart</h1>

//         <div style={subtitleRowStyle}>
//           <span style={ruleStyle} />
//           <p style={subtitleStyle}>Find your perfect fit</p>
//           <span style={ruleStyle} />
//         </div>

//         {/* Table */}
//         <div style={tableWrapStyle}>
//           <table style={tableStyle}>
//             <thead>
//               <tr>
//                 {chart.columns.map((col, i) => (
//                   <th key={col} style={thStyle(i)}>
//                     {col}
//                   </th>
//                 ))}
//               </tr>
//             </thead>
//             <tbody>
//               {chart.rows.map((row, r) => (
//                 <tr key={row[0]}>
//                   {row.map((val, c) => (
//                     <td key={c} style={tdStyle(r, c)}>
//                       {val}
//                     </td>
//                   ))}
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>

//         {/* Footer */}
//         <div style={footerRowStyle}>
//           <span style={ruleStyle} />
//           <span style={heartStyle}>♥</span>
//           <span style={ruleStyle} />
//         </div>

//         <p style={noteStyle}>{chart.note}</p>
//       </div>
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

const topChart = {
  columns: ["Size", "Bust", "Waist", "Top Length"],
  rows: [
    ["XS", '32"', '26"', '20"'],
    ["S", '34"', '28"', '20"'],
    ["M", '36"', '30"', '21"'],
    ["L", '38"', '32"', '21"'],
    ["XL", '40"', '34"', '22"'],
    ["XXL", '42"', '36"', '22"'],
    ["XXXL", '44"', '38"', '23"'],
  ],
  note: "Top length is measured from the highest point of the shoulder to the hem.",
};

const kurtiChart = {
  columns: ["Size", "Bust", "Waist", "Kurti Length"],
  rows: [
    ["XS", '32"', '26"', '28"'],
    ["S", '34"', '28"', '29"'],
    ["M", '36"', '30"', '29"'],
    ["L", '38"', '32"', '30"'],
    ["XL", '40"', '34"', '30"'],
    ["XXL", '42"', '36"', '30"'],
    ["XXXL", '44"', '38"', '30"'],
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

// Category name (e.g. "Tops & Tunics", "Desi Edit", "Festive Fits") se chart choose karta hai
const getChart = (cate = "") => {
  const key = decodeURIComponent(cate).trim().toLowerCase();

  if (key.includes("bottom")) return bottomChart;
  if (key.includes("desi") || key.includes("kurti")) return kurtiChart;
  if (key.includes("top") || key.includes("tunic")) return topChart;

  // Festive Fits, dress, aur baaki sab categories
  return dressChart;
};

const SizeChart = () => {
  const navigate = useNavigate();
  const { cate } = useParams();

  const chart = getChart(cate);
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