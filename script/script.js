var APIkey = "27ed5413de75e6e3eea3ddb37981af05";
var cityName;
var stateCode;
var countryCode;
var lat;
var lon;
var searchBtn = document.querySelector("#searchBtn");
var searchInputEl = document.querySelector("input");
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

function fetchWeatherByCityName(searchInputEl) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInputEl}&appid=27ed5413de75e6e3eea3ddb37981af05&units=imperial`
  )
    .then(function (response) {
      return response.json();
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
  console.log(lat, lon);
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=27ed5413de75e6e3eea3ddb37981af05&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      // var resultArray = data.list;

      // displayTime(resultArray);
      // displayWeatherCards(resultArray);
    });
}




