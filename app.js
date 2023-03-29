const express =require("express");
const https= require("https");
const app= express();
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req,res)
{
res.sendFile(__dirname+"/index.html");

});


app.post("/", function(req,res)
{

 

    const apiKey="c84a2d80ef36c4d3db763983737c8bd5";
  const city= req.body.cityname;
  const units= "metric";


const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&appid="+apiKey+"&units="+units;

  //const url = "https://api.openweathermap.org/data/2.5/weather?q=Hyderabad&appid=&units=metric";
    https.get(url,function(response)
    {
        console.log(response.statusCode);
        response.on("data",function(data)
        {
           const weatherData= JSON.parse(data);
           const temp= weatherData.main.temp;
           const icon = weatherData.weather[0].icon;
 
           res.write("<h1>The temperature in "+ city +" is : "+temp+"</h1>");
           res.write("The conditions are:"+"<p>"+weatherData.weather[0].description+"</p>")
           const imgUrl =" https://openweathermap.org/img/wn/"+icon+"@2x.png" ;
           res.write("<img src="+imgUrl+">");
        
           res.send();
        });
    });


});


app.listen("3000",function()
{
 console.log("Server is running on port 3000.");
});





