// WEATHER APP

const weatherForm = document.querySelector(".input-container");
const cityInput = document.querySelector(".city-input");
const card = document.querySelector(".card");
const apikey = "aae478236b8a30c22f512a2976d8c2c2";

weatherForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const city = cityInput.value;

    if(city){
        try{
            const weatherData = await getWeatherData(city);
            displayWeatherInfo(weatherData);
        }
        catch(error){
            console.error(error);
            displayError(error);
        }
    }
    else{
        displayError("City name not found..error-status: 404ERROR..If entered a city name, make sure that is listed in 'International-weather-org/cities#name' and if not register your city and its co-ordinatess for further requests...");
    }
});

async function getWeatherData(city){
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apikey}`;
    const response = await fetch(apiUrl);
    console.log(response);

    if(response === false){
        throw new Error("could not fetch data from server..error encountered");
    }
    return await response.json();
}

function displayWeatherInfo(data){
    const { name: city, 
            main: {temp, humidity}, 
            weather: [{description, id}]} = data;

    card.textContent = "";
    card.style.display = "flex";

    const cityDisplay = document.createElement("h1");
    const tempDisplay = document.createElement("h1");
    const humidityDisplay = document.createElement("p");
    const descriptionDisplay = document.createElement("p");
    const weatherDisplay = document.createElement("p");

    cityDisplay.textContent = city;
    tempDisplay.textContent = `${Math.round(temp - 273.15)}°C`;
    humidityDisplay.textContent = `Humidity: ${humidity}%`;
    descriptionDisplay.textContent = description;
    weatherDisplay.textContent = getWeatherEmoji(id);


    cityDisplay.classList.add("cityDisplay");
    tempDisplay.classList.add("tempDisplay");
    humidityDisplay.classList.add("humidityDisplay");
    descriptionDisplay.classList.add("descriptionDisplay");
    weatherDisplay.classList.add("weatherEmoji");

    card.appendChild(cityDisplay);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(weatherDisplay);

}

function getWeatherEmoji(weatherId){
    switch(true){
        case(weatherId >= 200 && weatherId < 300):
            return "⛈️";
        case(weatherId >= 300 && weatherId < 400):
            return "🌧️";
        case(weatherId >= 500 && weatherId < 600):
            return "🌧️";
        case(weatherId >= 600 && weatherId < 700):
            return "❄️";
        case(weatherId >= 700 && weatherId < 800):
            return "🌤️";
        case(weatherId === 800):
            return "☀️";
        case(weatherId === 800 || weatherId > 804):
            return "☁️";
        default:
            return "👻";
    }
}

function displayError(message){
    const errorDisplay = document.createElement("p");
    errorDisplay.textContent = `Error report: ${message}`;
    errorDisplay.classList.add("errorDisplay");

    card.textContent = "";
    card.style.display = "block";
    card.appendChild(errorDisplay);
}