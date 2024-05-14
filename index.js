	const argv = require("yargs/yargs")(process.argv.slice(2))
		//.usage('Usage: -lat [num] -lon [num]')
		.option("latitude", {
			alias: "lat",
			description: "Latitude coordinate",
			type: "number",
			demandOption: false, // Required option
		})
		.option("longitude", {
			alias: "lon",
			description: "Longitude coordinate",
			type: "number",
			demandOption: false, // Required option
		})
		.option("hourly", {
			alias: "h",
			description: "Request for hourly forecast",
			type: "boolean",
			demandOption: true, // Required option
		}).argv;

	console.log("(%d,%d.%s)", argv.latitude, argv.longitude, argv.hourly);

if (argv.latitude === undefined || argv.longitude === undefined) {
	const url = "https://api.weather.gov/points/39.7456,-97.0892";
	getWeather(url);
} else {
	const url = `https://api.weather.gov/points/${argv.latitude},${argv.longitude}`;
	getWeather(url);
}

function getWeather(url) {
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
