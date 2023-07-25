const fetch = require("node-fetch");
/**
 * POST API GEONAMES METHOD SERVER
 */

async function apiGeoNames(url, key, location) {
    try {

        const apiRequestURL = `${url}q=${location}&maxRows=10&username=${key}`;

        const response = await fetch(apiRequestURL);

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('error', error);
    }
}
/**
 * Weather API Method SERVER
 *
 */
async function apiWeather(url, key, lat, long, city) {
    try {
        const apiRequestURL = `${url}lat=${lat}&lon=${long}&city=${city}&key=${key}`;

        const response = await fetch(apiRequestURL);

        const data = await response.json();

        return data;
    } catch (error) {
        console.log('error', error);
    }
}

/**
 * API Pixabay 
 *
 */

async function apiPixabay(url, key, place) {

    try {

        const pixabayRequest = `${url}?key=${key}&q=${encodeURIComponent(place)}`

        const response = await fetch(pixabayRequest);
        const data = await response.json();

        return data;
    } catch (error) {
        console.log('error', error);
    }

}

module.exports = { apiGeoNames, apiWeather, apiPixabay }