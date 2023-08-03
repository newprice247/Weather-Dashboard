var fiveDayForecast = $('.day')
var today = new Date()
$('#header').append(`

    <p class="is-size-4 has-text-centered mb-4">${today.toDateString()}</p>`)
var getWeather = () => {
    // $.each(recentSearches, (i,val) => {
    //     $('#recentSearches').append(`<div>${val}</div>`)
    //     console.log(recentSearches)
    // })
    $("#searchBar").keypress(function (event) {
        if (event.keyCode === 13) {
            $("#search").click();
        }
    });
    $('#search').on('click', function () {
        $('.fiveDay').html(``)
        $('.fiveDay').addClass('box')
        var city = $('.input').val()
        var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?&q=${city}&units=imperial&cnt=&appid=4ab8fb0f640052a7c1fc096698340e94`;

        fetch(requestUrl)
            .then(function (response) {
                return response.json()
            })
            .then(function (data) {
                var dt = data.list[0].dt;
                var day = new Date(dt * 1000);
                var pop = data.list[0].pop;
                var chanceOfRain = Math.floor(pop * 100);
                var temp = data.list[0].main.temp
                $('.todaysForecast').html(`
                <p id="today" class="has-text-primary-dark">Today's Forecast for ${data.city.name},${data.city.country}</p>
                <div class = ml-6>
                    <p>${data.list[0].weather[0].main}</p>
                    <p>Temp: ${Math.floor(temp)}°F</p>
                    <p>Wind Speed: ${data.list[0].wind.speed}</p>
                    <p>Chance of Rain: ${chanceOfRain}%</p>
                </div>
            `)

                for (let i = 4; i < data.list.length; i += 8) {
                    var dt = data.list[i].dt;
                    var day = new Date(dt * 1000);
                    var pop = data.list[i].pop;
                    var chanceOfRain = Math.floor(pop * 100);
                    var temp = data.list[i].main.temp

                    $('.fiveDay').append(`
                <div class="column m-3 has-text-centered day">
                        <p class="is-size-5 mb-3 has-text-primary-dark">${day.toDateString()}</p>
                        <div class='box'>
                            <p>${data.list[i].weather[0].main}</p>
                            <p>Temp: ${Math.floor(temp)}°F</p>
                            <p>Wind Speed: ${data.list[i].wind.speed}</p>
                            <p>Chance of Rain: ${chanceOfRain}%</p>
                        </div>
                </div>`)
                }
            })
    })

    // var getRecentSearches = () => {
    //     $.each()
    // }


}

getWeather()