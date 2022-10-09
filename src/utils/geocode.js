const request = require('request');

const geocode = (address, callback) => {
  const url = `http://api.positionstack.com/v1/forward?access_key=f23c3e79dcdfc81966c491539a2bb261&query=${address}&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Cannot connect to the server', undefined);
    } else if (body.data === undefined || body.data.length === 0) {
      callback('No location found', undefined);
    } else {
      callback(undefined, {
        latitude: body.data[0].latitude,
        longitude: body.data[0].longitude,
        location: body.data[0].name
      });
    }
  });
};

module.exports = geocode;
