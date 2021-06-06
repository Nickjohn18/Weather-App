var currentWeatherApi = "https://api.openweathermap.org/data/2.5/weather?q=";
var forecastApi = "https://api.openweathermap.org/data/2.5/forecast?q=";
var apiKey = "a6cc699ad74cfce4df66d3e9815f4dcc";
let cityName = "";
//let cities = array.localStorage.length; 
//var array = JSON.parse(localStorage.setItem("cities"))
var hourly = moment().format("HH")
var daily = moment().format("d")
var cities = 0;



// fetch(currentWeatherApi)
// .then(function(response){
//     return response.json();
// }).then(function(data){
//     console.log(data);
// })

    for (var i = 0; i < localStorage.length; i++){
        var getCity = localStorage.getItem(i);
        var cityList = $(".cityList");

        cityList.append("<li>" + getCity + "</li>");
}



    $("#button-addon2").on("click", function(event) {
        event.preventDefault();
        var searchValue = $("#searchValue").val();
        var uvApi = "https://api.openweathermap.org/data/2.5/onecall?"
        var currentCityWeather = currentWeatherApi + searchValue + "&Appid=" + apiKey + "&units=imperial";
        var cityForecast = forecastApi + searchValue + "&Appid=" + apiKey + "&units=imperial";
        if(searchValue == "") {
            console.log(currentCityWeather);
            console.log(cityForecast);
        } else {
            $.ajax({
                url: currentCityWeather,
                method: "GET",
            }).then(function(cityResponse) {
                cityName = cityResponse;

                $("#currentCity").text("Current weather in " + cityName.name);
                 
                console.log(cities)
                var saveCities = localStorage.setItem(cities, cityResponse.name);
                cities = cities + 1;

                $("#currentTemp").text("Temperature: " + cityName.main.temp);
                $("#currentHum").text("Humidity: " + cityName.main.humidity + "%");
                $("#currentWind").text("Wind Speed: " + cityName.wind.speed);
                $("#currentUv").text();
                $("#currentImg").attr({"src": "http://openweathermap.org/img/w/" + cityResponse.weather[0].icon + ".png",
                "height": "100px", "width":"100px"})

                var currentLon = cityResponse.coord.lon;
                var currentLat = cityResponse.coord.lat;

                console.log(currentLon);
                console.log(currentLat);

                var currentUv = uvApi + "lat=" + currentLat + "&lon=" + currentLon + "&exclude=" + hourly + daily + "&appid=" + apiKey
                
                // display UV index for the current weather
                $.ajax({
                    url: currentUv,
                    method: "GET",
                }).then (function(uvResponse){
                    $("#currentUv").text("UV Index: " + uvResponse.current.uvi);
                })


            })
        }
            // display 5 day forecast
        $.ajax({
            url: cityForecast,
            method: "GET",
        }).then (function(forecast){
            let forecastDay = 1;

            
            for(var i = 0; i < forecast.list.length; i++){

                if(forecast.list[i].dt_txt.split(" ")[1] == "15:00:00") {
                var day = forecast.list[i].dt_txt.split("-")[2].split(" ")[0];
                var month = forecast.list[i].dt_txt.split("-")[1];
                var year = forecast.list[i].dt_txt.split("-")[0];


                $("#day-" + forecastDay).text(month + "/" + day + "/" + year);
                $("#day" + forecastDay + "-temp").text("Temp: " + forecast.list[i].main.temp);
                $("#day" + forecastDay + "-hum").text("Humidity: " + forecast.list[i].main.humidity);
                $("#day" + forecastDay + "-img").attr({"src": "http://openweathermap.org/img/w/" + forecast.list[i].weather[0].icon + ".png",
                "height": "100px", "width":"100px"});


                forecastDay++;
                }
            }
        })
    })

