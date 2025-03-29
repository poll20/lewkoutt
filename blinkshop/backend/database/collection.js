let mongoose=require("mongoose")
let Scema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{ 
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        unique:true
    },
    confirmPassword:{
        type:String,
        required:true
    }
},{timestamps:true})


const ratingSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  rating: { type: Number, required: true, min: 1, max: 5 },
  review: { type: String }, // Optional review
}, { timestamps: true });


let cartscema=mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // itemid: String,
    itemid:{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    title: String,
    description: String,
    image: [String],
    price:Number,
    shopname:String,
    size:[String],
    discountprice:Number
   // price: String,
})

let cartz=mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    productid:String,
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    title: String,
    description: String,
    image:[String],
    qty:Number,
    size:String,
    price:Number,
    shopname:String,
    discountprice:Number
    
   // price: String,
})
let categories=mongoose.Schema({
    category:String,
    tag:String,
    image:String,
    title:String,
    price:Number,
    shop:String,
    color:String
})

const addressSchema = new mongoose.Schema({
  pincode: { type: String, required: true },
  building: { type: String, required: true },
  locality: { type: String, required: true },
  phone:[String],
  city: { type: String, default: "Jaipur" },
  state: { type: String, default: "Rajasthan" },
  isDefault: { type: Boolean, default: false },
});

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true }, // Phone must be unique
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 mins
});

// Random 5-character alphanumeric code generator function
const generateRandomCode = () => Math.random().toString(36).substring(2, 7).toUpperCase();

let users=mongoose.Schema({
    name: String,
    email: String,
    code: { type: String, default: generateRandomCode }, // 🔥 New random code field,
    address:[addressSchema],  
    lat: Number,  // User latitude
    long: Number , // User longitude
    phone:[{ type: String,sparse: true }],
    shopid:String,
    shopaddress:{type:String,default:""}, 
    shopname:{type:String,default:""},
    role: { type: String, enum: ["admin", "shopkeeper", "user"], default: "user" }, // 🔥 Role field added,
    wallet: {
      cashback:{type:Number,default:0},  // 🔥 ₹50 Cashback Available
      points:{type:Number,default:0}      // 🔥 200 Points Available
    },
    created_at: Date
})

let orders=mongoose.Schema({
  name:String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
  email:String,
  address:[String],
  phone:String,
  products: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      tag:String,
      discription:String,
      image:[String],
      quantity:Number,
      price:Number,
      discountprice:Number,
      size:String,
      shopname:String,
      totalAmount:Number,
    },
  ],
 
  status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered, Return
  orderedAt: { type: Date, default: Date.now },
  deliveredAt: { type: Date, default: Date.now },
  reason: {
    type: String,
  },
  subreason: {
    type: String,
  },
  selectedOption: {
    type: String,
  },
  returnDate: {
    type: Date,
  },
},{ timestamps: true })

let rent=mongoose.Schema({
    category:String,
    image:String,
    tag:String,
    title:String,
    rent:Number,
    type:String
})

let newarrival=mongoose.Schema(
  {
    ProductId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      unique: true  // This ensures that the same ProductId is not stored multiple times
    },
    created_at: {
      type: Date,
      default: Date.now,
      expires: '20d'  // Document will be removed automatically 20 days after creation
    }
  },
  { timestamps: true }
)

let bestselling=mongoose.Schema({
    ProductId:String,
    addedDate:Date,
    priority:Number
})


const sizeSchema = new mongoose.Schema({
    size: {
        type: String,
        
    },
    quantity: {
        type: Number,
        
    },
    image:{
     type:[String]
    }
},{_id:true});

const colorSchema = new mongoose.Schema({
    color: {
        type: String,
    },
    title:{type:String},
    tag:{type:String},
    description:{type:String},  
    sizes: [sizeSchema]
},{_id:true});
const CategorySchema = new mongoose.Schema({
    tag: {
        type: String,
       
      },
      title: {
        type: String,
        
      },
      cate:{
        type:String,

      },
      description: {
        type: String,
        
      },
      image:{
       type:[String]
      },
      price: {
        type: Number,
       
      },
      discountprice: {
        type: Number,
        
      },
      defaultColor:{
        type:String
      },
      colors: [colorSchema],
     
      occasion: {
        type: String,
        
      },
      neckline: {
        type: String,
       
      },
      material: {
        type: String,
        
      },
      printtype: {
        type: String,
        
      },
      styletype: {
        type: String,
        
      },
      shopname:{
        type:String
      },
      shopaddress:{
        type:String
      },
      discount: {
        type: String,
        
      }
    //   location: {  
    //     type: { type: String, enum: ["Point"], default: "Point" }, // GeoJSON Type
    //     coordinates: { type: [Number], required: true }  // [longitude, latitude]
    // }
  },{_id:true})



  // Define the main Product schema
const ProductSchema = new mongoose.Schema({
    category:String,
    image: String,
    productdetails:[CategorySchema]
  },{_id:true});  // Ensures timestamps are added to the main document


// 2dsphere Index for Location-Based Querying
// CategorySchema.index({ location: "2dsphere" });


  const salesSchema = new mongoose.Schema({
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true }, 
    shopname: { type: String, required: true },  
    quantity: { type: Number, required: true },  
    totalAmount: { type: Number, required: true },  
    saleDate: { type: Date, default: Date.now },  
    isReturned: { type: Boolean, default: false }, // 🛑 Kya return hua?
    returnedQuantity: { type: Number, default: 0 }, // 🔁 Kitna quantity return hua?
    returnDate: { type: Date }  // ⏳ Return hone ka date
});

const WalletTransactionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: "User", 
    required: true 
  }, // 🔥 User reference

  type: { 
    type: String, 
    enum: ["points", "cashback"], 
    required: true 
  }, // 🔥 "points" ya "cashback" hi allow hoga

  amount: { 
    type: Number, 
    required: true 
  }, // 🔥 Points ya Cashback ka amount

  valueInRupees: { 
    type: Number, 
    required: true 
  }, // 🔥 ₹0.25 per point ke hisaab se calculate hoga

  description: { 
    type: String, 
    required: true 
  }, // 🔥 Transaction ka detail

  date: { 
    type: Date, 
    default: Date.now 
  } // 🔥 Default current date
});

let returnscema=mongoose.Schema({
  orderid:{type: mongoose.Schema.Types.ObjectId, ref: "order", required: true},
  reason:String,
  subreason:String,
  selectedOption:String,  
  returnDate:{ type: Date, default: Date.now }
})

let wishmodel=new mongoose.model("cart",cartscema)

let addtocart=mongoose.model("addtocart",cartz)

let wear=mongoose.model("wears",categories)

let userr=mongoose.model("user",users)
let orderr=mongoose.model("order",orders)
let newarival=mongoose.model("newarrival",newarrival)
let bestseling=mongoose.model("bestselling",bestselling)
let productsmodel=mongoose.model("product",ProductSchema)
let otpmodel=mongoose.model("otp",otpSchema)
const Rating = mongoose.model("rating", ratingSchema);
let rentt=mongoose.model("rent",rent)
let wallettrans=mongoose.model("wallettransection",WalletTransactionSchema)
const SalesModel = mongoose.model("Sales", salesSchema);
const returnmodel = mongoose.model("return",returnscema);
module.exports={wishmodel,addtocart,wear,userr,orderr,rentt,newarival,bestseling,productsmodel,otpmodel,Rating,SalesModel,wallettrans,returnmodel}


