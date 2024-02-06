let mongoose=require('mongoose')
let detsch=new mongoose.Schema({
    "_id":String,"password":String,"phno":Number,"name":String,"uid":String
})
module.exports=mongoose.model("reg",detsch);
