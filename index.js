let express=require('express')
let mongoose=require('mongoose')
let app=express()
let cors=require('cors')
app.use(cors())
app.use(express.json())
let route=require('./routes/route')
mongoose.connect("mongodb://127.0.0.1:27017/regdetails").then(()=>{
    console.log("connected to database")
}).catch((err)=>console.log(err))
app.use("/",route)
app.listen(5000,()=>console.log("server started"))