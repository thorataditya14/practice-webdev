const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/index.html")
});


app.post("/", function (req, res) {
    const cityName = req.body.cityName;
    const apiKey = "38f74c3046413d1188d9207708d0453f";
    const unit = "metric";
    const url = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=" + unit + "&appid=" + apiKey;

    https.get(url, function (response) {
        console.log(response.statusCode);

        response.on("data", function (data) {
            const weatherData = JSON.parse(data);
            const temp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const icon = weatherData.weather[0].icon;

            const iconURL = "http://openweathermap.org/img/wn/" + icon + "@2x.png"
            res.write("<p>The weather is currently " + weatherDescription + "</p>");
            res.write("<h1>The current temperature in " + cityName + " is " + temp + " degree Celcius.</h1>");
            res.write("<img src =" + iconURL + ">");
            res.send();
        });
    });
});


app.listen(3000, function () {
    console.log("Server is running on port 3000");
});