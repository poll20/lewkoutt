import React, { useState } from 'react';
import './HeartButton.css';
import { useBio } from './BioContext';
// import Lottie from "lottie-react";
// import animationData from './image/hearttt.json'
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const HeartButton = ({cardid,w,h,mt,dw,dh,dmt,dml}) => {
  const [isClicked, setIsClicked] = useState(false);
  const {wishlistdata}=useBio()

  if(!wishlistdata){
    return(<p>loading...</p>)
  }
  if(wishlistdata)
  {
  console.log("wyade",wishlistdata)
  }
  wishlistdata.map((e)=>{
    if(e._id==cardid)
    {
      // console.log("this id is true",e._id)
    }
  })
  const isItemInWishlist = wishlistdata.some((item) => item.itemid === cardid);
  
  // console.log("isitem",isItemInWishlist)
  const handleClickk = () => {
    setIsClicked(!isClicked);
    // console.log("mil gyi",cardid)
    // console.log("heart m wishlist",wishlistdata)
    
  
  };

  return (
    <div className={`heart-container ${isItemInWishlist? 'clicked' : ''}`} onClick={handleClickk}>
      {

!isItemInWishlist?(<div className="heart" style={{width:w,height:h ,marginTop:mt}}></div>):(<DotLottieReact
      src="https://lottie.host/b1b4c240-b0fd-4da8-bcdc-6ba5a428f1ec/vKUwHyzP85.lottie"
      
      autoplay
      // style={{width:"38px",height:"38px" ,marginTop:"-11px",marginLeft:"-11px"}}
      style={{width:dw,height:dh ,marginTop:dmt,marginLeft:dml}}
    />)      
      
       
      }

      {isClicked && <div className="sparkles"></div>}
    </div>
  );
};
export default HeartButton;

// // export default HeartButton;

// // import React from 'react';
// // import './HeartButton.css';
// // import { useBio } from './BioContext';

// // const HeartButton = ({ cardid }) => {
  
// //   const { wishlist, handleClick } = useBio(); // Assume updateWishlist handles add/remove logic

// //   if (!wishlist) {
// //     return <p>Loading...</p>;
// //   }

// //   const isInWishlist = wishlist.includes(cardid); // Check if the item is in the wishlist

// //   const handleClickk = () => {
// //     console.log("Card ID:", cardid);
// //     console.log("Wishlist contains card ID:", isInWishlist);

// //     // Toggle the item's presence in the wishlist
// //     handleClick(cardid);
// //   };

// //   return (
// //     <div
// //       className={`heart-container ${isInWishlist ? 'clicked' : ''}`}
// //       onClick={handleClickk}
// //     >
// //       <div className="heart"></div>
// //       {isInWishlist && <div className="sparkles"></div>}
// //     </div>
// //   );
// // };

// // export default HeartButton;

// import React from 'react';
// import './HeartButton.css';
// import { useBio } from './BioContext';

// const HeartButton = ({ cardid }) => {
//   const { wishlist,wishlistdata} = useBio(); // Use wishlist from context
// console.log("heart btm m mili id",cardid)
//   if (!wishlist) {
//     return <p>Loading...</p>;
//   }
//   // console.log("heart btm m mila wishlist",wishlist)
//   // console.log("heart btm m mila wishlistdata",wishlistdata)

//   const isInWishlist = wishlist.includes(cardid); // Check if item is in the wishlist

//   const handleClickk = () => {
//     console.log("Card ID:", cardid);
//     console.log("Wishlist contains card ID:", isInWishlist);

    
//   };

//   return (
//     <div
//       className={`heart-container ${isInWishlist ? 'clicked' : ''}`}
//       onClick={handleClickk}
//     >
//       <div className="heart"></div>
//       {isInWishlist && <div className="sparkles"></div>}
//     </div>
//   );
// };

// export default HeartButton;
