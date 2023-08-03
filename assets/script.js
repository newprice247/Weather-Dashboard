var fiveDayForecast = $('.day')
var today = new Date()
$('#header').append(`

    <p class="is-size-4">${today.toDateString()}</p>`)
var getWeather = () => {
    // $.each(recentSearches, (i,val) => {
    //     $('#recentSearches').append(`<div>${val}</div>`)
    //     console.log(recentSearches)
    // })

    $('#search').on('click', function () {
        var locationSearch = $('.input').val();
        localStorage.setItem(locationSearch, locationSearch)
    })

    // var getRecentSearches = () => {
    //     $.each()
    // }

    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?&q=32935&units=imperial&cnt=&appid=4ab8fb0f640052a7c1fc096698340e94`;

    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            var dt = data.list[0].dt;
            var day = new Date(dt*1000);
            var pop = data.list[0].pop;
            var chanceOfRain = Math.floor(pop * 100);
            $('.todaysForecast').append(`
                <p>Today's Forecast for ${data.city.name}</p>
                <div class = ml-6>
                    <p>${data.list[0].weather[0].main}</p>
                    <p>Temp: ${data.list[0].main.temp}</p>
                    <p>Wind Speed: ${data.list[0].wind.speed}</p>
                    <p>Chance of Rain: ${chanceOfRain}%</p>
                </div>
            `)

            for (let i = 4; i < data.list.length; i+=8) {
            console.log(data.list) //dates
            var dt = data.list[i].dt;
            var day = new Date(dt*1000);
            var pop = data.list[i].pop;
            var chanceOfRain = Math.floor(pop * 100);
            $('.fiveDay').append(`
                <div class="column m-3 has-text-centered day">
                        <p class="is-size-5 mb-3">${day.toDateString()}</p>
                        <div class='box'>
                            <p>${data.list[i].weather[0].main}</p>
                            <p>Temp: ${data.list[i].main.temp}</p>
                            <p>Wind Speed: ${data.list[i].wind.speed}</p>
                            <p>Chance of Rain: ${chanceOfRain}%</p>
                        </div>
                </div>`)
            }
        })
}

getWeather()