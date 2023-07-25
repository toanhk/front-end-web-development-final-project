import { isDateInRange } from './dateChecker'

const locationEl = document.querySelector("#location");
const datePickEl = document.querySelector("#date");

const handleSubmit = (event) => {
    event.preventDefault();

    let imageCity = "";
    let imageCountry = "";
    const trips = [];
    if (datePickEl.value === "") {
        alert("Please Input date!!");
    } else {
        getNameAPI("http://localhost:8081/geoname", { location: locationEl.value }).then(
            (data) => {
                pixabayAPI("http://localhost:8081/pixabay", { place: data.city }).then(
                    (imageData) => {
                        imageCity = imageData;
                    }
                );

                pixabayAPI("http://localhost:8081/pixabay", {
                    place: data.country,
                }).then((imageData) => {
                    imageCountry = imageData;
                });
                weatherAPI("http://localhost:8081/weather", {
                    lat: data.lat,
                    long: data.long,
                    city: data.city,
                }).then((weather) => {

                    let content = '';
                    for (const d of weather.data) {
                        if (isDateInRange(datePickEl.value)) {
                            content += `<div class="col">
                            <h3>Country: ${data.country}</h3>
                            <div>City: ${data.city}</div>
                            <div>Date: ${d.datetime}</div >
                            <div>Temperature:  ${d.temp} degree</div >
                            <div>Weather:  ${d.weather.description} </div >
                            <div>
                                <figure>
                                    <img src="${imageCity}" alt="image of city" />
                                    <figcaption class="text-center">
                                    ${data.city}
                                    </figcaption>
                                </figure>
                                
                            </div>
                           
                        </div > `;

                            const trip = {
                                country: data.country,
                                city: data.city,
                                datetime: d.datetime,
                                temp: d.temp,
                                description: d.weather.description,
                                imageLink: imageCity
                            };

                            trips.push(trip);
                        }
                    }

                    document.querySelector("#table").innerHTML = content;
                    localStorage.setItem("trips", JSON.stringify(trips));
                });
            }
        );
    }

};


// CALL to GEONAMES API METHOD TO SERVER

const getNameAPI = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const dataJson = await response.json();
        // console.log(dataJson);
        const newdata = {
            lat: dataJson.geonames[0].lat,
            long: dataJson.geonames[0].lng,
            country: dataJson.geonames[0].countryName,
            city: dataJson.geonames[0].toponymName,
        };
        return newdata;
    } catch (error) {
        console.log(error);
    }
};

/**Call to API Weather to server*/
const weatherAPI = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const newData = await response.json();
        // console.log('weather111 ',newData);
        return newData;
    } catch (error) {
        console.log(error);
    }
};

//Call to API pixabay to server

const pixabayAPI = async (url = "", data = {}) => {
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        mode: "cors",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
    });
    try {
        const dataJson = await response.json();
        const dataImage = dataJson.hits[0].largeImageURL;
        // console.log(dataImage);
        return dataImage;
    } catch (error) {
        console.log(error);
    }

}

export {
    handleSubmit
}