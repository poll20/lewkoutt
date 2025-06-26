import React, { useState } from 'react';
import { useDashboard } from './DashboardContext';
import Cardforall from '../Cardforall';

const Bandle = () => {
  const { productdata,createBundle } = useDashboard();
  const [selectedCards, setSelectedCards] = useState([]);
const[val,setval]=useState()
  const handleCardClick = (cardId) => {
    // Already selected? Deselect
    if (selectedCards.includes(cardId)) {
      setSelectedCards(selectedCards.filter((id) => id !== cardId));
    } else {
      // If less than 2 selected, add it
      if (selectedCards.length < 2) {
        setSelectedCards([...selectedCards, cardId]);
        
      }
      
    }
  };
const selectedCardStyle = {
  boxShadow: '0 0 10px 3px rgba(0, 255, 0, 0.5)',
  transform: 'scale(1.02)',
  transition: '0.3s'
};
if(productdata){
    console.log("prd aya kya0",productdata)
}
console.log("bundell",selectedCards)
  return (
    <>
    {selectedCards.length==2?(<input type='text' placeholder='enter amount' value={val} onChange={(e)=>{setval(e.target.value)}}></input>):('')}
      {productdata?.map((e) => (
        <div className="horizontal-card-layout" key={e.category}>
          <h1 style={{ textAlign: "start" }}>
            <span style={{ color: "rgb(131, 241, 131)" }}>
              {e.category.charAt(0).toUpperCase() + e.category.slice(1)}
            </span>{" "}
            <span>wears</span>
          </h1>

          <div className="child-cards-wrapper">
           <div className="child-cards">
  {e.productdetails.map((item) =>
    item.colors?.map((colorObj, idx) => {
      const cardId = colorObj._id; // unique id for each color variation
      const isSelected = selectedCards.includes(cardId);

      return (

        
        <div
          key={cardId}
          className={`cate-card-done ${isSelected ? "selected-card" : ""}`}
          onClick={() => handleCardClick(cardId)}
          style={{
            border: isSelected ? "3px solid green" : "1px solid #ccc",
            borderRadius: "10px",
            cursor: "pointer",
            ...(isSelected ? selectedCardStyle : {})
          }}
        >
            
          <Cardforall
            id={cardId}
            discription={colorObj.description}
            price={item.price}
            discountprice={item.discountprice}
            image={colorObj.sizes?.[0]?.image?.[0]} // pehli image
            discount={item.discount}
            section="bundel"
            color={colorObj.color}
            size={colorObj.sizes?.[0]?.size}
          />
        </div>
      );
    })
  )}

</div>

          </div>
        </div>
      ))}
      <button style={{background:"black",color:"white"}} onClick={(()=>{createBundle(selectedCards,val)})}>create bundel</button>
    </>
  );
};

export default Bandle;
