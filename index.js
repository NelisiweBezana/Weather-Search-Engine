function displayTemperature(response) {
  let currentTempValue = document.querySelector(".current-weather-temp-value");
  currentTempValue.innerHTML = Math.round(response.data.temperature.current);

  let currentCity = document.querySelector(".current-weather-city");
  currentCity.innerHTML = response.data.city;

  let weatherDesciption = document.querySelector("#weather-condition");
  weatherDesciption.innerHTML = response.data.condition.description;

  let humidity = document.querySelector("#humidity-value");
  humidity.innerHTML = `${response.data.temperature.humidity}%`;

  let windSpeed = document.querySelector("#windspeed-value");
  windSpeed.innerHTML = `${response.data.wind.speed}km/h`;

  let date = new Date(response.data.time * 1000);
  let dateAndTime = document.querySelector("#date-and-time");
  dateAndTime.innerHTML = showDate(date);

  let weatherIcon = document.querySelector("#current-weather-temp-icon");
  weatherIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-weather-temp-icon" />`;
}

function showDate(date) {
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  let currentTimeHours = date.getHours();
  let currentTimeMinutes = date.getMinutes();
  let fullCurrentTime = `${currentTimeHours}:${
    currentTimeMinutes < 10 ? "0" : ""
  }${currentTimeMinutes}`;

  return `${day} ${fullCurrentTime}`;
}

function searchCity(city) {
  let apiKey = "6ot20ada7f719432a222baf96f0e9bb0";
  let currentWeatherapiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(currentWeatherapiUrl).then(displayTemperature);
}

function handleSearchCity(event) {
  event.preventDefault();

  let searchInput = document.querySelector(".search-form-input");
  searchCity(searchInput.value);
}

function displayForecast() {
  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
          <div class="weather-forecast-date">${day}</div>
          <div class="weather-forecast-icon">🌥️</div>
          <div class="weather-forecast-temp">
            <span class="weather-forecast-temp-max">
              <strong>15&deg</strong> /
            </span>
            <span class="weather-forecast-temp-min">10&deg</span>
          </div>
        </div>
    `;
  });

  let forecastElement = document.querySelector("#weather-forecast");
  forecastElement.innerHTML = forecastHtml;
}

let searchCityForm = document.querySelector("#search-form");
searchCityForm.addEventListener("submit", handleSearchCity);

searchCity("sandton");
displayForecast();
