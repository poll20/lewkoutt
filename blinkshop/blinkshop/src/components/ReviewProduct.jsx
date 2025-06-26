import React from "react";
import "./ReviewProduct.css";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useBio } from "./BioContext";
import { useState } from "react";

const reviews = [
  {
    user: "CSS Tutorials",
    rating: 5,
    title: "Outstanding Review Design",
    comment:
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    image: "https://i.pravatar.cc/50?img=1",
  },
  {
    user: "HTML CSS Tutorials",
    rating: 5,
    title: "Nice Review Design",
    comment:
      "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos.",
    image: "https://i.pravatar.cc/50?img=2",
  },
];

const ReviewProduct = () => {

    let {id,avgrating}=useParams()
console.log("prmai id",id,avgrating)
let {prdreviewdata,callreivewfunc}=useBio()

useEffect(()=>{
    console.log("call ho rha h")
callreivewfunc(id)
},[id])
if(prdreviewdata){
    console.log("prdd view data mil gyaa yppo",prdreviewdata)
}

  return (

    
      // <div className="review-container" style={{marginTop:"50px"}}>
        
      //   <div className="review-summary">
      //     <h2>Review</h2>
      //     <div className="rating-block">
      //       <div className="rating-number">{avgrating}</div>
      //       <div className="stars">{'★'.repeat(avgrating)}</div>
      //       <div className="review-count">({prdreviewdata?.length} Reviews)</div>
      //     </div>

      //     <div className="rating-bar-section">
      //       {[5, 4, 3, 2, 1].map((star) => (
      //         <div key={star} className="rating-bar">
      //           <span>{star}</span>
      //           <div className="bar-track">
      //             <div
      //               className="bar-fill"
      //               style={{ width: `${star * 20}%` }}
      //             ></div>
      //           </div>
      //           <span>{star + 1}</span>
      //         </div>
      //       ))}
      //     </div>
      //   </div>

      //   <div className="review-list">
      //     <h3>Reviews</h3>
      //     {prdreviewdata?.map((r, idx) => (
      //       <div className="review-card" key={idx}>
      //         {/* <img src={r.image} alt="user" className="avatar" /> */}
      //         <div>
      //           <h4>{r.userName} <span className="stars">{"★".repeat(r.rating)}</span></h4>
      //           <strong>{r.t}</strong>
      //           <p>{r.review}</p>
      //         </div>
      //         <div style={{display:"flex",flexDirection:"row",overflowX:"auto"}}>
      //         <img src={r.image} alt="user" className="avatar" />
      //         </div>

      //       </div>
      //     ))}
      //   </div>
      // </div>
      <div className="review-container" style={{ marginTop: "50px" }}>
  {prdreviewdata?.length === 0 ? (
    <div style={{ textAlign: "center", padding: "20px", fontSize: "18px" }}>
      <div className="rating-bar-section">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-bar">
              <span>{star}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${star * 20}%` }}
                ></div>
              </div>
              <span>{star + 1}</span>
            </div>
          ))}
        </div>
      Only be the one to review on this item
    </div>
  ) : (
    <>
      <div className="review-summary">
        <h2>Review</h2>
        <div className="rating-block">
          <div className="rating-number">{avgrating}</div>
          <div className="stars">{'★'.repeat(avgrating)}</div>
          <div className="review-count">({prdreviewdata?.length} Reviews)</div>
        </div>

        <div className="rating-bar-section">
          {[5, 4, 3, 2, 1].map((star) => (
            <div key={star} className="rating-bar">
              <span>{star}</span>
              <div className="bar-track">
                <div
                  className="bar-fill"
                  style={{ width: `${star * 20}%` }}
                ></div>
              </div>
              <span>{star + 1}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="review-list">
        <h3>Reviews</h3>
        {prdreviewdata?.map((r, idx) => (
          <div className="review-card" key={idx}>
            <div>
              <h4>{r.userName} <span className="stars">{"★".repeat(r.rating)}</span></h4>
              <strong>{r.t}</strong>
              <p>{r.review}</p>
            </div>
            <div style={{ display: "flex", flexDirection: "row", overflowX: "auto" }}>
              <img src={r.image} alt="user" className="avatar" />
            </div>
          </div>
        ))}
      </div>
    </>
  )}
</div>

  );
};

export default ReviewProduct;
