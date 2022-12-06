var APIkey = "27ed5413de75e6e3eea3ddb37981af05";
var city;
var state;
var country;
var lat;
var lon;
var queryURL = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${APIkey}`;
var searchBtn = document.querySelector("#searchBtn");
var formContain = document.querySelector("form-container");
var searchInputEl = document.querySelector("#search");
var resultsContainer = document.getElementById("results-container")
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInput = event.target.previousElementSibling.value;
  var formContain = event.target.parentElement.getAttribute("id");
  localStorage.setItem(formContain, userInput);
  console.log(searchInputEl.value);

  fetchWeatherByCityName(searchInputEl.value);
});

//fetch()//
function fetchWeatherByCityName(cityName) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=27ed5413de75e6e3eea3ddb37981af05`
  )
    .then(function (res) {
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
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=27ed5413de75e6e3eea3ddb37981af05`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      var resultArray = data.list;
      displayWeatherCards(resultArray)
    });
}

function displayWeatherCards(fiveDayForecast) {
  let htmlContainer = '';
  fiveDayForecast.forEach(function (forecast){
    htmlContainer += `<div class="forecast-card">
      <div>${forecast.dt_txt}</div>
      <div>${forecast.main.temp}</div>
      <div>humidity</div>
      <div>${forecast.speed}</div>
    </div>`
  })
  resultsContainer.innerHTML = htmlContainer
}
