const express = require('express');
const axios = require('axios');
const cors = require('cors')
const app = express();

app.use(express.json());
app.use(cors());


const OPEN_WEATHER_MAP_API_KEY = '2308ec60924508e29ea0fc54569c4102';
const NUM_CITIES = 30;
const CITIES_ID18 = ["1275339,1273294,1277333,1275004,1269843,1264527,2147714,6992326,1259229,1269515,1258653,5165418,1253286,6619347,4973840,5855797,1279259,462192"];
const CITIES_ID12 = ["1279233,1270642,5128581,6954929,1253986,7603116,1174872,1172451,1850147,1283240,292223,2968815,1278647"];
app.get('/weather', async (req, res) => {
  try {
    
    // Get query parameters for pagination
    const page = req.query.page || 1;
    const pageSize = req.query.pageSize || 10;
    const startIndex = (page - 1) * pageSize;
    const endIndex = startIndex + pageSize;
    

    console.log("lmao");
    // Get weather information for each city
    const weatherData = await axios.get('https://api.openweathermap.org/data/2.5/group', {
            params: {
                id: CITIES_ID18.join(','),
                units: "metric",
                appid: OPEN_WEATHER_MAP_API_KEY
            }
        });
    
        const weatherData2 = await axios.get('https://api.openweathermap.org/data/2.5/group', {
            params: {
                id: CITIES_ID12.join(','),
                units: "metric",
                appid: OPEN_WEATHER_MAP_API_KEY
            }
        });

        weatherData.data.list = [...weatherData.data.list, ...weatherData2.data.list]
    // Send paginated weather data in response
    res.json(weatherData.data.list);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => {
  console.log('Server started on port 5000');
});

module.exports = app;