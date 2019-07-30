//const { API_TOKEN } = require('./config');
const logger = require('./logger');

module.exports = function validateBearerToken(req, res, next) {
  const apiToken = process.env.API_TOKEN;
  const authToken = req.get('Authorization');
  console.log('hi '+ apiToken);
  console.log('hi from authToken ' + authToken);
  logger.error(`Unauthorized request to path: ${req.path}`);

  if (!authToken || authToken.split(' ')[1] !== apiToken) {    
    return res
      .status(401)
      .json({ error: 'Unauthorized request from Aamir' });
  }
  next();
};
