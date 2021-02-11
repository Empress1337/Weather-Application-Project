// For Day and Time
let now = new Date();
let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
];
let d = now.getDate();
let year = now.getFullYear();
let month = now.getMonth() + 1;
let day = days[now.getDay()];
let hrTime = now.getHours();
let minutes = now.getMinutes();
document.querySelector(".day").innerHTML = `${day}`;
document.querySelector(".time").innerHTML = `${hrTime}:${minutes}`;
document.querySelector(".date").innerHTML = `${month} / ${d} / ${year}`;


// Displays all changes after submit
function showTemperature(response) {
    console.log(response.data);
    document.querySelector("#cityName").innerHTML = response.data.name;
    document.querySelector("#temp").innerHTML = Math.round(
        response.data.main.temp
    );
    document.querySelector(
        "#humi"
    ).innerHTML = `Humidity: ${response.data.main.humidity}%`;
    document.querySelector("#wind").innerHTML = `Wind: ${Math.round(
        response.data.wind.speed
    )} km/hr`;
    document.querySelector("#condition").innerHTML = response.data.weather[0].description;
    document.querySelector("#iconOne").setAttribute("src", `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`);
}
function valueToDisplay(result) {
    let apiKey = "ef30aa9056a9ed9d86308d59509e7ff4";
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${result}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(showTemperature);
}

function pointy(event) {
    event.preventDefault();
    let result = document.querySelector("#city-input").value;
    valueToDisplay(result);
}

let citySearchButton = document.querySelector("#search-form");
citySearchButton.addEventListener("submit", pointy);

valueToDisplay("Toronto");

// submit current location
function myLocation(position) {
    let lat = position.coords.latitude;
    let long = position.coords.longitude;
    let apiKey = "ef30aa9056a9ed9d86308d59509e7ff4";
    let locApi = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${apiKey}&units=metric`;
    axios.get(locApi).then(showTemperature);
}
function locButton(event) {
    event.preventDefault();
    navigator.geolocation.getCurrentPosition(myLocation);
}

let loc = document.querySelector("#currentPlace");
loc.addEventListener("click", locButton);
