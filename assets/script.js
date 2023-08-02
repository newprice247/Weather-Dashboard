var fiveDayForecast = $('.day')
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

    // var requestUrl = `http://api.openweathermap.org/data/2.5/forecast?id=524901&appid={4ab8fb0f640052a7c1fc096698340e94}`;

    // fetch(requestUrl)
    //     .then(function (response) {
    //         return response.json()
    //     })
    //     .then(function (data) {
    //         console.log(data)
    //     })
}

getWeather()