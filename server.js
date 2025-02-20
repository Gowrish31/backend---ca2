const express = require("express")
const app = express()
app.use(express.json())

const userData = []

app.post("/add-user",(req,res)=>{
    const {email,password} = req.body
    if(!(email.includes(".")**email.includes("@"))){
        return res.send("invalid email address")
    }
    if((password.length<8)){
        return res.send("minimun 8 characters required")
    }
    userData.push({
        email:email,
        password:password,
    })
    return res.status(200).json({message:"user added",data:userData})
})

app.put("/update-user",(req,res)=>{
    const {email,newpassword} = req.body
    if(newpassword.length<8){
        return res.send("minimun 8 characters required")
    }
    const user = userData.find(user=>user.email===email)
    if(user){
        user.password = newpassword
        return res.status(200).json({message:"password updated",data:userData})
        
    }
    return res.status(404).json({message:"user not found"})
})
app.delete("/delete-user",(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({message:"invalid email"})
    }
    const index = userData.findIndex(user=>user.email===email)
    if(index===-1){
        return res.status(404).json({message:"invalid index"})
    }
    userData.splice(index,1)
    return res.status(200).json({message:"user deleted",data:userData})
    
})

app.get("/users",(req,res)=>{
    const {email} = req.body
    if(!email){
        return res.status(400).json({message:"invalid email"})
    }
    const user = userData.find(user=>user.email === email)
    if(!user){
        return res.status(400).json({message:"not found user"})
    }
    res.send(user)
    console.log(userdata)

})


app.listen("8000",(req,res)=>{
    console.log("server is running on port: http://localhost:8000")

})

