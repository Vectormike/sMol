const unirest = require('unirest');
const config = require('../config/config');

/**
 * Get user data via geolocation
 * @returns {Promise<Result>}
 */
const getUserLocationInformation = async (query) => {
  const apiCall = unirest('GET', 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/');

  apiCall.query({
    ip: query,
  });

  apiCall.headers({
    'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
    'x-rapidapi-key': config.rapidApi,
    useQueryString: true,
  });
  apiCall.end(function (result) {
    if (result.error) throw new Error(result.error);
    return result.body;
  });
};

module.exports = { getUserLocationInformation };
