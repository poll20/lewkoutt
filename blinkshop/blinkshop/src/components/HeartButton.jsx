import React, { useState } from 'react';
import './HeartButton.css';
import { useBio } from './BioContext';
const HeartButton = ({cardid,w,h,mt}) => {
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
      <div className="heart" style={{width:w,height:h ,marginTop:mt}}></div>
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
