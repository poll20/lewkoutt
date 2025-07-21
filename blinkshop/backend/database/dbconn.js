let mongoose=require("mongoose")
// const {slotmodel} = require('./collection.js');
let {productsmodel}=require("./collection.js")
const connectDB = async () => {
   try {
    //  mongoose.set('bufferCommands', false); // ✅ पहले ही सेट कर दो
 
     await mongoose.connect(process.env.MONGO_URI
      , {
       serverSelectionTimeoutMS: 50000,
       socketTimeoutMS: 45000
     }
    );
 
     console.log("✅ MongoDB connected successfully");
     // productdetails.searchcount == null
// await productsmodel.updateMany(
//   { "productdetails.searchcount": null },
//   { $set: { "productdetails.$[pd].searchcount": 0 } },
//   { arrayFilters: [{ "pd.searchcount": null }] }
// );

// // colors[].searchcount == null
// await productsmodel.updateMany(
//   { "productdetails.colors.searchcount": null },
//   { $set: { "productdetails.$[].colors.$[c].searchcount": 0 } },
//   { arrayFilters: [{ "c.searchcount": null }] }
// );

    //  const existing = await slotmodel.find();
  // if (existing.length === 0) {
  //   await slotmodel.insertMany([
  //     { label: 'Within 60 minutes' },
  //     { label: '11:00 AM – 1:00 PM' },
  //     { label: '1:00 PM – 3:00 PM' },
  //     { label: '3:00 PM – 5:00 PM' },
  //     { label: '5:00 PM – 7:00 PM' },
  //     { label: '7:00 PM – 9:00 PM' },
  //   ]);
  //   console.log('✅ SlotStatus seeded');
  // } else {
  //   console.log('ℹ️ Slots already exist, skipping seeding.');
  // }
   } catch (err) {
     console.error("❌ MongoDB connection error:", err);
     process.exit(1);
   }
 };
 
 module.exports = connectDB;