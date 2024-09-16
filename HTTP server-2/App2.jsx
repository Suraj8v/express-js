const express = require('express')
const app = express()
const zod = require("zod")

const schema = zod.number()

app.use(express.json())

function userMiddleware(req,res,next)
{
    if(req.headers.username==="suraj" && req.headers.password === "123")
    {
        next();
    } else{
        res.status(403).json({ msg : "Invaid input!"})
    }
}


function kidneyMiddleWare (req, res, next)
{
    const response = schema.safeParse(req.query.kidneyId)
    if(req.query.kidneyId==1 || req.query.kidneyId==2)
    {
        next()
    } else{
        res.status(403).json({ msg : "invalid input!"})
    }
}

app.get("/kidney-checkup",userMiddleware,kidneyMiddleWare,function(req,res)
{
    res.json({msg : "Your kidney is healthy!"})
})

app.listen(3000, ()=>{
    console.log("your app is running at port 3000")
})

