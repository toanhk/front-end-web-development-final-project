const apiServices = require('./apiServices');
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static('dist'))

console.log(__dirname)

require('dotenv').config();

const {
    APIGeoName_URL,
    APIGeoName_KEY,
    APIWeather_URL,
    APIWeather_KEY,
    APIPixabay_URL,
    APIPixabay_KEY
} = process.env;


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

// designates what port the app will listen to for incoming requests
app.listen(8080, function () {
    console.log('Example app listening on port 8080!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})


/**
 * POST API GEONAMES METHOD SERVER
 */
app.post("/geoname", async (req, res) => {
    try {
        const data = await apiServices.apiGeoNames(APIGeoName_URL, APIGeoName_KEY, req.body.location);
        res.send(data);
    } catch (error) {
        console.log('error', error);
        res.status(500).send('Internal Server Error');
    }
});


/**
 * Weahter API Method SERVER
 *
 */

app.post("/weather", async function (req, res) {
    const lat = req.body.lat;
    const long = req.body.long;
    const city = req.body.city;

    try {
        const data = await apiServices.apiWeather(APIWeather_URL, APIWeather_KEY, lat, long, city);

        res.send(data);
    } catch (error) {
        console.log('error', error);
        res.status(500).send('Internal Server Error');
    }
});

/**
 * API Pixabay METHOD Server
 *
 */

app.post('/pixabay', async function (req, res) {

    try {
        const data = await apiServices.apiPixabay(APIPixabay_URL, APIPixabay_KEY, req.body.place);

        res.send(data);
    } catch (error) {
        console.log('error', error);
        res.status(500).send('Internal Server Error');
    }
})


module.exports = {
    server,
    app
};