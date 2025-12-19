import { APIKey } from '/scripts/environment.js';

let lat;
let lon;


const button = document.getElementById("getLocationBtn");
const output = document.getElementById("output");
const mapParent = document.getElementById("mapParent");
const searchbar = document.getElementById("searchbar");
const maintemp = document.getElementById("maintemp");
const todaymaxparent = document.getElementById("todaymaxparent");
const todayminparent = document.getElementById("todayminparent");
const max2parent = document.getElementById("max2parent");
const max3parent = document.getElementById("max3parent");
const max4parent = document.getElementById("max4parent");
const max5parent = document.getElementById("max5parent");
const starBtn = document.getElementById("starBtn");
const favoritesParent = document.getElementById("favoritesParent");
const grayBtn = document.getElementById("grayBtn");
const darkBlueBtn = document.getElementById("darkBlueBtn");
const blackBtn = document.getElementById("blackBtn");
const bodyTheme = document.getElementById("bodyTheme");
const navTheme = document.getElementById("navTheme");
const fBtn = document.getElementById("fBtn");
const cBtn = document.getElementById("cBtn");
const realfeelParent = document.getElementById("realfeelParent");
const windParent = document.getElementById("windParent");
const humidityParent = document.getElementById("humidityParent");
const airqualityParent = document.getElementById("airqualityParent");
const visibilityParent = document.getElementById("visibilityParent");
const chanceofrainParent = document.getElementById("chanceofrainParent");
const uvindexParent = document.getElementById("uvindexParent");
const pressureParent = document.getElementById("pressureParent");
const dewpointParent = document.getElementById("dewpointParent");
const day0Parent = document.getElementById("day0Parent");
const day1Parent = document.getElementById("day1Parent");
const day2Parent = document.getElementById("day2Parent");
const day3Parent = document.getElementById("day3Parent");
const day4Parent = document.getElementById("day4Parent");
const date0Parent = document.getElementById("date0Parent");
const date1Parent = document.getElementById("date1Parent");
const date2Parent = document.getElementById("date2Parent");
const date3Parent = document.getElementById("date3Parent");
const date4Parent = document.getElementById("date4Parent");
const nameParent = document.getElementById("nameParent");
const todayImage = document.getElementById("todayImage");
const day0Image = document.getElementById("day0Image");
const day1Image = document.getElementById("day1Image");
const day2Image = document.getElementById("day2Image");
const day3Image = document.getElementById("day3Image");
const day4Image = document.getElementById("day4Image");
let todaymin = 100000;
let todaymax = -100000;
let min2 = 100000;
let max2 = -100000;
let min3 = 100000;
let max3 = -100000;
let min4 = 100000;
let max4 = -100000;
let min5 = 100000;
let max5 = -100000;




let celsius = false;
let units = "imperial";

let forecastdata;
let citydata;
let todaytemp;
let city = searchbar.value.toLowerCase();
let favoriteList = [];
let name = "";
let stateCode = "";
let countryCode = "";
let country;
let favoriteItem = [];
let wind;
let realfeel;
let pressure;
let humidity;
let visibility;
let citysearch = false;


// --------------get data function start-------------------------------------------------------------------//

const getLocation = () => {

    citysearch = false;
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            let todaymin = 100000;
            todaymax = -100000;
            min2 = 100000;
            max2 = -100000;
            min3 = 100000;
            max3 = -100000;
            min4 = 100000;
            max4 = -100000;
            min5 = 100000;
            max5 = -100000;
            if (celsius == false) { units = "imperial" }
            else { units = "metric" }
            fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`).then((response) => response.json())
                .then(data => {
                    forecastdata = data;
                    todaytemp = forecastdata.list[0].main.temp;
                    realfeel = forecastdata.list[0].main.feels_like;
                    wind = forecastdata.list[0].wind.speed;
                    visibility = forecastdata.list[0].visibility;
                    pressure = forecastdata.list[0].main.pressure;
                    humidity = forecastdata.list[0].main.humidity;


                    for (let i = 0; i < 8; i++) {

                        if (todaymin > forecastdata.list[i].main.temp_min) {
                            todaymin = forecastdata.list[i].main.temp_min;
                        }
                        if (todaymax < forecastdata.list[i].main.temp_max) {
                            todaymax = forecastdata.list[i].main.temp_max
                        }

                        if (day0Image || todayImage) {
                            if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                day0Image.src = "/xavieassets/cloudy.png";
                                todayImage.src = "/xavieassets/cloudy.png";
                            }
                            else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                day0Image.src = "/xavieassets/snowing.png";
                                todayImage.src = "/xavieassets/snowing.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                day0Image.src = "/xavieassets/rain-drops.png";
                                todayImage.src = "/xavieassets/rain-drops.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                day0Image.src = "/xavieassets/mist.png";
                                todayImage.src = "/xavieassets/mist.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                day0Image.src = "/xavieassets/mist.png";
                                todayImage.src = "/xavieassets/mist.png";

                            }

                            else {
                                day0Image.src = "/xavieassets/sunny.png";
                                todayImage.src = "/xavieassets/sunny.png";

                            }


                        }
                    }

                    for (let i = 8; i < 16; i++) {
                        if (min2 > forecastdata.list[i].main.temp_min) {
                            min2 = forecastdata.list[i].main.temp_min
                        }
                        if (max2 < forecastdata.list[i].main.temp_max) {
                            max2 = forecastdata.list[i].main.temp_max
                        }
                        if (day1Image) {
                            if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                day1Image.src = "/xavieassets/cloudy.png";
                            }
                            else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                day1Image.src = "/xavieassets/snowing.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                day1Image.src = "/xavieassets/rain-drops.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                day1Image.src = "/xavieassets/mist.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                day1Image.src = "/xavieassets/mist.png";

                            }

                            else if (forecastdata.list[i].weather[0].id == 800) {
                                day1Image.src = "/xavieassets/sunny.png";

                            }

                        }
                    }

                    for (let i = 16; i < 24; i++) {
                        if (min3 > forecastdata.list[i].main.temp_min) {
                            min3 = forecastdata.list[i].main.temp_min
                        }
                        if (max3 < forecastdata.list[i].main.temp_max) {
                            max3 = forecastdata.list[i].main.temp_max
                        }
                        if (day2Image) {
                            if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                day2Image.src = "/xavieassets/cloudy.png";
                            }
                            else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                day2Image.src = "/xavieassets/snowing.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                day2Image.src = "/xavieassets/rain-drops.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                day2Image.src = "/xavieassets/mist.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                day2Image.src = "/xavieassets/mist.png";

                            }

                            else if (forecastdata.list[i].weather[0].id == 800) {
                                day2Image.src = "/xavieassets/sunny.png";

                            }

                        }
                    }

                    for (let i = 24; i < 32; i++) {
                        if (min4 > forecastdata.list[i].main.temp_min) {
                            min4 = forecastdata.list[i].main.temp_min
                        }
                        if (max4 < forecastdata.list[i].main.temp_max) {
                            max4 = forecastdata.list[i].main.temp_max
                        }
                        if (day3Image) {
                            if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                day3Image.src = "/xavieassets/cloudy.png";
                            }
                            else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                day3Image.src = "/xavieassets/snowing.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                day3Image.src = "/xavieassets/rain-drops.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                day3Image.src = "/xavieassets/mist.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                day3Image.src = "/xavieassets/mist.png";

                            }

                            else if (forecastdata.list[i].weather[0].id == 800) {
                                day3Image.src = "/xavieassets/sunny.png";

                            }

                        }
                    }

                    for (let i = 32; i < 40; i++) {
                        if (min5 > forecastdata.list[i].main.temp_min) {
                            min5 = forecastdata.list[i].main.temp_min
                        }
                        if (max5 < forecastdata.list[i].main.temp_max) {
                            max5 = forecastdata.list[i].main.temp_max
                        }
                        if (day4Image) {
                            if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                day4Image.src = "/xavieassets/cloudy.png";
                            }
                            else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                day4Image.src = "/xavieassets/snowing.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                day4Image.src = "/xavieassets/rain-drops.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                day4Image.src = "/xavieassets/mist.png";

                            }
                            else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                day4Image.src = "/xavieassets/mist.png";

                            }

                            else if (forecastdata.list[i].weather[0].id == 800) {
                                day4Image.src = "/xavieassets/sunny.png";

                            }

                        }
                    }



                    maintemp.innerHTML = "";
                    const todaytempP = document.createElement("p");
                    if (units == "imperial") { todaytempP.innerHTML = `${Math.floor(todaytemp)} <span class="tinytemp">°<span class="tiniertemp">F</span></span>`; }
                        if (units == "metric") { todaytempP.innerHTML = `${Math.floor(todaytemp)} <span class="tinytemp">°<span class="tiniertemp">C</span></span>`; }
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

                    windParent.innerHTML = "";
                    const windP = document.createElement("p");
                    if (celsius == false) { windP.textContent = wind + "mph"; }
                    else { windP.textContent = wind + "km/hr"; }
                    { windParent.appendChild(windP) }

                    humidityParent.innerHTML = "";
                    const humidityP = document.createElement("p");
                    humidityP.textContent = humidity + "%";
                    humidityParent.appendChild(humidityP);

                    realfeelParent.innerHTML = "";
                    const realfeelP = document.createElement("p");
                    realfeelP.textContent = realfeel + "°";
                    realfeelParent.appendChild(realfeelP);

                    visibilityParent.innerHTML = "";
                    const visibilityP = document.createElement("p");
                    visibilityP.textContent = visibility;
                    visibilityParent.appendChild(visibilityP);

                    pressureParent.innerHTML = "";
                    const pressureP = document.createElement("p");
                    pressureP.textContent = pressure;
                    pressureParent.appendChild(pressureP);

                    const today = new Date();
                    const dayIndex = today.getDay();
                    const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                    const dayOfMonth = today.getDate();

                    day0Parent.innerHTML = "";
                    const day0P = document.createElement("p");
                    day0P.textContent = days[dayIndex];
                    day0Parent.appendChild(day0P);

                    day1Parent.innerHTML = "";
                    const day1P = document.createElement("p");
                    day1P.textContent = days[(dayIndex + 1) % days.length];
                    day1Parent.appendChild(day1P);

                    day2Parent.innerHTML = "";
                    const day2P = document.createElement("p");
                    day2P.textContent = days[(dayIndex + 2) % days.length];
                    day2Parent.appendChild(day2P);

                    day3Parent.innerHTML = "";
                    const day3P = document.createElement("p");
                    day3P.textContent = days[(dayIndex + 3) % days.length];
                    day3Parent.appendChild(day3P);

                    day4Parent.innerHTML = "";
                    const day4P = document.createElement("p");
                    day4P.textContent = days[(dayIndex + 4) % days.length];
                    day4Parent.appendChild(day4P);

                    date0Parent.innerHTML = "";
                    const date0P = document.createElement("p");
                    date0P.textContent = (dayOfMonth);
                    date0Parent.appendChild(date0P);

                    date1Parent.innerHTML = "";
                    const date1P = document.createElement("p");
                    date1P.textContent = (dayOfMonth + 1);
                    date1Parent.appendChild(date1P);

                    date2Parent.innerHTML = "";
                    const date2P = document.createElement("p");
                    date2P.textContent = (dayOfMonth + 2);
                    date2Parent.appendChild(date2P);

                    date3Parent.innerHTML = "";
                    const date3P = document.createElement("p");
                    date3P.textContent = (dayOfMonth + 3);
                    date3Parent.appendChild(date3P);

                    date4Parent.innerHTML = "";
                    const date4P = document.createElement("p");
                    date4P.textContent = (dayOfMonth + 4);
                    date4Parent.appendChild(date4P);

                    const map = document.createElement("div")
                    mapParent.innerHTML = "";
                        map.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3142.401967534331!2d${lat}!3d${lon}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDAyJzE1LjgiTiAxMjHCsDE5JzE4LjQiVw!5e0!3m2!1sen!2sus!4v1765827264633!5m2!1sen!2sus" width="280px" height="170px" style="border-radius:20px;display:flex;justify-content:end;overflow:hidden;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
                    mapParent.appendChild(map);


                })

        })
}





// Function to fetch coordinates
function getCoordinatesByCity(city) {
    citysearch = true;
    let todaymin = 100000;
    todaymax = -100000;
    min2 = 100000;
    max2 = -100000;
    min3 = 100000;
    max3 = -100000;
    min4 = 100000;
    max4 = -100000;
    min5 = 100000;
    max5 = -100000;    
for (let i = 0; i < city.length; i++) {
        if (!isNaN(Number(city[i]))) {
            if (!isNaN(parseFloat(city[i])) && isFinite(city[i])) {
                alert("Please enter a valid city.")
                return true;
            }
        }
    }

    fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${city},${stateCode},${countryCode}&limit=1&appid=${APIKey}`)
        .then((response) => response.json())
        .then(data => {
            data;
            citydata = data;
            if (citydata.length > 0) {
                name = citydata[0].name;
                country = citydata[0].country;
                lat = citydata[0].lat;
                lon = citydata[0].lon;
                if (celsius == false) { units = "imperial" }
                else { units = "metric" }
                fetch(`http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${APIKey}`).then((response) => response.json())
                    .then(data => {

                        data;
                        forecastdata = data;
                        todaytemp = forecastdata.list[0].main.temp;
                        realfeel = forecastdata.list[0].main.feels_like;
                        wind = forecastdata.list[0].wind.speed;
                        visibility = forecastdata.list[0].visibility;
                        pressure = forecastdata.list[0].main.pressure;
                        humidity = forecastdata.list[0].main.humidity;


                        for (let i = 0; i < 8; i++) {

                            if (todaymin > forecastdata.list[i].main.temp_min) {
                                todaymin = forecastdata.list[i].main.temp_min;
                            }
                            if (todaymax < forecastdata.list[i].main.temp_max) {
                                todaymax = forecastdata.list[i].main.temp_max
                            }

                            if (day0Image || todayImage) {
                                if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                    day0Image.src = "/xavieassets/cloudy.png";
                                    todayImage.src = "/xavieassets/cloudy.png";
                                }
                                else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                    day0Image.src = "/xavieassets/snowing.png";
                                    todayImage.src = "/xavieassets/snowing.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                    day0Image.src = "/xavieassets/rain-drops.png";
                                    todayImage.src = "/xavieassets/rain-drops.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                    day0Image.src = "/xavieassets/mist.png";
                                    todayImage.src = "/xavieassets/mist.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                    day0Image.src = "/xavieassets/mist.png";
                                    todayImage.src = "/xavieassets/mist.png";

                                }

                                else {
                                    day0Image.src = "/xavieassets/sunny.png";
                                    todayImage.src = "/xavieassets/sunny.png";

                                }


                            }
                        }

                        for (let i = 8; i < 16; i++) {
                            if (min2 > forecastdata.list[i].main.temp_min) {
                                min2 = forecastdata.list[i].main.temp_min
                            }
                            if (max2 < forecastdata.list[i].main.temp_max) {
                                max2 = forecastdata.list[i].main.temp_max
                            }
                            if (day1Image) {
                                if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                    day1Image.src = "/xavieassets/cloudy.png";
                                }
                                else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                    day1Image.src = "/xavieassets/snowing.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                    day1Image.src = "/xavieassets/rain-drops.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                    day1Image.src = "/xavieassets/mist.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                    day1Image.src = "/xavieassets/mist.png";

                                }

                                else if (forecastdata.list[i].weather[0].id == 800) {
                                    day1Image.src = "/xavieassets/sunny.png";

                                }

                            }
                        }

                        for (let i = 16; i < 24; i++) {
                            if (min3 > forecastdata.list[i].main.temp_min) {
                                min3 = forecastdata.list[i].main.temp_min
                            }
                            if (max3 < forecastdata.list[i].main.temp_max) {
                                max3 = forecastdata.list[i].main.temp_max
                            }
                            if (day2Image) {
                                if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                    day2Image.src = "/xavieassets/cloudy.png";
                                }
                                else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                    day2Image.src = "/xavieassets/snowing.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                    day2Image.src = "/xavieassets/rain-drops.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                    day2Image.src = "/xavieassets/mist.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                    day2Image.src = "/xavieassets/mist.png";

                                }

                                else if (forecastdata.list[i].weather[0].id == 800) {
                                    day2Image.src = "/xavieassets/sunny.png";

                                }

                            }
                        }

                        for (let i = 24; i < 32; i++) {
                            if (min4 > forecastdata.list[i].main.temp_min) {
                                min4 = forecastdata.list[i].main.temp_min
                            }
                            if (max4 < forecastdata.list[i].main.temp_max) {
                                max4 = forecastdata.list[i].main.temp_max
                            }
                            if (day3Image) {
                                if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                    day3Image.src = "/xavieassets/cloudy.png";
                                }
                                else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                    day3Image.src = "/xavieassets/snowing.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                    day3Image.src = "/xavieassets/rain-drops.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                    day3Image.src = "/xavieassets/mist.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                    day3Image.src = "/xavieassets/mist.png";

                                }

                                else if (forecastdata.list[i].weather[0].id == 800) {
                                    day3Image.src = "/xavieassets/sunny.png";

                                }

                            }
                        }

                        for (let i = 32; i < 40; i++) {
                            if (min5 > forecastdata.list[i].main.temp_min) {
                                min5 = forecastdata.list[i].main.temp_min
                            }
                            if (max5 < forecastdata.list[i].main.temp_max) {
                                max5 = forecastdata.list[i].main.temp_max
                            }
                            if (day4Image) {
                                if (forecastdata.list[i].weather[0].id > 800 && forecastdata.list[i].weather[0].id < 805) {
                                    day4Image.src = "/xavieassets/cloudy.png";
                                }
                                else if (forecastdata.list[i].weather[0].id > 599 && forecastdata.list[i].weather[0].id < 625) {
                                    day4Image.src = "/xavieassets/snowing.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 299 && forecastdata.list[i].weather[0].id < 540) {
                                    day4Image.src = "/xavieassets/rain-drops.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 699 && forecastdata.list[i].weather[0].id < 790) {
                                    day4Image.src = "/xavieassets/mist.png";

                                }
                                else if (forecastdata.list[i].weather[0].id > 199 && forecastdata.list[i].weather[0].id < 240) {
                                    day4Image.src = "/xavieassets/mist.png";

                                }

                                else if (forecastdata.list[i].weather[0].id == 800) {
                                    day4Image.src = "/xavieassets/sunny.png";

                                }

                            }
                        }


                        nameParent.innerHTML = "";
                        const cityP = document.createElement("p");
                        cityP.textContent = name + ", " + country;
                        nameParent.appendChild(cityP);

                        maintemp.innerHTML = "";
                        const todaytempP = document.createElement("p");
                        if (units == "imperial") { todaytempP.innerHTML = `${Math.floor(todaytemp)} <span class="tinytemp">°<span class="tiniertemp">F</span></span>`; }
                        if (units == "metric") { todaytempP.innerHTML = `${Math.floor(todaytemp)} <span class="tinytemp">°<span class="tiniertemp">C</span></span>`; }
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

                        windParent.innerHTML = "";
                        const windP = document.createElement("p");
                        if (celsius == false) { windP.textContent = wind + "mph"; }
                        else { windP.textContent = wind + "km/hr"; }
                        { windParent.appendChild(windP) }

                        humidityParent.innerHTML = "";
                        const humidityP = document.createElement("p");
                        humidityP.textContent = humidity + "%";
                        humidityParent.appendChild(humidityP);

                        realfeelParent.innerHTML = "";
                        const realfeelP = document.createElement("p");
                        realfeelP.textContent = realfeel + "°";
                        realfeelParent.appendChild(realfeelP);

                        visibilityParent.innerHTML = "";
                        const visibilityP = document.createElement("p");
                        visibilityP.textContent = visibility;
                        visibilityParent.appendChild(visibilityP);

                        pressureParent.innerHTML = "";
                        const pressureP = document.createElement("p");
                        pressureP.textContent = pressure;
                        pressureParent.appendChild(pressureP);

                        const today = new Date();
                        const dayIndex = today.getDay();
                        const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

                        const dayOfMonth = today.getDate();

                        day0Parent.innerHTML = "";
                        const day0P = document.createElement("p");
                        day0P.textContent = days[dayIndex];
                        day0Parent.appendChild(day0P);

                        day1Parent.innerHTML = "";
                        const day1P = document.createElement("p");
                        day1P.textContent = days[(dayIndex + 1) % days.length];
                        day1Parent.appendChild(day1P);

                        day2Parent.innerHTML = "";
                        const day2P = document.createElement("p");
                        day2P.textContent = days[(dayIndex + 2) % days.length];
                        day2Parent.appendChild(day2P);

                        day3Parent.innerHTML = "";
                        const day3P = document.createElement("p");
                        day3P.textContent = days[(dayIndex + 3) % days.length];
                        day3Parent.appendChild(day3P);

                        day4Parent.innerHTML = "";
                        const day4P = document.createElement("p");
                        day4P.textContent = days[(dayIndex + 4) % days.length];
                        day4Parent.appendChild(day4P);

                        date0Parent.innerHTML = "";
                        const date0P = document.createElement("p");
                        date0P.textContent = (dayOfMonth);
                        date0Parent.appendChild(date0P);

                        date1Parent.innerHTML = "";
                        const date1P = document.createElement("p");
                        date1P.textContent = (dayOfMonth + 1);
                        date1Parent.appendChild(date1P);

                        date2Parent.innerHTML = "";
                        const date2P = document.createElement("p");
                        date2P.textContent = (dayOfMonth + 2);
                        date2Parent.appendChild(date2P);

                        date3Parent.innerHTML = "";
                        const date3P = document.createElement("p");
                        date3P.textContent = (dayOfMonth + 3);
                        date3Parent.appendChild(date3P);

                        date4Parent.innerHTML = "";
                        const date4P = document.createElement("p");
                        date4P.textContent = (dayOfMonth + 4);
                        date4Parent.appendChild(date4P);

                        const map = document.createElement("div")
                        mapParent.innerHTML = "";
                        map.innerHTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3142.401967534331!2d${lat}!3d${lon}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMzjCsDAyJzE1LjgiTiAxMjHCsDE5JzE4LjQiVw!5e0!3m2!1sen!2sus!4v1765827264633!5m2!1sen!2sus" width="280px" height="170px" style="border-radius:20px;display:flex;justify-content:end;overflow:hidden" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`;
                        mapParent.appendChild(map);


                    })

            }
            else {
                console.log("City not found.");
                return null;
            }
        })
}

const getLocalName = () => {
    navigator.geolocation.getCurrentPosition(
        (position) => {
            lat = position.coords.latitude;
            lon = position.coords.longitude;

            if (celsius == false) { units = "imperial" }
            else { units = "metric" }
            fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKey}`).then((response) => response.json())
                .then(data => {
                    data;
                    nameParent.innerHTML = "";
                    const cityP = document.createElement("p");
                    cityP.textContent = data.name;
                    nameParent.appendChild(cityP);
                    
                    name = data.name;
                })
        })
}



const getLocalStorage = (name, lat, lon) => {
    favoriteItem = localStorage.getItem("Favorite");

    if (favoriteItem === null) { return [] };
    return JSON.parse(favoriteItem);
}

const saveToStorage = (favoriteItem) => {
    let favoriteList = getLocalStorage();
    if (!favoriteList.includes(favoriteItem)) {
        if(favoriteList.length >= 3)
        {favoriteList.shift();}
        favoriteList.push(favoriteItem);
    }
    localStorage.setItem("Favorite", JSON.stringify(favoriteList))
}

const removeFromStorage = (favoriteItem) => {
    let favoriteList = getLocalStorage();
    let favoriteIndex = favoriteList.indexOf(favoriteItem);
    favoriteList.splice(favoriteIndex, 1);

    localStorage.setItem("Favorite", JSON.stringify(favoriteList));
}

function DisplayFavorite() {

    favoriteList = getLocalStorage();
    favoritesParent.innerHTML = "";
    favoriteList.forEach(favoriteItem => {
        let p = document.createElement("p");
        p.textContent = favoriteItem;
        const deleteBtn = document.createElement("span");
        deleteBtn.innerHTML = `<img src="/xavieassets/star filled.png" alt="remove favorite star icon" width="20px" height="20px">`;


        deleteBtn.addEventListener("click", () => {
            removeFromStorage();
            p.remove();

        })

        p.addEventListener("click", () => {
            city = favoriteItem;
            getCoordinatesByCity(city);
            console.log(city)

        })

        p.appendChild(deleteBtn);
        favoritesParent.appendChild(p);
    });
}

// --------------get data function end -------------------------------------------------------------------//

//------------------themes start -------------------------------//

function DarkBlue() {
    bodyTheme.classList.replace('bg-gray', 'bg-dark-blue');
    navTheme.classList.replace('nav-gray', 'nav-dark-blue');

    bodyTheme.classList.replace('bg-black', 'bg-dark-blue');
    navTheme.classList.replace('nav-black', 'nav-dark-blue');
}

function Black() {
    bodyTheme.classList.replace('bg-gray', 'bg-black');
    navTheme.classList.replace('nav-gray', 'nav-black');

    bodyTheme.classList.replace('bg-dark-blue', 'bg-black');
    navTheme.classList.replace('nav-dark-blue', 'nav-black');
}
function Gray() {
    bodyTheme.classList.replace('bg-black', 'bg-gray');
    navTheme.classList.replace('nav-black', 'nav-gray');

    bodyTheme.classList.replace('bg-dark-blue', 'bg-gray');
    navTheme.classList.replace('nav-dark-blue', 'nav-gray');
}
// --------------------------themes end---------------------------------------------


// --------------event listeners start-------------------------------------------------------------------//


addEventListener("DOMContentLoaded", (event) => { 
    getLocation();
    getLocalName();
    DisplayFavorite();

});


searchbar.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        city = searchbar.value.toLowerCase();
        getCoordinatesByCity(city);
    }
})

starBtn.addEventListener("click", () => {
    getLocalStorage();
    saveToStorage(name);
    DisplayFavorite();
});

grayBtn.addEventListener("click", () => {
    Gray();
});
darkBlueBtn.addEventListener("click", () => {
    DarkBlue();

});
blackBtn.addEventListener("click", () => {
    Black();

});

fBtn.addEventListener("click", () => {
    celsius = false;
    if (citysearch == true)
        {getCoordinatesByCity(city);}
    else
    {getLocation();
    getLocalName();
    }
})

cBtn.addEventListener("click", () => {
    celsius = true;
    if (citysearch == true)
        {getCoordinatesByCity(city);}
    else
    {getLocation();
    getLocalName();
    }
;
})