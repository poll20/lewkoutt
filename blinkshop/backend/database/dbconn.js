let mongoose=require("mongoose")
console.log("MongoDB URI:", process.env.MONGO_URI, {});
mongoose.set('bufferCommands', false); // To avoid command buffering
 mongoose.connect(process.env.MONGO_URI,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 50000,  // ✅ सही जगह
   socketTimeoutMS: 45000
 })
 .then(()=>{
    console.log("connect successfully")
 })
 .catch((e)=>{
    console.log(`error agyi: ${e}`)
 })