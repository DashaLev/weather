let cityButton = document.querySelectorAll(".city-button");
let cityName = document.querySelector(".city-name");
let weatherContainer = document.querySelector(".weather-container")

cityButton.forEach(item => {
    item.addEventListener("click", function() {

        let city = cityName.value;

        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&APPID=5d066958a60d315387d9492393935c19`)
        .then(response => response.json())
        .then(data => {
            console.log(data)
            let cityDoc = document.querySelector(".city-selected")
            cityDoc.textContent = city

            if (data.message == "city not found" || data.message == "Nothing to geocode") {
                alert("City does not exist")
                
                function closeWeatherContainer () {
                    weatherContainer.classList.add("hide");
                    weatherContainer.classList.remove("show");
                }
                closeWeatherContainer ()
            } else {

                function openWeatherContainer () {
                    weatherContainer.classList.add("show");
                    weatherContainer.classList.remove("hide");
                }
                openWeatherContainer ()
                
                let dateNowDoc = document.querySelector(".date-now")
                let dateNow = new Date()
                dateNowDoc.textContent = dateNow.toString().slice(0,10)
                let timeNowDoc = document.querySelector(".time-now")
                timeNowDoc.textContent = dateNow.toString().slice(15,24)

                let dataDoc = document.querySelector(".update")
                let timeWeather = data.dt;
                let timeMs = new Date(timeWeather * 1000)
                let timeDate = timeMs.toString().slice(16,25);
                dataDoc.textContent = `Last update: ${timeDate}`

                let dataSunrise = document.querySelector(".sunrise-time")
                let timeSunriseWeather = data.sys.sunrise;
                let timeSunriseMs = new Date(timeSunriseWeather * 1000)
                let timeSunrise = timeSunriseMs.toString().slice(15,25);
                dataSunrise.textContent = `Sunrise: ${timeSunrise}`

                let dataSunset = document.querySelector(".sunset-time")
                let timeSunsetWeather = data.sys.sunset;
                let timeSunsetMs = new Date(timeSunsetWeather * 1000)
                let timeSunset = timeSunsetMs.toString().slice(15,25);
                dataSunset.textContent = `Sunset: ${timeSunset}`

                let img =  document.querySelector(".picture-icon");
                let iconCode = data.weather[0].icon
                let iconUrl = `http://openweathermap.org/img/w/${iconCode}.png`
                img.setAttribute("src", iconUrl)


                let humiditiDoc = document.querySelector(".humidity")
                let humiditi = data.main.humidity
                humiditiDoc.textContent = `Humidity: ${humiditi} %`

                let pressureDoc = document.querySelector(".pressure")
                let pressure = data.main.pressure
                pressureDoc.textContent = `Pressure: ${pressure} hPa`

                let windDoc = document.querySelector(".wind")
                let wind = data.wind.speed
                windDoc.textContent = `Wind: ${wind.toString().slice(0,3)} m/s`

                let cloudsDoc = document.querySelector(".clouds")
                let clouds = data.weather[0].main
                cloudsDoc.textContent = clouds

                    
                let tempDoc = document.querySelector(".temperature")
                let temp = Math.round(data.main.temp)
                tempDoc.textContent = `${temp} ℃`
                

                let feelsLikeDoc = document.querySelector(".feels-like") 
                let feelsLike = Math.round(data.main.feels_like)
                feelsLikeDoc.textContent = `Feels like: ${feelsLike} ℃`

                let minTempDoc = document.querySelector(".min-temp") 
                let minTemp = Math.round(data.main.temp_min)
                minTempDoc.textContent = `Min: ${minTemp} ℃`

                let maxTempDoc = document.querySelector(".max-temp") 
                let maxTemp = Math.round(data.main.temp_max)
                maxTempDoc.textContent = `Max: ${maxTemp} ℃`
            }
            })

        function timeUpdate () {
            let timeNowDoc = document.querySelector(".time-now")
            let dateNow = new Date()
            timeNowDoc.textContent = dateNow.toString().slice(15,24)
        }
        let time = 1000;
        setInterval(timeUpdate, time)

    })
})

