import React, { useState } from 'react';
import './HeartButton.css';
import { useBio } from './BioContext';

import { DotLottieReact } from '@lottiefiles/dotlottie-react';
const HeartButton = ({cardid,w,h,mt,dw,dh,dmt,dml,pdml}) => {
  const [isClicked, setIsClicked] = useState(false);
  const {wishlistdata,guestWishlist,isLoggedIn}=useBio()


  const activeWishlist = isLoggedIn ? wishlistdata : guestWishlist;

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
  // const isItemInWishlist = wishlistdata.some((item) => item.itemid === cardid);
  //   const isItemInWishlist = wishlistdata?.some(
  //   (item) =>
  //     item.itemid === cardid || item.productId === cardid
  // );
  const isItemInWishlist = activeWishlist?.some(
  (item) =>
    item.itemid === cardid ||
    item.productId === cardid ||
    item._id === cardid
);

  
  const handleClickk = () => {
    setIsClicked(!isClicked);
    
    
  
  };

  return (
//     <div className={`heart-container ${isItemInWishlist? 'clicked' : ''}`} onClick={handleClickk}>
//       {

// !isItemInWishlist?(<div className="heart" style={{width:w,height:h ,marginTop:mt,marginLeft:pdml}}></div>):(<DotLottieReact
//       src="https://lottie.host/b1b4c240-b0fd-4da8-bcdc-6ba5a428f1ec/vKUwHyzP85.lottie"
      
//       autoplay
      
//       style={{width:dw,height:dh ,marginTop:dmt,marginLeft:dml}}
//     />)      
      
       
//       }

//       {isClicked && <div className="sparkles"></div>}
//     </div>
 <div className={`heart-container ${isItemInWishlist ? "clicked" : ""}`}>
      {!isItemInWishlist ? (
        <div
          className="heart"
          style={{ width: w, height: h, marginTop: mt, marginLeft: pdml }}
        />
      ) : (
        <DotLottieReact
          src="https://lottie.host/b1b4c240-b0fd-4da8-bcdc-6ba5a428f1ec/vKUwHyzP85.lottie"
          autoplay
          style={{ width: dw, height: dh, marginTop: dmt, marginLeft: dml }}
        />
      )}
    </div>
  );
};
export default HeartButton;
