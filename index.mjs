#!/usr/bin/env node
/*
Purpose: This is a Weather app Command-line tool that retrieves weather data from National Weather. App was originally in common js and this is converted to es6. 
Service. 
Author: Devonte Hillman 
Date: May 14, 2024
*/

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

async function getWeatherHourly(url) {
	// Url for api call
	const response = await fetch(url);
	
	// convert json text to json object
	const json = await response.json();
	
	// getting the endpoint url form json object that contains the forecast
	const endpoint = await json.properties.forecastHourly;
	
	console.log(endpoint);

	const response2 = await fetch(endpoint);
	// converting json text to json object
	
	const data = await response2.json();
	// getting the weather information form the text
	
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
		
	// .catch((error) => {
	// 	console.error('Error:', error);
	// });
};

async function getWeather(url) {
	// Url for api call

	const response3 = await fetch(url)
	// convert json text to json object
	const data = await response3.json()
	
	// getting the endpoint url form json object that contains the forecast
	const endpoint = data.properties.forecast;
	
	//console.log(endpoint);
	
	const response4 = await fetch(endpoint);
	// converting json text to json object
	const data2 = await response4.json()
	
	// getting the weather information form the text
	const WeeklyForecast = await data2.properties.periods;

	// console.log(WeeklyForecast[0])
	const temp = String(WeeklyForecast[0].temperature);
	const humidity = String(WeeklyForecast[0].relativeHumidity['value']);
	const windSpeed = WeeklyForecast[0].windSpeed;
	const forecast = WeeklyForecast[0].detailedForecast;

	const boxenOptions = { title: 'Weather App', padding: 1, margin: 1, borderStyle: 'double' };
	const message = 'Weekly Forecast\n\n' +`Temperature: ${temp}\nHumidity: ${humidity}\nWind Speed:${windSpeed}\n\n${forecast}`;

	console.log(boxen(message, boxenOptions));
	// .catch((error) => {
	// 	console.error('Error:', error);
	// });
}
