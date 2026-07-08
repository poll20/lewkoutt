import { useState } from "react";
import { useBio } from "../components/BioContext";

/**
 * Handles the "pick a size" bottom sheet that opens from the wishlist
 * "Add to Bag" button. Extracted so Card.jsx doesn't need to know
 * how sizes are resolved from a colorId.
 */
export const useSizeSelector = () => {
  const { productdataonlydetail } = useBio();

  const [prdallsizes, setPrdAllSizes] = useState([]);
  const [addtocartkeliyeid, setAddToCartKeliyeId] = useState(null);
  const [sizesshow, setSizesShow] = useState(false);

  const setShowSize = (id) => {
    const prd = productdataonlydetail
      .map((product) => {
        const matchingColor = product.colors.find((color) => color._id === id);
        if (!matchingColor) return null;
        return {
          ...product,
          colors: [
            {
              ...matchingColor,
              price: product.price,
              discountprice: product.discountprice,
              shopname: product.shopname,
              shopaddress: product.shopaddress,
              discount: product.discount,
            },
          ],
        };
      })
      .filter(Boolean);

    if (prd.length > 0) {
      setPrdAllSizes(prd[0].colors[0].sizes);
      setAddToCartKeliyeId(prd[0].colors[0]);
      setSizesShow(true);
    }
  };

  return {
    prdallsizes,
    addtocartkeliyeid,
    sizesshow,
    setSizesShow,
    setShowSize,
  };
};