var fiveDayForecast = $('.day')

var getWeather = () => {

    var requestUrl = `http://api.openweathermap.org/geo/1.0/direct?q={32935}&limit={limit}&appid={4ab8fb0f640052a7c1fc096698340e94}`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            console.log(data)
        })
}

getWeather()