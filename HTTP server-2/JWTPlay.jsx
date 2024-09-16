const express = require("express")
const jwt = require("jsonwebtoken")
const app = express()
app.use(express.json())
const jwtPassword = "123"

const users = [
    {
        username : "suraj",
        password : "123"
    },
    {
        username : "rohit",
        password : "112233"
    }
]

function userExists(username, password)
{
    let isPresent = users.some(user=>user.username===username && user.password===password)
    console.log(isPresent)
    return isPresent;
}

app.post("/1",function(req,res)
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

app.listen(3000,()=>{
    console.log("app is running at port 3000")
})

