var searchData = $(".search-data")
var listOfCities = []
var APIKey = "7632f199d1648e1980201d52e92f308a";


// Setting cities array to local storage
function saveCities() {
localStorage.setItem("cities", JSON.stringify(listOfCities));
}
// Defining our function to grab from the 'listOfCities' array and render a button for it
function renderButtons() {
$(".buttons-view").empty();
  for (var i = 0; i < listOfCities.length; i++) {
  var a = $("<button>");
   a.addClass("btn btn-defult city-btn");
    a.attr("data-name", listOfCities[i]);
     a.text(listOfCities[i]);
 // Note: ".PREPEND"
$(".buttons-view").prepend(a);
}
}
// Function that displays weather
function displayWeather() {
//URL for ajax call (Note: links will change, added endpoints)
 var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=" + APIKey + "&units=imperial";
$.ajax({
  url: queryURL,
 // Defining the method we want to use (ex. get/post)
  method: "GET"
}).then(function (response) {
$(".search-data").html("")
//Setting new div to hold 'Current Weather' (Note: using "PREPEND" not "append")
 var newDiv = $("<div class='cityWeather'>")
newDiv.html("<h2>Current Weather</h2><br>")
 // Note: ".PREPEND"
searchData.prepend(newDiv)
//Appending city name to new div
  var cityName = response.name
   var first = $("<p>").html("<h4>" + cityName + "</h4>");
newDiv.append(first)
//Appending 'currentDate'
  var currentDate = moment().format("LLLL")
   var pastDate = $("<p>").html("<i>" + currentDate + "</i>");
newDiv.append(pastDate)
//Appending 'windSpeed' (Note: rounded to nearest whole number)
  var windSpeed = response.wind.speed
   var second = $("<p>").text("Wind Speed: " + windSpeed.toFixed(0) + " mph");
newDiv.append(second)
//Appending 'humidity' (Note: rounded to nearest whole number)
  var humidity = response.main.humidity
   var third = $("<p>").text("Humidity: " + humidity.toFixed(0) + " %");
newDiv.append(third)
//Call for temperature (fixed to whole number)
  var temperature = response.main.temp
   var pFour = $("<p>").text("Temperature: " + temperature.toFixed(0) + " F");
newDiv.append(pFour)
//Creation of image tag and call for icon image from API
 var iconImg = $("<img id = 'icon'>")
$(".weather-icon").append(iconImg)
  var icon = response.weather[0].icon;
   var iconurl = "http://openweathermap.org/img/w/" + icon + ".png";
$('#icon').attr('src', iconurl);
//Call for longitude and latitude (for UV Index AJAX Call)
  var lon = response.coord.lon
   var lat = response.coord.lat
//URL for UV Index API
  var uvIndexUrl = "http://api.openweathermap.org/data/2.5/uvi?appid=" 
   + APIKey 
    + "&lat=" + lat 
     + "&lon=" + lon
//AJAX call for UV Index
$.ajax({
  url: uvIndexUrl,
   method: "GET"
}).then(function (response) {
  var uvIndex = response.value
   var pFive = $("<p id=uvIndex>").text("UV Index: "
    + uvIndex);
newDiv.append(pFive)
})
//Push search term into array ONLY if the name doesn't already exist
if (listOfCities.includes(response.name) === false) {
listOfCities.push(response.name)
}
//Run the functions to render buttons, save cities, and display the 5 day forcast
  renderButtons()
  saveCities()
  display5day()
})
};
// Function to display 5 day weather, called by displayWeather function
function display5day() {
//Jquery GET request (Note different link, not 'https://api.openweathermap.org/data/2.5/weather?q=')
  var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + APIKey
$(".fiveDayHeader").html("<h3>5 Day Forecast</h3>")
$.ajax({
  url: forecastURL,
   method: "GET"
})
 
 
 
 
 // columns for 5 day forecast
.then(function (response) {
var day1date = new Date(response.list[2].dt_txt)
var day2date = new Date(response.list[10].dt_txt)
var day3date = new Date(response.list[18].dt_txt)
var day4date = new Date(response.list[26].dt_txt)
var day5date = new Date(response.list[34].dt_txt)
// temp column for 5 day forecast
var day1temp = (response.list[2].main.temp * (9 / 5) - 459.67).toFixed(0)
var day2temp = (response.list[10].main.temp * (9 / 5) - 459.67).toFixed(0)
var day3temp = (response.list[18].main.temp * (9 / 5) - 459.67).toFixed(0)
var day4temp = (response.list[26].main.temp * (9 / 5) - 459.67).toFixed(0)
var day5temp = (response.list[34].main.temp * (9 / 5) - 459.67).toFixed(0)
// humidity column for 5 day forecast
var day1hum = (response.list[2].main.humidity).toFixed(0)
var day2hum = (response.list[10].main.humidity).toFixed(0)
var day3hum = (response.list[18].main.humidity).toFixed(0)
var day4hum = (response.list[26].main.humidity).toFixed(0)
var day5hum = (response.list[34].main.humidity).toFixed(0)
// getting icons from openweathermap
var day1icon = "http://openweathermap.org/img/w/" + response.list[2].weather[0].icon + ".png";
var day2icon = "http://openweathermap.org/img/w/" + response.list[10].weather[0].icon + ".png";
var day3icon = "http://openweathermap.org/img/w/" + response.list[18].weather[0].icon + ".png";
var day4icon = "http://openweathermap.org/img/w/" + response.list[26].weather[0].icon + ".png";
var day5icon = "http://openweathermap.org/img/w/" + response.list[34].weather[0].icon + ".png";
// Formatting the columns for DAYS in 5 day forecast
$('.day1-icon').attr('src', day1icon);
$('.day2-icon').attr('src', day2icon);
$('.day3-icon').attr('src', day3icon);
$('.day4-icon').attr('src', day4icon);
$('.day5-icon').attr('src', day5icon);
// Formatting the columns for the data in 5 day forecast
$(".day1").html("<br/>" + "<b>" + moment(day1date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day1temp + " F </br>" + "Humidity: " + day1hum + " %")
$(".day2").html("<br/>" + "<b>" + moment(day2date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day2temp + " F </br>" + "Humidity: " + day2hum + " %")
$(".day3").html("<br/>" + "<b>" + moment(day3date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day3temp + " F </br>" + "Humidity: " + day3hum + " %")
$(".day4").html("<br/>" + "<b>" + moment(day4date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day4temp + " F </br>" + "Humidity: " + day4hum + " %")
$(".day5").html("<br/>" + "<b>" + moment(day5date).format("ddd, MMM Do") + "</b>" + "</br>" + "Temp: " + day5temp + " F </br>" + "Humidity: " + day5hum + " %")
})}








console.log(searchData)

//On click event listener for search button
$("#run-search").on("click", function () {
  city = $("#search-term").val()
   displayWeather()
    display5day()
})
//Clear search button
$("#clear-search").on("click", function (){
    localStorage.clear("cities")
     listOfCities = []
    $(".buttons-view").empty()
    //refresh page
    location.reload()
})
//Recent search button (Calls the 2 functions we need for data)
$(document).on("click", ".city-btn", function () {
  city = $(this).attr("data-name");
   display5day()
    displayWeather()
})
//To run when document loads (if/else statement that will pull from local storage only if the value is not "null")
$(document).ready(function() {
if(localStorage.getItem("cities") !== null) {
    var savedCity = localStorage.getItem("cities");
     var pushCities = JSON.parse(savedCity)
listOfCities = listOfCities.concat(pushCities)
}
//render buttons
  renderButtons()
})
if(localStorage.getItem("cities") !== null) {
var savedCity = localStorage.getItem("cities");
var pushCities = JSON.parse(savedCity)
listOfCities = listOfCities.concat(pushCities)
}
//render buttons
renderButtons()
