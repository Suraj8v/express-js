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

app.listen(port, () => {
  console.log("Server is runnning on port : " + port);
});
