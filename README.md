# Travel App Project

## Description

This project requires you to build out a travel app that, at a minimum, obtains a desired trip location & date from the user, and displays weather and an image of the location using information obtained from external APIs. Given that this is the Capstone project, it's highly encouraged for you to go above and beyond, adding additional functionality and customization to truly stand out with a project you are proud to have at the top of your portfolio!

## Prerequisite

This project runs on a local server. It uses Node. If you don't have Node already installed on your machine, you can download it [**here**](https://nodejs.org/en/download/).

Create an account at http://www.geonames.org/export/web-services.html, https://www.weatherbit.io/ and https://pixabay.com/ and retrieve your personal api keys. Store these api keys into the newly renamed .env respectively as APIGeoName_URL, APIGeoName_KEY, APIWeather_URL, APIWeather_KEY, APIPixabay_URL and APIPixabay_KEY

## Installation

If Node is installed, then you can use the Node Package Manager to install the packages needed to run this program. In the terminal, use this command:

```
npm install
```

When those packages have installed, make builds and start the server with the following commands (note that the build-dev runs webpack-dev-server):

```
npm run build-dev
npm run build-prod
npm run start
```
