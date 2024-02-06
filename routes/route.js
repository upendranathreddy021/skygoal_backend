let express=require('express')
let {reg,login,generateOtp}=require('../controlers/contr')

let route=new express.Router()
route.post("/register",reg)
route.post("/login",login)
route.post("/generate_otp/:email",generateOtp)


module.exports=route;
