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
      document.querySelector("#current-temp").innerHTML = ("Temp: " + curTemp + "°f");
      var curWind = data.wind.speed;
      document.querySelector("#current-wind").innerHTML = ("Wind: " + curWind + "mph");
      var curHumid = data.main.humidity;
      document.querySelector("#current-humidity").innerHTML = ("Humidity: " + curHumid + "%");
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

      // for (var i = 0; i, resultArray.lenght; i++) {
      //   if (resultArray[i].dt_txt.split(" ")[1] === "12:00:00") {
      //     console.log(resultArray[i]);
      //     var temp = data.list[2].main.temp;
      //     console.log(temp);
      //     var weatherCity = data.list.name
      //     console.log(weatherCity);
      //     var humidity = data.list[i].main.humidity;
      //     var wind = data.list[i].main.humidity;
      //     var date = data.list[i].dt_txt.split(" ")[0];
      //     document.getElementById("weather-city").innerHTML = weatherCity;

      //   }
      // }

      // var resultArray = data.list;

      // displayTime(resultArray);
      // displayWeatherCards(resultArray);
    });
}
