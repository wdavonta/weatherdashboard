
function startPage(){
    var inputEl = document.getElementById("cityInput");
    var searchEl = document.getElementById("search-button");
    var nameEl = document.getElementById("city-name");
    var currentTempEl = document.getElementById("temperature");
    var currentUvEl = document.getElementById("Uv-Index");
    var currentTemp = document.getElementById("temperature");
    var currentSpeedEl =document.getElementById("wind-speed");
    var currentHumidity =document.getElementById("humidity");
    var currentPicEl =document.getElementById("current-pic");



// saved items
let searchHistory= JSON.parse(localStorage.getItem("search"))



var apiKey = "dfb181ee394788be8c32c509c7dca41c"


// api key for weather 

function getweather(cityName){

    let apiURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + cityName + "&appid=" + apiKey;
    axios.get(apiURL)
    .then(function(response){
        console.log(response);
        
        // date
        const currentDate = new Date(response.data.dt*1000);
        console.log(currentDate);
        const day = currentDate.getDate();
        const month = currentDate.getMonth() + 1;
        const year = currentDate.getFullYear();
        nameEl.innerHTML = response.data.name + " (" + month + "/" + day + "/" + year + ") ";
        let weatherPic = response.data.weather[0].icon;
            currentPicEl.setAttribute("src","https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
            currentPicEl.setAttribute("alt",response.data.weather[0].description);
            currentTemp.innerHTML = "Temperature: " + k2f(response.data.main.temp) + " &#176F";
            currentHumidity.innerHTML = "Humidity: " + response.data.main.humidity + "%";
            currentSpeedEl.innerHTML = "Wind Speed: " + response.data.wind.speed + " MPH";
        let lat = response.data.coord.lat;
        let lon = response.data.coord.lon;
        let uvUrl = "https://api.openweathermap.org/data/2.5/forecast?lat=" + lat + "&lon=" + lon + "&appid=" + apiKey + "&cnt=1";
        axios.get(uvUrl)
    .then(function(response){
        let 
  
    });
// let apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=${}&APPID=${apiKey}&units=imperial';
//   $.ajax({
//   url: apiUrl,
//   method: "GET"
//   })

// var currentDate = new Date

// var day = currentDate.getDate
// var month = currentDate.getMonth()
// var year = currentDate.getFullYear();

// });



searchEl.addEventListener("click",function() {
    var searchTerm =inputEl.nodeValue;
    getweather(searchTerm);
    searchHistory.push(searchTerm);
    localStorage.setItem("search", JSON.stringify(searchHistory));
    renderSearchHistory();
})

// searchEL.on("click", function(e) {
//     e.preventDefault();
//     if (search-button.val() === "") {
//         alert("You must enter a city");
//         return;
//     }
//     console.log("clicked button")
//     getWeather(search-button.val());
// });

}
}
startPage();