var APIkey = "27ed5413de75e6e3eea3ddb37981af05";
var cityName;
var lat;
var lon;
var searchBtn = document.querySelector("#searchBtn");
var searchInputEl = document.querySelector("input");
var resultsContainer = document.getElementById("results-container");
var resultsContainerTwo = document.getElementById("date-container");
var dateDay = document.querySelectorAll("#date-day");
// display date from day.js.......................................................
var currentDate = dayjs().format(" MMM DD, YYYY");
// Search button..................................................................
searchBtn.addEventListener("click", function (event) {
  event.preventDefault();
  var userInput = event.target.previousElementSibling.value;
  var formContain = event.target.parentElement.getAttribute("id");
  localStorage.setItem(formContain, userInput);
  console.log(searchInputEl.value, "", currentDate);
  var cityToday = (searchInputEl.value, "", currentDate);

  console.log(cityToday);

  fetchWeatherByCityName(searchInputEl.value);
});

var cityHistory = [];
if (localStorage.getItem("history")) {
  cityHistory = JSON.parse(localStorage.getItem("history"));
}
// function for retreiving data at API.............................................
function fetchWeatherByCityName(searchInputEl) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?q=${searchInputEl}&appid=27ed5413de75e6e3eea3ddb37981af05&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      console.log("Humidity: " + data.main.humidity);
      fetchForecast(data.coord.lat, data.coord.lon);
      //displying the current conditions.................................................
      var curTemp = data.main.temp;
      document.querySelector("#current-temp").innerHTML =
        "Temp: " + curTemp + "°f";
      var curWind = data.wind.speed;
      document.querySelector("#current-wind").innerHTML =
        "Wind: " + curWind + "mph";
      var curHumid = data.main.humidity;
      document.querySelector("#current-humidity").innerHTML =
        "Humidity: " + curHumid + "%";
      cityHistory.push(data.name);
      localStorage.setItem("history", JSON.stringify(cityHistory));
      renderCities();
    })
    .catch(function (err) {
      console.log(err);
    });
}
// New function to reteive five day foredcast data..................................
function fetchForecast(lat, lon) {
  fetch(
    `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=27ed5413de75e6e3eea3ddb37981af05&units=imperial`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var resultArray = data.list;
      var weatherTemp = data.list[2].main.temp;
      var dateTime = data.list[2].dt_txt;
      var weatherHumidity = data.list[2].main.humidity;
      var windSpeed = data.list[2].wind.speed;
      console.log(resultArray);
      console.log("Date and Time: ", dateTime);
      console.log("Temp: ", weatherTemp, "°");
      console.log("Humidity: ", weatherHumidity, "%");
      console.log("Wind Speed: ", windSpeed, "mph");

      var newCleanArr = data.list.filter((index) =>
        index.dt_txt.includes("12:00:00")
      );

      var allDisplays = document.getElementsByClassName("date-day");
      console.log(allDisplays);

      for (i = 0; i < newCleanArr.length; i++) {
        allDisplays[i].textContent = newCleanArr[i].dt_txt.split(" ")[0];

        document.getElementById("card-degrees" + i).textContent =
          "Temp: " + newCleanArr[i].main.temp;
        document.getElementById("card-wind" + i).textContent =
          "wind spd: " + newCleanArr[i].wind.speed + "mph";
        document.getElementById("card-humidity" + i).textContent =
          "humidity: " + newCleanArr[i].main.humidity + "%";
      }
    });
}

function renderCities() {
  var historyArea = document.getElementById("historyArea");
  historyArea.innerHTML = "";
  for (i = 0; i < cityHistory.length; i++) {
    var newButton = document.createElement("button");
    newButton.textContent = cityHistory[i];
    historyArea.appendChild(newButton);
  }
}

renderCities();
