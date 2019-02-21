'use strict';

const debug = require('../../utils/logger/debug')('db:helpers');
const { APP } = require('../../config');

function handleQueriesRejection(reject, err) {
  debug('Error happened in db', err);
  reject(APP.errors.dbError);
}

function mapObject(obj) {
  if (obj) {
    obj.id = obj._id.toString();
    delete obj._id;
  }

  return obj;
}

function mapObjects(objs) {
  if (!objs || objs.length === 0) {
    return [];
  }

  return objs.map(obj => mapObject(obj));
}

function mapLabyrinth(labyrinth) {
  if (!labyrinth) { return labyrinth; }

  const mappedLabyribth = mapObject(labyrinth);
  mappedLabyribth.owner = mappedLabyribth.owner.toString();

  return mappedLabyribth;
}

module.exports = {
  handleQueriesRejection,
  mapObject,
  mapObjects,
  mapLabyrinth,
};
