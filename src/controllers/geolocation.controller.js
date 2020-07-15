const catchAsync = require('../utils/catchAsync');
const { geolocationService } = require('../services');

const getUserLocationInformation = catchAsync(async (req, res) => {
  const result = await geolocationService.getUserLocationInformation(req.user);
  res.json({ result });
});

module.exports = {
  getUserLocationInformation,
};
