const request = require("postman-request");

const forecast = (lat, lng, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=20e8aed161ad330b6ecd46452fb67053&query=${lat},${lng}&units=m`;
  // postman-request
  request({url, json: true}, (error, {body}) => {
      // No network connection
    if (error) {
      callback("Unable to connect to the weather service", undefined);
      // Invalid coordinates
    } else if (body.error) {
      callback(undefined, "Unable to find location. Try different coordinates.");
    } else {
      // Success
      callback(undefined, `${body.current.weather_descriptions[0]}! It is currently ${body.current.temperature} celsius out. It feels like ${body.current.feelslike} celsius out. The humidity is ${body.current.humidity}%`);
    }
  });
}

module.exports = forecast;