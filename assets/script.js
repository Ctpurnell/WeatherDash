var APIkey = "27ed5413de75e6e3eea3ddb37981af05";
var cityName;
var stateCode;
var countryCode;
var lat;
var lon;
// var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
var searchBtn = document.querySelector("#searchBtn");
var formContain = document.querySelector("form-container");
var searchInputEl = document.querySelector("#search");
var resultsContainer = document.getElementById("results-container");
var resultsContainerTwo = document.getElementById("date-container");

var currentDate = dayjs().format(" MMM DD, YYYY");

searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInput = event.target.previousElementSibling.value;
  var formContain = event.target.parentElement.getAttribute("id");
  localStorage.setItem(formContain, userInput);
  console.log(searchInputEl.value, ",", currentDate);

  fetchWeatherByCityName(searchInputEl.value);
});

function fetchWeatherByCityName(cityName, stateCode) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInputEl.value}&appid=27ed5413de75e6e3eea3ddb37981af05&units=imperial`
  )
    .then(function (res) {
      console.log(res);
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      fetchForecast(data.coord.lat, data.coord.lon);
    })
    .catch(function (err) {
      console.log(err);
    });
}
function fetchForecast(lat, lon) {
  console.log(lat, lon)
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=27ed5413de75e6e3eea3ddb37981af05&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var resultArray = data.list;
      
      
      displayTime(resultArray)
      displayWeatherCards(resultArray)
    });
}


function displayTime(dayTime) {
  let htmlContainerTwo = '';
  dayTime.forEach(function (forecast){
    htmlContainerTwo += `<div class="forecast-card-two">
      <div>Date & Time:${forecast.dt_txt}</div>
    </div>`
  })
  resultsContainerTwo.innerHTML = htmlContainerTwo
}

function displayWeatherCards(fiveDayForecast) {
  let htmlContainer = '';
  fiveDayForecast.forEach(function (forecast){
    htmlContainer += `<div class="forecast-card">
      <div>Date & Time:${forecast.dt_txt}</div>
      <div>Temp:${forecast.main.feels_like} dgs</div>
      <div>Humidity:${forecast.main.humidity}%</div>
      <div>Wind Speed:${forecast.wind.speed} Mph</div>
    </div>`
  })
  resultsContainer.innerHTML = htmlContainer
}

