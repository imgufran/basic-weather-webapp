const request = require("postman-request");

// Our callback based async function
const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(address)}.json?access_token=pk.eyJ1IjoiaWFtZ3VmcmFuIiwiYSI6ImNsaGFnMnh0dDA2cGIzY25zYmg5Nzk3cTgifQ.WuRsO2aEirqCmbu4iFq61Q&limit=1`

  // postman-request for http
  request({url, json: true}, (error, {body} = {}) => {
    if (error) {
      callback("Unable to connect to the mapbox service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find the location. Try again with a different location", undefined); 
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lng: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
}

module.exports = geocode;