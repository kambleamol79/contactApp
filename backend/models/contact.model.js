var mongoose=require("mongoose");

mongoose.connect("mongodb://localhost:27017/contact",{useNewUrlParser:true,useUnifiedTopology:true});
var con =mongoose.connection;

var contactSchema=new mongoose.Schema({
    name:String,
    email:String,
    phone:Number,
    jobtitle:String,
    company:String
});

var contactModel=mongoose.model("Contact",contactSchema);
module.exports=contactModel;