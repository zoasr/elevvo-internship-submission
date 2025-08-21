export const API_KEY = import.meta.env.VITE_API_KEY;
export const API_BASE_URL = "https://api.openweathermap.org/data/2.5";

export function getApiUrl(
	endpoint: string,
	params: Record<string, string> = {}
) {
	const queryParams = new URLSearchParams({
		...params,
		appid: API_KEY,
		units: "metric",
	});
	return `${API_BASE_URL}/${endpoint}?${queryParams}`;
}
