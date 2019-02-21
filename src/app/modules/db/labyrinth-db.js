'use strict';

const { ObjectId } = require('mongodb');
const { getDb } = require('./connection');
const debug = require('../../utils/logger/debug')('db:labyrinth');
const {
  handleQueriesRejection, mapObjects, mapLabyrinth,
} = require('./db-helper');

function addNewLabyrinth(userId) {
  return new Promise((resolve, reject) => {
    getDb()
      .collection('labyrinths')
      .insertOne({ owner: new ObjectId(userId) })
      .then((result) => {
        debug('new labyrinth inserted with id', result.insertedId);
        return resolve(result.insertedId.toString());
      })
      .catch(err => handleQueriesRejection(reject, err));
  });
}

function getUserLabyrinths(userId) {
  return new Promise((resolve, reject) => {
    getDb()
      .collection('labyrinths')
      .find({ owner: new ObjectId(userId) })
      .toArray()
      .then((results) => {
        debug('user Labyrinths Found', results ? results.length : 0);
        return resolve(mapObjects(results));
      })
      .catch(err => handleQueriesRejection(reject, err));
  });
}

function getLabyrinthbyId(id) {
  return new Promise((resolve, reject) => {
    getDb()
      .collection('labyrinths')
      .findOne({ _id: new ObjectId(id) })
      .then((result) => {
        debug('labyrinth found', result);
        return resolve(mapLabyrinth(result));
      })
      .catch(err => handleQueriesRejection(reject, err));
  });
}

function updateLabyrinthPlayField(id, playfield) {
  return new Promise((resolve, reject) => {
    getDb()
      .collection('labyrinths')
      .updateOne({ _id: new ObjectId(id) }, { $set: { playfield } })
      .then(() => resolve())
      .catch(err => handleQueriesRejection(reject, err));
  });
}

function setLabyrinthStartOrEnd(id, point, x, y) {
  const obj = {};
  obj[point] = { x, y };
  return new Promise((resolve, reject) => {
    getDb()
      .collection('labyrinths')
      .updateOne({ _id: ObjectId(id) }, { $set: obj })
      .then(() => resolve())
      .catch(err => handleQueriesRejection(reject, err));
  });
}

module.exports = {
  addNewLabyrinth,
  getUserLabyrinths,
  getLabyrinthbyId,
  updateLabyrinthPlayField,
  setLabyrinthStartOrEnd,
};
