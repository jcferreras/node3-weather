const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=5005733a0674be048a92cae4448e2515&query=${latitude},${longitude}`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Cannot connect to server', undefined);
    } else if (body.request === undefined || body.request.length === 0) {
      callback('Invalid coordinates', undefined);
    } else {
      callback(undefined, {
        temperature: body.current.temperature,
        feelslike: body.current.feelslike,
        weatherdesc: body.current.weather_descriptions
      });
    }
  });
};

module.exports = forecast;
