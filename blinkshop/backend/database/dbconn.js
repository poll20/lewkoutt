let mongoose=require("mongoose")
console.log("MongoDB URI:", process.env.MONGO_URI);
mongoose.set('bufferCommands', false); // To avoid command buffering
mongoose.set('serverSelectionTimeoutMS', 30000); // Increase timeout to 30s
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("connect successfully")
 })
 .catch((e)=>{
    console.log(`error agyi: ${e}`)
 })