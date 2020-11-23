
function startPage(){
    const inputEl = document.getElementById("cityInput");
    const searchEl = document.getElementById("search-button");
    const nameEl = document.getElementById("city-name");
    const currentTemp = document.getElementById("temperature");
    const currentUvEl = document.getElementById("UV-index");
    const currentSpeedEl = document.getElementById("wind-speed");
    const currentHumidity = document.getElementById("humidity");
    const currentPic = document.getElementById("current-pic");
    const history =   document.getElementById("history");

let searchHistory= JSON.parse(localStorage.getItem("search")) || [];
console.log(searchHistory);


// api key
const apiKey = "dfb181ee394788be8c32c509c7dca41c";



// name and current weather
function getWeather(cityName) {
            let apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey;
            axios.get(apiURL)
            .then(function(response){
                console.log(response);
                const currentDate = new Date(response.data.dt*1000);
                console.log(currentDate);
                const day = currentDate.getDate();
                const month = currentDate.getMonth() + 1;
                const year = currentDate.getFullYear();
                nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
                let weatherPic = response.data.weather[0].icon;
                currentPic.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
                currentPic.setAttribute("alt",response.data.weather[0].description);
                currentTemp.innerHTML = "Temperature:" + k2f(response.data.main.temp) + " &#176F";
                currentHumidity.innerHTML = "Humidity:" + response.data.main.humidity + "%";
                currentSpeedEl.innerHTML = "Wind Speed:" + response.data.wind.speed + " MPH";
            let lat = response.data.coord.lat;
            let lon = response.data.coord.lon;
            let UvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=" + 5;
            axios.get(UvURL)
            .then(function(response){
                let UVIndex = document.createElement("span"); 
                UVIndex.innerHTML = response.data[0].value;
                currentUvEl.innerHTML = "UV-index:";
                currentUvEl.append(UVIndex);
            });
    // 5Day forecast
            let cityID = response.data.id;
            let forecastQueryURL = "https://api.openweathermap.org/data/2.5/forecast?id=" + cityID + "&appid=" + apiKey;
            axios.get(forecastQueryURL)
            .then(function(response){
    
                console.log(response);
                const forecastEls = document.querySelectorAll(".forecast");
                for (i=0; i<forecastEls.length; i++) {
                    forecastEls[i].innerHTML = "";
                    const forecastIndex = i*8 + 4;
                    const forecastDate = new Date(response.data.list[forecastIndex].dt * 1000);
                    const forecastDay = forecastDate.getDate();
                    const forecastMonth = forecastDate.getMonth() + 1;
                    const forecastYear = forecastDate.getFullYear();
                    const forecastDateEl = document.createElement("p");
                    forecastDateEl.setAttribute("class","mt-3 mb-0 forecast-date");
                    forecastDateEl.innerHTML = forecastMonth + "/" + forecastDay + "/" + forecastYear;
                    forecastEls[i].append(forecastDateEl);
                    const forecastWeatherEl = document.createElement("img");
                    forecastWeatherEl.setAttribute("src","https://openweathermap.org/img/wn/" + response.data.list[forecastIndex].weather[0].icon + "@2x.png");
                    forecastWeatherEl.setAttribute("alt",response.data.list[forecastIndex].weather[0].description);
                    forecastEls[i].append(forecastWeatherEl);
                    const forecastTempEl = document.createElement("p");
                    forecastTempEl.innerHTML = "Temp: " + k2f(response.data.list[forecastIndex].main.temp) + " &#176F";
                    forecastEls[i].append(forecastTempEl);
                    const forecastHumidityEl = document.createElement("p");
                    forecastHumidityEl.innerHTML = "Humidity: " + response.data.list[forecastIndex].main.humidity + "%";
                    forecastEls[i].append(forecastHumidityEl);
                    }
                })
            });  
        }
    
        searchEl.addEventListener("click",function() {
            const searchTerm = inputEl.value;
            getWeather(searchTerm);
            searchHistory.push(searchTerm);
            localStorage.setItem("search",JSON.stringify(searchHistory));
            renderSearchHistory();
        })
    
        
    
        function k2f(K) {
            return Math.floor((K - 273.15) *1.8 +32);
        }
    // History for cit
        function renderSearchHistory() {
            history.innerHTML = "";
            for (let i=0; i<searchHistory.length; i++) {
                const historyItem = document.createElement("input");
                historyItem.setAttribute("type","text");
                historyItem.setAttribute("readonly",true);
                historyItem.setAttribute("class", "form-control d-block bg-white");
                historyItem.setAttribute("value", searchHistory[i]);
                historyItem.addEventListener("click",function() {
                    getWeather(historyItem.value);
                })
                history.append(historyItem);
            }
        }
    
        renderSearchHistory();
        if (searchHistory.length > 0) {
            getWeather(searchHistory[searchHistory.length - 1]);
        }
    
    

    
    }
startPage();