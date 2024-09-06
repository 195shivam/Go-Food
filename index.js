const express=require('express')
require('./db/config')
const User=require('./db/User')
const app=express()
const cors=require('cors')

app.use(express.json())
app.use(cors())

app.post('/signup',async(req,res)=>{
    const user=new User(req.body)
    const result=await user.save()
    res.send(result)
})

app.post('/login',async(req,res)=>{
    if(req.body.password && req.body.email){
        const result=await User.findOne(req.body).select('-password')
        result?res.send(result):res.send("Enter Correct Details")
    }
    else{
        res.send("Enter Correct details")
    }
    
})

app.listen(4000)