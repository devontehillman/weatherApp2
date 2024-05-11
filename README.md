# weatherApp2
Weather app Command-line tool that retrieves weather data from National Weather 
Service.

Weather App

Command-line tool that retrieves weather data from National Weather Service.

Tools Used 
- GIt
- Node.js
    - yargs 
    - Boxen
        - Allows us to print nice looking boxes on the command line 
    - Ex. “console. log (boxen(myString, {padding: 1, margin: 1, width: 100, title: "Hello Worldl!”}));”

Requirements 
- [ ] ﻿﻿If the user runs the script with no command-line arguments, it will use a preset latitude and longitude (hard-coded in the script is fine). i.e.
    - [ ] - /weather
- [ ] ﻿﻿If the user enters both a latitude and longitude, it will use those values. i.e.
    - [ ] ﻿/weather --latitude 42.9711 --longitude -85.9305
- [ ] ﻿﻿If the user enters a flag "-hourly", we will print the hourly weather for the next 12 hours. Note this means using the second URL from above. For the hourly forecast, you need only print the temperature and short forecast fields.
- [ ] ﻿﻿You may work with a partner (not in groups, but with a single other person). You may complete this on your own if you wish. Regardless, every person who works on the code should have their name listed at the top of each file. Turn in a copy for each person on

Learning objectives
- Using command line to create a web app 
- Learning to parse json
- Reading documentation to learn about libraries 
- Learning how to use api calls


NOTES
- API call ex
    - curl https://api.weather.gov/points/39.7456,-97.0892
