let mongoose=require("mongoose")
console.log("MongoDB URI:", process.env.MONGO_URI);
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("connect successfully")
 })
 .catch((e)=>{
    console.log(`error agyi: ${e}`)
 })