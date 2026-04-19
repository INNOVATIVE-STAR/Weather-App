const apiKey = "ad24ae44092871926cc4f1a8a84fa142";

// 🔎 Search by City Name
async function getWeatherByCity() {
    const city = document.getElementById("cityInput").value;

    if (!city) {
        alert("Please enter a city name");
        return;
    }

    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    fetchWeather(url);
}

// 📍 Auto Detect Location
function getWeatherByLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
            fetchWeather(url);
        }, () => {
            alert("Location access denied!");
        });
    } else {
        alert("Geolocation not supported by your browser.");
    }
}

// 🌤 Fetch Weather Data
async function fetchWeather(url) {
    try {
        const response = await fetch(url);
        const data = await response.json();

        if (data.cod === 200) {
            const weatherHTML = `
                <h3>${data.name}, ${data.sys.country}</h3>
                <p>🌡 Temperature: ${data.main.temp} °C</p>
                <p>🌤 Condition: ${data.weather[0].description}</p>
                <p>💧 Humidity: ${data.main.humidity}%</p>
                <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
            `;

            document.getElementById("weatherResult").innerHTML = weatherHTML;
        } else {
            document.getElementById("weatherResult").innerHTML = "City not found!";
        }

    } catch (error) {
        document.getElementById("weatherResult").innerHTML = "Error fetching data.";
        console.log(error);
    }
}