let mongoose=require("mongoose")
console.log("MongoDB URI:", process.env.MONGO_URI, {
   useNewUrlParser: true,
   useUnifiedTopology: true,
   serverSelectionTimeoutMS: 50000, // Server selection timeout बढ़ाया
   socketTimeoutMS: 45000, // Query execution का timeout बढ़ाया
 });
mongoose.set('bufferCommands', false); // To avoid command buffering
mongoose.set('serverSelectionTimeoutMS', 30000); // Increase timeout to 30s
 mongoose.connect(process.env.MONGO_URI)
 .then(()=>{
    console.log("connect successfully")
 })
 .catch((e)=>{
    console.log(`error agyi: ${e}`)
 })