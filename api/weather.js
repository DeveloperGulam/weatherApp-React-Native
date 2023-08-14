import axios from 'axios';

const API_KEY = 'a3cac642772bd35d3c49d0377e69ec10';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

export const fetchWeatherData = async (city) => {
  try {
    const response = await axios.get(`${BASE_URL}/weather?q=${city}&appid=${API_KEY}&units=metric`);
    const options = { weekday: 'long', hour: 'numeric', hour12: true };
    const currentDateTime = new Date().toLocaleString('en-US', options);
    return {
      ...response.data,
      currentDateTime,
    };
  } catch (error) {
    console.error('Error fetching weather data:', error);
    return false;
  }
};

export const fetchForecastData = async (city) => {
  try {
    const response = await axios.get(
      `${BASE_URL}/forecast?q=${city}&appid=${API_KEY}&units=metric`
    );
    
    // Group forecast data by day and calculate max and min temperatures
    const forecastByDay = {};
    response.data.list.forEach((item) => {
      const fullDate = new Date(item.dt * 1000).toLocaleDateString('en-US', { weekday: 'long' });
      const day = fullDate.split(',')[0];
      const icon = item.weather[0].icon;
      const iconUrl = `http://openweathermap.org/img/w/${icon}.png`;

      if (!forecastByDay[day]) {
        forecastByDay[day] = {
          day: day,
          temperatures: [item.main.temp],
          descriptions: [item.weather[0].main],
          icons: [iconUrl],
        };
      } else {
        forecastByDay[day].temperatures.push(item.main.temp);
        forecastByDay[day].descriptions.push(item.weather[0].main);
        forecastByDay[day].icons.push(iconUrl);
      }
    });
    
    const forecastData = Object.values(forecastByDay).map((dayData) => ({
      day: dayData.day,
      maxTemperature: Math.round(Math.max(...dayData.temperatures)),
      minTemperature: Math.round(Math.min(...dayData.temperatures)),
      averageTemperature: Math.round(dayData.temperatures.reduce((sum, temp) => sum + temp, 0) / dayData.temperatures.length),
      description: dayData.descriptions[0],
      icon: dayData.icons[0],
    }));

    return forecastData;
  } catch (error) {
    console.error('Error fetching forecast data:', error);
    throw error;
  }
};