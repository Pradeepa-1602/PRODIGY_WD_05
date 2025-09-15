const apiKey = "2ed76ff11c4279085164cf2a6dde9342"; // your OpenWeatherMap API key

// ✅ Get weather by city
async function getWeather() {
  const city = document.getElementById("cityInput").value;
  if (!city) {
    alert("Please enter a city name");
    return;
  }
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  fetchWeather(url);
}

// ✅ Get weather by current location
function getLocationWeather() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=metric`;
        fetchWeather(url);
      },
      () => {
        document.getElementById("weatherResult").innerHTML = `<p>⚠️ Unable to fetch location</p>`;
      }
    );
  } else {
    alert("Geolocation not supported in your browser.");
  }
}

// ✅ Fetch weather from API
async function fetchWeather(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.cod === 200) {
      document.getElementById("weatherResult").innerHTML = `
        <h3>${data.name}, ${data.sys.country}</h3>
        <p>🌡 Temperature: ${data.main.temp} °C</p>
        <p>☁️ Weather: ${data.weather[0].description}</p>
        <p>💨 Wind Speed: ${data.wind.speed} m/s</p>
        <p>💧 Humidity: ${data.main.humidity}%</p>
      `;
    } else {
      document.getElementById("weatherResult").innerHTML = `<p>❌ City not found!</p>`;
    }
  } catch (error) {
    document.getElementById("weatherResult").innerHTML = `<p>⚠️ Error fetching data</p>`;
  }
}
