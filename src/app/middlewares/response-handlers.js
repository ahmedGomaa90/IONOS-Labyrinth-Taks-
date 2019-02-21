'use strict';

const debug = require('../utils/logger/debug')('middlewares:res-handlers');
const { APP } = require('../config');

function success(res, data) {
  debug('request successfully processed', data);
  res.statusCode = 200;
  res.setHeader('content-type', 'application/json');
  if (data) {
    res.write(JSON.stringify(data));
  }
  res.end();
}

function error(res, err) {
  debug('request processed with error', err);
  const { errors } = APP;
  let statusCode;
  let errMessage;

  switch (err) {
    case errors.authDenied:
      statusCode = 401;
      errMessage = 'Unauthorized';
      break;
    case errors.noAccess:
      statusCode = 403;
      errMessage = 'Forbidden';
      break;
    case errors.alreadyExists:
      statusCode = 400;
      errMessage = 'Already Exists';
      break;
    case errors.notFound:
      statusCode = 400;
      errMessage = 'Not Found';
      break;
    case errors.dbError:
    default:
      statusCode = 500;
      errMessage = 'System Error';
  }

  res.statusCode = statusCode;
  res.write(errMessage);
  res.end();
}

module.exports = {
  success,
  error,
};
