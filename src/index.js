// Add current time
let today = new Date();
let weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday"
];
let todayDay = weekdays[today.getDay()];
let todayTime = `${today.getHours()}:${today
  .getMinutes()
  .toString()
  .padStart(2, "0")}`;

let dateTimeInfo = document.querySelector("#date-time");
dateTimeInfo.innerHTML = `${todayDay} ${todayTime}`;
/*
//Display city when user submits form
function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  chosenCity.innerHTML = searchInput.value;
}
let chosenCity = document.querySelector("#chosen-city");
let form = document.querySelector("#search-form");
form.addEventListener("submit", search);*/

/*
//Calculate temperature in celcius and fahrenheit
let temperature = document.querySelector("#temperature");
let tempValue = temperature.innerHTML;

function cToF() {
  fahrTemp = (tempValue * 9) / 5 + 32;
  temperature.innerHTML = Math.round(fahrTemp);
}

function fToC() {
  celsiusTemp = tempValue;
  temperature.innerHTML = celsiusTemp;
}

let celsiusLink = document.querySelector("#celsius-link");
let fahrLink = document.querySelector("#fahrenheit-link");

fahrLink.addEventListener("click", cToF);
celsiusLink.addEventListener("click", fToC); */

//Connect to weather API
function showTemp(response) {
  console.log(response);
  let searchCity = response.data.name;
  let chosenCity = document.querySelector("#chosen-city");
  chosenCity.innerHTML = searchCity;
  let temperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperature);
  let weatherDescription = document.querySelector("#weather-description");
  weatherDescription.innerHTML = response.data.weather[0].description;
}

function search(event) {
  event.preventDefault();
  let searchInput = document.querySelector("#search-text-input");
  let cityName = searchInput.value;

  let apiKey = "7654bb3646824703bcfdf4ced8409f03";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

function showCurrentLocationTemp(response) {
  console.log(response.data);
  let chosenCity = document.querySelector("#chosen-city");
  chosenCity.innerHTML = response.data.name;
  let temperature = response.data.main.temp;
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(temperature);
  document.querySelector("#weather-description").innerHTML =
    response.data.weather[0].description;
}

function showPosition(position) {
  console.log(position);
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiKey = "7654bb3646824703bcfdf4ced8409f03";
  let apiCurrentUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
  axios.get(apiCurrentUrl).then(showCurrentLocationTemp);
}

let form = document.querySelector("#search-form");
form.addEventListener("submit", search);

function onCurrentLocationClick() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", onCurrentLocationClick);
