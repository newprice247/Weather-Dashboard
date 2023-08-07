//Retrieves today's date
var today = moment().format("dddd M / D / YYYY"); 
//Declares an empty string to hold the recent searches
var searchHistory = [];
//Retrieves the user's recent searches from local storage and appends them as buttons into the dropdown in the navbar
var getRecentSearches = () => {    
    var searchHistory = JSON.parse(localStorage.getItem("city"))
    console.log(searchHistory)
    $.each(searchHistory, (i, val) => {
        $('.navbar-dropdown').append(`
            <a class="navbar-item recentItem">
                ${val}
            </a>
        `)
    })
    return searchHistory;
}
getRecentSearches()
//Inserts today's date into the header
$('#header').append(`
    <p class="is-size-4 has-text-centered m-3">${today}</p>
`)
//Event listener for the popular searches section
$('.fav').on('click', function () {
    $('.fiveDay').html(``)
    $('.fiveDay').addClass('box')
    city = $(this).text()
    getWeather(city)
})
//Enables the enter key to be used for the search bar
$("#searchBar").keypress(function (event) {
    if (event.keyCode === 13) {
        $("#search").click();
    }
});
//Event Listener for the search bar
$('#search').on('click', function () {
    $('.fiveDay').html(``)
    $('.fiveDay').addClass('box')
    var city = $('.input').val()
    //Adds search to recent searches in the dropdown and adds to local storage
    if (!searchHistory.includes(city)) {
        searchHistory.push(city);
    }
    $('.navbar-dropdown').append(`
            <a class="navbar-item recentItem">
                ${city}
            </a>
        `)
    getWeather(city)
    localStorage.setItem("city", JSON.stringify(searchHistory))

})
//Event listener for the recent searches dropdown
$('.recentItem').on('click', function () {
    $('.fiveDay').html(``)
    $('.fiveDay').addClass('box')
    var city = $(this).text()
    getWeather(city)
})
//Function for pulling the data from the openweather API and displaying specific values on screen, in the form of a today's forecast section and a five day forecast
var getWeather = (city) => {
    //Calling API
    var requestUrl = `https://api.openweathermap.org/data/2.5/forecast?&q=${city}&units=imperial&cnt=&appid=4ab8fb0f640052a7c1fc096698340e94`;
    fetch(requestUrl)
        .then(function (response) {
            return response.json()
        })
        .then(function (data) {
            //variables storing data that needs to be altered in some way(to make it more readable and understandable)
            var pop = data.list[0].pop;
            var chanceOfRain = Math.floor(pop * 100);
            var temp = data.list[0].main.temp
            //Sets a specific gif animation for various weather states
            var todayAnimation
            if (data.list[0].weather[0].main == "Rain") {
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
            //appends data to the page
            $('.todaysForecast').html(`
                    <p id="today" class="mb-5 has-text-primary-dark has-text-centered">Today's Forecast for ${data.city.name},${data.city.country}</p>
                    <div class="ml-auto columns">
                        <div class="column">
                            <p class="has-text-centered">${data.list[0].weather[0].main}</p>
                            <figure class="image is-128x128 m-auto">
                                <img src="${todayAnimation}">
                            </figure>
                        </div>
                        <div class="column has-text-centered">
                            <p>Temp: ${Math.floor(temp)}°F</p>
                            <p>Wind Speed: ${data.list[0].wind.speed} MPH</p>
                            <p>Chance of Rain: ${chanceOfRain}%</p>
                            <p>Humidity: ${data.list[0].main.humidity}%</p>
                        </div>
                    </div>
                `)
            //will be used to set a specific number of days from now, for use in displaying the date for each day in the five day forecast
            var daysFromNow = 0
            //for loop for displaying the five day forecast
            for (let i = 7; i < data.list.length; i += 8) {
                daysFromNow += 1;
                //variables for data that needs altered in some way
                var pop = data.list[i].pop;
                var chanceOfRain = Math.floor(pop * 100);
                var temp = data.list[i].main.temp
                //Displays a specific animated gif for various weather types
                var weatherAnimation
                if (data.list[i].weather[0].main == "Rain") {
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
                //appends to the webpage for each of the five days
                $('.fiveDay').append(`
                        <div class="column m-3 has-text-centered day box">
                                <p class="is-size-4 mb-3 has-text-primary-dark">${moment().add(daysFromNow, 'days').format('dddd  M/D ')}</p>
                                <div class='has-text-centered'>
                                    <p class="has-text-primary-dark is-size-5">${data.list[i].weather[0].main}</p>
                                    <figure class="image is-96x96 m-auto">
                                        <img src="${weatherAnimation}">
                                    </figure>
                                    <p>Temp: ${Math.floor(temp)}°F</p>
                                    <p>Wind Speed: ${data.list[i].wind.speed} MPH</p>
                                    <p>Chance of Rain: ${chanceOfRain}%</p>
                                    <p>Humidity: ${data.list[i].main.humidity}%</p>
                                </div>
                        </div>`)
            }
        })


}
