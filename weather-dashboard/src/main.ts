import { fetchWeatherData, updateWeatherUI, showError } from "./weather";

const searchInput = document.querySelector("#searchInput") as HTMLInputElement;
const searchButton = document.querySelector("#searchButton");
const locationButton = document.querySelector("#locationButton");

document.addEventListener("DOMContentLoaded", () => {
	searchWeather("Cairo");
});

async function searchWeather(
	city?: string,
	loc?: { lat: string; lon: string }
) {
	if (city && !city.trim()) {
		showError("Please enter a city name");
		return;
	}

	try {
		// Show loading state
		const tempValue = document.getElementById("temp-value");
		if (tempValue) tempValue.textContent = "...";

		const data = await fetchWeatherData(city, loc);
		updateWeatherUI(data);
	} catch (error) {
		const errorMessage =
			error instanceof Error
				? error.message
				: "Failed to fetch weather data";
		showError(errorMessage);
	}
}

locationButton?.addEventListener("click", async () => {
	if (locationButton) {
		if ("geolocation" in navigator) {
			navigator.geolocation.getCurrentPosition((position) => {
				searchWeather(undefined, {
					lon: `${position.coords.longitude}`,
					lat: `${position.coords.latitude}`,
				});
			});
		} else {
			showError("Geolocarion API not available");
		}
	}
});

searchButton?.addEventListener("click", () => {
	if (searchInput?.value) {
		searchWeather(searchInput.value);
	}
});

searchInput?.addEventListener("keypress", (e) => {
	if (e.key === "Enter" && searchInput.value) {
		searchWeather(searchInput.value);
	}
});
