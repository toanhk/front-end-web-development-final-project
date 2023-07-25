function displaySavedTrips() {
    let trips = JSON.parse(localStorage.getItem('trips')) || [];

    if (trips != null) {
        let content = '';
        trips.forEach(trip => {

            content += `<div class="col">
            <h3>Country: ${trip.country}</h3>
            <div>City: ${trip.city}</div>
            <div>Date: ${trip.date}</div >
            <div>Temperature:  ${trip.temp} degree</div >
            <div>Weather:  ${trip.description} </div >
            <div>
                <figure>
                    <img src="${trip.imageLink}" alt="image of city" />
                    <figcaption class="text-center">
                    ${trip.city}
                    </figcaption>
                </figure>
                
            </div>
           
        </div > `;
        });

        document.querySelector("#table").innerHTML = content;
    }

}

export { displaySavedTrips }