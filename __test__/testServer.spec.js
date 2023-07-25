// 1.1) supertest: used for jest testing units
const request = require('supertest');

// 1.2) node-fetch: used to simulate fetches
const fetch = require('node-fetch');
jest.mock('node-fetch');

// 1.3) Import of the express server instance
const serverModule = require('../src/server/index.js');
const app = serverModule.app;
const server = serverModule.server;


describe('Express server', () => {

    // ----------------------------------------
    // 1.0) Close server after all tests are done
    // ----------------------------------------
    afterAll(() => {
        server.close();
    });

    // ----------------------------------------
    // 1.1) Test '/geoNames' route: returns data from the GeoNames API
    // ----------------------------------------
    test('/geoname route should return data from the GeoNames API', async () => {

        const destination = 'New York';
        const expectedResponse = {
            lat: '40.7128',
            lng: '-74.0060',
            city: 'New York',
            country: 'United States'
        };

        // Mock the fetch function to return the expected response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                geonames: [
                    {
                        lat: '40.7128',
                        lng: '-74.0060',
                        name: 'New York',
                        countryName: 'United States'
                    }
                ]
            })
        });

        // Make the request to the /geoNames route
        const response = await request(app).get('/geoname').query({ destination });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });

    // ----------------------------------------
    // 1.2) Test '/weather' route: returns data from the Weatherbit API
    // ----------------------------------------
    test('/weather route should return data from the Weatherbit API', async () => {

        const lat = '40.7128';
        const lng = '-74.0060';
        const departure = '0';

        const expectedResponse = {
            max_temp: '23.9',
            min_temp: '21.2',
            weather_description: 'Overcast clouds'
        };

        // Mock the fetch function to return the expected response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                data: [
                    {
                        max_temp: '23.9',
                        min_temp: '21.2',
                        weather: {
                            description: 'Overcast clouds'
                        }
                    }
                ]
            })
        });

        // Make the request to the /weather route
        const response = await request(app).get('/weather').query({ lat, lng, departure });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });

    // ----------------------------------------
    // 1.3) Test '/pixabay' route: returns data from the Pixabay API
    // ----------------------------------------
    test('/pixabay route should return data from the Pixabay API', async () => {

        const city = 'New York';
        const expectedResponse = {
            destination: city,
            imageURL: 'https://pixabay.com/get/g94212b2f605ecd8a6ca3e1fe2fb85ad68daeffbc8c285fe0da4296afba6bb027fb9fd3ad815049bc7223b3f8d683e26af813bb0196a67abc321f99db7747ff1c_1280.jpg'
        };

        // Mock the fetch function to return the expected response
        fetch.mockResolvedValueOnce({
            json: jest.fn().mockResolvedValueOnce({
                hits: [
                    {
                        destination: 'New York',
                        fullHDURL: 'https://pixabay.com/get/g94212b2f605ecd8a6ca3e1fe2fb85ad68daeffbc8c285fe0da4296afba6bb027fb9fd3ad815049bc7223b3f8d683e26af813bb0196a67abc321f99db7747ff1c_1280.jpg'
                    }
                ]
            })
        });

        // Make the request to the /weather route
        const response = await request(app).get('/pixabay').query({ city });

        expect(response.status).toBe(200);
        expect(response.body).toEqual(expectedResponse);
    });
});