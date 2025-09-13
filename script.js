async function getWeather() {
  const apiKey = "2ed76ff11c4279085164cf2a6dde9342"; // your API key
  const city = document.getElementById("cityInput").value;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

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
