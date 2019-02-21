'use strict';

const appConfig = {
  port: process.env.PORT || 3000,
  dbHost: process.env.DB_HOST,
  dbName: process.env.DB_NAME,
  errors: {
    dbError: 'DB_ERROR',
    authDenied: 'Authentication_Denied',
    notFound: 'Not_Found',
    noAccess: 'No_Access',
    alreadyExists: 'Already_Exists',
  },
};

module.exports = appConfig;
