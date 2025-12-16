const button = document.getElementById("getLocationBtn");
const output = document.getElementById("output");
const mapParent = document.getElementById("mapParent");
const searchbar = document.getElementById("searchbar");

let weatherdata;
let forecastdata;
let citydata;
let data;
let lat;
let lon;
const city = searchbar.value.toLowerCase();
const limit = 1; // Get only the top result
const geocodingApiUrl = `https://api.openweathermap.org${city}&limit=${limit}&appid=28e638c5b8ef34fe0f1f7eb35f73e818`;


// --------------get data function start-------------------------------------------------------------------//

const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            console.log(`Latitude: ${lat}, Longitude: ${lon}`);
            output.textContent = `Latitude: ${lat}, Longitude: ${lon}`;

            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=28e638c5b8ef34fe0f1f7eb35f73e818`).then((response) => response.text())
                .then(data => {
                    weatherdata = data;
                })

            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=28e638c5b8ef34fe0f1f7eb35f73e818`).then((response) => response.text())
                .then(data => {
                    data;
                    forecastdata = data;
                    console.log(forecastdata);

                })
            const map = document.createElement("div")
            mapParent.innerHTML = "";
            map.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3142.401967534331!2d${lat}!3d${lon}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDAyJzE1LjgiTiAxMjHCsDE5JzE4LjQiVw!5e0!3m2!1sen!2sus!4v1765827264633!5m2!1sen!2sus" width="250px" height="170" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
            mapParent.appendChild(map);
        })
}


// Function to fetch coordinates
// function getCoordinatesByCity(city) {
//     try {
//         fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=28e638c5b8ef34fe0f1f7eb35f73e818`)
//         .then((response) => response.json())
//             .then(data => {
//                 data;
//                 citydata = data;
//                 console.log(citydata);

//         if (citydata.length > 0) {
//             const { lat, lon, name, country } = citydata[0];
//             console.log(`Coordinates for ${name}, ${country}: Latitude = ${lat}, Longitude = ${lon}`);
//             return { lat, lon };
//         } else {
//             console.log("City not found.");
//             return null;
//         }
//      })
//     } catch (error) {
//         console.error("Error fetching geocoding data:", error);
//         return null;
//     }
    
// }

// async function getWeatherData(lat, lon) {
//     try {

//         fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=28e638c5b8ef34fe0f1f7eb35f73e818&units=metric`).then((response) => response.text())
//             .then(data => {
//                 data;
//                 let coordinatecitydata = data;

//         console.log("Weather data:", coordinatecitydata);
//         return coordinatecitydata;
//                     })
//     } catch (error) {
//         console.error("Error fetching weather data:", error);
//         return null;
//     }
// }

// --------------get data function end -------------------------------------------------------------------//



// --------------get location function start -------------------------------------------------------------------//

button.addEventListener("click", () => {
    // Check if the browser supports geolocation

    getLocation();

});

// --------------get location function end-------------------------------------------------------------------//

// searchbar.addEventListener("keypress", (event) => {
//     if (event.key === "Enter") {
//         getCoordinatesByCity(city);
//         getWeatherData(lat, lon);
//     }
// })