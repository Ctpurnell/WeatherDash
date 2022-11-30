var APIKey = "c32fce2705670ec5d04fdd9e49599a52";
var city;
var state;
var country;
var lat;
var lon;
var queryURL = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey;
var searchBtn = document.querySelector("#searchBtn");
var formContain = document.querySelector("form-container");

  searchBtn.addEventListener("click", function (event) {
    var userInput = event.target.previousElementSibling.value;
    var formContain = event.target.parentElement.getAttribute("id");
    localStorage.setItem(formContain, userInput);

   });

   
















//fetch(queryURL)//
