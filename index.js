#!/usr/bin/env node

const argv = require("yargs/yargs")(process.argv.slice(2))
	//.usage('Usage: -lat [num] -lon [num]')
	.option("latitude", {
		alias: "lat",
		default: 39.7456,
		description: "Latitude coordinate",
		type: "number",
		demandOption: false, // Required option
	})

	.option("longitude", {
		alias: "lon",
		default: -97.0892,
		description: "longitude coordinate",
		type: "number",
		demandOption: false, // Required option
	})
	.option("hourly", {
		alias: "h",
		default: false,
		description: "Request for hourly forecast",
		type: "boolean",
		demandOption: false, // Required option
	})
	.argv;
console.log(`Latitude: ${argv.latitude}`);
console.log(`Longitude: ${argv.longitude}`);

console.log("(%d,%d.%s)", argv.latitude, argv.longitude, argv.hourly);

if (argv.hourly) {
	const url = `https://api.weather.gov/points/${argv.latitude},${argv.longitude}`;
	getWeatherHourly(url);
} else {
	const url = `https://api.weather.gov/points/${argv.latitude},${argv.longitude}`;
	getWeather(url);
}

function getWeatherHourly(url) {
	//Url for api call

	const request = fetch(url)
		//convert json text to json object
		.then((response) => response.json())
		//getting the endpoint url form json object that contains the forecast
		.then((data) => {
			const endpoint = data.properties.forecastHourly;
			//console.log(endpoint)
			return fetch(endpoint);
		})
		// converting json text to json object
		.then((response) => response.json())
		// getting the weather information form the text
		.then((data) => {
			console.log();
			// returns 100 hours worth of hourly forecast
			const WeeklyForecastByHour = data.properties.periods;
			// Obtaining only the first 12
			const firstTwelvePeriods = WeeklyForecastByHour.slice(0, 12);

			firstTwelvePeriods.forEach((period) => {
				// print first 12
				console.log(`${period.temperature} with ${period.shortForecast} \n`);
			});
		});
}

function getWeather(url) {
	//Url for api call

	const request = fetch(url)
		//convert json text to json object
		.then((response) => response.json())
		//getting the endpoint url form json object that contains the forecast
		.then((data) => {
			const endpoint = data.properties.forecast;
			console.log(endpoint)
			return fetch(endpoint);
		})
		// converting json text to json object
		.then((response) => response.json())
		// getting the weather information form the text
		.then((data) => {
			console.log();
			
			const WeeklyForecast = data.properties.periods;
			
			// console.log(WeeklyForecast[0])
			// console.log(WeeklyForecast[0].temperature);
			// console.log(WeeklyForecast[0].relativeHumidity['value']);
			// console.log(WeeklyForecast[0].windSpeed);
			// console.log(WeeklyForecast[0].detailedForecast);
			
			const weather = {
				temp: WeeklyForecast[0].temperature,
				humidity: WeeklyForecast[0].relativeHumidity['value'],
				windSpeed: WeeklyForecast[0].windSpeed,
				detailedForecast: WeeklyForecast[0].detailedForecast
			} 
		
			return weather
		});
}