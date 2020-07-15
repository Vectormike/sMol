const GoogleMapsAPI = require('googlemaps');
const config = require('./config');

const publicConfig = {
  key: config.mapkey,
  stagger_time: 1000, // for elevationPath
  encode_polylines: false,
  secure: true, // use https
  proxy: '', // optional, set a proxy for HTTP requests
};

const gmAPI = new GoogleMapsAPI(publicConfig);

module.exports = {
  gmAPI,
};
