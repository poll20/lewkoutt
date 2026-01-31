require('dotenv').config();
require("./instrument.js");


const Sentry = require("@sentry/node");
let express=require("express")
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
let app= express()

// ✅ Redis client connect with Upstash
const cacheMiddleware = require("./cacheMiddleware");

app.use(cookieParser());
// security middleware

// const mongoose = require("mongoose");
const crypto = require("crypto"); // CJS
const axios = require("axios");
const cron = require("node-cron")
const jwt = require("jsonwebtoken");
const admin = require("firebase-admin");
// const { StandardCheckoutClient, Env, MetaInfo, StandardCheckoutPayRequest ,RefundRequest } = require("pg-sdk-node");
const { createPhonePePayment } = require("../utils/phonepayPayment");
const { verifyPhonePeWebhook } = require("../utils/phonepayWebhook");
const { randomUUID } = require("crypto");
// const http = require("http"); // ✅ Required for Socket.io abhi nhiii
// const socketIo = require("socket.io"); // ✅ Import Socket.io
const EventEmitter = require('events');
const orderEvent = new EventEmitter();
const slotevent = new EventEmitter();

// const verifyFirebaseToken = require("./authMiddleware");
// const verifyFirebaseToken =require("authMiddleware.js")
// const isAdmin = require("adminCheck.js");
const { upload, uploadToCloudinary } = require('./uploadToCloudinary');


let port=process.env.PORT || 3000

// const server = http.createServer(app); // ✅ Create HTTP Server




let mongoose=require("mongoose")
const twilio = require("twilio");
// let model=require("../database/collection.js")
// let wishmodel=require("../database/collection.js")
let bodyparser=require("body-parser")

// let addtocart=require("../database/collection.js")
let {wishmodel,addtocart,wear,userr,orderr,rentt,newarival,bestseling,productsmodel,otpmodel,Rating,SalesModel,wallettrans,returnmodel,moodmodel,cpn,cpnusage,slotmodel,pendingOrderModel  }=require("../database/collection.js")
// import img1 from "../../blinkshop/src/components/image/img1.jpg"
const viewdIncrementor = require("../helperfunc/viewdincrement.js"); // ✅ import helper

const products = [
  
  { id: 8, name: "Shirt 1", section: "shirts", description: "A cool shirt", price: 19.99, image:"../../blinkshop/src/components/image/img1.jpg" },
  { id: 9, name: "Shirt 2", section: "shirts", description: "Another cool shirt", price: 24.99, image: "../../blinkshop/src/components/image/img1.jpg" },
  { id: 10, name: "Jeans 1", section: "jeans", description: "Stylish jeans", price: 39.99, image: "../../blinkshop/src/components/image/img1.jpg" },
  { id: 11, name: "Jeans 2", section: "jeans", description: "Comfortable jeans", price: 44.99, image: "../../blinkshop/src/components/image/img1.jpg" },
  // Add more products as needed
];


const COOKIE_NAME = "session";
const SESSION_EXPIRES_IN = 14 * 24 * 60 * 60 * 1000; // 14 days
// Twilio credentials from .env


const cors = require('cors');
// app.use(cors());//te loca+lhost m h
// app.use(
//   cors({
//     origin: "http://localhost:5173", // ✅ exact origin
//     credentials: true,               // ✅ allow cookies/auth headers
//   })
// );
// app.use(cors({ origin: '*' }));
app.use(cors({
    origin: [
    "https://www.lewkout.com",
    "https://lewkout.netlify.app",
    "http://localhost:5173"
  ],
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true
}));//ye deploy ke baad 
// app.use(
//   cors({
//     origin: "http://localhost:5173",
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
//   })
// );


// ✅ Fir Helmet lagao
// app.use(helmet({
//   crossOriginResourcePolicy: { policy: "cross-origin" }
// }));

app.use((express.urlencoded({extented:false})))
    
app.use(express.json())
app.use(bodyparser.json())
// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*"});
//     next();
//   }) 
// require("../database/dbconn.js")
const { getPhonePeToken } = require('./phonepe');
const connectDB = require('../database/dbconn.js');
const isAdmin = require('./adminCheck.js');
const verifySessionCookie = require('./authMiddleWare.js');

app.get("/",(req,res)=>{
    res.send("hello")
})

app.get("/debug-sentry", function mainHandler(req, res) {
  throw new Error("My first Sentry error!");
});
// The error handler must be registered before any other error middleware and after all controllers
Sentry.setupExpressErrorHandler(app);

// Optional fallthrough error handler
app.use(function onError(err, req, res, next) {
  // The error id is attached to `res.sentry` to be returned
  // and optionally displayed to the user for support.
  res.statusCode = 500;
  res.end(res.sentry + "\n");
});




app.get("/ping", (req, res) => {
  res.status(200).send("Server is awake!");
});



app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");
  res.flushHeaders();

  const sendEvent = (eventData) => {
    res.write(`data: ${JSON.stringify(eventData)}\n\n`);
  };

  orderEvent.on("new_order", (data) => sendEvent(data));
  orderEvent.on("order_updated", (data) => sendEvent(data));
  orderEvent.on("order_return", (data) => sendEvent(data));

});




// const client = twilio(process.env.ACCOUNTSID,process.env.AUTHTOKEN);


app.get("/card", (req, res) => {
  const section = req.query.section; // Get the category from the query string
//console.log(section)
  // Filter products based on the category
  const filteredProducts = products.filter((product) => product.section === section);

  // If products are found for the category, send them back
  if (filteredProducts.length > 0) {
    res.json(filteredProducts);
  } else {
    res.status(404).json({ message: "No products found for this category" });
  }
});


app.post("/cart",verifySessionCookie, async (req, res) => {
  try {
    const {
      _id,
      color,
      title,
      description,
      image,
      price,
      discountprice,
      discount,
      userid,
      productId,
      shopname,
      size
    } = req.body;

    console.log("Received Data:", req.body); // Debugging

    if (!userid || !productId) {
      return res.status(400).json({ error: "User ID and Product ID are required" });
    }

    const newItem = new wishmodel({
      itemid: _id,
      color,
      title,
      description,
      image,
      price,
      discountprice,
      discount,
      userId: userid,
      productId,
      shopname,
      size
    });

    console.log("Saving item to DB:", newItem);

    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("Error saving to DB:", err);
    res.status(400).json({ error: err.message });
  }
});

//get cart item
app.get('/cart/:uid',verifySessionCookie, async (req, res) => {
  let { uid } = req.params;

  // ✅ Validate UID before using ObjectId
  if (!uid || !mongoose.Types.ObjectId.isValid(uid)) {
    return res.status(400).json({ error: "Invalid User ID" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(uid);
    const items = await wishmodel.find({ userId: objectId }).populate("productId").lean();

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/cart/:id',verifySessionCookie, async (req, res) => {
  const { id } = req.params; // Extract the item ID from the URL params
console.log(id)

 // Ensure ID is a valid ObjectId
 if (!mongoose.Types.ObjectId.isValid(id)) {
  return res.status(400).json({ message: "Invalid ID format" });
}
  try {
    const deletedItem = await wishmodel.find({itemid:new mongoose.Types.ObjectId(id)}); // Find the item by its ID and delete it
    console.log("ss",deletedItem)
    if (deletedItem) {
      let d=await wishmodel.findByIdAndDelete(deletedItem[0]._id)

      if(d){
        res.status(200).json({ message: 'Item deleted successfully',d});
      }
            // If the item is found and deleted, return success response
      //console.log(deletedItem);
     
    } else {
      // If the item with the given ID is not found, return 404
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    // In case of any error, return 500 with the error message
    console.error("Database Deletion Error:", err);
    res.status(500).json({ error: err.message });
  }
});


app.post("/addtocart",verifySessionCookie, async (req, res) => {
  const body = req.body;
console.log("bodycheck kroo",body)
  // 1. Check if it's a bundle (array of objects)
  if (Array.isArray(body.bundle)) {
    try {
      console.log("📦 Bundle payload received:", body);

      const userid = body.bundle[0]?.userid;

      const bundleData = body.bundle.map((item) => ({
        productId: item.productId,
        color: item.color,
        title: item.title,
        image: item.image,
        color: item.color,
        original: item.original,
        price: item.price,
        sizes: item.sizes?.[0]?.size || "",
         bundletotalamount:item.bundelprice
      }));

      const cartItem = new addtocart({
        userId: userid,
        bundle: bundleData,
      });

      console.log("🛒 Final bundle cart to save:", cartItem);

      const saved = await cartItem.save();

      console.log("✅ Saved bundle to DB:", saved);
      return res.status(200).json(saved);
    } catch (err) {
      console.error("❌ Error saving bundle cart:", err);
      return res.status(400).json({ error: err.message });
    }
  }

  // 2. Otherwise, treat as single product
  try {
    const {
      _id,
      image,
      title,
      description,
      qty,
      size,
      color,
      sizes,
      price,
      discountprice,
      userid,
      productId,
      productid,
      shopname,
    } = body;

    const cartData = {
      productid,
      productId,
      title,
      description,
      image: image || (sizes?.[0]?.image?.[0] ?? ""),
      qty,
      color,
      size,
      price,
      discountprice,
      userId: userid,
      shopname,
    };

    const cartItem = new addtocart(cartData);

    const savedCart = await cartItem.save();
    console.log("✅ Saved single item to DB:", savedCart);
    return res.status(200).json(savedCart);
  } catch (err) {
    console.error("❌ Error saving single item:", err);
    return res.status(400).json({ error: err.message });
  }
});

// app.get("/addtocart/:uid",verifySessionCookie,async(req,res)=>{

//   let { uid } = req.params;

//   // ✅ Validate UID before using ObjectId
 
//   try{
//   // let cartdata=await addtocart.find()
//   const objectId = new mongoose.Types.ObjectId(uid);
//   let cartdata=await addtocart.find({ userId: objectId }).populate("productId").lean()
//   console.log("cartdata",cartdata)
//   // //console.log(cartdata)
//     res.status(200).json(cartdata)
//   }
//   catch(e){
//     //console.log(e)
//     res.status(400).json(e.message)
//   }
// })

app.get("/addtocart/:uid", verifySessionCookie, async (req, res) => {
  console.log("/addtocart/:uid endpoint hit");
  try {
    const { uid } = req.params;
console.log("uid",uid)
    if (!mongoose.Types.ObjectId.isValid(uid)) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const userObjectId = new mongoose.Types.ObjectId(uid);
    let cartItems = await addtocart.find({ userId: userObjectId }).lean();
console.log("user add to cart",cartItems)
    if (!cartItems || cartItems.length === 0) {
      return res.status(200).json([]);
    }

    for (const item of cartItems) {
      if (!item.productId) continue;

      // 🧩 productId nested hai productdetails.colors ke andar
      const product = await productsmodel.findOne({
        "productdetails.colors._id": new mongoose.Types.ObjectId(item.productId)
      }).lean();

      if (!product) {
        console.log(`❌ Product not found for cart item: ${item._id}`);
        continue;
      }

      let isOutOfStock = false;

      // 🔍 Traverse nested productdetails -> colors -> sizes
      for (const detail of product.productdetails || []) {
        for (const colorObj of detail.colors || []) {
          if (
            colorObj._id?.toString() === item.productId.toString() && // match by id
            colorObj.color?.trim().toLowerCase() === item.color?.trim().toLowerCase()
          ) {
            for (const s of colorObj.sizes || []) {
              if (
                s.size === item.size &&
                Number(s.quantity) === 0
              ) {
                console.log(
                  `🚨 Out of stock detected for ${item.title} (color: ${item.color}, size: ${item.size})`
                );
                isOutOfStock = true;
                break;
              }
            }
          }
          if (isOutOfStock) break;
        }
        if (isOutOfStock) break;
      }

      if (isOutOfStock) {
        await addtocart.updateOne({ _id: item._id }, { $set: { qty: 0 } });
        item.qty = 0;
      }
    }

    res.status(200).json(cartItems);
  } catch (err) {
    console.error("❌ Error in /addtocart:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



app.delete('/addtocart/:id', verifySessionCookie,async (req, res) => {
  const { id } = req.params; // Extract the item ID from the URL params
//console.log(id)
  try {
    const deletedItem = await addtocart.findByIdAndDelete(id); // Find the item by its ID and delete it
  console.log("dc",deletedItem)
    if (deletedItem) {
      // If the item is found and deleted, return success response
      //console.log(deletedItem);
      res.status(200).json({ message: 'Item deleted successfully', deletedItem });
    } else {
      // If the item with the given ID is not found, return 404
      res.status(404).json({ message: 'Item not found' });
    }
  } catch (err) {
    // In case of any error, return 500 with the error message
    res.status(500).json({ error: err.message });
  }
});



//categories 
//top
app.get("/wear",async(req,res)=>{
  let operation=req.query.operation
  let section=req.query.section
  try{
    if(operation=="all"){
       //  let data=await wear.find({}, { category: 1, _id: 0 })// for retrive only category field
      let categorydata=await wear.find().lean()
      res.json(categorydata)
    }
    else if (operation === "filtered") {
      // Operation 2: Fetch documents filtered by 'tag'
      const cat = req.query.section;
      const categoryData = await wear.find({});
      const finalData = categoryData.filter((item) => item.tag === cat);

      if (finalData.length !== 0) {
        res.json(finalData);
      } else {
        res.json({ message: "No data found" });
      }
    } else {
      res.status(400).json({ message: "Invalid operation type" });
    }
  } 
  catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
  
 })
  // console.log("Request received at /user/register:", req.body); // ✅Backend logging
  // // const { name, email, updated_at } = req.body;
  // const {phoneNumber,uid,refcode, updated_at } = req.body
  // console.log("phonenumberrrrr",phoneNumber)
  // if (phoneNumber && uid && !refcode) { 
  //   try {
  //     // Check if user already exists
  //     const existingUser = await userr.findOne({ phonenumber:phoneNumber });
  //     if (!existingUser) {
  //       const newUser = new userr({
  //         // name: name,
  //         // email: email,
  //         phonenumber:phoneNumber,
  //         uid:uid,
  //         created_at: updated_at,
  //       });
  //       console.log("dekghte h",newUser)
  //       const savedUser = await newUser.save();
  //       console.log("User saved:", savedUser);
  //       res.status(201).json({ message: "User saved successfully", savedUser });
  //     } else {
  //       res.status(200).json({ message: "User already exists" });
  //     }
  //   } catch (e) {
  //     console.error("Database error:", e);
  //     res.status(500).json({ message: e.message });
  //   }
  // }
  // else if (phoneNumber && uid && refcode) { 
  //   try {
  //     // Check if user already exists
  //     const existingUser = await userr.findOne({ uid: uid });
  //     if (!existingUser) {
  //       // Find the user who owns the referral code
  //       const referringUser = await userr.findOne({ code: refcode });
  
  //       if (referringUser) {
  //         // Increment codecount by 1
  //         referringUser.codecount = (referringUser.codecount || 0) + 1;
  //         referringUser.codepoint=(referringUser.codepoint || 0) + 5
  //         await referringUser.save(); // save the updated count
  //       }
  
  //       const newUser = new userr({
  //         phonenumber: phoneNumber,
  //         uid: uid,
  //         refercode:refcode,
  //         created_at: updated_at,
  //         // code: generatedCode, // if you're generating a code for new user
  //       });
  
  //       console.log("dekghte h", newUser);
  //       const savedUser = await newUser.save();
  //       console.log("User saved:", savedUser);
  
  //       res.status(201).json({ message: "User saved successfully", savedUser });
  //     } else {
  //       res.status(200).json({ message: "User already exists" });
  //     }
  //   } catch (e) {
  //     console.error("Database error:", e);
  //     res.status(500).json({ message: e.message });
  //   }
  // }
  
  // else {
  //   console.error("Error saving user:"); // 👈 Error ko log karo

  //   res.status(400).json({ message: "Email is required" });
 
//user created or registered

// app.post("/user/register", async (req, res) => {
//   const { phoneNumber, name, email } = req.body;

//   try {
//     const existing = await userr.findOne({ phoneNumber });
//     if (existing) {
//       return res.status(400).json({ message: "User already exists" });
//     }

//     const newUser = new userr({ phoneNumber, name, email });
//     await newUser.save();

//     res.status(201).json(newUser);
//   } catch (e) {
//     res.status(500).json({ message: e.message });
//   }
// });

// app.post("/user/register", async (req, res) => {
//    console.log("📩 Body received:", req.body);
//   console.log("📩 Headers:", req.headers);
//  // }
//   try {
//     const { idToken, refcode } = req.body;
//     if (!idToken) return res.status(400).json({ error: "Missing ID token" });

//     // 🔑 Verify token
//     const decoded = await admin.auth().verifyIdToken(idToken);
// console.log("decode",decoded)
//     // ✅ Create secure session cookie
//     const sessionCookie = await admin.auth().createSessionCookie(idToken, {
//       expiresIn: SESSION_EXPIRES_IN,
//     });

//     res.cookie(COOKIE_NAME, sessionCookie, {
//       maxAge: SESSION_EXPIRES_IN,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "lax",
//       path: "/",
//     });

//     // ✅ Check/create user in DB
//     const phoneNumber = decoded.phone_number;
//     const uid = decoded.uid;

//     let user = await userr.findOne({ uid });
//     if (!user) {
//       const newUser = new userr({
//         phonenumber: phoneNumber,
//         uid: uid,
//         refercode: refcode || null,
//         created_at: new Date(),
//       });

//       // referral logic
//       if (refcode) {
//         const referringUser = await userr.findOne({ code: refcode });
//         if (referringUser) {
//           referringUser.codecount = (referringUser.codecount || 0) + 1;
//           referringUser.codepoint = (referringUser.codepoint || 0) + 5;
//           await referringUser.save();
//         }
//       }

//       user = await newUser.save();
//     }

//     res.json({ status: "success", user });
//   } catch (err) {
//     console.error("sessionLogin error:", err);
//     res.status(401).json({ error: "Unauthorized" });
//   }
// });

// ✅ REFRESH SESSION (for expired cookies)
// app.post("/user/refresh-session", async (req, res) => {
//   try {
//     const { idToken } = req.body;
//     if (!idToken) return res.status(400).json({ error: "Missing idToken" });

//     // Verify the new Firebase ID token
//     const decodedToken = await admin.auth().verifyIdToken(idToken);

//     // Create a new session cookie with updated expiry
//     const sessionCookie = await admin.auth().createSessionCookie(idToken, {
//       expiresIn: 1000 * 60 * 60 * 24 * 7, // 7 days
//     });

//     res.cookie("session", sessionCookie, {
//       maxAge: 1000 * 60 * 60 * 24 * 7,
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//       sameSite: "Lax",
//       path: "/",
//     });

//     res.status(200).json({ success: true });
//   } catch (error) {
//     console.error("❌ Error refreshing session:", error.message);
//     res.status(401).json({ error: "Session refresh failed" });
//   }
// });

app.get("/user/check-session", verifySessionCookie, (req, res) => {
  res.status(200).json({ valid: true });
});



app.post("/user/register", async (req, res) => {
  try {
    const { idToken, refcode } = req.body;
    if (!idToken) {
      return res.status(400).json({ error: "Missing ID token" });
    }

    // 🔑 Verify Firebase ID token
    const decoded = await admin.auth().verifyIdToken(idToken);
    console.log("✅ Decoded token:", decoded);

    // 🔑 Create Firebase session cookie
    const sessionCookie = await admin.auth().createSessionCookie(idToken, {
      expiresIn: SESSION_EXPIRES_IN,
    });

    // ✅ Set secure cookie
    res.cookie(COOKIE_NAME, sessionCookie, {
      maxAge: SESSION_EXPIRES_IN,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false, // local test ke liye false
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax", // prod = cross-site allowed
      path: "/",
    });

    // ✅ Check / Create user in DB
    const phoneNumber = decoded.phone_number;
    const uid = decoded.uid;

    let user = await userr.findOne({ uid });
    if (!user) {
      const newUser = new userr({
        phonenumber: phoneNumber,
        uid: uid,
        refercode: refcode || null,
        created_at: new Date(),
      });

      // referral logic
      if (refcode) {
        const referringUser = await userr.findOne({ code: refcode });
        if (referringUser) {
          referringUser.codecount = (referringUser.codecount || 0) + 1;
          referringUser.codepoint = (referringUser.codepoint || 0) + 5;
          await referringUser.save();
        }
      }

      user = await newUser.save();
    }

    // ✅ Return response
    res.status(200).json({
      status: "success",
      message: "User registered successfully",
      user,
    });
  } catch (err) {
    console.error("❌ sessionLogin error:", err);
    res.status(401).json({ error: "Unauthorized" });
  }
});


app.post("/merge-guest-data", verifySessionCookie, async (req, res) => {
  try {
    // 🔑 Firebase UID
    const firebaseUid = req.user.uid;

    // 🔥 Mongo user nikalo
    const dbUser = await userr.findOne({ uid:firebaseUid });

    if (!dbUser) {
      return res.status(401).json({ message: "User not found" });
    }

    const userId = dbUser._id; // ✅ REAL Mongo ID
    const { cart, wishlist, address } = req.body;

    // 🛒 CART
    for (let item of cart) {
      const pid = item.productId || item.productid;

      const exists = await addtocart.findOne({ userId, productId: pid });

      if (!exists) {
        const { _id, ...safeItem } = item;
        await addtocart.create({
          ...safeItem,
          productId: pid,
          userId,
        });
      }
    }

    // ❤️ WISHLIST
    for (let item of wishlist) {
      const pid = item.productId || item.itemid;
console.log("wishlistid",pid)
      const exists = await wishmodel.findOne({ userId, productId: pid });

      if (!exists) {
        const { _id, ...safeItem } = item;
        await wishmodel.create({
          ...safeItem,
          productId: pid,
          itemid: pid,

          userId,
        });
      }
    }

    // 🏠 ADDRESS
    // 🏠 ADDRESS
if (address.length) {
  const safeAddresses = address.map(addr => {
    const { _id, ...rest } = addr; // ❌ remove guest _id
    return rest;
  });

  await userr.updateOne(
    { _id: userId },
    { $push: { address: { $each: safeAddresses } } }
  );
}


    res.json({ success: true });
  } catch (err) {
    console.error("MERGE ERROR:", err);
    res.status(500).json({ message: "Merge failed" });
  }
});



// 🔧 PATCH Route
app.patch('/useredit',verifySessionCookie, async (req, res) => {
  const { data, userid } = req.body;

  try {
    const updatedUser = await userr.findByIdAndUpdate(
      userid,
      {
        $set: {
          name: data.name,
          email: data.email,
          dob: data.dob,
        },
      },
      { new: true } // returns the updated document
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found!' });
    }

    res.status(200).json({
      message: 'User updated successfully!',
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Delete user data on logout
// app.post("/user/logout", async (req, res) => {
//   const { email } = req.body;
//   if (email) {
//     try {
//       const deletedUser = await userr.deleteMany({ email });
//       if (deletedUser.deletedCount > 0) {
//         res.status(200).json({ message: "User data deleted successfully" });
//       } else {
//         res.status(404).json({ message: "User not found" });
//       }
//     } catch (e) {
//       res.status(500).json({ message: "Error during deletion: " + e.message });
//     }
//   } else {
//     res.status(400).json({ message: "Email is required to delete user data" });
//   }
// });
app.post("/user/logout",(req, res) => {
  res.clearCookie("session", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
  });
  return res.json({ message: "Logged out successfully" });
});





app.put("/user/update-role/:userId", verifySessionCookie,isAdmin,async (req, res) => {
  try {
      const { role, shopname, shopaddress } = req.body;

      // Ensure role is a string
      if (typeof role !== "string") {
          return res.status(400).json({ message: "Role must be a string" });
      }

      // Update user role
      const updatedUser = await userr.findByIdAndUpdate(
          req.params.userId,
          role === "shopkeeper"
              ? { role, shopname, shopaddress } // Only update shop details if shopkeeper
              : { role }, // Otherwise only update role
          { new: true }
      );

      if (!updatedUser) {
          return res.status(404).json({ message: "User not found" });
      }

      res.json({ message: "User role updated successfully!", updatedUser });
  } catch (error) {
      console.error("Error updating user role:", error);
      res.status(500).json({ message: "Internal Server Error" });
  }
});




app.patch('/user/:userId/address',async (req, res) => {
  let { userId } = req.params;
  console.log("Request Params:", req.params);
  console.log("Extracted uid:", userId);

  // If userId is missing or invalid, return an error
  if (!userId || userId === "undefined" || !mongoose.Types.ObjectId.isValid(userId)) {
    return res.status(400).json({ message: "Invalid user ID format" });
  }

  try {
    const user = await userr.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const { pincode,uname, phone,  building, locality,city,state,saveas,location, isDefault,lat,lng } = req.body;
    console.log("sab kuch",pincode, phone, building, locality,saveas,location, isDefault,lat,lng);

    if (phone) {
      console.log("phone received:", phone);

      

      user.phone.push(phone);
      user.address.push({
        pincode,
        uname,
        building,
        locality,
        phone,
        city,
        state,
        saveas,
        location,
        isDefault: isDefault || false,
        lat,
        lng
      });
      
  

      // await otpmodel.deleteOne({ phone });
      await user.save();

      return res.status(200).json({ message: "Address & phone saved successfully", user });
    }

    return res.status(400).json({ message: "Phone number is required" });

  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: "Server error", error });
  }
});


// ✅ GET API to Fetch Users
app.get("/user", async (req, res) => {
  try {
    let users = await userr.find().lean(); // ✅ Fetch all users from DB
    res.json(users); // ✅ Send users as response
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.patch(`/user/:userId/addressdoe`,verifySessionCookie,async (req, res) => {
  const { userId } = req.params;
  console.log("uid", userId);
  const { addresid, action,addr } = req.body;
console.log("addddddddrrrrrr",addr)
  try {
    // ✅ Step 1: Find User
    const user = await userr.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (action === "delete") {
      console.log("Deleting address:", addresid);

      // ✅ Step 2: Check if address exists before deleting
      const addressExists = user.address.some((addr) => addr._id.toString() === addresid);
      if (!addressExists) {
        return res.status(404).json({ message: "Address not found" });
      }

      // ✅ Step 3: Remove address
      user.address = user.address.filter((e) => e._id.toString() !== addresid);

      await user.save(); // ✅ Save updated user

      return res.status(200).json({ message: "Address deleted successfully" });
    } 
    
  
  else if (action === "edit") {
    console.log("✏️ Editing address:", addresid);

    const addressIndex = user.address.findIndex(
      (addr) => addr._id.toString() === addresid
    );

    if (addressIndex === -1) {
      console.log("❌ Address not found for edit");
      return res.status(404).json({ message: "Address not found" });
    }

    console.log("🛠️ Old Address Before Update:", user.address[addressIndex]);

   
    user.address[addressIndex] = {
      ...(user.address[addressIndex]?.toObject?.() || user.address[addressIndex]),
      ...addr,
    };

    console.log("✅ New Address After Update:", user.address[addressIndex]);

    await user.save();
    console.log("✅ User saved after address update");

    return res.status(200).json({
      message: "Address updated successfully",
      updatedAddress: user.address[addressIndex],
    });
  } 
  
    else {
      return res.status(400).json({ message: "Invalid action" });
    }
  } catch (e) {
    console.error(e);
    console.error("🔥 Error in PATCH /user/:userId/addressdoe:", e);
    return res.status(500).json({ message: "Server error", error: e });
  }
});




// Route to get a specific user's profile by phn
app.get("/user/profile", async (req, res) => {
  const { phoneNumber } = req.query; // Accept phn as a query parameter
   console.log("Cookies received:", req.cookies);
if(phoneNumber){
  console.log("emmm",phoneNumber)
  


  
}

  try {
    const user = await userr.findOne({ phonenumber:phoneNumber}).lean(); // Find user by phn
    if (user) {
      
      res.status(200).json(user); // Send user data as JSON
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
});

app.get("/rent",async(req,res)=>{
  let operation=req.query.operation
  let category=req.query.category
  try{
    if(operation=="all"){
       //  let data=await wear.find({}, { category: 1, _id: 0 })// for retrive only category field
      let categorydata=await rentt.find().lean() 
      res.json(categorydata)
    }
    else if (operation === "filtered") {
      // Operation 2: Fetch documents filtered by 'tag'
      const cat = req.query.category;
      const categoryData = await rentt.find({});
      const finalData = categoryData.filter((item) => item.tag === cat);

      if (finalData.length !== 0) {
        res.json(finalData);
      } else {
        res.json({ message: "No data found" });
      }
    } else {
      res.status(400).json({ message: "Invalid operation type" });
    }
  } 
  catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
  
})

app.get("/bestselling",async(req,res)=>{
try{
  let data=await bestseling.find().lean()
  if(data){
    
    res.status(200).send(data)
    console.log("mimio",data)
  }
  else{
    res.status(400).send("no data found")
  }

}
catch(e){
  console.log(e)
}
})



app.post("/productmodel", verifySessionCookie,isAdmin,async (req, res) => {
  try {
    const productData = req.body;
      // ✅ Fix image URLs if present
    if (productData.image) {
      if (Array.isArray(productData.image)) {
        productData.image = productData.image.map((url) =>
          url.replace("/upload/", "/upload/f_auto,q_auto/")
        );
      } else if (typeof productData.image === "string") {
        productData.image = productData.image.replace(
          "/upload/",
          "/upload/f_auto,q_auto/"
        );
      }
    }

    const newProduct = new productsmodel(productData); // Assuming productsmodel is your mongoose model
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log("ho gyaa",newProduct)
  } catch (error) {
    console.log(error)
    res.status(500).send("Error saving data");
  }
});


const addIdsToSubCollections = async () => {
    try {
        const products = await productsmodel.find();

        for (let product of products) {
            for (let category of product.productdetails) {
                if (!category._id) {
                    category._id = new mongoose.Types.ObjectId();
                }
                for (let color of category.colors) {
                    if (!color._id) {
                        color._id = new mongoose.Types.ObjectId();
                    }
                    for (let size of color.sizes) {
                        if (!size._id) {
                            size._id = new mongoose.Types.ObjectId();
                        }
                    }
                }
            }
            await product.save();
        }

        console.log("Migration completed: _id added to all sub-collections.");
    } catch (error) {
        console.error("Error during migration:", error);
    }
};

addIdsToSubCollections();

app.get("/productmodel",async(req,res)=>{

  
   let operation=req.query.operation
  let section=req.query.section
  let subcategory=req.query.subcategory
  console.log("ope",operation)
  console.log("sec",section)
  
  try{

if (operation === "navbar") {
      const data = await productsmodel.find(
        {},
        { category: 1, productdetails: 1, _id: 0 }
      ).lean();

      const navbarData = data.map(cat => {
        const tags = [
          ...new Set(
            (cat.productdetails || [])
              .map(p => p.tag)
              .filter(Boolean)
          )
        ].filter(tag => tag !== "Co-ord Sets"); // optional cleanup

        return {
          category: cat.category,
          tags
        };
      });

      return res.json(navbarData);
    }


if (operation === "home") {
  const data = await productsmodel.find().lean();

  const homeData = data.map(cat => ({
    _id: cat._id,
    category: cat.category,
    image: cat.image, // carousel ke liye
    productdetails: cat.productdetails.slice(0, 7) // 👈 sirf 7 products
  }));

  return res.json(homeData);
}


    if(operation=="all"){
       //  let data=await wear.find({}, { category: 1, _id: 0 })// for retrive only category field
      let categorydata=await productsmodel.find().lean() 
    res.json(categorydata)
    }
    else if (operation === "filtered") {
      // Operation 2: Fetch documents filtered by 'tag'
      const cat = section;
      const subcat = subcategory;
     
      const categoryData = await productsmodel.find({}).lean();
      console.log("pm",categoryData)
      const finalData = categoryData.filter((item) => item.category == cat);
      const finalllData = finalData.map((item) => item.productdetails).flat();
      const finalsubData = categoryData.map((item) => item.productdetails).flat();
      const subdata=finalsubData.filter((e)=>(e.tag==section))
      console.log("fd",finalData)
      console.log("sd",subdata)
      if (finalllData.length!=0) {
        res.json(finalllData);
      } 
      else if(subdata!=0){
        res.json(subdata)
      }
      
      
      else {
        res.json({ message: "No data found" });
      }
    } else {
      res.status(400).json({ message: "Invalid operation type" });
    }
  } 
  catch (e) {
    console.error(e);
    res.status(500).json({ error: "An error occurred while fetching data" });
  }
})


// categories with pagination
app.get("/categories", async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 2; // ek page me kitni categories
    const skip = (page - 1) * limit;

    const data = await productsmodel
      .find({})
      .skip(skip)
      .limit(limit)
      .lean();

    const total = await productsmodel.countDocuments();

    res.json({
      data,
      hasMore: skip + data.length < total,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


app.get("/home/carousel", async (req, res) => {
  const data = await productsmodel.find(
    {},
    { image: 1, _id: 0 }
  ).lean();

  res.json(data);
});

// app.get("/productmodel", cacheMiddleware((req) => "products_all", 60), async (req, res) => {
//   let operation = req.query.operation;
//   let section = req.query.section;
//   let subcategory = req.query.subcategory;

//   console.log("ope", operation);
//   console.log("sec", section);

//   try {
//     if (operation === "all") {
      

//       // ✅ 1. Redis cache check karo
    
    

//       // ✅ 2. Agar cache me nahi hai to MongoDB se lo
//       let categorydata = await productsmodel.find().lean();

//       // ✅ 3. Redis me store karo (e.g. 60 sec ke liye)
//       await clientt.setEx(cacheKey, 60, JSON.stringify(categorydata));

//       console.log("👉 MongoDB se data aya");
//       return res.json(categorydata);
//     }

//     else if (operation === "filtered") {
//       const cacheKey = `products_filtered:${section}:${subcategory}`;

//       // ✅ 1. Cache check karo
//       const cachedData = await clientt.get(cacheKey);
//       if (cachedData) {
//         console.log("👉 Cache se filtered data aya");
//         return res.json(JSON.parse(cachedData));
//       }

//       // ✅ 2. DB se fetch
//       const categoryData = await productsmodel.find({}).lean();
//       const finalData = categoryData.filter((item) => item.category == section);
//       const finalllData = finalData.map((item) => item.productdetails).flat();
//       const finalsubData = categoryData.map((item) => item.productdetails).flat();
//       const subdata = finalsubData.filter((e) => e.tag == section);

//       let response;
//       if (finalllData.length != 0) {
//         response = finalllData;
//       } else if (subdata.length != 0) {
//         response = subdata;
//       } else {
//         response = { message: "No data found" };
//       }

//       // ✅ 3. Redis me cache karo
//       await clientt.setEx(cacheKey, 60, JSON.stringify(response));

//       console.log("👉 MongoDB se filtered data aya");
//       return res.json(response);
//     }

//     else {
//       res.status(400).json({ message: "Invalid operation type" });
//     }
//   } catch (e) {
//     console.error(e);
//     res.status(500).json({ error: "An error occurred while fetching data" });
//   }
// });

app.get("/productmodell", async (req, res) => {
  const operation = req.query.operation;
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;

  try {
    if (operation === "all") {
      const allData = await productsmodel.find().lean();
      const allProductDetails = allData.map(e => e.productdetails).flat();

      const start = (page - 1) * limit;
      const end = start + limit;
      const slicedData = allProductDetails.slice(start, end);

      const hasMore = end < allProductDetails.length;

      return res.json({
        data: slicedData,
        hasMore: hasMore
      });
    }

    res.status(400).json({ message: "Invalid operation" });
  } catch (e) {
    console.error("❌ Backend error:", e);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/product/:id
app.get("/product/:id",async (req, res) => {
  const { id } = req.params;
console.log("colorid",id)
  try {

    viewdIncrementor(id)
    
    // Try direct match by _id of main product
    let product = await productsmodel.findById(id);
    if (product) return res.json(product);

    // If not found, try match by productdetails._id
    product = await productsmodel.findOne({ "productdetails._id": id });
    if (product) {
      // Filter only the matching productdetail
      const matchedDetail = product.productdetails.find(
        (detail) => detail._id.toString() === id
      );
      return res.json({
        ...product.toObject(),
        productdetails: [matchedDetail], // return only matched detail
      });
    }

   
product = await productsmodel.findOne({ "productdetails.colors._id": id });
if (product) {
  const matchedDetail = product.productdetails.find((detail) =>
    detail.colors.some((color) => color._id.toString() === id)
  );

  // 👇 Here: Don't filter colors[], send complete detail
  return res.json({
    ...product.toObject(),
    productdetails: [matchedDetail], // keep all colors in this detail
  });
}

    // If nothing found
    return res.status(404).json({ message: "Product not found" });

  } catch (err) {
    console.error("Product fetch error:", err);
    return res.status(500).json({ message: "Server error" });
  }
});




app.patch('/productmodel/:id',verifySessionCookie,isAdmin, async (req, res) => {
  console.log("haa yhi funtion ccal ho rha hai")
  const { id } = req.params;
   
  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format!' });
  }

  try {
    let updateData = req.body;

    // ✅ Price discount calculation same as before
    if (
      updateData.productdetails &&
      updateData.productdetails.price &&
      updateData.productdetails.discount
    ) {
      const originalPrice = parseFloat(updateData.productdetails.price);
      const discountPercent = parseFloat(updateData.productdetails.discount);

      if (!isNaN(originalPrice) && !isNaN(discountPercent)) {
        const discountAmount = (originalPrice * discountPercent) / 100;
        updateData.productdetails.discountprice = Math.round(
          originalPrice - discountAmount
        );
      }
    }
    console.log("update data", Array.isArray(updateData.image));
    console.log("ab to ubdatd",updateData)

    // ✅ Calculate discount price if price and discount are present
  if (
  updateData.productdetails &&
  updateData.productdetails.price &&
  updateData.productdetails.discount
) {
  const originalPrice = parseFloat(updateData.productdetails.price);
  const discountPercent = parseFloat(updateData.productdetails.discount);

  if (!isNaN(originalPrice) && !isNaN(discountPercent)) {
    const discountAmount = (originalPrice * discountPercent) / 100;
    updateData.productdetails.discountprice = Math.round(originalPrice - discountAmount);
  }
}

    // ✅ Handle `image` field if it is a stringified array
    if (updateData.image) {
      if (typeof updateData.image === 'string') {
        try {
          updateData.image = JSON.parse(updateData.image);
        } catch (error) {
          return res.status(400).json({ message: 'Invalid image format!' });
        }
      }

      if (Array.isArray(updateData.image)) {
        updateData.image = updateData.image.map((item) => String(item));
      } else {
        return res.status(400).json({ message: '`image` must be an array!' });
      }
    }

    const updatedProduct = await productsmodel.findByIdAndUpdate(
      id,
      { $push: updateData },
      { new: true, runValidators: true }
    );

    console.log("updated my data", updatedProduct);

    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    res.status(200).json({ message: 'Product updated successfully!', data: updatedProduct });

  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

















app.patch('/editordeleteproduct/:id',verifySessionCookie,isAdmin,async (req, res) => {
  const { id } = req.params;
  let updateData = req.body;
  console.log("ye h mili",id)

  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format!' });
  }

  try {
   
    
    if(updateData){
      // console.log("updateddataaaakeliye",updateData)
    console.log("update data",Array.isArray(updateData.image))
    // Handle `image` field if it is a stringified array
    if (updateData.image) {
      if (typeof updateData.image === 'string') {
        try {
          // Parse the string back to an array
          updateData.image = JSON.parse(updateData.image);
        } catch (error) {
          return res.status(400).json({ message: 'Invalid image format!' });
        }
      }

      // Ensure `image` is an array of strings
      if (Array.isArray(updateData.image)) {
        updateData.image = updateData.image.map((item) => String(item));
      } else {
        return res.status(400).json({ message: '`image` must be an array!' });
      }
    }
    console.log("plzz ajan ho",productsmodel)
   // ✅ Correct method to update specific object inside `productdetails`
   const updatedProduct = await productsmodel.findOneAndUpdate(
    { "productdetails._id": id }, // 🛑 Find product with matching `productdetails._id`
    { 
      $set: Object.keys(updateData).reduce((acc, key) => {
        acc[`productdetails.$.${key}`] = updateData[key]; // ✅ Update only changed fields
        return acc;
      }, {})
    },
    { 
      new: true, 
      runValidators: true 
    }
  );
console.log("updated my data",updatedProduct)
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }

    res.status(200).json({ message: 'Product updated successfully!', data: updatedProduct });
  }

  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});


app.patch("/deleteproductfromcate/:id",verifySessionCookie,isAdmin, async (req, res) => {
  let { id } = req.params;

  try {
      if (!mongoose.Types.ObjectId.isValid(id)) {
          return res.status(400).json({ message: 'Invalid ID format!' });
      }

      let updateprd = await productsmodel.findOneAndUpdate(
          { "productdetails._id": id },  // ✅ Find by nested `_id`
          { $pull: { productdetails: { _id: id } } }, // ✅ Remove product from array
          { new: true }
      );

      if (!updateprd) {
          return res.status(404).json({ message: 'Product not found!' });
      }

      return res.status(200).json({ message: 'Product deleted successfully!', data: updateprd });
  } catch (error) {
      console.error('Error updating product:', error.message);
      return res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});




app.get("/newarrival",async(req,res)=>{
try{
  let resdata=await newarival.find().lean()
  if(resdata){
    res.status(200).json(resdata)
  }
  else{
    res.status(404).json("not found")
  }
}
catch(e){
  res.json(e)
}
})


// POST endpoint to add a new document to the newarrival collection
app.post("/newarrival", async (req, res) => {
  try {
    const { ProductId } = req.body;

    // Validate input
    if (!ProductId) {
      return res.status(400).json({ message: "ProductId is required" });
    }

    // Check if the product already exists in the newarrival collection
    const exists = await newarival.findOne({ ProductId });
    if (exists) {
      return res.status(200).json({ message: "Product already exists in new arrivals." });
    }

    // Create a new document. The created_at field is set automatically
    const newDoc = await newarival.create({ ProductId });
    res.status(201).json({ message: "New arrival added successfully", data: newDoc });
    
  } catch (error) {
    console.error("Error adding new arrival:", error.message);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});



// const sendWhatsAppMessage = async (order) => {
//   console.log("hello from whatsapp",order.products)
//     try {
//         const message = await client.messages.create({
//             from:`whatsapp:${process.env.TWILIONUMBER}`,
//             to:`whatsapp:${process.env.ADMINNUMBER}`,
//             body: `New Order Received! 📦\n\n👤 Customer: ${order.name}\n📍 Address: ${order.address}\n🛒 Product: ${order.products.map((e)=>(e.tag))}\n💰 Price: ${order.products.map((e)=>(e.discountprice))} Rs\n\n✅ Please process the order ASAP!`
//         });
//         console.log("WhatsApp Message Sent ✅", message.sid);
//     } catch (error) {
//         console.error("WhatsApp Message Error ❌", error);
//     }
// };



  async function addPointsOnPurchase(userId, purchaseAmount,type) {

    console.log("user ki idd",userId)
    console.log("khredi ki vlaue",purchaseAmount)
      
    let pointsEarned = Math.floor(purchaseAmount * 0.10); // 🔥 10% Points
    let valueInRupees = pointsEarned * 0.25;  // 🔥 1 Point = ₹0.25

    // ✅ Update User Wallet
    await userr.updateOne(
        { _id: userId },
        { $inc: { "wallet.points": pointsEarned } }
    );

    // ✅ Add Wallet Transaction History
    await wallettrans.create({
        userId,
        type: "points",
        amount: pointsEarned,
        valueInRupees,
        description: `Earned from purchase of ₹${purchaseAmount}`,
        date: new Date()
    });
  
 

    // console.log(`✅ User ${userId} earned ${pointsEarned?(pointsEarned):(purchaseAmount)} points (₹${valueInRupees?(valueInRupees):()})`);
  }

//   async function addcashbacktowallet(userId, purchaseAmount,type) {
// console.log("🚀 Adding cashback to wallet:", userId, purchaseAmount);

//     console.log("user ki idd",userId)
//     console.log("khredi ki vlaue",purchaseAmount)
      
  
//     // ✅ Update User Wallet
//     await userr.updateOne(
//         { _id: userId },
//         { $inc: { "wallet.cashback":purchaseAmount } }
//     );

//     // ✅ Add Wallet Transaction History
//     await wallettrans.create({
//         userId,
//         type: "cashback",
//         amount: purchaseAmount,
//         valueInRupees:purchaseAmount,
//         description: `Earned from return of ₹${purchaseAmount}`,
//         date: new Date()
//     });
  
 

//     // console.log(`✅ User ${userId} earned ${pointsEarned?(pointsEarned):(purchaseAmount)} points (₹${valueInRupees?(valueInRupees):()})`);
//   }




async function addcashbacktowallet(userId, amount, type = "cashback") {
  console.log("🚀 Adding cashback to wallet:", userId, amount, type);

  await userr.updateOne(
    { _id: userId },
    { $inc: { "wallet.cashback": amount } }
  );

  // await wallettrans.create({
  //   userId,
  //   type,
  //   amount,
  //   valueInRupees: amount,
  //   description:
  //     type === "wallet-refund"
  //       ? `Refund (Lewkout Wallet): ₹${amount}`
  //       : type === "wallet-partial-refund"
  //       ? `Partial refund (Back to Source - Wallet): ₹${amount}`
  //       : `Cashback: ₹${amount}`,
  //   date: new Date(),
  // });
  await wallettrans.create({
  userId,
  type,
  amount,
  valueInRupees: amount,
  description:
    type === "wallet-refund"
      ? `Refund (Lewkout Wallet): ₹${amount}`
      : type === "wallet-partial-refund"
      ? `Partial refund (Back to Source - Wallet): ₹${amount}`
      : type === "purchase"
      ? `Purchased amount: ₹${amount}`
      : `Cashback: ₹${amount}`,
  date: new Date(),
});
}


  const applyCouponSuccess = async (userId, couponCode) => {
  try {
    // ✅ Update global usage
    await Coupon.findOneAndUpdate(
      { code: couponCode },
      { $inc: { totalUsed: 1 } }
    );

    // ✅ Update per-user usage
    const usage = await cpnusage.findOne({ userId, couponCode });

    if (usage) {
      usage.usageCount += 1;
      await usage.save();
    } else {
      await cpnusage.create({ userId, couponCode, usageCount: 1 });
    }
  } catch (err) {
    console.error("❌ Failed to update coupon usage:", err);
  }
};



// 🚀 Place Order - initiate PhonePe
// app.post('/order', verifySessionCookie, async (req, res) => {
//   try {
//     const { order, address, userDetails, distance, couponcode } = req.body;

//     if (!order || !address || !userDetails) {
//       return res.status(400).json({ error: "All fields are required" });
//     }

//     const merchantOrderId = randomUUID();

//     // ✅ Save raw order data temporarily
//     await pendingOrderModel.create({
//       merchantOrderId,
//       order,
//       address,
//       userDetails,
//       distance,
//       couponcode
//     });

//     const ordersArray = Array.isArray(order) ? order : [order];
//     const orderprice = ordersArray.reduce((total, e) => {
//       return total + (
//         Array.isArray(e.discountprice)
//           ? e.discountprice.reduce((sum, price) => sum + price, 0)
//           : e.discountprice || 0
//       );
//     }, 0);

//     const client = StandardCheckoutClient.getInstance(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       process.env.CLIENT_VERSION,
//       Env.PRODUCTION  // 🔥 SANDBOX for testing, PRODUCTION for live
//     );

//     const redirectUrl = "https://www.lewkout.com/userorder";

//     const metaInfo = MetaInfo.builder()
//       .udf1(userDetails._id.toString())
//       .udf2(merchantOrderId) // bas reference bhejna hai
//       .build();

//     const request = StandardCheckoutPayRequest.builder()
//       .merchantOrderId(merchantOrderId)
//       .amount(orderprice * 100)
//       .redirectUrl(redirectUrl)
//       .metaInfo(metaInfo)
//       .build();

//     const responsePhonePe = await client.pay(request);
// console.log("PhonePe response:", responsePhonePe);
//     res.status(201).json({
//       message: "Redirect to PhonePe for payment",
//       checkoutUrl: responsePhonePe.redirectUrl,
//       merchantOrderId
//     });

//   } catch (error) {
//     console.error("Order Error:", error);
//     res.status(500).json({ error: "Order Failed" });
//   }
// });
app.post('/order', verifySessionCookie, async (req, res) => {
  try {
    const { order, address, userDetails, distance, couponcode, walletUsed = 0,payableAmount,timeslot,paymentmode} = req.body;
console.log("wallet ggggused",walletUsed)
    console.log("payableAmount",payableAmount )
    console.log("paymentmode",paymentmode)
    console.log("timingslot",timeslot )
console.log("paymentmo0de",paymentmode)
console.log("addringg",address)



    if (!order || !address || !userDetails) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const merchantOrderId = randomUUID();


    // Save raw order temporarily
    const pendingOrder = await pendingOrderModel.create({
      merchantOrderId,
      order,
      address,
      timeslot,
      userDetails,
      distance,
      couponcode,
      walletUsed,
      payableAmount,        // ✅ ADD THIS
  paymentmode
    });

    // Calculate total order amount
    const ordersArray = Array.isArray(order) ? order : [order];
    const totalOrderAmount = ordersArray.reduce((sum, e) => {
      return sum + (Array.isArray(e.discountprice)
        ? e.discountprice.reduce((s, p) => s + p, 0)
        : e.discountprice || 0
      );
    }, 0);

    // const payableAmount = totalOrderAmount - walletUsed;




if(paymentmode=="cod"){
// ✅ Directly save orders as PAID without calling PhonePe
      for (const item of ordersArray) {
        const singleProduct = {
          productId: item.productid || item._id,
          tag: item.tag || "",
          description: item.description || "",
          image: item.image || [],
          quantity: item.qty || 1,
          price: item.price || 0,
          discountprice: item.discountprice || 0,
          size: item.size || "",
          shopname: item.shopname || "",
          totalAmount: item.discountprice || 0,
          bundle: item.bundle || [],
        };

        // Deduct stock
        if (singleProduct.productId) {
          const product = await productsmodel.findById(singleProduct.productId);
          if (product && product.qty >= singleProduct.quantity) {
            product.qty -= singleProduct.quantity;
            await product.save();
          }
        }

        const newOrder = new orderr({
          name: userDetails.name,
          userId: userDetails._id,
          email: userDetails.email,
          address: address[0] || {},
          timeslot:timeslot,
          phone: address?.[0]?.phone?.[0] || "",
          products: [singleProduct],
          paymentmode: paymentmode,
          deliverydistance: parseFloat(distance?.toString().replace("km","") || 0),
          merchantOrderId,
          status: "Pending",
          paymentStatus: "cod", // mark as paid
          totalOrderAmount,
          walletUsed,
          pgUsed: 0,
        });

        await newOrder.save();
        orderEvent.emit('new_order', { type: "new_order", order: newOrder });
      }

      // Apply coupon if any
      if (couponcode?.length > 0) {
        await applyCouponSuccess(userDetails._id, couponcode);
      }

      // Remove pending order
      await pendingOrderModel.deleteOne({ _id: pendingOrder._id });

      await  addcashbacktowallet(userDetails._id, walletUsed, "purchase");
      return res.status(201).json({
        message: "Order placed successfully on COD MODE",
        merchantOrderId
      });
      

}


    if (payableAmount <= 0) {
      // ✅ Directly save orders as PAID without calling PhonePe
      for (const item of ordersArray) {
        const singleProduct = {
          productId: item.productid || item._id,
          tag: item.tag || "",
          description: item.description || "",
          image: item.image || [],
          quantity: item.qty || 1,
          price: item.price || 0,
          discountprice: item.discountprice || 0,
          size: item.size || "",
          shopname: item.shopname || "",
          totalAmount: item.discountprice || 0,
          bundle: item.bundle || [],
        };

        // Deduct stock
        if (singleProduct.productId) {
          const product = await productsmodel.findById(singleProduct.productId);
          if (product && product.qty >= singleProduct.quantity) {
            product.qty -= singleProduct.quantity;
            await product.save();
          }
        }

        const newOrder = new orderr({
          name: userDetails.name,
          userId: userDetails._id,
          email: userDetails.email,
          address: address[0] || {},
          timeslot:timeslot,
          phone: address?.[0]?.phone?.[0] || "",
          products: [singleProduct],
          paymentmode: paymentmode,
          deliverydistance: parseFloat(distance?.toString().replace("km","") || 0),
          merchantOrderId,
          status: "Pending",
          paymentStatus: "Paid", // mark as paid
          totalOrderAmount,
          walletUsed,
          pgUsed: 0,
        });

        await newOrder.save();
        orderEvent.emit('new_order', { type: "new_order", order: newOrder });
      }

      // Apply coupon if any
      if (couponcode?.length > 0) {
        await applyCouponSuccess(userDetails._id, couponcode);
      }

      // Remove pending order
      await pendingOrderModel.deleteOne({ _id: pendingOrder._id });

      await  addcashbacktowallet(userDetails._id, walletUsed, "purchase");
      return res.status(201).json({
        message: "Order placed successfully without payment",
        merchantOrderId
      });
    }




    // // 🔥 Payable amount > 0 → Use PhonePe
    // const client = StandardCheckoutClient.getInstance(
    //   process.env.CLIENT_ID,
    //   process.env.CLIENT_SECRET,
    //   process.env.CLIENT_VERSION,
    //   Env.PRODUCTION
    // );

    // const redirectUrl = "https://www.lewkout.com/userorder";

    // const metaInfo = MetaInfo.builder()
    //   .udf1(userDetails._id.toString())
    //   .udf2(merchantOrderId)
    //   .build();

    // const request = StandardCheckoutPayRequest.builder()
    //   .merchantOrderId(merchantOrderId)
    //   .amount(payableAmount * 100)
    //   .redirectUrl(redirectUrl)
    //   .metaInfo(metaInfo)
    //   .build();

    // const responsePhonePe = await client.pay(request);
    // console.log("PhonePe response:", responsePhonePe);

    // res.status(201).json({
    //   message: "Redirect to PhonePe for payment",
    //   checkoutUrl: responsePhonePe.redirectUrl,
    //   merchantOrderId
    // });

    const redirectUrl = "https://www.lewkout.com/userorder";

const phonepeResponse = await createPhonePePayment({
  merchantOrderId,
  amount: payableAmount,
  userId: userDetails._id.toString(),
  redirectUrl
});

res.status(201).json({
  message: "Redirect to PhonePe",
  tokenUrl: phonepeResponse.redirectUrl,
  merchantOrderId
});


  } catch (error) {
    console.error("Order Error:", error);
    res.status(500).json({ error: "Order Failed" });
  }
});


// // PHONEPE WEBHOOK ENDPOINT

// PHONEPE WEBHOOK ENDPOINT
// app.post("/phonepe/webhook", express.json(), async (req, res) => {
//   console.log("📩 Raw webhook body:", req.body);
//   console.log("📩 Headers:", req.headers);

//   try {
//     const authorization = req.headers["authorization"];
//     const responseBodyString = JSON.stringify(req.body);

//     // PhonePe client instance
//     const client = StandardCheckoutClient.getInstance(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       process.env.CLIENT_VERSION,
//       Env.PRODUCTION // SANDBOX for testing, PRODUCTION for live
//     );

//     // Validate callback
//     const callbackResponse = client.validateCallback(
//       process.env.WEBHOOK_USERNAME, // dashboard username
//       process.env.WEBHOOK_PASSWORD, // dashboard password
//       authorization,
//       responseBodyString
//     );

//     const { type, payload } = callbackResponse;

//     // Use udf2 (merchantOrderId we sent) if available, otherwise fallback to payload.merchantOrderId
//     const merchantOrderId = payload.metaInfo?.udf2 || payload.merchantOrderId;
//     const state = payload.state; // COMPLETED / FAILED / PENDING

//     console.log(`Webhook received for order ${merchantOrderId}: ${state} (${type})`);

//     // Determine payment status
//     let paymentStatus;
//     const normalizedState = state.toUpperCase();
//     if (normalizedState === "COMPLETED" || normalizedState === "SUCCESS") paymentStatus = "PAID";
//     else if (normalizedState === "FAILED") paymentStatus = "FAILED";
//     else paymentStatus = "PENDING";

//     if (paymentStatus === "PAID") {
//       // Fetch pending order from DB
//       const pending = await pendingOrderModel.findOne({ merchantOrderId });
//       console.log("Pending order fetched:", pending);

//       if (!pending) {
//         console.error("No pending order found for", merchantOrderId);
//         return res.status(404).send("Pending order not found");
//       }

//       const { order, address, userDetails, distance, couponcode } = pending;
//       const ordersArray = Array.isArray(order) ? order : [order];

//       // Convert distance to number
//       const numericDistance = parseFloat(distance.toString().replace("km", "").trim()) || 0;

//       const addressd = {
//         pincode: address?.[0]?.pincode || "",
//         uname: address?.[0]?.uname || "",
//         building: address?.[0]?.building || "",
//         locality: address?.[0]?.locality || "",
//         address: userDetails.address?.[0]?.address || "",
//         phone: address?.[0]?.phone || [],
//         city: address?.[0]?.city || "Jaipur",
//         state: address?.[0]?.state || "Rajasthan",
//         isDefault: address?.[0]?.isDefault || false,
//       };

//       // 🔹 Loop over each product & save as separate order document
//       for (const item of ordersArray) {
//         const singleProduct = {
//           productId: item.productid || item._id,
//           tag: item.tag || "",
//           description: item.description || "",
//           image: item.image || [],
//           quantity: item.qty || 1,
//           price: item.price || 0,
//           discountprice: item.discountprice || 0,
//           size: item.size || "",
//           shopname: item.shopname || "",
//           totalAmount: item.discountprice || 0,
//           bundle: item.bundle || [],
//         };

//         // Deduct stock safely
//         if (singleProduct.productId) {
//           const product = await productsmodel.findById(singleProduct.productId);
//           if (product) {
//             if (product.qty >= singleProduct.quantity) {
//               product.qty -= singleProduct.quantity;
//               await product.save();
//             } else {
//               console.warn(`Stock insufficient for product ${product._id}`);
//             }
//           }
//         }

//         // Save each product as a separate order doc
//         const newOrder = new orderr({
//           name: userDetails.name,
//           userId: userDetails._id,
//           email: userDetails.email,
//           address: addressd,
//           phone: userDetails.address?.[0]?.phone?.[0] || "",
//           products: [singleProduct], // only one product per doc
//           deliverydistance: numericDistance,
//           merchantOrderId,           // same for all products
//           status: "pending",
//         });

//         await newOrder.save();
//         orderEvent.emit('new_order', { type: "new_order", order: newOrder });
//       }

//       // Apply coupon if available
//       if (couponcode?.length > 0) {
//         await applyCouponSuccess(userDetails._id, couponcode);
//       }

//       // Delete pending order
//       await pendingOrderModel.deleteOne({ _id: pending._id });

//       console.log(`✅ All products saved in DB for merchantOrderId: ${merchantOrderId}`);
//     } else {
//       // Update existing order if payment failed or pending
//       await orderr.updateMany({ merchantOrderId }, { paymentStatus });
//       console.log(`⚠️ Payment not completed for merchantOrderId: ${merchantOrderId}`);
//     }

//     res.status(200).send("Webhook processed successfully");
//   } catch (error) {
//     console.error("Webhook validation error:", error);
//     res.status(500).send("Webhook error");
//   }
// });






app.get('/orders',verifySessionCookie,isAdmin, async (req, res) => {
  console.log("ORDERS FETCHED");

  try {
    const orders = await orderr
      .find()
      .populate('products.productId')
      .sort({ orderedAt: -1 }) // 🔑 -1 = newest first, 1 = oldest first
      .lean();

    res.status(200).json(orders);
    console.log("ORDERS FETCHED2",orders);

  } catch (error) {
    console.error("Fetch Orders Error:", error);
    res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// 🔵 GET: Fetch a single order by ID
app.get('/order/:id', async (req, res) => {
  try {
      const order = await orderr.findById(req.params.id).populate('products.productId').lean();
      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
  } catch (error) {
      console.error("Fetch Order Error:", error);
      res.status(500).json({ error: "Failed to fetch order" });
  }
});

// app.post("/phonepe/webhook", express.json(), async (req, res) => {
//   console.log("📩 Raw webhook body:", req.body);
//   console.log("📩 Headers:", req.headers);

//   try {
//     const authorization = req.headers["authorization"];
//     const responseBodyString = JSON.stringify(req.body);

//     const client = StandardCheckoutClient.getInstance(
//       process.env.CLIENT_ID,
//       process.env.CLIENT_SECRET,
//       process.env.CLIENT_VERSION,
//       Env.PRODUCTION
//     );

//     const callbackResponse = client.validateCallback(
//       process.env.WEBHOOK_USERNAME,
//       process.env.WEBHOOK_PASSWORD,
//       authorization,
//       responseBodyString
//     );

//     const { type, payload } = callbackResponse;

//     const merchantOrderId = payload.metaInfo?.udf2 || payload.merchantOrderId;
//     const state = payload.state;
// // const payableAmount=payload.payableAmount
//     console.log(`Webhook received for order ${merchantOrderId}: ${state} (${type})`);

//     let paymentStatus;
//     const normalizedState = state.toUpperCase();
//     if (normalizedState === "COMPLETED" || normalizedState === "SUCCESS") paymentStatus = "PAID";
//     else if (normalizedState === "FAILED") paymentStatus = "FAILED";
//     else paymentStatus = "PENDING";

//     if (paymentStatus === "PAID") {
//       const pending = await pendingOrderModel.findOne({ merchantOrderId });
//       console.log("Pending order fetched:", pending);

//       if (!pending) {
//         console.error("No pending order found for", merchantOrderId);
//         return res.status(404).send("Pending order not found");
//       }
// const payableAmount=payload.payableAmount

//       const { order, address,timeslot ,userDetails, distance, couponcode } = pending;
//       const ordersArray = Array.isArray(order) ? order : [order];
//       const numericDistance = parseFloat(distance.toString().replace("km", "").trim()) || 0;

//       const addressd = {
//         pincode: address?.[0]?.pincode || "",
//         uname: address?.[0]?.uname || "",
//         building: address?.[0]?.building || "",
//         locality: address?.[0]?.locality || "",
//         address: userDetails.address?.[0]?.address || "",
//         phone: address?.[0]?.phone || [],
//         city: address?.[0]?.city || "Jaipur",
//         state: address?.[0]?.state || "Rajasthan",
//         saveas: address?.[0]?.saveas || "",
  //         location:address?.[0]?.location||"",
  //        isDefault: address?.[0]?.isDefault || false,
  //           lat:address?.[0]?.lat||"",
  //         lng:address?.[0]?.lng||"",
//       };

//       // Calculate total order amount (sum of all products)
//       const totalOrderAmount = ordersArray.reduce((sum, item) => {
//         return sum + (item.discountprice || 0);
//       }, 0);

//       // (Optional) If you later add wallet usage in checkout
//       const walletUsed = pending.walletUsed || 0;
//       const pgUsed = totalOrderAmount - walletUsed;

//       for (const item of ordersArray) {
//         const singleProduct = {
//           productId: item.productid || item._id,
//           tag: item.tag || "",
//           description: item.description || "",
//           image: item.image || [],
//           quantity: item.qty || 1,
//           price: item.price || 0,
//           discountprice: item.discountprice || 0,
//           size: item.size || "",
//           shopname: item.shopname || "",
//           totalAmount: payableAmount / 100,

//           bundle: item.bundle || [],
//         };

//         // Deduct stock
//         if (singleProduct.productId) {
//           const product = await productsmodel.findById(singleProduct.productId);
//           if (product) {
//             if (product.qty >= singleProduct.quantity) {
//               product.qty -= singleProduct.quantity;
//               await product.save();
//             } else {
//               console.warn(`Stock insufficient for product ${product._id}`);
//             }
//           }
//         }

//         // ✅ Save order with full payment tracking
//         const newOrder = new orderr({
//           name: userDetails.name,
//           userId: userDetails._id,
//           email: userDetails.email,
//           address: addressd,
//           timeslot:timeslot,
//           phone: userDetails.address?.[0]?.phone?.[0] || "",
//           products: [singleProduct],
//           deliverydistance: numericDistance,
//           merchantOrderId,
//           status: "Pending",
//           paymentStatus: "Paid",
//           totalOrderAmount:payableAmount / 100,
//           walletUsed,
//           pgUsed,
//           refundToWallet: 0,
//           refundToPG: 0,
//           paymentGatewayTxnId: payload.transactionId || "",
//         });

//         await newOrder.save();
//         orderEvent.emit('new_order', { type: "new_order", order: newOrder });
//       }

//       // Apply coupon
//       if (couponcode?.length > 0) {
//         await applyCouponSuccess(userDetails._id, couponcode);
//       }

//       await pendingOrderModel.deleteOne({ _id: pending._id });
//       console.log(`✅ All products saved in DB for merchantOrderId: ${merchantOrderId}`);
//     } else {
//       await orderr.updateMany({ merchantOrderId }, { paymentStatus });
//       console.log(`⚠️ Payment not completed for merchantOrderId: ${merchantOrderId}`);
//     }
//       await  addcashbacktowallet(userDetails._id, walletUsed, "purchase");


//     res.status(200).send("Webhook processed successfully");
//   } catch (error) {
//     console.error("Webhook validation error:", error);
//     res.status(500).send("Webhook error");
//   }
// });

// app.post("/phonepe/webhook", express.json(), async (req, res) => {
//   try {

    
//     // ✅ Step-1: Verify webhook auth
//     // verifyPhonePeWebhook(req); commented for now

//     const payload = req.body;
    
//     console.log("📩 PhonePe Webhook:", payload);
// console.log("Webhook amount:", payload.amount);
// // console.log("Expected amount:", pending.payableAmount * 100);

//     const merchantOrderId =
//       payload?.metaInfo?.udf2 || payload?.merchantOrderId;

//     const state = payload?.state?.toUpperCase();
//     const transactionId = payload?.transactionId || "";

//     let paymentStatus = "PENDING";
//     if (state === "COMPLETED" || state === "SUCCESS") paymentStatus = "PAID";
//     if (state === "FAILED") paymentStatus = "FAILED";

//     if (paymentStatus === "PAID") {
//       const pending = await pendingOrderModel.findOne({ merchantOrderId });

//       if (!pending) {
//         console.warn("⚠️ Pending order not found:", merchantOrderId);
//         return res.status(200).send("OK");
//       }

//       const expectedAmount = pending.payableAmount * 100;
//   if (payload.amount !== expectedAmount) {
//     throw new Error("Amount mismatch");
//   }

//       const {
//         order,
//         address,
//         userDetails,
//         distance,
//         couponcode,
//         walletUsed,
//         timeslot
//       } = pending;

//       const ordersArray = Array.isArray(order) ? order : [order];
//       const numericDistance =
//         parseFloat(distance?.toString().replace("km", "")) || 0;

//       for (const item of ordersArray) {
//         const singleProduct = {
//           productId: item.productid || item._id,
//           tag: item.tag || "",
//           description: item.description || "",
//           image: item.image || [],
//           quantity: item.qty || 1,
//           price: item.price || 0,
//           discountprice: item.discountprice || 0,
//           size: item.size || "",
//           shopname: item.shopname || "",
//           totalAmount: item.discountprice || 0,
//           bundle: item.bundle || [],
//         };

//         // 🔻 Stock deduction
//         if (singleProduct.productId) {
//           const product = await productsmodel.findById(singleProduct.productId);
//           if (product && product.qty >= singleProduct.quantity) {
//             product.qty -= singleProduct.quantity;
//             await product.save();
//           }
//         }

//         const newOrder = new orderr({
//           name: userDetails.name,
//           userId: userDetails._id,
//           email: userDetails.email,
//           address: address?.[0] || {},
//           timeslot,
//           phone: address?.[0]?.phone?.[0] || "",
//           products: [singleProduct],
//           deliverydistance: numericDistance,
//           merchantOrderId,
//           status: "Pending",
//           paymentStatus: "Paid",
//           walletUsed,
//           pgUsed: item.discountprice || 0,
//           paymentGatewayTxnId: transactionId,
//         });

//         await newOrder.save();
//         orderEvent.emit("new_order", { type: "new_order", order: newOrder });
//       }

//       if (couponcode?.length > 0) {
//         await applyCouponSuccess(userDetails._id, couponcode);
//       }

//       await pendingOrderModel.deleteOne({ merchantOrderId });
//       await addcashbacktowallet(userDetails._id, walletUsed, "purchase");

//       console.log("✅ Order confirmed:", merchantOrderId);
//     } else {
//       await orderr.updateMany(
//         { merchantOrderId },
//         { paymentStatus }
//       );
//     }

//     res.status(200).send("Webhook processed");
//   } catch (err) {
//     console.error("❌ PhonePe Webhook Error:", err.message);
//     res.status(401).send("Unauthorized");
//   }
// });
app.post("/phonepe/webhook", express.json(), async (req, res) => {
  try {
    // 🔍 Full webhook log (debug)
    console.log("📩 Full PhonePe Webhook:", JSON.stringify(req.body, null, 2));

    // ✅ PhonePe NEW webhook payload is inside req.body.payload
    const webhookPayload = req.body?.payload;

    if (!webhookPayload) {
      console.log("❌ Webhook payload missing");
      return res.status(200).send("OK");
    }

    const merchantOrderId = webhookPayload.merchantOrderId;
    const state = webhookPayload.state?.toString().trim().toUpperCase();
    const amount = webhookPayload.amount; // in paise

    const transactionId = webhookPayload.orderId || "";
    const expectedAmount = webhookPayload.payableAmount; // in paise
  
    console.log("STATE:", state);
    console.log("merchantOrderId:", merchantOrderId);
    console.log("amount:", amount);

    // ❌ Payment not completed
    if (state !== "COMPLETED") {
      console.log("⚠️ Payment not completed, skipping order creation");
      return res.status(200).send("OK");
    }

    // 🔍 Find pending order
    const pending = await pendingOrderModel.findOne({ merchantOrderId });

    if (!pending) {
      console.log("❌ Pending order not found:", merchantOrderId);
      return res.status(200).send("OK");
    }

    // 💰 Amount verification
    // const expectedAmount = Math.round(pending.payableAmount * 100);
    if (amount !== expectedAmount) {
      console.log("❌ Amount mismatch:", amount, expectedAmount);
      return res.status(200).send("OK");
    }

    const {
      order,
      address,
      userDetails,
      distance,
      couponcode,
      walletUsed,
      timeslot
    } = pending;

    const ordersArray = Array.isArray(order) ? order : [order];
    const numericDistance =
      parseFloat(distance?.toString().replace("km", "")) || 0;

    // 🛒 Create final orders
    for (const item of ordersArray) {
      const singleProduct = {
        productId: item.productid || item._id,
        tag: item.tag || "",
        description: item.description || "",
        image: item.image || [],
        quantity: item.qty || 1,
        price: item.price || 0,
        discountprice: item.discountprice || 0,
        size: item.size || "",
        shopname: item.shopname || "",
        totalAmount: item.discountprice || 0,
        bundle: item.bundle || [],
      };

      // 🔻 Stock deduction
      if (singleProduct.productId) {
        const product = await productsmodel.findById(singleProduct.productId);
        if (product && product.qty >= singleProduct.quantity) {
          product.qty -= singleProduct.quantity;
          await product.save();
        }
      }

      const newOrder = new orderr({
        name: userDetails.name,
        userId: userDetails._id,
        email: userDetails.email,
        address: address?.[0] || {},
        phone: address?.[0]?.phone?.[0] || "",
        timeslot,
        products: [singleProduct],
        paymentmode: "online",              // ✅ IMPORTANT
        deliverydistance: numericDistance,
        merchantOrderId,
        status: "Pending",
        paymentStatus: "Paid",
        walletUsed,
        pgUsed: amount / 100,               // ✅ correct PG amount
        paymentGatewayTxnId: transactionId,
      });

      await newOrder.save();
      orderEvent.emit("new_order", { type: "new_order", order: newOrder });
    }

    // 🎟️ Coupon success
    if (couponcode?.length > 0) {
      await applyCouponSuccess(userDetails._id, couponcode);
    }

    // 🧹 Cleanup pending order
    await pendingOrderModel.deleteOne({ merchantOrderId });

    // 💸 Cashback
    await addcashbacktowallet(userDetails._id, walletUsed, "purchase");

    console.log("✅ ORDER SAVED SUCCESSFULLY:", merchantOrderId);
    return res.status(200).send("OK");

  } catch (err) {
    console.error("❌ PhonePe Webhook Error:", err);
    // ⚠️ Always return 200 to PhonePe (avoid retries loop)
    return res.status(200).send("OK");
  }
});



// 🔵 GET: Fetch orders by User ID
app.get('/orders/user/:userId',verifySessionCookie,async (req, res) => {
  try {
      const { userId } = req.params;

      // 🛑 Validate userId (Check if it's missing or invalid)
      if (!userId || userId.length !== 24) {
          return res.status(400).json({ error: "Invalid User ID" });
      }

      // 🔍 Fetch orders by User ID
      // const userOrders = await orderr.find({ userId }).populate('products.productId');
      const userOrders = await orderr.find({ userId }).lean();
      if (!userOrders || userOrders.length === 0) {
        return res.status(404).json({ message: "No orders found!" });
      }
      res.status(200).json(userOrders);
      console.log("Order Data:", userOrders);
console.log("Order Products:", userOrders[0].products);
  } catch (error) {
      console.error("Fetch User Orders Error:", error);
      res.status(500).json({ error: "Failed to fetch user orders" });
  }
});


// app.put('/order/deliver/:id',verifySessionCookie,isAdmin, async (req, res) => {
//   try {
//     const order = await orderr.findById(req.params.id);
//    const decision = req.body.decision // ✅ clearer
    
//     if (!order) {
//       return res.status(404).json({ error: "Order not found" });
//     }

//     if (order.status === "Pending") {
//       order.status = "shipped";
//       await order.save();

//       orderEvent.emit("order_updated", { type: "order_updated", order });
//       return res.json({ message: "Order marked as shipped!" });

//     } else if (order.status === "shipped") {
//       order.status = "delivered";
//       order.deliveredAt = new Date();
//       await order.save();

//       orderEvent.emit("order_updated", { type: "order_updated", order });
//       return res.json({ message: "Order marked as delivered!" });
//     }
    
//     else if (order.status === "Returned Requested") {


//   if ( decision === "Returned Approved") {
//     order.status = "Returned Approved";
//     await order.save();

//     orderEvent.emit("order_updated", { type: "order_updated", order });
//     return res.json({ message: "Order marked as returned and approved!" });

//   } else if ( decision === "Returned Rejected") {
//     order.status = "Returned Rejected";
//     await order.save();

//     orderEvent.emit("order_updated", { type: "order_updated", order });
//     return res.json({ message: "Order return request rejected!" });

//   } else {
//     return res.status(400).json({ error: "Invalid decision for returned request" });
//   }
// }
// else if (order.status === "Returned Approved") {
//    order.status = "Pickup Scheduled";
//     await order.save();
//       orderEvent.emit("order_updated", { type: "order_updated", order });
//       return res.json({ message: "Return Requested  marked as Pickup Sceduled" });
// }

// else if (order.status === "Pickup Scheduled") {
//    order.status = "Picked Up";
//     await order.save();
//       orderEvent.emit("order_updated", { type: "order_updated", order });
//       return res.json({ message: "Return Requested  marked as Picked Up" });
// }
// else if (order.status === "Picked Up") {
//    order.status = "Refund Processed";
//     await order.save();
//       orderEvent.emit("order_updated", { type: "order_updated", order });
//       return res.json({ message: "Return Requested  marked as Refund Processed" });
// }
// else if (order.status === "Refund Processed") {


//   if ( decision === "Refund Approved") {
//     order.status = "Refund Approved";
//     await order.save();

//     orderEvent.emit("order_updated", { type: "order_updated", order });
//     return res.json({ message: "Order marked as Refund Approved" });

//   } else if ( decision === "Refund Rejected") {
//     order.status = "Refund Rejected";
//     await order.save();

//     orderEvent.emit("order_updated", { type: "order_updated", order });
//     return res.json({ message: "Order return Refund Rejected" });

//   } else {
//     return res.status(400).json({ error: "Invalid decision for returned request" });
//   }
// }
//     return res.status(400).json({ error: "Invalid status transition" });

//   } catch (error) {
//     console.error("Error updating order:", error);
//     res.status(500).json({ error: "Server error" });
//   }
// });
app.put('/order/deliver/:id', verifySessionCookie, isAdmin, async (req, res) => {
  try {
    const order = await orderr.findById(req.params.id);
    const decision = req.body.decision;

    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }

    // 👇 Normalize to lowercase for comparison
    const currentStatus = order.status.toLowerCase();
    const decisionNormalized = decision ? decision.toLowerCase() : "";

    if (currentStatus === "pending") {
      order.status = "shipped";
      await order.save();
      orderEvent.emit("order_updated", { type: "order_updated", order });
      return res.json({ message: "Order marked as shipped!" });

    } else if (currentStatus === "shipped") {
      order.status = "delivered";
      order.deliveredAt = new Date();
      await order.save();
      orderEvent.emit("order_updated", { type: "order_updated", order });
      return res.json({ message: "Order marked as delivered!" });
    }

    else if (currentStatus === "returned requested") {
      if (decisionNormalized === "returned approved") {
        order.status = "Returned Approved";
        await order.save();
        orderEvent.emit("order_updated", { type: "order_updated", order });
        return res.json({ message: "Order marked as returned and approved!" });

      } else if (decisionNormalized === "returned rejected") {
        order.status = "Returned Rejected";
        await order.save();
        orderEvent.emit("order_updated", { type: "order_updated", order });
        return res.json({ message: "Order return request rejected!" });
      } else {
        return res.status(400).json({ error: "Invalid decision for returned request" });
      }
    }

    else if (currentStatus === "returned approved") {
      order.status = "Pickup Scheduled";
      await order.save();
      orderEvent.emit("order_updated", { type: "order_updated", order });
      return res.json({ message: "Return Requested marked as Pickup Scheduled" });
    }

    else if (currentStatus === "pickup scheduled") {
      order.status = "Picked Up";
      await order.save();
      orderEvent.emit("order_updated", { type: "order_updated", order });
      return res.json({ message: "Return Requested marked as Picked Up" });
    }

    else if (currentStatus === "picked up") {
      order.status = "Refund Processed";
      await order.save();
      orderEvent.emit("order_updated", { type: "order_updated", order });
      return res.json({ message: "Return Requested marked as Refund Processed" });
    }

    else if (currentStatus === "refund processed") {
      if (decisionNormalized === "refund approved") {
        order.status = "Refund Approved";
        await order.save();
         // 🔥 Refund payload
      // ✅ SDK client init
   // 🔥 SDK Refund\
   try{
        const client = StandardCheckoutClient.getInstance(  
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET,
          process.env.CLIENT_VERSION,
          Env.PRODUCTION  // Sandbox for testing, PRODUCTION for live
        );
        console.log("Using CLIENT_ID:", process.env.CLIENT_ID);
console.log("Using CLIENT_SECRET:", process.env.CLIENT_SECRET ? "exists" : "missing");
console.log("Using CLIENT_VERSION:", process.env.CLIENT_VERSION);


        const refundId = randomUUID();

        const request = RefundRequest.builder()
          .amount(order.products[0].discountprice * 100)  // paisa me
          .merchantRefundId(refundId)
          .originalMerchantOrderId(order.merchantOrderId)
          .build();
console.log("Original Merchant Order ID:", order.merchantOrderId);
console.log("Request:", request);

        let response;
try {
  response = await client.refund(request);
  console.log("Refund Response:", response);
} catch (err) {
  console.error("Refund SDK error:", err);
  return res.status(500).json({ error: "Refund failed", details: err.message });
}
        // ✅ Save refund details
        order.refundId = refundId;
        order.refundState = response.state; // ACCEPTED / COMPLETED / FAILED
        await order.save();
        orderEvent.emit("order_updated", { type: "order_updated", order });
        return res.json({ message: "Order marked as Refund Approved" });
   }
   catch(err){  
   // 🔥 Detailed logging for debugging
      console.error("Refund SDK error:", err);

      // Return meaningful error without crashing
      return res.status(500).json({
        error: "Refund failed due to authorization or SDK issue",
        details: err.message || err
      });
   }
      } else if (decisionNormalized === "refund rejected") {
        order.status = "Refund Rejected";
        await order.save();
        orderEvent.emit("order_updated", { type: "order_updated", order });
        return res.json({ message: "Order refund rejected!" });
      } else {
        return res.status(400).json({ error: "Invalid decision for refund request" });
      }
    }

    return res.status(400).json({ error: "Invalid status transition" });

  } catch (error) {
    console.error("Error updating order:", error);
    res.status(500).json({ error: "Server error" });
  }
});
// REFUND WEBHOOK (PhonePe → Server)
app.post("/refund/phonepe/webhook", express.json(), async (req, res) => {
  try {
    const authorization = req.headers["authorization"];
    const responseBodyString = JSON.stringify(req.body);

    const client = StandardCheckoutClient.getInstance(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      process.env.CLIENT_VERSION,
      Env.PRODUCTION// 🔥 SANDBOX for testing, PRODUCTION for live
    );

    const callbackResponse = client.validateCallback(
      process.env.WEBHOOK_USERNAME,
      process.env.WEBHOOK_PASSWORD,
      authorization,
      responseBodyString
    );

    const { payload } = callbackResponse;
    const refundId = payload.merchantRefundId;
    const originalOrderId = payload.originalMerchantOrderId;
    const refundState = payload.state; // ACCEPTED / COMPLETED / FAILED

    const order = await orderr.findOne({ merchantOrderId: originalOrderId });
    if (!order) return res.status(404).send("Order not found");

    order.refundId = refundId;
    order.refundState = refundState;

    if (refundState === "COMPLETED") order.status = "Refund Completed";
    else if (refundState === "FAILED") order.status = "Refund Failed";
    else order.status = "Refund Pending";

    await order.save();
    orderEvent.emit("order_updated", { type: "order_updated", order });

    console.log(`✅ Refund updated for order ${originalOrderId}: ${refundState}`);
    res.status(200).send("Refund webhook processed successfully");

  } catch (error) {
    console.error("❌ Refund Webhook error:", error);
    res.status(500).send("Refund webhook error");
  }
});



setInterval(async () => {
  try {
    const timeLimit = new Date(Date.now() - 24 * 65 * 60 * 1000); // 65 minutes ago
    const eligibleOrders = await orderr.find({
      status: "delivered",
      deliveredAt: { $lte: timeLimit }
    });

    for (const order of eligibleOrders) {
      // ✅ Sum totalAmount from all products
      const totalAmount = order.products?.reduce((sum, product) => sum + (product.totalAmount || 0), 0);

      if (totalAmount <= 0) {
        console.error(`❌ Order ID: ${order._id} has invalid totalAmount:`, totalAmount);
        continue; // Skip this order if totalAmount is invalid
      }

      console.log(`✅ Adding points for Order ID: ${order._id}, Amount: ₹${totalAmount}`);

      await addPointsOnPurchase(order.userId, totalAmount, "delivered");

      // ✅ Ensure points are only added once
      order.status = "Delivered";
      await order.save();
    }
  } catch (err) {
    console.error("❌ Error in points scheduler:", err);
  }
}, 2 * 60 * 1000); // ✅ Runs every 5 minutes



app.post("/rate", async (req, res) => {
  try {
    const { userId, productId, rating, review, image } = req.body;
    console.log("📩 Received rating for colorId:", productId);

    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating. It must be a number between 1 and 5." });
    }

    // 1️⃣ Check if user already rated this color
    let existingRating = await Rating.findOne({ userId, productId: productId });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review || existingRating.review;
      existingRating.image = image || existingRating.image;
      await existingRating.save();
    } else {
    let usernme = await userr.findOne({ _id: userId }, { name: 1, _id: 0 });
    console.log(usernme)
      await Rating.create({ userId, productId: productId, rating, review, image,userName:usernme.name });
    }

    // 2️⃣ Calculate avgRating and ratingCount
    const allRatings = await Rating.find({ productId: productId });
    const totalRatings = allRatings.length;
    const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    // 3️⃣ Recursively find the color and update its avgRating and ratingCount
    const allProducts = await productsmodel.find();

    let updated = false;

    for (let product of allProducts) {
      for (let category of product.productdetails) {
        for (let color of category.colors) {
          if (color._id.toString() === productId) {
            // Update nested fields
            color.avgRating = avgRating;
            color.ratingCount = totalRatings;

            await product.save();
            updated = true;
            break;
          }
        }
        if (updated) break;
      }
      if (updated) break;
    }

    if (!updated) {
      return res.status(404).json({ error: "Color not found in products." });
    }

    res.status(200).json({
      message: "Rating submitted and color rating updated successfully",
      avgRating,
      totalRatings,
    });
  } catch (error) {
    console.error("❌ Error submitting rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch Product Ratings

app.get("/ratings/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the rating given by the specific user for the specific product
    const rating = await Rating.find({ userId }).populate("userId", "name").lean();

    if (!rating) {
      return res.status(404).json({ message: "No rating found for this product by the user" });
    }

    res.status(200).json(rating);
  } catch (error) {
    console.error("Error fetching user-specific rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/products/shop/:shopname", async (req, res) => {
  try {
      const shopname = req.params.shopname;
      console.log("✅ Received shopname:", shopname);
      
      // 🔍 Searching for shopname inside "productdetails" array
      const products = await productsmodel.find({
          "productdetails.shopname": { $regex: new RegExp(shopname, "i") }
      }).lean();

      console.log("🟢 Fetched products from DB:", products);

      if (!products.length) {
          return res.status(404).json({ message: "No products found for this shop" });
      }

      res.json(products);
  } catch (error) {
      console.error("❌ Error fetching shopkeeper products:", error);
      res.status(500).json({ error: "Internal Server Error" });
  }
});


app.post("/sales",verifySessionCookie,isAdmin, async (req, res) => {   
  try {
      let { sales } = req.body; // sales ko destructure kiya
      console.log("Received sales data:", sales);

      // Ensure sales is always an array
      if (!Array.isArray(sales)) {
          sales = [sales]; // Agar ek single object aaya ho to usko array me convert kar diya
      }

      if (sales.length === 0) {
          return res.status(400).json({ error: "Sales data must be a non-empty array" });
      }

      for (const sale of sales) {
          const { _id , shopname, qty, discountprice} = sale;
          if (!_id  || !qty || !discountprice || !shopname) {
              return res.status(400).json({ error: "Missing required fields in one or more sales" });
          }
      }

      // Convert frontend fields to match the database schema
      const formattedSales = sales.map(sale => ({
          productId:sale.productid?(sale.productid):(sale._id),         // `_id` ko `productId` me convert kiya
          shopname: sale.shopname,
          quantity: sale.qty,          // `qty` ko `quantity` me convert kiya
          totalAmount: sale.discountprice // `discountprice` ko `totalAmount` me convert kiya
      }));

      // Save all sales at once
      const newSales = await SalesModel.insertMany(formattedSales);

      res.json({ message: "Sales recorded successfully", sales: newSales });
  } catch (error) {
      console.error("Error saving sales:", error);
      res.status(500).json({ error: "Failed to record sales" });
  }
});


app.post("/sales/return", async (req, res) => {
  try {
      const { saleId, returnedQuantity } = req.body;

      let sale = await SalesModel.findById(saleId);
      if (!sale) {
          return res.status(404).json({ error: "Sale record not found" });
      }

      // 🛑 Return quantity check
      if (returnedQuantity > sale.quantity) {
          return res.status(400).json({ error: "Returned quantity cannot be greater than sold quantity" });
      }

      // ✅ Update sale record with return details
      sale.isReturned = true;
      sale.returnedQuantity = returnedQuantity;
      sale.returnDate = new Date();
      await sale.save();

      res.json({ message: "Return processed successfully", sale });
  } catch (error) {
      console.error("Error processing return:", error);
      res.status(500).json({ error: "Failed to process return" });
  }
});


app.get("/sales/daily",verifySessionCookie,isAdmin, async (req, res) => {
  try {
    // Optional query params: shopname, from, to
    const { shopname, from, to } = req.query;
    let today = new Date();
    today.setHours(0, 0, 0, 0);

    // Build match filter
    let match = { saleDate: { $gte: today } };
    if (from || to) {
      match.saleDate = {};
      if (from) match.saleDate.$gte = new Date(from);
      if (to) match.saleDate.$lte = new Date(to);
    }
    if (shopname) {
      match.shopname = shopname;
    }

    let sales = await SalesModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: null,
          totalSales: { $sum: "$quantity" },
          totalReturns: { $sum: "$returnedQuantity" },
          totalRevenue: { $sum: "$totalAmount" },
          count: { $sum: 1 }
        }
      }
    ]);

    // Breakdown by product
    let productBreakdown = await SalesModel.aggregate([
      { $match: match },
      {
        $group: {
          _id: "$productId",
          totalSales: { $sum: "$quantity" },
          totalReturns: { $sum: "$returnedQuantity" },
          totalRevenue: { $sum: "$totalAmount" }
        }
      }
    ]);

    let result = sales[0] || { totalSales: 0, totalReturns: 0, totalRevenue: 0, count: 0 };
    result.netSales = result.totalSales - result.totalReturns;
    result.productBreakdown = productBreakdown;

    res.json(result);
  } catch (error) {
    console.error("Error fetching daily sales:", error);
    res.status(500).json({ error: "Failed to fetch sales", details: error.message });
  }
});



app.get("/sales/daily/:shopname", async (req, res) => { 
  try {
      let { shopname } = req.params;
      if (!shopname) {
          return res.status(400).json({ error: "Shopname is required" });
      }

      let sales = await SalesModel.aggregate([
          { $match: { shopname: shopname } },  // ✅ Remove Date Filter

          { 
              $lookup: {  
                  from: "products",  
                  localField: "productId",
                  foreignField: "_id",
                  as: "productInfo"
              }
          },

          { $unwind: { path: "$productInfo", preserveNullAndEmptyArrays: true } },

          { 
              $lookup: {  
                  from: "products",  
                  localField: "productId",
                  foreignField: "productdetails._id",
                  as: "matchedProduct"
              }
          },

          { $unwind: { path: "$matchedProduct", preserveNullAndEmptyArrays: true } },

          { 
              $group: { 
                  _id: "$saleDate",  // 🔥 Group by Date to show all days
                  totalSales: { $sum: "$quantity" },  
                  totalReturns: { $sum: "$returnedQuantity" }, 
                  totalRevenue: { $sum: "$totalAmount" },  
                  products: { 
                      $push: { 
                          productName: "$matchedProduct.productdetails.title",  
                          quantity: "$quantity" 
                      } 
                  } 
              } 
          }
      ]);

      console.log("✅ Aggregated Sales Data:", JSON.stringify(sales, null, 2));

      let result = sales.length ? sales : [{ totalSales: 0, totalReturns: 0, totalRevenue: 0, products: [] }];
      result = result.map(sale => ({ ...sale, netSales: sale.totalSales - sale.totalReturns }));

      res.json(result);
      console.log("✅ Sales Result:", result);
  } catch (error) {
      console.error("❌ Error fetching sales:", error);
      res.status(500).json({ error: "Failed to fetch sales" });
  }
});



app.post("/return",verifySessionCookie, async (req, res) => {
  try {
    let { reason, subreason, selectedOption,transectionId, orderdata, uploadedUrls, address } = req.body;

    console.log("✅ Incoming Data:");
    console.log("➡ reason:", reason);
    console.log("➡ subreason:", subreason);
    console.log("➡ selectedOption:", selectedOption);
    console.log("➡ orderdata:", Array.isArray(orderdata) ? `✅ Array (${orderdata.length})` : "❌ Not array", orderdata);
    console.log("➡ uploadedUrls:", Array.isArray(uploadedUrls) ? `✅ Array (${uploadedUrls.length})` : "❌ Not array", uploadedUrls);
    console.log("➡ address:", Array.isArray(address) ? `✅ Array (${address.length})` : "❌ Not array", address);

    // 🔒 Safe Validation
    if (!reason) return res.status(400).json({ error: "Missing reason" });
    if (!subreason) return res.status(400).json({ error: "Missing subreason" });
    if (!selectedOption) return res.status(400).json({ error: "Missing selectedOption" });
    if (!Array.isArray(orderdata) || orderdata.length === 0) return res.status(400).json({ error: "Invalid or empty orderdata" });
    if (!Array.isArray(uploadedUrls) || uploadedUrls.length < 2) return res.status(400).json({ error: "Need at least 2 images" });
    if (!Array.isArray(address) || address.length === 0) return res.status(400).json({ error: "Address is required" });

    const addressd = {
      uname: address?.[0]?.uname || "",
      pincode: address?.[0]?.pincode || "",
      building: address?.[0]?.building || "",
      locality: address?.[0]?.locality || "",
      address: address?.[0]?.address || "",
      phone: address?.[0]?.phone || [],
      city: address?.[0]?.city || "Jaipur",
      state: address?.[0]?.state || "Rajasthan",
      lat: address?.[0]?.lat || "",
      lng: address?.[0]?.lng || "",
      isDefault: address?.[0]?.isDefault || false,
    };

    const returnData = orderdata.map(e => ({
      orderid: e._id,
      reason,
      subreason,
      selectedOption,
    
      transectionId,
      imageofreturn: uploadedUrls,
      addressofreturn: addressd,
    // transectionId:e.merchantOrderId, 
    // refundmode:{type:String},
      
      
    }));

    console.log("✅ Final returnData to save:", returnData);

    let savedReturns = await returnmodel.create(returnData);
    console.log("✅ Return Saved:", savedReturns);
    orderEvent.emit('order_return', { type: "order_return", orderdata });

    return res.status(201).json({ message: "Return request submitted!", data: savedReturns });

  } catch (error) {
    console.error("❌ Error in return request:", error);
    return res.status(500).json({ error: "Internal Server Error", details: error.message });
  }
});


// cron.schedule("*/5 * * * *", async () => {
//   console.log("🔄 Checking for orders eligible for cashback...");

//   try {
//     // Find all returned orders with 'wallet' option but cashback not processed
//     const returns = await returnmodel.find({ selectedOption: "Lewkout Wallet" });
// console.log("returns found:", returns.length);
//     for (const ret of returns) {
//       const order = await orderr.findOne({ _id: ret.orderid, status: "Refund Approved" });

//       if (order) {
//         // ✅ Sum totalAmount from all products
//         const totalAmount = order.products?.reduce((sum, product) => sum + (product.totalAmount || 0), 0);

//         if (totalAmount <= 0) {
//           console.error(`❌ Order ID: ${order._id} has invalid totalAmount:`, totalAmount);
//           continue; // Skip this order if totalAmount is invalid
//         }

//         console.log(`✅ Processing cashback of ₹${totalAmount} for Order ID: ${order._id}`);

//         await addcashbacktowallet(order.userId, totalAmount);

//         // ✅ Update order status to prevent duplicate cashback
//         order.status = "cashback-processed";
//         await order.save();
//       }
//     }
//   } catch (error) {
//     console.error("❌ Error in cashback cron job:", error);
//   }
// });


cron.schedule("*/5 * * * *", async () => {
  console.log("🔄 Checking for orders eligible for cashback/refund...");

  try {
    // 1️⃣ Get all returns where refund not processed yet
    const returns = await returnmodel.find({
      $or: [
        { selectedOption: "Lewkout Wallet" },
        { selectedOption: "Back to Source" }
      ]
    });

    console.log("🟡 Returns found:", returns.length);

    for (const ret of returns) {
      const order = await orderr.findOne({
        _id: ret.orderid,
        status: "Refund Approved"
      });

      if (!order) continue;

      // ✅ Calculate total refunded amount for this order
      const totalAmount =
        order.products?.reduce(
          (sum, product) => sum + (product.totalAmount || 0),
          0
        ) || 0;

      if (totalAmount <= 0) {
        console.warn(`⚠️ Invalid totalAmount for order ${order._id}`);
        continue;
      }

      console.log(
        `🧾 Processing refund for order ${order._id} | Mode: ${ret.selectedOption}`
      );

      // 🟢 Case 1: Refund to Lewkout Wallet (full wallet refund)
      if (ret.selectedOption === "Lewkout Wallet") {
        console.log(`💰 Full ₹${totalAmount} refund to wallet`);
        await addcashbacktowallet(order.userId, totalAmount, "wallet-refund");

        order.status = "cashback-processed";
        await order.save();
        continue;
      }

      // 🔵 Case 2: Back to Source (wallet + PG split)
      if (ret.selectedOption === "Back to Source") {
        const totalOrderAmount = order.totalOrderAmount || totalAmount;
        const walletUsed = order.walletUsed || 0;
        const pgUsed = order.pgUsed || 0;

        // 🧮 Calculate ratios
        const walletRatio =
          totalOrderAmount > 0 ? walletUsed / totalOrderAmount : 0;
        const pgRatio =
          totalOrderAmount > 0 ? pgUsed / totalOrderAmount : 0;

        // 🧮 Proportionate refund calculation
        const refundToWallet = Number((totalAmount * walletRatio).toFixed(2));
        const refundToPG = Number((totalAmount * pgRatio).toFixed(2));

        console.log(`💸 Refund split:
          Wallet Ratio: ${walletRatio.toFixed(2)} | PG Ratio: ${pgRatio.toFixed(2)}
          → Wallet refund: ₹${refundToWallet}
          → PG refund: ₹${refundToPG}
        `);

        // Add only wallet part (PG refund will go via gateway)
        if (refundToWallet > 0) {
          await addcashbacktowallet(order.userId, refundToWallet, "wallet-partial-refund");
        }

        // Update tracking fields
        order.refundToWallet = (order.refundToWallet || 0) + refundToWallet;
        order.refundToPG = (order.refundToPG || 0) + refundToPG;
        order.status = "cashback-processed";
        await order.save();

        console.log(`✅ Refund processed for order ${order._id}`);
      }
    }

    console.log("✅ All refunds processed successfully");
  } catch (error) {
    console.error("❌ Error in cashback/refund cron job:", error);
  }
});





app.get("/return", async (req, res) => {
  try {
    // Fetch all return records from the Return collection
    const returns = await returnmodel.find().lean();

    if (!returns || returns.length === 0) {
      return res.status(404).json({ message: "No return records found." });
    }

    // Process each return record
    for (const ret of returns) {
      // Find the order where _id matches ret.orderid and status is 'delivered'
      const order = await orderr.findOne({ _id: ret.orderid, status: "delivered" });

      if (order) {
        // Update order with return details
        order.reason = ret.reason;
        order.subreason = ret.subreason;
        order.selectedOption = ret.selectedOption;
        // order.refundMode = ret.refundMode;
        order.imageofreturn = ret.imageofreturn; // Assuming array of strings
        order.addressofreturn = ret.addressofreturn; // Assuming object
        order.transectionId = ret.transectionId;
        order.returnDate = ret.returnDate; // Assuming Date or ISO string
        order.status = "Returned Requested";

        // Save updated order
        await order.save();
      }
    }

    // 🔹 Return all orders again after update
    const updatedOrders = await orderr.find({ status: "Returned Requested" });

    res.status(200).json({
      message: "Orders updated with return details.",
      updatedOrders,
    });
  } catch (error) {
    console.error("Error updating orders with return details:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

app.post("/moodmsg",verifySessionCookie,isAdmin, async (req, res) => {
  try {
    const {moodemoji,moodcolor, moodtype, msgwithoffer, msgwithoutoffer } = req.body;

    // 🔐 Basic validation
    if (!moodemoji,!moodcolor,!moodtype || !msgwithoffer || !msgwithoutoffer) {
      return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // ✅ Create new mood message
    const newMoodMsg = new moodmodel({
      moodemoji,
      moodcolor,
      moodtype,
      msgwithoffer,
      msgwithoutoffer,
    });

    // 💾 Save to DB
    await newMoodMsg.save();

    res.status(201).json({ success: true, message: "Mood message created successfully", data: newMoodMsg });
  } catch (error) {
    console.error("Error saving mood message:", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
});
app.get("/moodmessage", async (req, res) => {
  try {
    // Fetch all return records from the Return collection
    const returns = await moodmodel.find().lean();

    if (!returns || returns.length === 0) {
      return res.status(200).json({ message: "No return records found." });
    }

   res.status(200).json({message: "Orders updated with return details.",returns});
  } catch (error) {
    console.error("Error updating orders with return details:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});

// DELETE
app.delete("/moodmsg/:id",verifySessionCookie,isAdmin, async (req, res) => {
  try {
    await moodmodel.findByIdAndDelete(req.params.id);
    res.json({ success: true, message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ success: false, message: "Delete failed" });
  }
});

// UPDATE
app.put("/moodmsg/:id",verifySessionCookie,isAdmin, async (req, res) => {
  try {
    const {moodemoji,moodcolor, moodtype, msgwithoffer, msgwithoutoffer } = req.body;
    const updated = await moodmodel.findByIdAndUpdate(
      req.params.id,
      {moodemoji,moodcolor, moodtype, msgwithoffer, msgwithoutoffer },
      { new: true }
    );
    res.json({ success: true, message: "Updated", data: updated });
  } catch (err) {
    res.status(500).json({ success: false, message: "Update failed" });
  }
});

app.post("/create",verifySessionCookie,isAdmin, async (req, res) => {
  try {
    const newCoupon = new cpn(req.body);
    await newCoupon.save();
    res.status(201).json({ message: "Coupon created successfully" });
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Failed to create coupon" });
  }
});


// const CouponUsage = require("./models/CouponUsage"); // add this line

app.get('/get-coupons', async (req, res) => {
  console.log("📩 /get-coupons called");

  const { userId, category, productname,bundel} = req.query;
  console.log("📌 Query Params:", { userId, category, productname });

  try {
    if (!category || !productname) {
      return res.status(400).json({ error: "Missing required parameters" });
    }


if(category=="all"){
  const allCoupons = await cpn.find({});
    return res.json(allCoupons);
}

// inside your loop


    const userOrders = await orderr.find({ userId });
    const isFirstOrder = userOrders.length === 0;
    const isFirst3Order = userOrders.length <= 3;

    console.log("🧪 isFirstOrder:", isFirstOrder);

    const allCoupons = await cpn.find({});
    console.log("🧾 Total Coupons Fetched:", allCoupons.length);

    const filtered = [];

    for (const coupon of allCoupons) {
      const now = new Date();

      // ❌ 1. Expired?
      // if (now > coupon.expiryDate || now < coupon.startDate) continue;
      const nowDate = new Date().setHours(0, 0, 0, 0);
const startDate = new Date(coupon.startDate).setHours(0, 0, 0, 0);
const expiryDate = new Date(coupon.expiryDate).setHours(0, 0, 0, 0);

if (nowDate > expiryDate || nowDate < startDate) continue;


      // ❌ 2. Global usageLimit cross?
      if (coupon.usageLimit && coupon.totalUsed >= coupon.usageLimit) continue;

      // ❌ 3. User’s usageLimit cross?
      if (coupon.usageLimitPerUser) {
        const usage = await cpnusage.findOne({ userId, couponCode: coupon.code });
        if (usage && usage.usageCount >= coupon.usageLimitPerUser) continue;
      }

      // ✅ COUPON LOGIC FILTERS
      const type = coupon.couponType;

      // 1. FIRST ORDER
      if (type === "First Order") {
        if (isFirstOrder) filtered.push(coupon);
        continue;
      }

       if (type === "First 3 Order") {
        if (isFirst3Order) filtered.push(coupon);
        continue;
      }

      // 2. ALL TYPE
      if (type === "All") {
        const hasCategory = Array.isArray(coupon.categories)
          ? coupon.categories.length > 0
          : !!coupon.categories;
        const hasProduct = Array.isArray(coupon.productNames)
          ? coupon.productNames.length > 0
          : !!coupon.productNames;

        // case: no category and productname (apply to all)
        if (!hasCategory && !hasProduct) {
          filtered.push(coupon);
          continue;
        }

        // case: only category
        if (hasCategory && !hasProduct) {
          const match = Array.isArray(coupon.categories)
            ? coupon.categories.includes(category)
            : coupon.categories === category;
          if (match) filtered.push(coupon);
          continue;
        }

        // case: both category and productname
        if (hasCategory && hasProduct) {
          const catMatch = Array.isArray(coupon.categories)
            ? coupon.categories.includes(category)
            : coupon.categories === category;

          const nameMatch = Array.isArray(coupon.productNames)
            ? coupon.productNames.includes(productname)
            : coupon.productNames === productname;

          if (catMatch && nameMatch) filtered.push(coupon);
          continue;
        }
      }

      // 3. SPECIFIC TYPE
      const catMatch = Array.isArray(coupon.categories)
        ? coupon.categories.includes(category)
        : coupon.categories === category;

      const nameMatch = Array.isArray(coupon.productNames)
        ? coupon.productNames.includes(productname)
        : coupon.productNames === productname;

      if (catMatch && nameMatch) filtered.push(coupon);
    }

    console.log("✅ Final Filtered Coupons:", filtered.map(c => c.code));
    res.json(filtered);
  } catch (err) {
    console.error("❌ Server Error while fetching coupons:", err);
    res.status(500).json({ error: 'Failed to fetch coupons' });
  }
});



// GET /api/ratings/:id
app.get("/rate/:id", async (req, res) => {
  try {
    const productId = req.params.id;
    console.log("mil ro rhi h",productId)

    // Find all ratings for the given product ID
    const ratings = await Rating.find({ productId });

    if (!ratings || ratings.length === 0) {
      return res.status(404).json([]);
    }

    // Send ratings to frontend
    res.status(200).json(ratings);
  } catch (error) {
    console.error("Error fetching ratings:", error);
    res.status(500).json({ message: "Server error" });
  }
});


app.patch("/bundle",verifySessionCookie,isAdmin, async (req, res) => {
  const { ids,val } = req.body;
console.log("bundleprice",val)
  if (!Array.isArray(ids) || ids.length !== 2) {
    return res.status(400).json({ message: "Exactly 2 IDs required" });
  }

  try {
    const products = await productsmodel.find({
      "productdetails.colors._id": { $in: ids }
    });

    if (!products.length) {
      return res.status(404).json({ message: "No matching colors found." });
    }

    for (const product of products) {
      for (const category of product.productdetails) {
        for (const color of category.colors) {
          const colorId = color._id.toString();
          if (colorId === ids[0]) {
            color.bundel = ids[1]; // 👈 opposite ID
            color.bundelprice=val
          } else if (colorId === ids[1]) {
            color.bundel = ids[0]; // 👈 opposite ID
            color.bundelprice=val
          }
        }
      }
      await product.save();
    }

    res.status(200).json({ message: "Bundle links set to opposite IDs." });
  } catch (error) {
    console.error("Bundle error:", error);
    res.status(500).json({ message: "Server error" });
  }
});




app.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q || q.trim() === "") return res.json({ products: [] });

  // 🔹 Split query into words
  const escapeRegex = (str) => str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const words = q.trim().split(/\s+/);
  const regexes = words.map((w) => new RegExp(escapeRegex(w), "i"));

  // 🔹 function to build OR conditions for a single word
  const buildWordConditions = (r) => ([
    { $regexMatch: { input: "$$pd.title", regex: r } },
    { $regexMatch: { input: "$$pd.tag", regex: r } },
    { $regexMatch: { input: "$$pd.description", regex: r } },
    { $regexMatch: { input: "$$pd.occasion", regex: r } },
    { $regexMatch: { input: "$$pd.neckline", regex: r } },
    { $regexMatch: { input: "$$pd.material", regex: r } },
    { $regexMatch: { input: "$$pd.printtype", regex: r } },
    { $regexMatch: { input: "$$pd.styletype", regex: r } },
    {
      $gt: [
        {
          $size: {
            $filter: {
              input: "$$pd.colors",
              as: "c",
              cond: {
                $or: [
                  { $regexMatch: { input: "$$c.title", regex: r } },
                  { $regexMatch: { input: "$$c.tag", regex: r } },
                  { $regexMatch: { input: "$$c.description", regex: r } },
                  { $regexMatch: { input: "$$c.occasion", regex: r } },
                  { $regexMatch: { input: "$$c.neckline", regex: r } },
                  { $regexMatch: { input: "$$c.material", regex: r } },
                  { $regexMatch: { input: "$$c.printtype", regex: r } },
                  { $regexMatch: { input: "$$c.styletype", regex: r } }
                ]
              }
            }
          }
        },
        0
      ]
    }
  ]);

  // 🔹 Single word => OR, Multiple words => AND
  let regexConditions;
  if (regexes.length === 1) {
    regexConditions = { $or: buildWordConditions(regexes[0]) };
  } else {
    regexConditions = { $and: regexes.map((r) => ({ $or: buildWordConditions(r) })) };
  }

  const pipeline = [
    {
      $search: {
        index: "lewkoutsearch",
        compound: {
          should: [
            {
              text: {
                query: q,
                path: [
                  "productdetails.tag",
                  "productdetails.title",
                  "productdetails.description",
                  "productdetails.occasion",
                  "productdetails.neckline",
                  "productdetails.material",
                  "productdetails.printtype",
                  "productdetails.styletype",
                  "productdetails.colors.title",
                  "productdetails.colors.tag",
                  "productdetails.colors.description",
                  "productdetails.colors.occasion",
                  "productdetails.colors.neckline",
                  "productdetails.colors.material",
                  "productdetails.colors.printtype",
                  "productdetails.colors.styletype"
                ],
                fuzzy: { maxEdits: 2 }
              }
            }
          ]
        }
      }
    },
    {
      $project: {
        category: 1,
        image: 1,
        productdetails: {
          $filter: {
            input: "$productdetails",
            as: "pd",
            cond: regexConditions
          }
        }
      }
    },
    { $limit: 20 }
  ];

  try {
    const products = await productsmodel.aggregate(pipeline);
    res.json({ products });
  } catch (err) {
    console.error("Search Error:", err);
    res.status(500).json({ error: "Search failed" });
  }
});






app.get("/cart/recommendations/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
console.log("jaja",userId)
    const cart = await addtocart.find({ userId }).lean();
console.log("")
    if (!cart || cart.length === 0) {
      return res.json({ products: [] });
    }

    
    const { Types } = require("mongoose");

// Step 1: Cart IDs ko ObjectId banado
const cartIds = cart.map((item) => {
  try {
    return Types.ObjectId(item.productId);
  } catch (err) {
    return null;
  }
}).filter(Boolean);

    // ✅ Step 2: Match via productdetails._id and productdetails.colors._id
    const cartMeta = await productsmodel.aggregate([
      { $unwind: "$productdetails" },
      {
        $match: {
          $or: [
            { "productdetails._id": { $in: cartIds } },
            { "productdetails.colors._id": { $in: cartIds } }
          ]
        }
      }
    ]);

    console.log("📦 cartMeta:", cartMeta);

    // ✅ Step 3: Extract tags and categories (case-insensitive support)
    const cartCategories = [
      ...new Set(cartMeta.map((p) => p.category?.toLowerCase()).filter(Boolean))
    ];

    const cartTags = [
      ...new Set(
        cartMeta.flatMap((p) =>
          p.productdetails?.colors?.map((c) => c.tag?.toLowerCase()).filter(Boolean)
        )
      )
    ];

    console.log("🏷️ Tags:", cartTags);
    console.log("📂 Categories:", cartCategories);

    // ✅ Step 4: Find recommendations
    const suggestions = await productsmodel.aggregate([
      {
        $match: {
          $or: [
            { category: { $in: cartCategories } },
            { "productdetails.colors.tag": { $in: cartTags } }
          ]
        }
      },
      { $sample: { size: 20 } },
      {
  $project: {
    category: 1,
    image: {
      $cond: {
        if: { $isArray: "$image" },
        then: { $arrayElemAt: ["$image", 0] },
        else: "$image"
      }
    },
    productdetails: { $slice: ["$productdetails", 1] }
  }
}

    ]);
console.log("lop",suggestions)
    res.json({ products: suggestions });
  } catch (err) {
    console.error("🔥 Rec Error:", err);
    res.status(500).json({ error: "Failed to fetch recommendations" });
  }
});



app.get("/products/topsearched", async (req, res) => {
  try {
    // Step 1: From productdetails
    const detailResults = await productsmodel.aggregate([
      { $unwind: "$productdetails" },
      {
        $project: {
          _id: "$productdetails._id", // unique
          tag: "$productdetails.tag",
          image: { $arrayElemAt: ["$productdetails.image", 0] },
          searchcount: "$productdetails.searchcount"
        }
      },
      { $match: { searchcount: { $gt: 0 } } }
    ]);

    // Step 2: From productdetails.colors
    const colorResults = await productsmodel.aggregate([
      { $unwind: "$productdetails" },
      { $unwind: "$productdetails.colors" },
      {
        $project: {
          _id: "$productdetails.colors._id", // unique
          tag: "$productdetails.colors.tag",
          image: { $arrayElemAt: ["$productdetails.image", 0] },
          searchcount: "$productdetails.colors.searchcount"
        }
      },
      { $match: { searchcount: { $gt: 0 } } }
    ]);

    // Step 3: Merge + deduplicate by _id
    const merged = [...detailResults, ...colorResults];

    const uniqueMap = new Map();
    merged.forEach((item) => {
      if (!uniqueMap.has(item._id.toString())) {
        uniqueMap.set(item._id.toString(), item);
      }
    });

    // Step 4: Convert back to array & sort by searchcount
    const finalList = Array.from(uniqueMap.values())
      .sort((a, b) => b.searchcount - a.searchcount)
      .slice(0, 20); // max 20

    res.json({ products: finalList });
  } catch (err) {
    console.error("🔥 Error in topsearched:", err);
    res.status(500).json({ error: "Failed to fetch top searched products" });
  }
});





app.get("/getbundle/:bundle", async (req, res) => {
  const { bundle } = req.params;

  if (!mongoose.Types.ObjectId.isValid(bundle)) {
    return res.status(400).json({ message: "Invalid bundle ID" });
  }

  const objectId = new mongoose.Types.ObjectId(bundle);

  try {
    const product = await productsmodel.findOne({
      "productdetails.colors._id": objectId
    });

    if (!product) {
      return res.status(404).json({ message: "Bundle color not found" });
    }

    // Traverse and find matching color
    for (const category of product.productdetails) {
      const matchedColor = category.colors.find(
        (color) => color._id.toString() === bundle
      );
      if (matchedColor) {
        return res.status(200).json(matchedColor); // ✅ Return the matched color
      }
    }

    res.status(404).json({ message: "Color found in product but not extracted" });
  } catch (error) {
    console.error("Error fetching bundle:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Google Maps API key
const apiKey = process.env.DISTANCE_MATRIX_APIKEY; // replace this safely
const geocoding=process.env.GEOCODING_APIKEY
// ✅ Admin ka fixed address
const adminAddress = "117 geetanjali colony Salasar enclave mangyawas jaipur rajasthan";


// ✅ Route: Calculate Distance + Validate Address
app.get("/getdistance",async (req, res) => {
  const userAddress = req.query.userAddress;
  console.log("📍 User Address:", userAddress);

  if (!userAddress) return res.status(400).json({ error: "User address required" });

  try {
    // 🔹 Step 1: Validate the user address using Geocoding API
    const geoURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(userAddress)}&key=${geocoding}`;
    const geoRes = await axios.get(geoURL);
    const geoData = geoRes.data;

    const result = geoData.results[0];
console.log("Geocoding result:", JSON.stringify(result, null, 2));

    // ❌ Reject if partial, vague, or
    //  no real address structure
    if (
  geoData.status !== "OK" ||
  !result ||
  !result.address_components.some(c =>
    c.types.includes("street_address") ||
    c.types.includes("premise") ||
    c.types.includes("route") ||
    c.types.includes("sublocality") ||
    c.types.includes("locality")
  )
)
 {
      console.log("❌ Invalid or partial address:", geoData);
      return res.status(400).json({ error: "Invalid or incomplete address provided" });
    }

    // 🔹 Step 2: Get Distance using Distance Matrix API
    const distURL = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(adminAddress)}&destinations=${encodeURIComponent(userAddress)}&key=${apiKey}`;
    const distRes = await axios.get(distURL);
    const distData = distRes.data;

    const element = distData.rows?.[0]?.elements?.[0];
    if (element && element.status === "OK") {
      const distance = element.distance.text;
      const duration = element.duration.text;
      console.log("✅ Distance:", distance, "| Duration:", duration);
      return res.json({ distance, duration });
    } else {
      return res.status(400).json({ error: "Could not calculate distance" });
    }

  } catch (err) {
    console.error("❗ Server error:", err.message);
    return res.status(500).json({ error: "Internal server error" });
  }
});



// 🔄 TOGGLE status
// ✅ GET all slots
app.get("/slots", async (req, res) => {
  try {
    const slots = await slotmodel.find();
    res.json(slots);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});



// ✅ Get user-specific wallet transactions
app.get("/getuserwallet/:userId", async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch wallet transactions for the user
    const transactions = await wallettrans.find({ userId })
      .sort({ date: -1 }); // latest first

    if (!transactions.length) {
      return res.status(404).json({ message: "No transactions found" });
    }

    res.status(200).json({
      success: true,
      count: transactions.length,
      transactions,
    });
  } catch (error) {
    console.error("Error fetching wallet transactions:", error);
    res.status(500).json({ message: "Server error", error });
  }
});


// ✅ TOGGLE slot disable/enable
app.post("/slot-status/toggle",isAdmin,verifySessionCookie,async (req, res) => {
  const { label } = req.body;
  try {
    const slot = await slotmodel.findOne({ label });
    if (!slot) return res.status(404).json({ error: "Slot not found" });

    slot.disabled = !slot.disabled;
    await slot.save();

    res.json({ success: true, slot });
    // slotevent.emit("slotUpdated")
  } catch (err) {
    res.status(500).json({ error: "Toggle failed" });
  }
});


// app.listen(port, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port: ${port}`);
// });
(async () => {
  await connectDB();  // ✅ पहले DB कनेक्ट करो, फिर सर्वर स्टार्ट करो
  app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));
})();

