const express = require("express");
const app = express()
const cors = require("cors");

app.use(cors())

app.use(express.json())

app.post("/interest", function(req, res) {
    // Destructure the request body to get form values
   
    var { principle, rate, time } = req.body;
    principle = parseInt(principle);
    rate = parseInt(rate);
    time = parseInt(time);

    console.log({ principle, rate, time })

    let interest = (principle * rate * time) / 100;
    let total = interest + principle;

    res.send({
        total: total,
        interest: interest
    });
});




app.listen(3000, function()
{
    console.log("app is running at port 3000")
})