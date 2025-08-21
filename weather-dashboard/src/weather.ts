import { getApiUrl } from "./config";

interface WeatherCondition {
	main: string;
	description: string;
	icon: string;
}

interface MainWeatherData {
	temp: number;
	feels_like: number;
	humidity: number;
	pressure: number;
	temp_max: number;
	temp_min: number;
}

interface WindData {
	speed: number;
	deg?: number;
}

interface ForecastItem {
	dt: number;
	main: MainWeatherData;
	weather: WeatherCondition[];
	wind: WindData;
	dt_txt: string;
}

interface ForecastData {
	list: ForecastItem[];
	city: {
		name: string;
		country: string;
	};
}

interface WeatherData {
	name: string;
	sys: {
		country: string;
		sunrise?: number;
		sunset?: number;
	};
	main: MainWeatherData;
	weather: WeatherCondition[];
	wind: WindData;
	visibility?: number;
	dt: number;
	timezone?: number;
}

export async function fetchWeatherData(
	city?: string,
	loc?: { lat: string; lon: string }
): Promise<{ current: WeatherData; forecast: ForecastData }> {
	try {
		const params: {
			q?: string;
			lon?: string;
			lat?: string;
		} = {};
		if (city) {
			params.q = city;
		}
		if (loc) {
			params.lat = loc.lat;
			params.lon = loc.lon;
		}
		const currentWeatherUrl = getApiUrl("weather", params);
		const forecastUrl = getApiUrl("forecast", { ...params, cnt: "40" });

		const [currentResponse, forecastResponse] = await Promise.all([
			fetch(currentWeatherUrl),
			fetch(forecastUrl),
		]);

		if (!currentResponse.ok || !forecastResponse.ok) {
			const errorText = await currentResponse
				.text()
				.catch(() => "Unknown error");
			throw new Error(`Failed to fetch weather data: ${errorText}`);
		}

		const [currentData, forecastData] = await Promise.all([
			currentResponse.json() as Promise<WeatherData>,
			forecastResponse.json() as Promise<ForecastData>,
		]);

		return {
			current: currentData,
			forecast: forecastData,
		};
	} catch (error) {
		console.error("Error fetching weather data:", error);
		throw new Error(
			"Failed to fetch weather data. Please check your connection and try again."
		);
	}
}

// Format time helper function (commented out as it's not currently used)
// function formatTime(timestamp: number): string {
//   const date = new Date(timestamp * 1000);
//   return date.toLocaleTimeString([], {
//     hour: '2-digit',
//     minute: '2-digit',
//     hour12: true
//   });
// }

function formatDay(timestamp: number): string {
	const date = new Date(timestamp * 1000);
	const today = new Date();

	if (date.toDateString() === today.toDateString()) {
		return "Today";
	}

	return date.toLocaleDateString("en-US", {
		weekday: "short",
		month: "short",
		day: "numeric",
	});
}

// Update the main weather UI with current and forecast data
export function updateWeatherUI(data: {
	current: WeatherData;
	forecast: ForecastData;
}): void {
	try {
		const { current, forecast } = data;
		const cityElement = document.getElementById("city");
		const countryElement = document.getElementById("country");
		const weatherDescElement = document.getElementById("weather-desc");
		const weatherIconElement = document.getElementById(
			"weather-icon"
		) as HTMLImageElement | null;
		const tempValueElement = document.getElementById("temp-value");
		const weatherConditionElement =
			document.getElementById("weather-condition");
		const feelsLikeElement = document.getElementById("feels-like");
		const humidityElement = document.getElementById("humidity");
		const windSpeedElement = document.getElementById("wind-speed");
		const localTimeElement = document.getElementById("local-time");
		const highTempElement = document.getElementById("high-temp");
		const lowTempElement = document.getElementById("low-temp");
		const uvIndexElement = document.getElementById("uv-index");
		const visibilityElement = document.getElementById("visibility");

		if (cityElement) cityElement.textContent = current.name;
		if (countryElement) countryElement.textContent = current.sys.country;
		if (weatherDescElement)
			weatherDescElement.textContent = current.weather[0].description;

		if (weatherIconElement && current.weather.length > 0) {
			const iconCode = current.weather[0].icon;
			weatherIconElement.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;
			weatherIconElement.alt = current.weather[0].description;
			weatherIconElement.title = current.weather[0].main;
			weatherIconElement.className =
				"w-16 h-16 drop-shadow-lg drop-shadow-blue-500";
		}

		if (tempValueElement) {
			tempValueElement.textContent = Math.round(
				current.main.temp
			).toString();
		}

		if (weatherConditionElement && current.weather.length > 0) {
			weatherConditionElement.textContent = current.weather[0].main;
		}

		if (feelsLikeElement)
			feelsLikeElement.textContent = `Feels like ${Math.round(
				current.main.feels_like
			).toString()}°C `;
		if (humidityElement)
			humidityElement.textContent = current.main.humidity.toString();
		if (windSpeedElement)
			windSpeedElement.textContent = Math.round(
				current.wind.speed * 3.6
			).toString();

		if (highTempElement)
			highTempElement.textContent = `${current.main.temp_max}°C`;
		if (lowTempElement)
			lowTempElement.textContent = `${current.main.temp_min}°C`;
		if (visibilityElement)
			visibilityElement.textContent = `${current.visibility}KM`;
		if (uvIndexElement) uvIndexElement.textContent = `N/A`;

		// Update hourly forecast
		const hourlyContainer = document.getElementById(
			"hourly-forecast-container"
		);
		const hourlyDateElement = document.getElementById(
			"hourly-forecast-date"
		);
		if (hourlyContainer && hourlyDateElement) {
			updateHourlyForecast(forecast, hourlyContainer, hourlyDateElement);
		}

		// Update daily forecast
		const dailyContainer = document.getElementById(
			"daily-forecast-container"
		);
		if (dailyContainer) {
			updateDailyForecast(forecast, dailyContainer);
		}

		// Update local time
		const currentTime = new Date();
		if (localTimeElement) {
			localTimeElement.textContent = `Last updated: ${currentTime.toLocaleTimeString(
				[],
				{ hour: "2-digit", minute: "2-digit" }
			)}`;
		}
	} catch (error) {
		console.error("Error updating UI:", error);
		throw new Error("Failed to update weather information");
	}
}

function updateHourlyForecast(
	forecast: ForecastData,
	container: HTMLElement,
	dateElement: HTMLElement
): void {
	try {
		// Get next 24 hours of forecast (8 items, 3 hours apart)
		const hourlyForecast = forecast.list.slice(0, 8);

		// Update date
		const currentDate = new Date();
		dateElement.textContent = currentDate.toLocaleDateString("en-US", {
			weekday: "long",
			month: "short",
			day: "numeric",
		});

		// Clear previous content
		container.innerHTML = "";

		// Add hourly forecast items
		hourlyForecast.forEach((item) => {
			const time = new Date(item.dt * 1000);
			const forecastItem = document.createElement("div");

			const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0]?.icon}@2x.png`;
			const weatherDescription = item.weather[0]?.description || "N/A";
			const temperature = Math.round(item.main.temp);

			container.appendChild(forecastItem);
			forecastItem.outerHTML = `
	<div class="flex flex-col items-center p-3 min-w-[70px] w-[70px] bg-white/50 rounded-lg flex-1 h-fit shadow-sm ring-1 ring-gray-200">
        <div class="text-sm font-medium text-gray-700">${time.getHours()}:00</div>
        <div class="my-1">
          <img
            src="${iconUrl}"
            alt="${weatherDescription}"
            class="w-12 h-12 drop-shadow-sm drop-shadow-blue-500"
            loading="lazy"
            title="${weatherDescription}"
          >
        </div>
        <div class="font-semibold text-gray-800">${temperature}°</div>
      </div>`;
		});
	} catch (error) {
		console.error("Error updating hourly forecast:", error);
		container.innerHTML =
			'<p class="text-red-500 text-sm">Unable to load hourly forecast</p>';
	}
}

function updateDailyForecast(
	forecast: ForecastData,
	container: HTMLElement
): void {
	try {
		// Get one forecast per day (every 8th item, as we have 3-hour intervals)
		const dailyForecast = forecast.list.filter(
			(_, index) => index % 8 === 0
		);

		// Clear previous content
		container.innerHTML = "";

		// Add daily forecast items
		dailyForecast.forEach((item, index) => {
			const dayName = formatDay(item.dt);
			const isToday = index === 0;

			const forecastItem = document.createElement("div");
			forecastItem.className =
				"flex items-center justify-between p-3 bg-white/70 rounded-lg ring-1 ring-gray-200 mb-2 shadow-sm hover:shadow transition";

			const iconUrl = `https://openweathermap.org/img/wn/${item.weather[0]?.icon}.png`;
			const weatherDescription = item.weather[0]?.description || "N/A";
			const maxTemp = Math.round(item.main.temp_max || item.main.temp);
			const minTemp = Math.round(item.main.temp_min || item.main.temp);

			forecastItem.innerHTML = `
        <div class="font-medium text-gray-800 w-24">
          ${isToday ? "Today" : dayName}
        </div>
        <div class="flex items-center flex-1 justify-center">
          <img
            src="${iconUrl}"
            alt="${weatherDescription}"
            class="w-10 h-10 mr-2 drop-shadow-sm drop-shadow-blue-500"
            loading="lazy"
            title="${weatherDescription}"
          >
          <span class="text-sm text-gray-600 capitalize">${weatherDescription}</span>
        </div>
        <div class="flex items-center space-x-3">
          <span class="font-semibold text-gray-800">${maxTemp}°</span>
          <span class="text-gray-500">${minTemp}°</span>
        </div>
      `;

			container.appendChild(forecastItem);
		});
	} catch (error) {
		console.error("Error updating daily forecast:", error);
		container.innerHTML =
			'<p class="text-red-500 text-sm">Unable to load daily forecast</p>';
	}
}

// Show error message to the user
export function showError(message: string): void {
	try {
		// Remove any existing error messages first
		const existingError = document.querySelector(".error-notification");
		if (existingError) {
			existingError.remove();
		}

		// Create and show new error message
		const errorElement = document.createElement("div");
		errorElement.className =
			"error-notification fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-start max-w-md";

		// Add error icon
		const icon = document.createElement("span");
		icon.className = "mr-2 text-xl";
		icon.innerHTML = "⚠️";

		// Add error message
		const messageElement = document.createElement("span");
		messageElement.className = "flex-1";
		messageElement.textContent = message;

		// Add close button
		const closeButton = document.createElement("button");
		closeButton.className = "ml-4 text-white hover:text-gray-200";
		closeButton.innerHTML = "&times;";
		closeButton.onclick = () => errorElement.remove();

		// Assemble the error element
		errorElement.appendChild(icon);
		errorElement.appendChild(messageElement);
		errorElement.appendChild(closeButton);

		// Add to document
		document.body.appendChild(errorElement);

		// Auto-remove after delay
		setTimeout(() => {
			if (document.body.contains(errorElement)) {
				errorElement.remove();
			}
		}, 5000);

		// Add click-outside-to-close functionality
		const handleClickOutside = (event: MouseEvent) => {
			if (errorElement && !errorElement.contains(event.target as Node)) {
				errorElement.remove();
				document.removeEventListener("click", handleClickOutside);
			}
		};

		setTimeout(() => {
			document.addEventListener("click", handleClickOutside);
		}, 0);
	} catch (error) {
		console.error("Error showing error message:", error);
		// Fallback to alert if DOM manipulation fails
		alert(`Error: ${message}`);
	}
}
