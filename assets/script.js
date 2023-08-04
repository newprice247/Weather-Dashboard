
var today = new Date()

$('#header').append(`
    <p class="is-size-4 has-text-centered mb-3">${today.toDateString()}</p>
    `)

var getWeather = () => {
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
                var todayAnimation
                if(data.list[0].weather[0].main == "Rain") {
                    todayAnimation = './assets/images/rain.gif'
                } else if (data.list[0].weather[0].main == "Clouds") {
                    todayAnimation = './assets/images/cloudy.gif'
                } else if (data.list[0].weather[0].main == "Clear") {
                    todayAnimation = './assets/images/sun.gif'
                } else if (data.list[0].weather[0].main == "Snow") {
                    todayAnimation = './assets/images/snowflake.gif'
                } else if (data.list[0].weather[0].main == "Thunderstorm") {
                    todayAnimation = './assets/images/storm.gif'
                } else if (data.list[0].weather[0].main == "Drizzle") {
                    todayAnimation = './assets/images/drizzle.gif'
                } 

                $('.todaysForecast').html(`
                    <p id="today" class="has-text-primary-dark">Today's Forecast for ${data.city.name},${data.city.country}</p>
                    <div class = ml-6>
                        <p>${data.list[0].weather[0].main}</p>
                        <figure class="image is-128x128">
                            <img src="${todayAnimation}">
                        </figure>
                        <p>Temp: ${Math.floor(temp)}°F</p>
                        <p>Wind Speed: ${data.list[0].wind.speed} MPH</p>
                        <p>Chance of Rain: ${chanceOfRain}%</p>
                    </div>
                `)

                for (let i = 4; i < data.list.length; i += 8) {
                    var dt = data.list[i].dt;
                    var day = new Date(dt * 1000);
                    var pop = data.list[i].pop;
                    var chanceOfRain = Math.floor(pop * 100);
                    var temp = data.list[i].main.temp
                    var weatherAnimation
                    console.log(data.list[i].weather[0].main)
                    if(data.list[i].weather[0].main == "Rain") {
                        weatherAnimation = './assets/images/rain.gif'
                    } else if (data.list[i].weather[0].main == "Clouds") {
                        weatherAnimation = './assets/images/cloudy.gif'
                    } else if (data.list[i].weather[0].main == "Clear") {
                        weatherAnimation = './assets/images/sun.gif'
                    } else if (data.list[i].weather[0].main == "Snow") {
                        weatherAnimation = './assets/images/snowflake.gif'
                    } else if (data.list[i].weather[0].main == "Thunderstorm") {
                        weatherAnimation = './assets/images/storm.gif'
                    } else if (data.list[i].weather[0].main == "Drizzle") {
                        weatherAnimation = './assets/images/drizzle.gif'
                    } 
                    $('.fiveDay').append(`
                        <div class="column m-3 has-text-centered day">
                                <p class="is-size-5 mb-3 has-text-primary-dark">${day.toDateString()}</p>
                                <div class='box has-text-centered'>
                                    <p class="has-text-primary-dark is-size-5">${data.list[i].weather[0].main}</p>
                                    <figure class="image is-96x96 m-auto">
                                        <img src="${weatherAnimation}">
                                    </figure>
                                    <p>Temp: ${Math.floor(temp)}°F</p>
                                    <p>Wind Speed: ${data.list[i].wind.speed} MPH</p>
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