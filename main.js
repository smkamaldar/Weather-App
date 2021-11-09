window.addEventListener("load", () => {
  let long;
  let lat;
  let temperature = document.querySelector(".temperature");
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );
  let temperatureDegree = document.querySelector(".temperature-degree");
  let locationTimezone = document.querySelector(".location-timezone");
  let temperatureIcon = document.querySelector(".temperature-icon");
  let temperatureSection = document.querySelector(".degree-section");
  let temperatureSpan = document.querySelector(".degree-section span");

  let icon = document.querySelector("icon");
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;
     
      const api = `http://api.weatherapi.com/v1/current.json?key=ea0be0e6507e479ca39111137210811&q=${lat},${long}&aqi=no`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const { temp_c, condition, temp_f } = data.current;
          const { name } = data.location;
          temperatureDegree.textContent = temp_c;
          temperatureDescription.textContent = condition.text;
          locationTimezone.textContent = name;
          temperatureIcon.setAttribute("src", condition.icon);

          temperatureSection.addEventListener("click", () => {
            if (temperatureSpan.textContent === "C") {
              temperatureSpan.textContent = "F";
              temperatureDegree.textContent = temp_f;
            } else {
              temperatureSpan.textContent = "C";
              temperatureDegree.textContent = temp_c;
            }
          });
        });
    });
  }
});

