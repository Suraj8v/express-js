const express = require("express")
const jwt = require("jsonwebtoken")
const mongoose = require("mongoose")
const app = express()
app.use(express.json())
const jwtPassword = "123"

mongoose.connect("mongodb+srv://suraj:suraj123@cluster0.roipnq8.mongodb.net/users_app?retryWrites=true&w=majority&appName=Cluster0")

const user = mongoose.model('users',{username: String, password:String})

const users = [
    {
        username : "suraj",
        password : "123"
    },
    {
        username : "rohit",
        password : "112233"
    },
    {
        username : "virat",
        password : "2233"
    }
]

function userExists(username, password)
{
    let isPresent = users.some(user=>user.username===username && user.password===password)
    console.log(isPresent)
    return isPresent;
}

app.post("/signin",function(req,res)
{
    const uname = req.headers.username;
    const pass = req.headers.password;
    if(!userExists(uname,pass))
    {
        res.status(403).json({msg : "user doesn't exists  "})    
    }
    let token = jwt.sign({username : uname }, jwtPassword);

    return res.json({
        token
    })
})

app.post("/signup",async function(req,res){
    const username = req.body.username;
    const password = req.body.password;

    const existingUser = await user.findOne({username : username})
    if(existingUser)
    {
        res.status(400).send("username already exists")
    }
    const newUser = new user({
        username : username,
        password : password
    })

    newUser.save();
   return res.json({msg:"user signed up successfully!"})
})

app.get("/users", function(req,res)
{
    const token = req.headers.authorization;
    let allUsers = [];

    try{
         const decode = jwt.verify(token,jwtPassword);
         const username = decode.username;
         for(let i=0; i<users.length; i++)
         {
            if(username!==users[i].username)
            {
                allUsers.push(users[i].username)
            }
         }
        return res.json({allUsers})

    } catch(error)
    {
        console.log(error)
        return res.status(403).json({msg : "invalid token"})
    }

})

app.listen(3000,()=>{
    console.log("app is running at port 3000")
})

