//Url for api call
const url = 'https://api.weather.gov/points/39.7456,-97.0892'


const request = fetch(url)
				//convert json text to json object 
				.then(response => response.json())
				//getting the endpoint url form json object that contains the forecast
				.then(data =>{	
					const endpoint = data.properties.forecastHourly
					//console.log(endpoint)
					return fetch(endpoint)
				})
				// converting json text to json object
				.then(response => response.json())
				// getting the weather information form the text
				.then(data =>{
					console.log()
					// returns 100 hours worth of hourly forecast
					const WeeklyForecastByHour = data.properties.periods
					// obtaining only the first 12
					const firstTwelvePeriods = WeeklyForecastByHour.slice(0, 12);
					
					firstTwelvePeriods.forEach(period => {
						// Do something with each period object
						console.log(`${period.shortForecast} and ${period.temperature}\n`);
						
					});
				})
