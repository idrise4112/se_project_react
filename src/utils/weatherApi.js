export const getWeather = ({ latitude, longitude }, APIkey) => {
  return fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=imperial&appid=${APIkey}`
  ).then((res) => {
    if (res.ok) {
      return res.json();
    } else {
      return Promise.reject(`Error: ${res.status}`);
    }
  });
};

export const filterWeatherData = (data) => {
  const result = {};
  result.city = data.name;
  result.temp = { F: data.main.temp.F };

  return result;
};

const getWeatherType = (temprature) => {
  if (temprature > 86) {
    return "hot";
  } else if (temprature >= 66 && temprature <= 86) {
    return "warm";
  } else {
    return "cold";
  }
};
