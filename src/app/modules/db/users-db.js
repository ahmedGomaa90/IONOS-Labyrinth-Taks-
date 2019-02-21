'use strict';

const { getDb } = require('./connection');
const debug = require('../../utils/logger/debug')('db:users');
const { handleQueriesRejection, mapObject } = require('./db-helper');

function insertNewUser(name, password) {
  return new Promise((resolve, reject) => {
    getDb()
      .collection('users')
      .insertOne({ name, password })
      .then((result) => {
        debug('user inserted with id', result.insertedId);
        return resolve(result.insertedId);
      })
      .catch(err => handleQueriesRejection(reject, err));
  });
}

function getUserByName(name) {
  return new Promise((resolve, reject) => {
    getDb()
      .collection('users')
      .findOne({ name })
      .then((result) => {
        debug(result);
        return resolve(mapObject(result));
      })
      .catch(err => handleQueriesRejection(reject, err));
  });
}

module.exports = {
  insertNewUser,
  getUserByName,
};
