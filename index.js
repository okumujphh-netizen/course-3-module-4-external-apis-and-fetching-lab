// index.js
const weatherApi = "https://api.weather.gov/alerts/active?area="

// Your code here!




const stateInput = document.getElementById("state-input");
const fetchButton = document.getElementById("fetch-alerts");
const alertsDisplay = document.getElementById("alerts-display");
const errorMessage = document.getElementById("error-message");

function fetchWeatherAlerts(state) {
    fetch(weatherApi + state)
        .then((response) => {
            if (!response.ok) {
                throw new Error("Failed to fetch weather alerts.");
            }

            return response.json();
        })
        .then((data) => {
            console.log(data);
            displayAlerts(data);
        })
        .catch((error) => {
            console.log(error.message);

            alertsDisplay.replaceChildren();
            errorMessage.textContent = error.message;
            errorMessage.classList.remove("hidden");
        });
}

function displayAlerts(data) {
    alertsDisplay.replaceChildren();

    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    const alerts = data.features || [];

    const heading = document.createElement("h2");
    heading.textContent = `${data.title}: ${alerts.length}`;
    alertsDisplay.appendChild(heading);

    if (alerts.length === 0) {
        const message = document.createElement("p");
        message.textContent = "No active weather alerts.";
        alertsDisplay.appendChild(message);
        return;
    }

    const list = document.createElement("ul");

    alerts.forEach((alert) => {
        const item = document.createElement("li");
        item.textContent =
            alert.properties.headline || "Headline unavailable";

        list.appendChild(item);
    });

    alertsDisplay.appendChild(list);
}

fetchButton.addEventListener("click", () => {
    const state = stateInput.value.trim().toUpperCase();

    alertsDisplay.replaceChildren();
    errorMessage.textContent = "";
    errorMessage.classList.add("hidden");

    if (!/^[A-Z]{2}$/.test(state)) {
        errorMessage.textContent =
            "Please enter a two-letter state abbreviation.";
        errorMessage.classList.remove("hidden");
        stateInput.value = "";
        return;
    }

    stateInput.value = "";
    fetchWeatherAlerts(state);
});
