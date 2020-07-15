/* eslint-disable no-console */
// const unirest = require('unirest');
const httpStatus = require('http-status');
const { gmAPI } = require('../config/googlemaps');
const userService = require('./user.service');
const ApiError = require('../utils/ApiError');

/**
 * Get user data via geolocation
 * @returns {Promise<Result>}
 */
const getUserLocationInformation = async (user) => {
  // const apiCall = unirest('GET', 'https://ip-geolocation-ipwhois-io.p.rapidapi.com/json/');

  // apiCall.query({
  //   ip: query,
  // });

  // apiCall.headers({
  //   'x-rapidapi-host': 'ip-geolocation-ipwhois-io.p.rapidapi.com',
  //   'x-rapidapi-key': config.rapidApi,
  //   useQueryString: true,
  // });
  // apiCall.end(function (result) {
  //   if (result.error) throw new Error(result.error);
  //   return result.body;
  // });

  const foundUser = userService.getUserById(user._id);
  const { address } = foundUser;
  // geocode API
  const geocodeParams = {
    address: '121, Curtain Road, EC2A 3AD, London UK',
    components: 'components=country:GB',
    bounds: '55,-1|54,1',
    language: 'en',
    region: 'uk',
  };

  gmAPI.geocode(geocodeParams, (err, result) => {
    if (err) {
      throw new ApiError(httpStatus.EXPECTATION_FAILED, 'Location not found');
    }
    console.log(result);
    return result;
  });
};

module.exports = { getUserLocationInformation };
