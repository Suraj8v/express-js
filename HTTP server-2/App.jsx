const express = require("express");
const app = express();
const port = 3000;

app.use(express.json())


const user = [
    {
      name: "joe",
      kidneys: [
        {
          healthy: true,
        },
        {
          healthy: false,
        },
        {
          healthy: true,
        },
        {
          healthy: true,
        },
      ]}]
  
let joeKidneys = user[0].kidneys

app.get("/", function (req, res) {
 
  const numberOfKidneys = joeKidneys.length
  res.json({
    joeKidneys,
    numberOfKidneys});
});

function onlyHealthyKidney()
{
    return joeKidneys.filter((kidney) => {
        return kidney.healthy; 
    });
}

app.get("/healthy", function (req, res) {
   const healthyKidney = onlyHealthyKidney()
   console.log(healthyKidney)
    res.json(healthyKidney);
  });


app.post("/", function(req,res)
{
    const addKidney = req.body.addKidney
    joeKidneys.push({
        healthy : addKidney
    })
    res.json({
        msg : "done"
    })
})

app.get("/checkup", function(req,res){
    const username = req.headers.username;
    const password = req.headers.password;
    const kidneyId = req.query.kidneyId;
    if(username==="suraj" && password==="123")
        {
            if(kidneyId==1 || kidneyId==2)
            {
            res.status(200).json({msg : "your health is fine"})
        }}
        res.status(400).json({msg : "wrong input"})
    }
    )

app.listen(port, () => {
  console.log("Server is runnning on port : " + port);
});
