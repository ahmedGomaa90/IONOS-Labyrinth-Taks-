'use strict';

const usersDb = require('../modules/db/users-db');
const { APP } = require('../config');

function loginOrRegister(req) {
  if (!req.headers.authorization || !req.headers.authorization.startsWith('Basic ')) {
    return Promise.reject(APP.errors.authDenied);
  }

  const credentialBase64 = req.headers.authorization.split('Basic ')[1];
  const credentials = Buffer.from(credentialBase64, 'base64').toString();
  const [name, password] = credentials.split(':');

  return new Promise((resolve, reject) => {
    usersDb.getUserByName(name)
      .then((user) => {
        if (!user) {
          return usersDb.insertNewUser(name, password);
        }
        if (user.password !== password) {
          return reject(APP.errors.authDenied);
        }

        return resolve(user);
      })
      .then(userId => resolve({ id: userId, name, password }))
      .catch(reject);
  });
}

module.exports = {
  loginOrRegister,
};
