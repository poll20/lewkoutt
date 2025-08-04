const {productsmodel} = require("../database/collection.js"); // MongoDB User model


const viewdIncrementor = async (id) => {
  try {
    let product = await productsmodel.findOne({
      $or: [
        { "productdetails._id": id },
        { "productdetails.colors._id": id }
      ]
    });

    if (!product) return;

    let updated = false;

    for (let detail of product.productdetails) {
      if (detail._id.toString() === id) {
        detail.viewd = typeof detail.viewd === "number" ? detail.viewd + 1 : 1;
        updated = true;
      }

      for (let color of detail.colors || []) {
        if (color._id.toString() === id) {
          color.viewd = typeof color.viewd === "number" ? color.viewd + 1 : 1;
          updated = true;
        }
      }
    }

    if (updated) {
      await product.save();
    }

  } catch (err) {
    console.error("Error incrementing viewd:", err);
  }
};

module.exports = viewdIncrementor;

// module.exports = viewdIncrementor;

