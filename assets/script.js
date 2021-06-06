var currentWeatherApi = "api.openweathermap.org/data/2.5/weather?q=";
var forecastApi = "api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "a6cc699ad74cfce4df66d3e9815f4dcc";
let city = "";
let cities = [];

var currentCityWeather = currentWeatherApi + city + apiKey;
var cityForecast = forecastApi + city + apiKey;


// fetch(currentWeatherApi)
// .then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data);
// })

function pullCities() {
    var savedCities = JSON.parse(localStorage.getItem("cities"))

    if(savedCities !== null){
        cities = savedCities
    }

    renderButton();
}

function saveCities() {
    localStorage.setItem("cities", JSON.stringify(cities))
}


    $("#button-addon2").on("click", function(event) {
        event.preventDefault();
        var searchValue = $(".form-value").val();
        var currentCityWeather = currentWeatherApi + searchValue + "&Appid=" + apiKey + "&units=imperial";
        var cityForecast = forecastApi + searchValue + "&Appid=" + apiKey + "&units=imperial";

        if(searchValue == "") {
            console.log("not working!");
        } else {
            $("#currentCity").text("Current weather in " + city);
            $.ajax({
                url: currentCityWeather,
                method: "GET",
            })
        }

        saveCities();
    })

