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
var dateDay = document.querySelectorAll("#date-day");

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
      var resultArray = data.list;
      console.log("Date and Time: ", data.list[2].dt_txt);
      console.log("Temp: ", data.list[2].main.temp, "°");
      console.log("Humidity: ", data.list[2].main.humidity, "%");
      console.log("Wind Speed: ", data.list[2].wind.speed, "mph");
      
      for (var i = 0; i , resultArray.lenght; i++) {
        if (resultArray[i].dt_txt.split(' ')[1] === '12:00:00') {
          console.log(resultArray[i]);
          var temp = data.list[2].main.temp;
          console.log(temp);
          var humidity = data.list[i].main.humidity;
          var wind = data.list[i].main.humidity;
          var date = data.list[i].dt_txt.split(' ')[0];
        

        }
      }


      // var resultArray = data.list;

      // displayTime(resultArray);
      // displayWeatherCards(resultArray);
    });
}




