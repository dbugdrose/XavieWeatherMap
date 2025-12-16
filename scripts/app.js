const button = document.getElementById("getLocationBtn");
const output = document.getElementById("output");
const mapParent = document.getElementById("mapParent");
const searchbar = document.getElementById("searchbar");
const maintemp = document.getElementById("maintemp");
const  todaymaxparent = document.getElementById("todaymaxparent");
const  todayminparent = document.getElementById("todayminparent");
const  max2parent = document.getElementById("max2parent");
const  max3parent = document.getElementById("max3parent");
const  max4parent = document.getElementById("max4parent");
const  max5parent = document.getElementById("max5parent");
const starBtn = document.getElementById("starBtn");
const favoritesParent = document.getElementById("favoritesParent");

let isFilled = false;
let darkblue = true;
let gray = false;
let black = false;

let weatherdata;
let forecastdata;
let citydata;
let celsiusTemp;
let fahrenheitTemp;
let todaytemp;
let todaymax;
let todaymin;
let data;
let lat;
let lon;
let city = searchbar.value.toLowerCase();
let stateCode;
let countryCode;
let favorite = city;
let favorites = [];
const limit = 1;
const geocodingApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=${limit}&appid=${APIKey}`;

// --------------get data function start-------------------------------------------------------------------//

const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            console.log(`Latitude: ${lat}, Longitude: ${lon}`);

            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${APIKey}`).then((response) => response.json())
                .then(data => {
                    data;
                    forecastdata = data;
                    console.log(forecastdata.list[0])
                    todaytemp = forecastdata.list[0].main.temp;
                    todaymax = forecastdata.list[0].main.temp_max;
                    todaymin = forecastdata.list[0].main.temp_min;
                    let min2 = forecastdata.list[1].main.temp_min;
                    let max2 = forecastdata.list[1].main.temp_max;
                    let min3 = forecastdata.list[2].main.temp_min;
                    let max3 = forecastdata.list[2].main.temp_max;
                    let min4 = forecastdata.list[3].main.temp_min;
                    let max4 = forecastdata.list[3].main.temp_max;
                    let min5 = forecastdata.list[4].main.temp_min;
                    let max5 = forecastdata.list[4].main.temp_max;


                    maintemp.innerHTML = "";
                    const todaytempP = document.createElement("p");
                    todaytempP.textContent = Math.floor(todaytemp) + "°";
                    maintemp.appendChild(todaytempP);


                    todaymaxparent.innerHTML = "";
                    const todaymaxP = document.createElement("p");
                    todaymaxP.textContent = Math.floor(todaymax) + "°";
                    todaymaxparent.appendChild(todaymaxP);

                    todayminparent.innerHTML = "";
                    const todayminP = document.createElement("p");
                    todayminP.textContent = Math.floor(todaymin) + "°";
                    todayminparent.appendChild(todayminP);   

                    min2parent.innerHTML = "";
                    const min2P = document.createElement("p");
                    min2P.textContent = Math.floor(min2) + "°";
                    min2parent.appendChild(min2P);

                    min3parent.innerHTML = "";
                    const min3p = document.createElement("p");
                    min3p.textContent = Math.floor(min3) + "°";
                    min3parent.appendChild(min3p); 

                    max2parent.innerHTML = "";
                    const max2P = document.createElement("p");
                    max2P.textContent = Math.floor(max2) + "°";
                    max2parent.appendChild(max2P);

                    max3parent.innerHTML = "";
                    const max3p = document.createElement("p");
                    max3p.textContent = Math.floor(max3) + "°";
                    max3parent.appendChild(max3p); 

                    min4parent.innerHTML = "";
                    const min4P = document.createElement("p");
                    min4P.textContent = Math.floor(min4) + "°";
                    min4parent.appendChild(min4P);

                    min5parent.innerHTML = "";
                    const min5p = document.createElement("p");
                    min5p.textContent = Math.floor(min5) + "°";
                    min5parent.appendChild(min5p); 

                    max4parent.innerHTML = "";
                    const max4P = document.createElement("p");
                    max4P.textContent = Math.floor(max4) + "°";
                    max4parent.appendChild(max4P);

                    max5parent.innerHTML = "";
                    const max5p = document.createElement("p");
                    max5p.textContent = Math.floor(max5) + "°";
                    max5parent.appendChild(max5p); 


                })

            const map = document.createElement("div")
            mapParent.innerHTML = "";
            map.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3142.401967534331!2d${lat}!3d${lon}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDAyJzE1LjgiTiAxMjHCsDE5JzE4LjQiVw!5e0!3m2!1sen!2sus!4v1765827264633!5m2!1sen!2sus" width="250px" height="170" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
            mapParent.appendChild(map);
        })
}

// Function to fetch coordinates
function getCoordinatesByCity(city) {
    try {
        fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=5&appid=${APIKey}`)
        .then((response) => response.json())
            .then(data => {
                data;
                citydata = data;
                console.log(citydata);

        if (citydata.length > 0) {
            const { lat, lon, name, country } = citydata[0];
            console.log(`Coordinates for ${name}, ${country}: Latitude = ${lat}, Longitude = ${lon}`);
            return { lat, lon };
        } else {
            console.log("City not found.");
            return null;
        }
     })
    } catch (error) {
        console.error("Error fetching geocoding data:", error);
        return null;
    }

}

async function getWeatherData(lat, lon) {
    try {

        fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}&units=imperial`).then((response) => response.text())
            .then(data => {
                data;
                let coordinatecitydata = data;

        console.log("Weather data:", coordinatecitydata);
        return coordinatecitydata;
                    })
    } catch (error) {
        console.error("Error fetching weather data:", error);
        return null;
    }
}

const getLocalStorage = () => {
    favorites = localStorage.getItem("Favorites");

    if(favorites === null)
    {return []};
    return JSON.parse(favorites);
}

const saveToStorage = (favorite) => {
    favorites = getLocalStorage();

    if(!favorites.includes(favorite)){
        favorites.push(favorite);
    }
localStorage.setItem("Favorites", JSON.stringify(favorites))
}

const removeFromStorage = (favorite) => {
    let favorites = getLocalStorage();
    let favoriteIndex = favorites.indexOf(favorite);
    favorites.splice(favoriteIndex, 1);

    localStorage.setItem("Grocery Items", JSON.stringify(favorites));
}

function DisplayFavorite(){

favorites = getLocalStorage();
favoritesParent.innerHTML = "";
console.log(favorites);
favorites.forEach (favorite => {
console.log(favorite);
let p = document.createElement("p");
p.textContent = favorite;

const deleteBtn = document.createElement("button");
deleteBtn.innerHTML = `<img src="/xavieassets/star filled.png" alt="remove favorite star icon">`;

deleteBtn.addEventListener("click", () => {
    removeFromStorage(favorite);
    p.remove();
})

p.appendChild (deleteBtn);
groceryParent.appendChild(p);
});
}

// --------------get data function end -------------------------------------------------------------------//

//------------------themes start -------------------------------//

function DarkBlue() {
    let darkblue = true;
    let gray = false;
    let black = false;
bodyTheme.classList.replace('body-gray', 'body-dark-blue');
navTheme.classList.replace('body-black', 'body-dark-blue');
}

function Black() {
    let darkblue = false;
    let gray = false;
    let black = true;
bodyTheme.classList.replace('body-gray', 'body-black');
navTheme.classList.replace('body-dark-blue', 'body-black');
}
function Gray() {
    let darkblue = false;
    let gray = true;
    let black = false;
bodyTheme.classList.replace('body-black', 'body-gray');
navTheme.classList.replace('body-dark-blue', 'body-gray');
}
// --------------------------themes end---------------------------------------------


// --------------event listeners start-------------------------------------------------------------------//


button.addEventListener("click", () => {
    // Check if the browser supports geolocation
    getLocation();

});



searchbar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        getCoordinatesByCity(city);
        console.log(citydata)
    }
})

starBtn.addEventListener("click", () => {
 isFilled = !isFilled;
    if (isFilled) {
    starBtn.src = "/xavieassets/star.png";
  } else {
    starBtn.src = "/xavieassets/star filled.png";
    getLocalStorage();
    saveToStorage({city});
    console.log(city);
    DisplayFavorites();
  }
});

