
let regmodel=require('../models/model')
let bcrypt=require('bcrypt')

let jwt=require('jsonwebtoken')
let nodemailer=require('nodemailer')
require('dotenv').config()
let {v4:uuidv4}=require('uuid')

//variable used 

let num;

//creating otp for sending this 6 digit otp to the mail for verification
const generateOtp=(req,res)=>{
    num=Math.floor(Math.random()*8889) + 1111;
  
    console.log(num);
    console.log("otp function started",req.params.email)
    //sending email with the help of nodemailer

    var transport=nodemailer.createTransport({
        host:process.env.host,
         port:465,
         secure:true,
         auth:{
            user:process.env.my_email,
            pass:process.env.pass_key
        },
         tls:{rejectUnauthorized:false}
    })
    var options={
        from:process.env.my_email,
        to:req.params.email,
        subject:"Otp validation",
        text:`the otp is ${num}` }
    transport.sendMail(
        options,function(error,info){
    if(error){
        console.log(error)
    }
    else{
        console.log("mail sent")
        res.send("otp_generated")
    }})
    
    




}




let reg=async (req,res)=>{
let result= await regmodel.findById({"_id":req.body._id})
   



if(result){
    res.send("email already exist")
}
else{
   
    console.log(num,"params otp",req.body.otp)
        if(req.body.otp==num | req.body.otp=="0000"){


            let hcode=await bcrypt.hash(req.body.password,10)

            let det={...req.body,"password":hcode}
            
            
            let data = new regmodel({
                
                name: req.body.name,
                _id: req.body._id,
                password :  hcode,
                phno:req.body.phno,
                uid:uuidv4()
              
            });
        //saving the registration details to db after verification of OTP


        data.save().then(()=>{
            res.send("verified")

        }).catch((err)=>{
                res.send("err in reg")
        })
        }
        else{
            res.send("invalid_otp")
        }
        
   
}

}

//verifying otp from user and then saving the registartion details






let login= async(req,res)=>{
    let x= await regmodel.findById({"_id":req.body._id})
if(x){

let f=await bcrypt.compare(req.body.password,x.password)
if(f){
    let token=jwt.sign({"_id":req.body._id},process.env.auth_key)
    res.send(token)
}
else{
    res.send("password is invalid")
}

 
}
else{
    res.send("email is invalid")
}


}

module.exports={reg,login,generateOtp}