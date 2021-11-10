let long;
let lat;
let temperatureDescription = document.querySelector(".temperature-description");
let temperatureDegree = document.querySelector(".temperature-degree");
let locationTimezone = document.querySelector(".location-timezone");
let temperatureIcon = document.querySelector(".temperature-icon");
let temperatureSection = document.querySelector(".degree-section");
let temperatureSpan = document.querySelector(".degree-section span");

// Run when: on page load, get current lat and long and calls
// the api
window.addEventListener("load", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
      getWeather(lat, long);
    });
  }
});

/**
 * this function get the details of weather for provided lat and long
 * also populates value on the page.
 * @param {latitude of a location} lat 
 * @param {longitude of a location} long 
 */
function getWeather(lat, long) {
  const api = `https://api.weatherapi.com/v1/current.json?key=ea0be0e6507e479ca39111137210811&q=${lat},${long}&aqi=no`;

  fetch(api)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      const { temp_c, temp_f, condition } = data.current;
      const { name } = data.location;

      // set the location, degree, and icon on the page
      temperatureDegree.textContent = temp_c;
      temperatureDescription.textContent = condition.text;
      locationTimezone.textContent = name;
      temperatureIcon.setAttribute("src", condition.icon);

      temperatureSection.addEventListener("click", () => {
        toggleWeatherDegree(temp_c, temp_f);
      });
    });
}

/**
 * this function allows user to toggle the temperatur 
 * @param {temperature celisios} temp_c 
 * @param {temperature farenhide} temp_f 
 */
function toggleWeatherDegree(temp_c, temp_f) {
  if (temperatureSpan.textContent === "C") {
    temperatureSpan.textContent = "F";
    temperatureDegree.textContent = temp_f;
  } else {
    temperatureSpan.textContent = "C";
    temperatureDegree.textContent = temp_c;
  }
}
