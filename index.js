#!/usr/bin/env node
import boxen from 'boxen';
import yargs from 'yargs/yargs';

const argv = yargs(process.argv.slice(2))
	.option('latitude', {
		alias: 'lat',
		default: 39.7456,
		description: 'Latitude coordinate',
		type: 'number',
		demandOption: false, // Required option
	})

	.option('longitude', {
		alias: 'lon',
		default: -97.0892,
		description: 'longitude coordinate',
		type: 'number',
		demandOption: false, // Required option
	})
	.option('hourly', {
		alias: 'h',
		default: false,
		description: 'Request for hourly forecast',
		type: 'boolean',
		demandOption: false, // Required option
	})
	.argv;

console.log(`Latitude: ${argv.latitude}`);
console.log(`Longitude: ${argv.longitude}`);

console.log('(%d,%d.%s)', argv.latitude, argv.longitude, argv.hourly);

if (argv.hourly) {
	const url = `https://api.weather.gov/points/${argv.latitude},${argv.longitude}`;
	getWeatherHourly(url);
} else {
	const url = `https://api.weather.gov/points/${argv.latitude},${argv.longitude}`;
	getWeather(url);
}

function getWeatherHourly(url) {
	// Url for api call

	const request = fetch(url)
		// convert json text to json object
		.then((response) => response.json())
		// getting the endpoint url form json object that contains the forecast
		.then((data) => {
			const endpoint = data.properties.forecastHourly;
			// console.log(endpoint)
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

			let forecast = '';
			firstTwelvePeriods.forEach((period) => {
				// print first 12
				forecast += `${period.temperature} with ${period.shortForecast} \n`
			});

			const boxenOptions = { title: 'Weather App', padding: 1, margin: 1, borderStyle: 'double' };
			const message = 'Hourly Forecast\n\n' + forecast;

			console.log(boxen(message, boxenOptions));
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}

function getWeather(url) {
	// Url for api call

	const request = fetch(url)
		// convert json text to json object
		.then((response) => response.json())
		// getting the endpoint url form json object that contains the forecast
		.then((data) => {
			const endpoint = data.properties.forecast;
			console.log(endpoint);
			return fetch(endpoint);
		})
		// converting json text to json object
		.then((response) => response.json())
		// getting the weather information form the text
		.then((data) => {
			console.log();

			const WeeklyForecast = data.properties.periods;

			// console.log(WeeklyForecast[0])
			const temp = String(WeeklyForecast[0].temperature);
			const humidity = String(WeeklyForecast[0].relativeHumidity['value']);
			const windSpeed = WeeklyForecast[0].windSpeed;
			const forecast = WeeklyForecast[0].detailedForecast;

			const boxenOptions = { title: 'Weather App', padding: 1, margin: 1, borderStyle: 'double' };
			const message = 'Weekly Forecast\n\n' +`Temperature: ${temp}\nHumidity: ${humidity}\nWind Speed:${windSpeed}\n\n${forecast}`;

			console.log(boxen(message, boxenOptions));
		})
		.catch((error) => {
			console.error('Error:', error);
		});
}
