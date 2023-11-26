import dotenv from 'dotenv';
import express, { response } from "express";
import bodyParser from "body-parser";
import date from "date-and-time";
import axios from "axios";

const app = express();
const port = 3000;
const now = new Date();
dotenv.config();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

const api_key = process.env.API_KEY;
const latitude = 44.34;
const longitude = 10.99;
const apiUrl = 'https://api.openweathermap.org/data/2.5/weather';
const cordUrl = "http://api.openweathermap.org/geo/1.0/direct";
var city = "";

app.get("/", (req, res) => {

    const data = date.format(now, 'YYYY');

    
    res.render("index.ejs", {
        date: data
    });
})

app.post("/search", async (req, res) => {
    var passCity = req.body.city;
    city = passCity.charAt(0).toUpperCase() + passCity.slice(1).toLowerCase();  

    res.redirect("/result");
})

app.get("/result", async (req, res) => {
    var lat, lon;
    var data = {};

    await axios.get(cordUrl, {
        params: {
            q: city,
            limit: 1,
            appid: api_key,
        }
    })
    .then(response => {
        lat = response.data[0].lat;
        lon = response.data[0].lon;
    })
    .catch(error => {
        // Gestisci gli errori durante la richiesta
        console.error('Errore nella richiesta API:', error.message);
    });

    await axios.get(apiUrl, {
        params: {
            lat: lat,
            lon: lon,
            units: "metric",
            appid: api_key,
        }
    })
    .then(response => {
        data = {
            name: response.data.name,
            weather: response.data.weather,
            temp: response.data.main.temp,
            feel: response.data.main.feels_like,
            humidity: response.data.main.humidity
        }
    })
    .catch(error => {
        // Gestisci gli errori durante la richiesta
        console.error('Errore nella richiesta API:', error.message);
    });


    res.render("result.ejs", {
        data: data
    })
    
})

app.listen(port, () => {
    console.log("Server running on port " + 3000);
})