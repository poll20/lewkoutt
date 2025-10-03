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
  rating: { type: Number, required: true, min: 1, max: 5},
  review: { type: String }, // Optional review
  image: [String], // ✅ Array of Cloudinary URLs
  userName: { type:String},
  
}, { timestamps: true });


let cartscema=mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    // itemid: String,
    itemid:{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
    productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
    color:String,
    title: String,
    description: String,
    image: [String],
    price:Number,
    shopname:String,
    size:[String],
    discountprice:Number,
    discount:Number,
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
    discountprice:Number,
    color:String,
    bundle:[{
       productId:{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
      title:{type:String},
      image:{type:String},
      color:{type:String},
      original:{type:Number},
      price:{type:Number},
      sizes:{type:String},
      bundletotalamount:{type:Number}
      

    }]
    
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
  uname: { type: String, required: true },

  building: { type: String, required: true },
  locality: { type: String, required: true },
  address:{type:String},
  phone:[String],
  city: { type: String, required:true},
  state: { type: String, required:true},
  saveas:{type:String},
  isDefault: { type: Boolean, default: false },
});

const otpSchema = new mongoose.Schema({
  phone: { type: String, required: true, unique: true }, // Phone must be unique
  otp: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, expires: 300 }, // OTP expires in 5 mins
});

// Random 5-character alphanumeric code generator function
const generateRandomCode = () => Math.random().toString(36).substring(2, 7).toUpperCase();

let users =mongoose.Schema({
    // name: String,
    // email: String,
    // uid: { type: String, required: true },
    name:{type:String},
    email:{type:String},
    dob:{type:Date},
    phonenumber:{type:String},
    code: { type: String, default: generateRandomCode }, // 🔥 New random code field,
    refercode:{type: String},
    // uid: { type: String, required: true, unique: true },
    uid: { type: String, unique: true },

    ordernum:{
      type:Number
    },
    codecount:{type:Number,default:0},
    codepoint:{type:Number,default:0},
    address:[addressSchema],    
    lat: Number,  // User latitude
    long: Number , // User longitude
    phone:[{ type: String}],
    shopid:String,
    shopaddress:{type:String,default:""}, 
    shopname:{type:String,default:""},
    role: { type: String, enum: ["admin", "shopkeeper", "user"], default: "user" }, // 🔥 Role field added,
    wallet: {
      cashback:{type:Number,default:0},  // 🔥 ₹50 Cashback Available
      points:{type:Number,default:0}      // 🔥 200 Points Available
    },
    moodcodes:{
      moodetype:{type:String},
       moodcode:{type:String},
       addedon:{type:Date,default: Date.now},
       renew:{type:Number}
      

    },
    created_at: Date
})

// let orders=mongoose.Schema({
//   name:String,
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//   email:String,
//   address:[String], 
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
//       tag:String,
//       discription:String,
//       image:[String],
//       quantity:Number,
//       price:Number,
//       discountprice:Number,
//       size:String,
//       shopname:String,
//       totalAmount:Number,
      
//     },
    
//   ],
 
//   status: { type: String, default: "Pending" }, // Pending, Shipped, Delivered, Return
//   orderedAt: { type: Date, default: Date.now },
//   deliveredAt: { type: Date, default: Date.now },
//   reason: {
//     type: String,
//   },
//   subreason: {
//     type: String,
//   },
//   selectedOption: {
//     type: String,
//   },
//   returnDate: {
//     type: Date,
//   },
// },{ timestamps: true })

// const orders = mongoose.Schema({
//   name: String,
//   userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
//   email: String,
//   address: [addressSchema],
//   products: [
//     {
//       productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
//       tag: String,
//       discription: String,
//       image: [String],
//       quantity: Number,
//       price: Number,
//       discountprice: Number,
//       size: String,
//       shopname: String,
//       totalAmount: Number,

//        bundle:[{
//        productId:{ type: mongoose.Schema.Types.ObjectId, ref: "product" },
//       title:{type:String},
//       image:{type:String},
//       color:{type:String},
//       original:{type:Number},
//       price:{type:Number},
//       sizes:{type:String},
//       bundletotalamount:{type:Number}
      

//     }]
    
//     }
//   ],
//   deliverydistance:{type:String},
//   status: { type: String, default: "Pending" },
//     merchantOrderId: { type: String, required: true, unique: true },
//   orderedAt: { type: Date, default: Date.now },
//   deliveredAt: { type: Date, default: Date.now },
//   reason: String,
//   subreason: String,
//   selectedOption: String,
//   imageofreturn:{type:[String]},
//   returnDate: Date,
// }, { timestamps: true });

const orderSchema = new mongoose.Schema({
  name: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true },
  email: String,
  address: {
    pincode: String,
    uname: String,
    building: String,
    locality: String,
    address: String,
    phone: String,
    city: String,
    state: String,
  },

  // 👇 each product is a separate document now
  productId: { type: mongoose.Schema.Types.ObjectId, ref: "product", required: true },
  tag: String,
  description: String,
  image: [String],
  quantity: { type: Number, default: 1 },
  price: Number,
  discountprice: Number,
  size: String,
  shopname: String,
  totalAmount: Number,

  // bundle info (optional)
  bundle: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "product" },
      title: String,
      image: String,
      color: String,
      original: Number,
      price: Number,
      sizes: String,
      bundletotalamount: Number,
    },
  ],

  deliverydistance: String,
  status: { type: String, default: "Pending" },

  // 👇 Same merchantOrderId for all products of same checkout
  merchantOrderId: { type: String, required: true, index: true }, // not unique

  orderedAt: { type: Date, default: Date.now },
  deliveredAt: Date,

  // return fields
  reason: String,
  subreason: String,
  selectedOption: String,
  imageofreturn: [String],
  returnStatus: { type: String, default: "not_requested" },
  returnDate: Date,
}, { timestamps: true });

const Order = mongoose.model("Order", orderSchema);


const PendingOrderSchema = new mongoose.Schema({
  merchantOrderId: { type: String, required: true, unique: true },
  order: { type: Array, required: true },       // products array
  address: { type: Array, required: true },     // user address
  userDetails: { type: Object, required: true },// user info (name, email, _id)
  distance: { type: String, default: "" },
  couponcode: { type: String, default: "" },
  createdAt: { type: Date, default: Date.now, expires: 3600 } // auto-delete after 1 hr
});


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
    rentalcloth:{type:String},
      rentalprice:{type:Number},
      availability: {
    type: [Date],
    default: function () {
      const today = new Date();
      const dates = [];

      const currentMonth = today.getMonth();
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const currentYear = today.getFullYear();
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      for (let d = 1; d <= daysInCurrentMonth; d++) {
        dates.push(new Date(currentYear, currentMonth, d));
      }

      const daysInNextMonth = new Date(nextMonthYear, nextMonth + 1, 0).getDate();
      for (let d = 1; d <= daysInNextMonth; d++) {
        dates.push(new Date(nextMonthYear, nextMonth, d));
      }

      return dates;
    }
  },

  bookings: [
    {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    }
  ],
    bundel:{type:String},
    bundelprice:{type:Number},
    title:{type:String},

    tag:{type:String},

    description:{type:String},

    cartcount:{type:Number},

    wishlistcount:{tye:Number},

    ordercount:{tye:Number},

returncount:{tye:Number},

 price: {
        type: Number,
       
      },
       discount: {
        type: Number,
        
      },
       discountprice: {
        type: Number,
        
      },
      avgRating:{
        type:Number,
        default:0
      },

      searchcount:{type:Number,default: 0 },
      ratingCount: { type: Number, default: 0 },
      viewd: {
  type: Number,
  default: 0
},
      
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
       discount: {
        type: Number,
        
      },
      coupons: {
    type: [String], // array of coupon category/type names like ['WELCOME10', 'SUMMER20']
    default: [],
  },
      avgRating:{
        type:Number,
        default:0
      },
      ratingCount: { type: Number, default: 0 },
      discountprice: {
        type: Number,
        
      },
      defaultColor:{
        type:String
      },
       searchcount:{type:Number,default: 0 },
      colors: [colorSchema],
      
     rentalcloth:{type:String},
      rentalprice:{type:Number},
    availability: {
    type: [Date],
    default: function () {
      const today = new Date();
      const dates = [];

      const currentMonth = today.getMonth();
      const nextMonth = currentMonth === 11 ? 0 : currentMonth + 1;
      const currentYear = today.getFullYear();
      const nextMonthYear = currentMonth === 11 ? currentYear + 1 : currentYear;

      const daysInCurrentMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
      for (let d = 1; d <= daysInCurrentMonth; d++) {
        dates.push(new Date(currentYear, currentMonth, d));
      }

      const daysInNextMonth = new Date(nextMonthYear, nextMonth + 1, 0).getDate();
      for (let d = 1; d <= daysInNextMonth; d++) {
        dates.push(new Date(nextMonthYear, nextMonth, d));
      }

      return dates;
    }
  },

  bookings: [
    {
      from: { type: Date, required: true },
      to: { type: Date, required: true },
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user' }
    }
  ],
  
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
      viewd: {
  type: Number,
  default: 0
}
    //   location: {  
    //     type: { type: String, enum: ["Point"], default: "Point" }, // GeoJSON Type
    //     coordinates: { type: [Number], required: true }  // [longitude, latitude]
    // }
  },{_id:true})
// ✅ Pre-save hook for discountprice
CategorySchema.pre("save", function (next) {
  if (this.price && this.discount) {
    this.discountprice = Math.round(
      this.price - (this.price * this.discount) / 100
    );
  } else {
    this.discountprice = this.price; // agar discount nahi hai to same price save hoga
  }
  next();
});


  // Define the main Product schema
const ProductSchema = new mongoose.Schema({
    category:String,
    image: String,
    productdetails:[CategorySchema]
  },{_id:true});  // Ensures timestamps are added to the main document

  // models/Product.js
ProductSchema.index({
  "productdetails.tag": "text",
  "productdetails.title": "text",
  "productdetails.description": "text",
  "productdetails.cate": "text"
});

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
    ref: "user", 
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
  imageofreturn:{type:[String]},
  addressofreturn:[addressSchema],
  returnDate:{ type: Date, default: Date.now }
})
// const mongoose = require("mongoose");

const couponSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountType: {
    type: String,
    enum: ["Percentage", "Fixed"],
    required: true,
  },
  discountValue: {
    type: Number,
    required: true,
  },
  minOrderAmount: {
    type: Number,
    default: 0,
  },
  usageLimit: {
    type: Number,
  },
  usageLimitPerUser: {
    type: Number,
  },
  startDate: {
    type: Date,
    required: true,
  },
  expiryDate: {
    type: Date,
    required: true,
  },
  categories: [{
    type: String,
  }],
  productNames: [{
    type: String
  }],
  couponType: {
    type: String,
    enum: ["General", "User-Specific", "Crampy Cutie", "First Order"],
    default: "General",
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  description: {
    type: String,
  },
  autoApply: {
    type: Boolean,
    default: false,
  },
  freeShipping: {
    type: Boolean,
    default: false,
  },
  userGender: {
    type: String, // Optional targeting
    enum: ["Male", "Female", "Other"],
  },
}, { timestamps: true });

// module.exports = mongoose.model("Coupon", couponSchema);


const couponUsageSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
    required: true,
  },
  couponCode: {
    type: String,
    required: true,
  },
  usageCount: {
    type: Number,
    default: 0,
  },
    usageLimit: { type: Number }, // global limit
  usageLimitPerUser: { type: Number }, // per-user limit
  totalUsed: { type: Number, default: 0 }, // ✅ global usage count
}, { timestamps: true });


const slotStatusSchema = new mongoose.Schema({
  label: { type: String, required: true, unique: true },
  disabled: { type: Boolean, default: false }
});

users.index({ phonenumber: 1 });
// users.index({ uid: 1 }, { unique: true });
users.index({ code: 1 });
ratingSchema.index({ userId: 1, productId: 1 }, { unique: true });
cartscema.index({ userId: 1 });
cartz.index({ userId: 1 });
orders.index({ userId: 1, orderedAt: -1 }); // for latest orders first
orders.index({ status: 1 });
salesSchema.index({ shopname: 1, saleDate: -1 });
salesSchema.index({ productId: 1 });
WalletTransactionSchema.index({ userId: 1, date: -1 });
returnscema.index({ orderid: 1 });
const moodMessageSchema = new mongoose.Schema({
  moodemoji: { type: String, required: true }, // e.g., "sleepy", "sad", etc.
  moodcolor: { type: String, required: true }, // e.g., "sleepy", "sad", etc.
  moodtype: { type: String, required: true }, // e.g., "sleepy", "sad", etc.
  moodcode:{type:String},
  timeperioud:{type:Number},
  msgwithoffer: { type: String, required: true },
  msgwithoutoffer: { type: String, required: true },
});

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
let moodmodel=mongoose.model("moodmessage",moodMessageSchema)
let cpn=mongoose.model("coupon",couponSchema)
let cpnusage=mongoose.model("couponusage",couponUsageSchema)
let slotmodel= mongoose.model('SlotStatus', slotStatusSchema);
const pendingOrderModel = mongoose.model("PendingOrder", PendingOrderSchema);

module.exports={wishmodel,addtocart,wear,userr,orderr,rentt,newarival,bestseling,productsmodel,otpmodel,Rating,SalesModel,wallettrans,returnmodel,moodmodel,cpn,cpnusage,slotmodel,pendingOrderModel}


