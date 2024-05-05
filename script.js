const apiKey = "98c0f0d20a0c430ca9d3ae66c71cd5cc";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather(city) {
  const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

  if (response.status === 404) {
    alert("Wrong city name!!!");
    searchBox.value = "";
  } else {
    const data = await response.json();

    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";

    if (data.weather[0].main === "Clouds") {
      weatherIcon.src = "images/clouds.png";
    } else if (data.weather[0].main === "Clear") {
      weatherIcon.src = "images/clear.png";
    } else if (data.weather[0].main === "Rain") {
      weatherIcon.src = "images/rain.png";
    } else if (data.weather[0].main === "Drizzle") {
      weatherIcon.src = "images/drizzle.png";
    } else if (data.weather[0].main === "Mist") {
      weatherIcon.src = "images/mist.png";
    }
    // Clear the search box after completing the search
    searchBox.value = "";
  }
}

searchBtn.addEventListener("click", () => {
  const city = searchBox.value.trim(); // Trim to remove leading/trailing whitespace
  if (city) {
    checkWeather(city);
  } else {
    searchBox.classList.add("error");
    setTimeout(() => {
      searchBox.classList.remove("error");
    }, 1000);
  }
});

searchBox.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    e.preventDefault();
    const city = searchBox.value.trim(); // Trim to remove leading/trailing whitespace
    if (city) {
      checkWeather(city);
    } else {
      searchBox.classList.add("error");
      setTimeout(() => {
        searchBox.classList.remove("error");
      }, 1000);
    }
  }
});
