# weatherApp2

Weather app command-line tool that retrieves weather data from the National Weather Service.

## Tools Used 
- Git
- Node.js
    - yargs 
    - Boxen
        - Allows us to print nice-looking boxes on the command line 
    - Example: `console.log(boxen(myString, {padding: 1, margin: 1, width: 100, title: "Hello World!"}));`

## Requirements
- [ ] If the user runs the script with no command-line arguments, it will use a preset latitude and longitude (hard-coded in the script is fine). For example:
    - [ ] `/weather`
- [ ] If the user enters both a latitude and longitude, it will use those values. For example:
    - [ ] `/weather --latitude 42.9711 --longitude -85.9305`
- [ ] If the user enters the flag "-hourly", it will print the hourly weather for the next 12 hours. Note that this means using the second URL from above. For the hourly forecast, you only need to print the temperature and short forecast fields.
- [ ] You may work with a partner (not in groups, but with a single other person). You may complete this on your own if you wish. Regardless, every person who works on the code should have their name listed at the top of each file. Turn in a copy for each person.

## Learning Objectives
- Using the command line to create a web app 
- Learning to parse JSON
- Reading documentation to learn about libraries 
- Learning how to use API calls

## Notes
- API call example:
    - `curl https://api.weather.gov/points/39.7456,-97.0892`
