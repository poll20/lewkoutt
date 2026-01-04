let mongoose=require("mongoose")
// const {slotmodel} = require('./collection.js');
let {productsmodel}=require("./collection.js")
const connectDB = async () => {
   try {
     mongoose.set('bufferCommands', false); 
 
     await mongoose.connect(process.env.MONGO_URI
      , {
       serverSelectionTimeoutMS: 50000,
       socketTimeoutMS: 45000
     }
    );
 
     console.log("✅MongoDB connected successfully");
   
   } catch (err) {
     console.error("❌ MongoDB connection error:", err);
     process.exit(1);
   }
 };
 
 module.exports = connectDB;