//Url for api call
const url = 'https://api.weather.gov/points/39.7456,-97.0892'


const request = fetch(url)
				//convert json text to json object 
				.then(response => response.json())
				//getting the endpoint url form json object that contains the forcast
				.then(data =>{	
					const endpoint = data.properties.forecast
					//console.log(endpoint)
					return fetch(endpoint)
				})
				// converting json text to json object
				.then(response => response.json())
				// getting the weather information form the text
				.then(data =>{
					console.log(data.properties.periods)
				})
//console.log(request)
