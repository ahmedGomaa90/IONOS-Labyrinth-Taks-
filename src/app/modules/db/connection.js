'use strict';

const mongoClient = require('mongodb').MongoClient;
const { APP } = require('../../config');
const debug = require('../../utils/logger/debug')('db:connection');

let db;
let connection;

function openDbConnection() {
  return new Promise((resolve, reject) => {
    mongoClient.connect(APP.dbHost, { keepAlive: true, useNewUrlParser: true })
      .then((conn) => {
        debug('new connection opened with db');
        connection = conn;
        db = connection.db(APP.dbName);
        return resolve();
      })
      .catch((err) => {
        debug('error happened while trying to open connection with db', err);
        return reject(err);
      });
  });
}

function getDb() {
  return db;
}

module.exports = {
  openDbConnection,
  getDb,
};
