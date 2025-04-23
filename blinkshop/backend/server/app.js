require('dotenv').config();
let express=require("express")
let app= express()
const cron = require("node-cron")
const jwt = require("jsonwebtoken");
// const http = require("http"); // ✅ Required for Socket.io abhi nhiii
// const socketIo = require("socket.io"); // ✅ Import Socket.io
const EventEmitter = require('events');
const orderEvent = new EventEmitter();
// const verifyFirebaseToken = require("../authMiddleware");
// const isAdmin = require("./adminCheck");

let port=process.env.PORT || 3000

// const server = http.createServer(app); // ✅ Create HTTP Server


// const io = socketIo(server, {
//   cors: {
//     origin: "http://localhost:5173", // ✅ Update with your frontend URL
//     methods: ["GET", "POST", "PATCH", "DELETE"]
//   }
// });

// io.on("connection", (socket) => {
//   console.log("New client connected:", socket.id);


//   socket.on("testEvent", (data) => {
//     console.log("Received test event:", data);
//   });

//   socket.on("disconnect", () => {
//     console.log("Client disconnected");
//   });
// });

let mongoose=require("mongoose")
const twilio = require("twilio");
// let model=require("../database/collection.js")
// let wishmodel=require("../database/collection.js")
let bodyparser=require("body-parser")
// let addtocart=require("../database/collection.js")
let {wishmodel,addtocart,wear,userr,orderr,rentt,newarival,bestseling,productsmodel,otpmodel,Rating,SalesModel,wallettrans,returnmodel}=require("../database/collection.js")
// import img1 from "../../blinkshop/src/components/image/img1.jpg"
const products = [
  
  { id: 8, name: "Shirt 1", section: "shirts", description: "A cool shirt", price: 19.99, image:"../../blinkshop/src/components/image/img1.jpg" },
  { id: 9, name: "Shirt 2", section: "shirts", description: "Another cool shirt", price: 24.99, image: "../../blinkshop/src/components/image/img1.jpg" },
  { id: 10, name: "Jeans 1", section: "jeans", description: "Stylish jeans", price: 39.99, image: "../../blinkshop/src/components/image/img1.jpg" },
  { id: 11, name: "Jeans 2", section: "jeans", description: "Comfortable jeans", price: 44.99, image: "../../blinkshop/src/components/image/img1.jpg" },
  // Add more products as needed
];



// Twilio credentials from .env


const cors = require('cors');
// app.use(cors());//te localhost m h
app.use(cors({
  origin: "https://lewkout.netlify.app", // Your frontend URL
  methods: "GET,POST,PUT,PATCH,DELETE",
  credentials: true
}));//ye deploy ke baad 
app.use((express.urlencoded({extented:false})))
    
app.use(express.json())
app.use(bodyparser.json())
// app.use((req, res, next) => {
//     res.header({"Access-Control-Allow-Origin": "*"});
//     next();
//   }) 
// require("../database/dbconn.js")
const connectDB = require('../database/dbconn.js');
app.get("/",(req,res)=>{
    res.send("hello")
})
// app.post("/user", async (req, res) => {
//     try {
//       //console.log("Received data:", req.body); // Log the incoming data
//       let { password, confirmPassword } = req.body;
  
//       if (password === confirmPassword) {
//         let data = new model({
//           name: req.body.name,
//           email: req.body.email,
//           password: req.body.password,
//           confirmPassword: req.body.confirmPassword,
//         });
  
//         let savedata = await data.save();
//         res.status(201).json({ message: "Data saved successfully", savedata });
//       } else {
//         res.status(400).json({ message: "eeeemail is exist" });
//       }
//     } catch (error) {
//       console.error("Error while saving data:", error); // Log any errors
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   });
//   app.get("/user",async(req,res)=>{
//     try{
//     let data=await model.find({})
//     //console.log(data)a
//     res.send(data)
//     }
//     catch(e){
//         //console.log(e)
//         res.send(e)
//     }
// })



app.get("/ping", (req, res) => {
  res.status(200).send("Server is awake!");
});

app.get("/events", (req, res) => {
  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const sendEvent = () => {
      res.write("data: update\n\n"); // 🔄 Notify client
  };

  orderEvent.on("orderUpdated", sendEvent);

  req.on("close", () => {
      orderEvent.removeListener("orderUpdated", sendEvent);
  });
});


// ✅ Middleware to Verify Auth0 JWT
// const verifyToken = async (req, res, next) => {
//   const token = req.header("Authorization");
//   if (!token) return res.status(401).json({ error: "Access denied" });

//   try {
//     const response = await axios.get(
//       `https://${process.env.AUTH0_DOMAIN}/userinfo`,
//       { headers: { Authorization: token } }
//     );

//     req.user = response.data;
//     next();
//   } catch (error) {
//     res.status(400).json({ error: "Invalid token" });
//   }
// };


const client = twilio(process.env.ACCOUNTSID,process.env.AUTHTOKEN);

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

//save itm to cart
// app.post('/cart', async (req, res) => {
//   const { _id,title,description,image,price,discountprice,userid,productId,shopname} = req.body;
//   const newItem = new wishmodel({ itemid:_id, title, description, image,price,discountprice,userId:userid ,productId,shopname});
// console.log("wish",newItem)
//   try {
//     await newItem.save();
//     res.status(201).json(newItem);
//   } catch (err) {
//     res.status(400).json({ error: err.message });
//     //console.log(err)
//   }
// });
app.post("/cart", async (req, res) => {
  try {
    const {
      _id,
      title,
      description,
      image,
      price,
      discountprice,
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
      title,
      description,
      image,
      price,
      discountprice,
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
app.get('/cart/:uid', async (req, res) => {
  let { uid } = req.params;

  // ✅ Validate UID before using ObjectId
  if (!uid || !mongoose.Types.ObjectId.isValid(uid)) {
    return res.status(400).json({ error: "Invalid User ID" });
  }

  try {
    const objectId = new mongoose.Types.ObjectId(uid);
    const items = await wishmodel.find({ userId: objectId }).populate("productId");

    res.status(200).json(items);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});
app.delete('/cart/:id', async (req, res) => {
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

// app.get("/user",async(req,res)=>{
//     try{
//     let userdata=await model.find({})
//     res.send(userdata)
//     }

// catch(e){
//     res.status(400).send(e)
// }
// })

// addtocart
app.post("/addtocart",async(req,res)=>{
 
  let {_id,image,title,description,qty,size,price,discountprice,userid,productId,shopname}=req.body
let cartadding=await new addtocart({productid:_id,title,description,image,qty,size,price,discountprice,userId:userid ,productId,shopname})
console.log("cart itm",cartadding)
try{
let savecartdata=await cartadding.save()
res.status(200).json(savecartdata);
console.log("lolaa")
  } 
  catch (err) {
    res.status(400).json({ error: err.message });
    console.log("kolla")
  }

})

app.get("/addtocart/:uid",async(req,res)=>{

  let { uid } = req.params;

  // ✅ Validate UID before using ObjectId
  if (!uid || !mongoose.Types.ObjectId.isValid(uid)) {
    return res.status(400).json({ error: "Invalid User ID" });
  }
  try{
  // let cartdata=await addtocart.find()
  const objectId = new mongoose.Types.ObjectId(uid);
  let cartdata=await addtocart.find({ userId: objectId }).populate("productId")
  console.log("cartdata",cartdata)
  // //console.log(cartdata)
    res.status(200).json(cartdata)
  }
  catch(e){
    //console.log(e)
    res.status(400).json(e.message)
  }
})

app.delete('/addtocart/:id', async (req, res) => {
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
      let categorydata=await wear.find() 
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

//user created or registered
app.post("/user/register", async (req, res) => {
  console.log("Request received at /user/register:", req.body); // ✅ Backend logging
  // const { name, email, updated_at } = req.body;
  const { phoneNumber,uid,refcode, updated_at } = req.body
  console.log("phonenumberrrrr",phoneNumber)
  if (phoneNumber && uid && !refcode) { 
    try {
      // Check if user already exists
      const existingUser = await userr.findOne({ uid:uid });
      if (!existingUser) {
        const newUser = new userr({
          // name: name,
          // email: email,
          phonenumber:phoneNumber,
          uid:uid,
          created_at: updated_at,
        });
        console.log("dekghte h",newUser)
        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);
        res.status(201).json({ message: "User saved successfully", savedUser });
      } else {
        res.status(200).json({ message: "User already exists" });
      }
    } catch (e) {
      console.error("Database error:", e);
      res.status(500).json({ message: e.message });
    }
  }
  else if (phoneNumber && uid && refcode) { 
    try {
      // Check if user already exists
      const existingUser = await userr.findOne({ uid: uid });
      if (!existingUser) {
        // Find the user who owns the referral code
        const referringUser = await userr.findOne({ code: refcode });
  
        if (referringUser) {
          // Increment codecount by 1
          referringUser.codecount = (referringUser.codecount || 0) + 1;
          referringUser.codepoint=(referringUser.codepoint || 0) + 5
          await referringUser.save(); // save the updated count
        }
  
        const newUser = new userr({
          phonenumber: phoneNumber,
          uid: uid,
          refercode:refcode,
          created_at: updated_at,
          // code: generatedCode, // if you're generating a code for new user
        });
  
        console.log("dekghte h", newUser);
        const savedUser = await newUser.save();
        console.log("User saved:", savedUser);
  
        res.status(201).json({ message: "User saved successfully", savedUser });
      } else {
        res.status(200).json({ message: "User already exists" });
      }
    } catch (e) {
      console.error("Database error:", e);
      res.status(500).json({ message: e.message });
    }
  }
  
  else {
    console.error("Error saving user:"); // 👈 Error ko log karo

    res.status(400).json({ message: "Email is required" });
  }
});

// Delete user data on logout
app.post("/user/logout", async (req, res) => {
  const { email } = req.body;
  if (email) {
    try {
      const deletedUser = await userr.deleteMany({ email });
      if (deletedUser.deletedCount > 0) {
        res.status(200).json({ message: "User data deleted successfully" });
      } else {
        res.status(404).json({ message: "User not found" });
      }
    } catch (e) {
      res.status(500).json({ message: "Error during deletion: " + e.message });
    }
  } else {
    res.status(400).json({ message: "Email is required to delete user data" });
  }
});


//update user role 
// app.put("/user/update-role/:id", async (req, res) => {
//   const { id } = req.params; // URL se user ka ID le rahe hain
//   const { role } = req.body; // Body se naya role le rahe hain

//   if (!role) {
//     return res.status(400).json({ message: "Role is required" });
//   }

//   try {
//     const updatedUser = await userr.findByIdAndUpdate(
//       id,
//       { role: role },
//       { new: true } // Yeh ensure karega ki updated document return ho
//     );

//     if (!updatedUser) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User role updated successfully", updatedUser });
//   } catch (error) {
//     res.status(500).json({ message: "Error updating role", error: error.message });
//   }
// });

// app.put("/user/update-role/:id", async (req, res) => {
//   const { id } = req.params;
//   const { role, shopname, shopaddress } = req.body;
// console.log("rolz",role,shopname,shopaddress)
//   if (!role) {
//     return res.status(400).json({ message: "Role is required" });
//   }

//   try {
//     let updateData = { role };

//     if (role === "shopkeeper") {
//       if (!shopname || !shopaddress) {
//         return res.status(400).json({ message: "Shop Name and Address are required for Shopkeeper!" });
//       }
//       updateData.shopname = shopname;
//       updateData.shopaddress = shopaddress;
//     } else {
//       updateData.shopname = "";
//       updateData.shopaddress = "";
//     }

//     const updatedUser = await userr.findByIdAndUpdate(id, updateData, { new: true });

//     if (!updatedUser) {
//       console.log("user not found")
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({ message: "User updated successfully", updatedUser });
//   } catch (error) {
//     console.log('ye h error',error.message)
//     res.status(500).json({ message: "Error updating user", error: error.message });
//   }
// });

app.put("/user/update-role/:userId", async (req, res) => {
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


// app.patch('/user/:userId/address', async (req, res) => {
//   const { userId } = req.params; // Extract userId from the URL parameter
//   console.log("uid",userId)
//   const { pincode,phone,otp, building, locality, isDefault } = req.body; // Extract address data from the request body

//   try {
//     // Find the user by userId
//     const user = await userr.findById(userId);
    
//     if(user)
//     {
//     console.log("user",user)
//     }
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

  
//     if (phone) {
//       console.log("phone received:", phone);
     
//       // ✅ Step 2a: Check if phone is unique
//       const existingUser = await userr.findOne({ phone });
//       if (existingUser) {
//         return res.status(400).json({ message: "Phone number already exists" });
//       }

//       // ✅ Step 2b: If OTP is **not provided**, generate and send OTP
//       if (!otp) {
//         const otpCode = Math.floor(100000 + Math.random() * 900000); // 6-digit OTP

//         // Save OTP in DB (Replace if phone already exists)
//         await otpmodel.findOneAndUpdate(
//           { phone },
//           { otp: otpCode, createdAt: Date.now() },
//           { upsert: true, new: true }
//         );

//         // Send OTP via Twilio
//         await client.messages.create({
//           body: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
//           from: '688056',
//           to: phone,
//         });

//         return res.status(200).json({ message: "OTP sent successfully" });
//       }

//       // ✅ Step 2c: If OTP is provided, verify OTP
//       const otpRecord = await otpmodel.findOne({ phone, otp });
//       if (!otpRecord) {
//         return res.status(400).json({ message: "Invalid or expired OTP" });
//       }

//       // ✅ Step 2d: OTP is correct → Save phone number & delete OTP record
//       user.phone = phone;
//       await otpmodel.deleteOne({ phone }); // Remove OTP after verification

//        // Create a new address object
//        const newAddress = {
//         pincode,
//         building,
//         locality,
//         city: "Jaipur",  // Default city
//         state: "Rajasthan",  // Default state
//         isDefault: isDefault || false,  // Default to false if not provided
//       };
   
//       // Add the new address to the address array
//       user.address.push(newAddress);
//    user.phone.push(phone)
//     // Save the user with the updated address array
//     await user.save();

//     return res.status(200).json({ message: "Address added successfully", user }); 
//     }

     
//   } catch (error) {
//     console.error('Twilio Error:', error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// });


// app.patch('/user/:userId/address', async (req, res) => { 
//   const { userId } = req.params;
//   console.log("Request Params:", req.params);
//   console.log("uid", userId);
  
//   const { pincode, phone, otp, building, locality, isDefault } = req.body;

//   try {
//     // ✅ Step 1: Find User
//     // const user = await userr.findById(userId);
//     const user = await userr.findById(new mongoose.Types.ObjectId(userId));
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     if (!mongoose.Types.ObjectId.isValid(userId)) {
//       return res.status(400).json({ message: "Invalid user ID format" });
//     } 

//     // ✅ Step 2: Handle Phone & OTP
//     if (phone) {
//       console.log("phone received:",phone);
      
//       // 🔹 Check if phone is already registered
//       const existingUser = await userr.findOne({ phone });
//       if (existingUser) {
//         return res.status(400).json({ message: "Phone number already exists" });
//       }

//       // 🔹 If OTP is NOT provided, generate & send OTP
//       if (!otp) {
//         const otpCode = Math.floor(100000 + Math.random() * 900000);

//         // 🔹 Save OTP in DB (Replace if phone already exists)
//         await otpmodel.findOneAndUpdate(
//           { phone },
//           { otp: otpCode, createdAt: Date.now() },
//           { upsert: true, new: true }
//         );

//         // 🔹 Send OTP via Twilio
//         await client.messages.create({
//           body: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
//           from: '+13186109829',
//           to: phone,
//         });

//         return res.status(200).json({ message: "OTP sent successfully" });
//       }

//       // ✅ Step 3: If OTP is provided, verify OTP
//       const otpRecord = await otpmodel.findOne({ phone, otp });
//       if (!otpRecord) {
//         return res.status(400).json({ message: "Invalid or expired OTP" });
//       }

//       // ✅ Step 4: OTP Verified → Save Phone & Address
//       user.phone.push(phone); // 🔹 Phone number is saved only after OTP verification

//       const newAddress = {
//         pincode,
//         building,
//         locality,
//         city: "Jaipur",
//         state: "Rajasthan",
//         isDefault: isDefault || false,
//       };

//       user.address.push(newAddress); // 🔹 Address saved only after OTP verification

//       // 🔹 Remove OTP after verification
//       await otpmodel.deleteOne({ phone });

//       // 🔹 Save updated user
//       await user.save();

//       return res.status(200).json({ message: "Address & phone saved successfully", user });
//     }

//     return res.status(400).json({ message: "Phone number is required" });

//   } catch (error) {
//     console.error('Twilio Error:', error);
//     return res.status(500).json({ message: "Server error", error });
//   }
// });

app.patch('/user/:userId/address', async (req, res) => {
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

    const { pincode, phone,  building, locality, isDefault } = req.body;
    console.log("sab kuch",pincode, phone, building, locality, isDefault)

    if (phone) {
      console.log("phone received:", phone);

      // const existingUser = await userr.findOne({ phone });
      // if (existingUser) {
      //   return res.status(400).json({ message: "Phone number already exists" });
      // }

      // if (!otp) {
      //   const otpCode = Math.floor(100000 + Math.random() * 900000);
      //   await otpmodel.findOneAndUpdate(
      //     { phone },
      //     { otp: otpCode, createdAt: Date.now() },
      //     { upsert: true, new: true }
      //   );

      //   await client.messages.create({
      //     body: `Your OTP is ${otpCode}. It will expire in 5 minutes.`,
      //     from: '+13186109829',
      //     to: phone,
      //   });

      //   return res.status(200).json({ message: "OTP sent successfully" });
      // }

      // const otpRecord = await otpmodel.findOne({ phone, otp });
      // if (!otpRecord) {
      //   return res.status(400).json({ message: "Invalid or expired OTP" });
      // }

      user.phone.push(phone);
      user.address.push({
        pincode,
        building,
        locality,
        phone,
        city: "Jaipur",
        state: "Rajasthan",
        isDefault: isDefault || false,
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
    let users = await userr.find(); // ✅ Fetch all users from DB
    res.json(users); // ✅ Send users as response
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// app.patch(`/user/:userId/addressdoe`,async(req,res)=>{
//   const { userId } = req.params;
//   console.log("uid", userId);
//   const {addresid,action} = req.body;
//   try {
//     // ✅ Step 1: Find User
//     const user = await userr.findById(userId);
//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }
//     if(action=="delete")
//     {
//       console.log("helllo delete")
//       console.log("adress adress",user.address)
//    let addrestobedelete=user.address.filter((e)=>(e._id!=addresid))
//    console.log("adddddd",addrestobedelete)
//    await user.address.push(addrestobedelete)
//    await user.save()
//    return res.status(200).json({message:"address deleted successfully"})

//     }
//     else{
//       return res.status(400).json({message:"address not found"}) 
//     }

    
//   }
//   catch(e){
//     console.log(e)
//     return res.status(500).json({ message: "Server error", e});
//   }

// })

app.patch(`/user/:userId/addressdoe`, async (req, res) => {
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
    
  //   else if(action=="edit"){
  //     console.log("Editing address:", addresid);

  // // ✅ Step 2: Check if address exists before editing
  // const addressIndex = user.address.findIndex((addr) => addr._id.toString() === addresid);
  // if (addressIndex === -1) {
  //   return res.status(404).json({ message: "Address not found" });
  // }

  // // ✅ Step 3: Update the existing address with new data
  // user.address[addressIndex] = { ...user.address[addressIndex], ...addr };

  // await user.save(); // ✅ Save updated user

  // return res.status(200).json({ message: "Address updated successfully", updatedAddress: user.address[addressIndex] });
      
  //   }
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

    // user.address[addressIndex] = {
    //   ...user.address[addressIndex]._doc, // Ensure existing schema fields are preserved
    //   ...addr,
    // };
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
if(phoneNumber){
  console.log("emmm",phoneNumber)
  
}

  try {
    const user = await userr.findOne({ phonenumber:phoneNumber}); // Find user by phn
    if (user) {
      console.log(user)
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
      let categorydata=await rentt.find() 
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
  let data=await bestseling.find()
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


app.post("/productmodel", async (req, res) => {
  try {
    const productData = req.body;
    const newProduct = new productsmodel(productData); // Assuming productsmodel is your mongoose model
    await newProduct.save();
    res.status(201).json(newProduct);
    console.log("ho gyaa",newProduct)
  } catch (error) {
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
    if(operation=="all"){
       //  let data=await wear.find({}, { category: 1, _id: 0 })// for retrive only category field
      let categorydata=await productsmodel.find() 
      console
      res.json(categorydata)
    }
    else if (operation === "filtered") {
      // Operation 2: Fetch documents filtered by 'tag'
      const cat = section;
      const subcat = subcategory;
     
      const categoryData = await productsmodel.find({});
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


// ✅ Define Socket.io notify function
// const notifyLowStock = (product) => {
//  console.log("🔥 Emitting low stock alert for:", product.title);
//   io.emit("lowStockAlert", {
//     productId: product._id,
//     title: product.productdetails[0]?.title || "Unknown Product",
//     newStock: product.productdetails[0]?.colors[0]?.sizes[0]?.quantity || 0
//   });
// };
// const notifyLowStock = (product) => {
//   if (!product || !product.productdetails || product.productdetails.length === 0) {
//     console.log("❌ Error: Invalid product data for low stock alert!");
//     return;
//   }

//   const title = product.productdetails[0]?.title || "Unknown Product"; // ✅ Ensure title exists
//   const newStock = product.productdetails[0]?.colors[0]?.sizes[0]?.quantity || 0;

//   console.log("🔥 Emitting low stock alert for:", title);
//   console.log("🔥 Emitting low stock alert for:",{ productId: product._id, 
//     title: product.productdetails[product.productdetails.length-1]?.title || "Unknown Product", 
//     newStock: product.productdetails[product.productdetails.length-1]?.colors[0]?.sizes[0]?.quantity || 0}); // Debugging ke liye
//   // io.emit("lowStockAlert", {
//   //   productId: product._id, 
//   //   title: product.productdetails[product.productdetails.length-1]?.title || "Unknown Product", 
//   //   newStock: product.productdetails[product.productdetails.length-1]?.colors[0]?.sizes[0]?.quantity || 0
//   // });
//   console.log("🔥 Active Connections:", io.engine.clientsCount);
// if (io.engine.clientsCount > 0) {
//     io.emit("lowStockAlert", {
//       productId: product._id,
//     title: product.productdetails[0]?.title || "Unknown Product",
//     newStock: product.productdetails[0]?.colors[0]?.sizes[0]?.quantity || 0
//     });
//     console.log("✅ Successfully emitted lowStockAlert event!");
// } else {
//     console.log("❌ No active socket connections!");
// }
//   // io.emit("lowStockAlert", {
//   //   productId: product._id,
//   //   title: title,
//   //   newStock: newStock
//   // });
//   console.log("✅ Successfully emitted lowStockAlert event!"); // Check if emit runs
// };
// setInterval(() => {
//   io.emit("lowStockAlert", { productId: "123", title: "Test Product", newStock: 3 });
//   console.log("✅ Test Emit Sent");
// }, 5000);



app.patch('/productmodel/:id', async (req, res) => {
  console.log("haa yhi funtion ccal ho rha hai")
  const { id } = req.params;
   
  // Validate ID format
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ message: 'Invalid ID format!' });
  }

  try {
    let updateData = req.body;
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

    const updatedProduct = await productsmodel.findByIdAndUpdate(
      id,
      { $push: updateData },
      { new: true, runValidators: true }
    );
  console.log("updated my data",updatedProduct)
    if (!updatedProduct) {
      return res.status(404).json({ message: 'Product not found!' });
    }
  
    // ✅ Check if product is low stock
    // updatedProduct.productdetails.forEach((detail) => {
    //   detail.colors.forEach((color) => {
    //     color.sizes.forEach((size) => {
    //       if (size.quantity <= 5) {
    //         notifyLowStock(updatedProduct);
    //       }
    //     });
    //   });
    // });
    res.status(200).json({ message: 'Product updated successfully!', data: updatedProduct });

   

  } catch (error) {
    console.error('Error updating product:', error.message);
    res.status(500).json({ message: 'Internal Server Error', error: error.message });
  }
});

// ✅ API: Fetch Low Stock Products
// app.get("/lowstock", async (req, res) => {
//   try {
//     let products = await productsmodel.find({});
//     let lowStockProducts = [];

//     products.forEach((product) => {
//       product.productdetails.forEach((detail) => {
//         detail.colors.forEach((color) => {
//           color.sizes.forEach((size) => {
//             if (size.quantity <= 5) {
//               lowStockProducts.push(product);
//             }
//           });
//         });
//       });
//     });

//     res.json(lowStockProducts);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching low stock products", error });
//   }
// });















app.patch('/editordeleteproduct/:id', async (req, res) => {
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


app.patch("/deleteproductfromcate/:id", async (req, res) => {
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

// app.patch('/editordeleteproduct/:id', async (req, res) => {
//   const { id } = req.params;
//   const { deleteMode, ...updateData } = req.body; // ✅ Extract deleteMode separately

//   console.log("Received ID:", id);
//   console.log("Received Body:", req.body);

//   // ✅ Validate ID format
//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return res.status(400).json({ message: 'Invalid ID format!' });
//   }

//   try {
//     if (deleteMode) {
//       console.log("Deleting product with ID:", id);
//       // ✅ Remove the product from `productdetails`
//       const updatedProduct = await productsmodel.findOneAndUpdate(
//         { "productdetails._id": id },
//         { $pull: { productdetails: { _id: id } } },
//         { new: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product not found!' });
//       }

//       return res.status(200).json({ message: 'Product deleted successfully!', data: updatedProduct });
//     }

//     // ✅ If not deleting, update the product
//     if (Object.keys(updateData).length > 0) {
//       console.log("Updating product:", updateData);
//       const updatedProduct = await productsmodel.findOneAndUpdate(
//         { "productdetails._id": id },
//         { 
//           $set: Object.keys(updateData).reduce((acc, key) => {
//             acc[`productdetails.$.${key}`] = updateData[key];
//             return acc;
//           }, {}) 
//         },
//         { new: true, runValidators: true }
//       );

//       if (!updatedProduct) {
//         return res.status(404).json({ message: 'Product not found!' });
//       }

//       return res.status(200).json({ message: 'Product updated successfully!', data: updatedProduct });
//     }

//     return res.status(400).json({ message: 'No valid update fields provided!' });

//   } catch (error) {
//     console.error('Error updating/deleting product:', error.message);
//     res.status(500).json({ message: 'Internal Server Error', error: error.message });
//   }
// });



app.get("/newarrival",async(req,res)=>{
try{
  let resdata=await newarival.find()
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



const sendWhatsAppMessage = async (order) => {
  console.log("hello from whatsapp",order.products)
    try {
        const message = await client.messages.create({
            from:`whatsapp:${process.env.TWILIONUMBER}`,
            to:`whatsapp:${process.env.ADMINNUMBER}`,
            body: `New Order Received! 📦\n\n👤 Customer: ${order.name}\n📍 Address: ${order.address}\n🛒 Product: ${order.products.map((e)=>(e.tag))}\n💰 Price: ${order.products.map((e)=>(e.discountprice))} Rs\n\n✅ Please process the order ASAP!`
        });
        console.log("WhatsApp Message Sent ✅", message.sid);
    } catch (error) {
        console.error("WhatsApp Message Error ❌", error);
    }
};

// 🔄 Cron job jo har minute check karega
// cron.schedule("* * * * *", async () => {
//   try {
//     console.log("cron job is runnig ")
//       const orders = await orderr.find({ 
//           status: { $in: ["Pending", "shipped"] }  // Sirf pending aur shipped orders check karega
//       });

//       let currentTime = new Date();

//       for (let order of orders) {
//           let orderTime = new Date(order.createdAt);
//           let timeDiff = (currentTime - orderTime) / (1000 * 60); // Difference in minutes

//           if (order.status === "Pending" && timeDiff >= 1) {
//               order.status = "shipped"; // ✅ 10 min ke baad order shipped ho jayega
//               await order.save();
//               console.log(`🚚 Order ${order._id} is now SHIPPED!`);
//           } 
//           // else if (order.status === "shipped" && timeDiff >=3) {
//           //     order.status = "delivered"; // ✅ 60 min ke baad order delivered ho jayega
//           //     await order.save();
//           //     console.log(`📦 Order ${order._id} is now DELIVERED!`);
//           // }
//       }
//   } catch (error) {
//       console.error("❌ Cron Job Error:", error);
//   }
// });

// console.log("✅ Cron Job for Auto Order Status Update is Running!");


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

  async function addcashbacktowallet(userId, purchaseAmount,type) {

    console.log("user ki idd",userId)
    console.log("khredi ki vlaue",purchaseAmount)
      
  
    // ✅ Update User Wallet
    await userr.updateOne(
        { _id: userId },
        { $inc: { "wallet.cashback":purchaseAmount } }
    );

    // ✅ Add Wallet Transaction History
    await wallettrans.create({
        userId,
        type: "cashback",
        amount: purchaseAmount,
        valueInRupees:purchaseAmount,
        description: `Earned from return of ₹${purchaseAmount}`,
        date: new Date()
    });
  
 

    // console.log(`✅ User ${userId} earned ${pointsEarned?(pointsEarned):(purchaseAmount)} points (₹${valueInRupees?(valueInRupees):()})`);
  }



app.post('/order', async (req, res) => {
  try {
      const {order,address,userDetails} = req.body;

      // if (!userId || !email || !address || !phone || !products || products.length === 0) {
      //     return res.status(400).json({ error: "All fields are required" });
      // }
 if (!order || !address || !userDetails ) {
          return res.status(400).json({ error: "All fields are required" });
      }
      
 // 🟢 Ensure 'order' is always an array
 const ordersArray = Array.isArray(order) ? order : [order];
console.log("orderaaarr",ordersArray)
 // 🟢 Map products correctly inside the Order Schema
 const products = ordersArray.map(item => ({
     productId: item.productid==null || item.productid==undefined ?(item.id):(item.productid),
     tag:item.tag,
     discription:item.description,
     image:item.image,
     quantity: item.qty,
     price: item.price,
     discountprice: item.discountprice,
     size: item.size,
     shopname:item.shopname,
     totalAmount:item.discountprice
 })); 


// 🟢 Subtract Ordered Quantity from Product Model
for (const item of ordersArray) {
  const product = await productsmodel.findById(item.productid?(item.productid):(item._id));
  if (product) {
      if (product.qty >= item.qty) {
          product.qty -= item.qty; // 🛑 Subtract ordered quantity
          await product.save();
      } else {
          return res.status(400).json({ error: `Not enough stock for product ID: ${item.productid}` });
      }
  }
}

      // Save Order in Database
      const newOrder = new orderr ({
        name:userDetails.name,
          userId:userDetails._id,
          email:userDetails.email,
          address,
          phone:userDetails.address[0].phone[0],
          products
              });

      await newOrder.save();
      orderEvent.emit('orderUpdated'); // 🔄 Notify frontend
      // Send WhatsApp Notification
      sendWhatsAppMessage(newOrder);

      res.status(201).json({ message: "Order Placed & Admin Notified!" });
      let orderprice = ordersArray.reduce((total, e) => total + (Array.isArray(e.discountprice) 
  ? e.discountprice.reduce((sum, price) => sum + price, 0) 
  : e.discountprice), 0);
    // addPointsOnPurchase(userDetails._id,orderprice)
  } catch (error) {
      console.error("Order Error:", error);
      res.status(500).json({ error: "Order Failed" });
  }
});


// 🔵 GET: Fetch all orders (For Admin)
app.get('/orders', async (req, res) => {
  try {
      const orders = await orderr.find().populate('products.productId'); // Populate product details
      res.status(200).json(orders);
  } catch (error) {
      console.error("Fetch Orders Error:", error);
      res.status(500).json({ error: "Failed to fetch orders" });
  }
});

// 🔵 GET: Fetch a single order by ID
app.get('/order/:id', async (req, res) => {
  try {
      const order = await orderr.findById(req.params.id).populate('products.productId');
      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }
      res.status(200).json(order);
  } catch (error) {
      console.error("Fetch Order Error:", error);
      res.status(500).json({ error: "Failed to fetch order" });
  }
});

// 🔵 GET: Fetch orders by User ID
app.get('/orders/user/:userId', async (req, res) => {
  try {
      const { userId } = req.params;

      // 🛑 Validate userId (Check if it's missing or invalid)
      if (!userId || userId.length !== 24) {
          return res.status(400).json({ error: "Invalid User ID" });
      }

      // 🔍 Fetch orders by User ID
      const userOrders = await orderr.find({ userId }).populate('products.productId');
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

app.put('/order/deliver/:id', async (req, res) => {
  try {
      const order = await orderr.findById(req.params.id);
      const {userDetails}=req.body 
      if (!order) {
          return res.status(404).json({ error: "Order not found" });
      }

      // ✅ Sirf SHIPPED order ko DELIVERED karne de
      if (order.status == "Pending") {
          // return res.status(400).json({ error: "Only shipped orders can be marked as delivered" });
          order.status = "shipped";
          await order.save();
          orderEvent.emit('orderUpdated'); // 🔄 Notify frontend
          res.json({ message: "Order marked as shipped!" });
          
      }
      
 
      else if(order.status=="shipped"){
        order.status = "delivered";
        order.deliveredAt = new Date(); // ✅ Store delivery time
        await order.save();
        orderEvent.emit('orderUpdated'); // 🔄 Notify frontend
        res.json({ message: "Order marked as delivered!" });
        
      }

      else if(order.status=="pending-returned"){
        order.status = "returned";
        await order.save();
        orderEvent.emit('orderUpdated'); // 🔄 Notify frontend
        res.json({ message: "Order marked as returned!" });
      
      }
      else{
        return res.status(400).json({ error: "Only shipped orders can be marked as delivered" });
      }

     
  } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ error: "Server error" });
  }
});

// setInterval(async () => {
//   try {
//     const timeLimit = new Date(Date.now() - 65 * 60 * 1000); // 65 minutes ago
//     const eligibleOrders = await orderr.find({
//       status: "delivered",
//       deliveredAt: { $lte: timeLimit }
//     });

//     for (const order of eligibleOrders) {
//       await addPointsOnPurchase(order.userId, order.price,"delivered");
//       console.log(`✅ Points added for Order ID: ${order._id}`);

//       // ✅ Ensure points are only added once
//       order.status = "points-added";
//       await order.save();
//     }
//   } catch (err) {
//     console.error("❌ Error in points scheduler:", err);
//   }
// }, 5 * 60 * 1000); // ✅ Runs every 5 minutes

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



// ✅ User se Rating Accept karna
// ✅ User se Rating Accept karna
app.post("/rate", async (req, res) => {
  try {
    const { userId, productId, rating, review } = req.body;

    // 🛑 Ensure `rating` is a number and within 1-5
    if (!rating || typeof rating !== "number" || rating < 1 || rating > 5) {
      return res.status(400).json({ error: "Invalid rating. It must be a number between 1 and 5." });
    }

    // 🟡 Check if user has already rated this product
    let existingRating = await Rating.findOne({ userId, productId });

    if (existingRating) {
      existingRating.rating = rating;
      existingRating.review = review || existingRating.review;
      await existingRating.save();
    } else {
      await Rating.create({ userId, productId, rating, review });
    }

    // 🔄 Update Average Rating in Product Collection
    const allRatings = await Rating.find({ productId });
    const totalRatings = allRatings.length;
    const avgRating = allRatings.reduce((sum, r) => sum + r.rating, 0) / totalRatings;

    await productsmodel.findByIdAndUpdate(productId, { avgRating });

    res.status(200).json({ message: "Rating submitted successfully", avgRating });
  } catch (error) {
    console.error("Error submitting rating:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ✅ Fetch Product Ratings
// app.get("/ratings/:productId", async (req, res) => {
//   try {
//     const productId = req.params.productId;
//     const ratings = await Rating.find({ productId }).populate("userId", "name"); // Fetch user details
//     res.status(200).json(ratings);
//   } catch (error) {
//     console.error("Error fetching ratings:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
app.get("/ratings/:userId/:productId", async (req, res) => {
  try {
    const { userId, productId } = req.params;

    // Find the rating given by the specific user for the specific product
    const rating = await Rating.find({ userId }).populate("userId", "name");

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
      });

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


app.post("/sales", async (req, res) => {   
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

app.get("/sales/daily", async (req, res) => {
  try {
      let today = new Date();
      today.setHours(0, 0, 0, 0);

      let sales = await SalesModel.aggregate([
          { $match: { saleDate: { $gte: today } } }, 
          { $group: { 
              _id: null, 
              totalSales: { $sum: "$quantity" },  
              totalReturns: { $sum: "$returnedQuantity" }, 
              totalRevenue: { $sum: "$totalAmount" }  
          } }
      ]);

      let result = sales[0] || { totalSales: 0, totalReturns: 0, totalRevenue: 0 };
      result.netSales = result.totalSales - result.totalReturns; // 📉 Net Sales after return

      res.json(result);
  } catch (error) {
      console.error("Error fetching daily sales:", error);
      res.status(500).json({ error: "Failed to fetch sales" });
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


// app.get("/products/shop/:shopname", async (req, res) => {
//   try {
//       const { shopname } = req.params;
//       const products = await productsmodel.find({ shopname }); // 🔥 Backend pe filter
//       res.json(products);
//   } catch (error) {
//       res.status(500).json({ error: "Failed to fetch products" });
//   }
// });
// app.listen(port,'0.0.0.0',()=>{
//     console.log(`server running on port: ${port}`)
// })

// ✅ Start Server


app.post("/return", async (req, res) => {
  try {
    let { reason,subreason,selectedOption,orderdata } = req.body;
    
    // ✅ Correct validation
    if (!reason || !subreason|| !selectedOption||  !orderdata) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    // ✅ Converting frontend data into proper format
    const returnData = orderdata.map(e => ({
      orderid: e._id,  // `_id` ko `orderId` me convert kiya
      reason: reason,
      subreason: subreason,
      selectedOption:selectedOption
      
    }));
 
    // ✅ Saving data in database
    let savedReturns = await returnmodel.create(returnData);
 console.log("savreretun",savedReturns)

//  await orderr.findByIdAndDelete({_id:orderdata[0]._id})
    return res.status(201).json({ message: "Return request submitted!", data: savedReturns });
  } catch (error) {
    console.error("Error in return request:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});



cron.schedule("*/5 * * * *", async () => {
  console.log("🔄 Checking for orders eligible for cashback...");

  try {
    // Find all returned orders with 'wallet' option but cashback not processed
    const returns = await returnmodel.find({ selectedOption: "Wallet" });

    for (const ret of returns) {
      const order = await orderr.findOne({ _id: ret.orderid, status: "returned" });

      if (order) {
        // ✅ Sum totalAmount from all products
        const totalAmount = order.products?.reduce((sum, product) => sum + (product.totalAmount || 0), 0);

        if (totalAmount <= 0) {
          console.error(`❌ Order ID: ${order._id} has invalid totalAmount:`, totalAmount);
          continue; // Skip this order if totalAmount is invalid
        }

        console.log(`✅ Processing cashback of ₹${totalAmount} for Order ID: ${order._id}`);

        await addcashbacktowallet(order.userId, totalAmount);

        // ✅ Update order status to prevent duplicate cashback
        order.status = "cashback-processed";
        await order.save();
      }
    }
  } catch (error) {
    console.error("❌ Error in cashback cron job:", error);
  }
});





// GET /return endpoint
// app.get("/return", async (req, res) => {
//   try {
//     // Fetch all return records from the Return collection
//     const returns = await returnmodel.find();
//     if (!returns || returns.length === 0) {
//       return res.status(404).json({ message: "No return records found." });
//     }

//     // Array to collect orders that get updated
//     const updatedOrders = [];

//     // Process each return record
//     for (const ret of returns) {
//       // Find the order in Order collection where _id matches ret.orderid and status is 'delivered'
//       const order = await orderr.findOne({ _id: ret.orderid, status: "delivered" });
//       console.log("ordd",typeof(order))
//       if (order) {
//         // Update the order with return details from the return document
//         order.reason = ret.reason;
//         order.subreason = ret.subreason;
//         order.selectedOption = ret.selectedOption;
//         order.returnDate = ret.returnDate; // Assuming this is already a Date or ISO string
//         order.status="pending-returned"
//         // Save the updated order document
//         await order.save();
//         updatedOrders.push(order);
//       }
//     }

//     res.status(200).json({
//       message: "Orders updated with return details.",
//       updatedOrders,
//     });
//   } catch (error) {
//     console.error("Error updating orders with return details:", error);
//     res.status(500).json({ message: "Server error.", error: error.message });
//   }
// });
app.get("/return", async (req, res) => {
  try {
    // Fetch all return records from the Return collection
    const returns = await returnmodel.find();

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
        order.returnDate = ret.returnDate; // Assuming Date or ISO string
        order.status = "pending-returned";

        // Save updated order
        await order.save();
      }
    }

    // 🔹 Return all orders again after update
    const updatedOrders = await orderr.find({ status: "pending-returned" });

    res.status(200).json({
      message: "Orders updated with return details.",
      updatedOrders,
    });
  } catch (error) {
    console.error("Error updating orders with return details:", error);
    res.status(500).json({ message: "Server error.", error: error.message });
  }
});




// app.listen(port, "0.0.0.0", () => {
//   console.log(`🚀 Server running on port: ${port}`);
// });
(async () => {
  await connectDB();  // ✅ पहले DB कनेक्ट करो, फिर सर्वर स्टार्ट करो
  app.listen(port, () => console.log(`🚀 Server running on port: ${port}`));
})();

