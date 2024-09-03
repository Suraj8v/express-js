const express = require("express")
const port = 4000
const app = express()

function square(n)
{
    return n*n
}

app.get('/',(req,res)=>
{
    const n = req.query.n;
    res.send("The square of "+n+ " is : " +square(n).toString());
})

app.listen(port, ()=>
{
    console.log("app is running at port "+port)
})