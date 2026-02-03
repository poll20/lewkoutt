const express = require("express");
const { productsmodel: Product } = require("../../database/collection.js");

const router = express.Router();
console.log("🔥 facebookFeedRoute file loaded");
router.get("/facebook-product-feed", async (req, res) => {
  try {
    const products = await Product.find();
console.log("products:", products.length);
    // CSV header
    let csv =
      "id,title,description,image_link,availability,price,condition,link\n";

    products.forEach((product) => {
      if (!product.productdetails || product.productdetails.length === 0)
        return;

      product.productdetails.forEach((pd) => {
        const id = `SKU_${pd._id}`;

        const title = `"${(pd.title || "").replace(/"/g, "")}"`;
        const description = `"${(pd.description || "").replace(/"/g, "")}"`;

        const image =
          pd.image?.[0] ||
          pd.colors?.[0]?.sizes?.[0]?.image?.[0] ||
          product.image ||
          "";

        const availability = "in stock";
        const price = `${pd.discountprice || pd.price} INR`;
        const condition = "new";
        const link = `http://localhost:3000/product/${pd._id}`;

        csv += `${id},${title},${description},${image},${availability},${price},${condition},${link}\n`;
      });
    });

    res.setHeader("Content-Type", "text/csv");
    res.setHeader(
      "Content-Disposition",
      "inline; filename=facebook_feed.csv"
    );
console.log("hello csv",csv)
    return res.send(`id,title,description,image_link,availability,price,condition,link
SKU_TEST,Test Product,Testing feed,https://via.placeholder.com/300,in stock,999 INR,new,https://lewkout.com/test`);
  } catch (err) {
    console.error("Facebook Feed Error:", err);
    return res.status(500).send("Feed generation failed");
  }
});

module.exports = router;