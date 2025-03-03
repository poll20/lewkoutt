let mongoose=require("mongoose")
 mongoose.connect("mongodb+srv://sharmaabhay1549:dtWREboypg89DhGC@clusterlewkout.btwa3.mongodb.net/",{dbName:"lewkout"})
 .then(()=>{
    console.log("connect successfully")
 })
 .catch((e)=>{
    console.log(`error: ${e}`)
 })