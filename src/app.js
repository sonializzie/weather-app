function formatTime(time) {
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes} | `;
}

function formatDate(date) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  let currentYear = date.getFullYear();
  let currentMonth = months[date.getMonth()];
  let currentDate = date.getDate();

  let formattedDate = `${currentMonth} ${currentDate}, ${currentYear}`;

  return formattedDate;
}

let currently = new Date();
let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let day = days[currently.getDay()];
let currentDay = document.querySelector("#day");
currentDay.innerHTML = day;

// function search(event) {
//   event.preventDefault();
//   let cityElement = document.querySelector("#city");
//   let cityInput = document.querySelector("#city-input");
//   cityElement.innerHTML = cityInput.value;
// }

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-temperature");
  temperatureElement.innerHTML = 84;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#weather-temperature");
  temperatureElement.innerHTML = 29;
}

let timeElement = document.querySelector("#time");
let currentTime = new Date();
timeElement.innerHTML = formatTime(currentTime);

let dateElement = document.querySelector("#month");
let currentDate = new Date();
dateElement.innerHTML = formatDate(currentDate);

// let searchForm = document.querySelector("#search-form");
// searchForm, addEventListener("submit", search);

// let fahrenheitLink = document.querySelector("#fahrenheit-link");
// fahrenheitLink.addEventListener("click", convertToFahrenheit);

// let celsiusLink = document.querySelector("#celsius-link");
// celsiusLink.addEventListener("click", convertToCelsius);

function showTemperature(response) {
  let city = response.data.name;
  let cityElement = document.querySelector("#city");
  cityElement.innerHTML = `${city} |`;

  let country = response.data.sys.country;
  let countryElement = document.querySelector("#country");
  countryElement.innerHTML = `${country}`;

  let icon = response.data.weather.icon;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  let temperature = Math.round(response.data.main.temp);
  let temperatureElement = document.querySelector("#today-temp");
  temperatureElement.innerHTML = `${temperature}`;

  let skyDescription = response.data.weather[0].description;
  let descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = `${skyDescription}`;

  let precipitation = Math.round(response.data.clouds.all);
  let precipitationElement = document.querySelector("#precipitation");
  precipitationElement.innerHTML = `Clouds : ${precipitation} %`;

  let humidity = Math.round(response.data.main.humidity);
  let humidityElement = document.querySelector("#humidity");
  humidityElement.innerHTML = `Humidity : ${humidity} %`;

  let wind = Math.round(response.data.wind.speed);
  let windElement = document.querySelector("#wind");
  windElement.innerHTML = `Wind : ${wind} km/h`;

  let lastUpdated = new Date(document.lastModified);
  let lastUpdatedElement = document.querySelector("#last-updated");
  lastUpdatedElement.innerHTML = `Last Updated : ${lastUpdated}`;
}

function searchCity(city) {
  let apiKey = "cf23fefe944409418faf6ab205d2379d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showTemperature);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  searchCity(city);
}

function searchLocation(position) {
  let apiKey = "cf23fefe944409418faf6ab205d2379d";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;

  axios.get(apiUrl).then(showTemperature);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);

function getGeolocation() {
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let geoButton = document.querySelector("#location-btn");
geoButton.addEventListener("click", getGeolocation);

searchCity("Dublin,IE");
