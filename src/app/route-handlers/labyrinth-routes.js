'use strict';

const { APP } = require('../config');
const db = require('../modules/db/labyrinth-db');
const labyrinthSolution = require('../modules/labyrinth/labyrinth-solution');

function createLabyrith(req) {
  return new Promise((resolve, reject) => {
    db.addNewLabyrinth(req.user.id)
      .then(labyrinthId => resolve(labyrinthId))
      .catch(reject);
  });
}

function getUserLabyrinthsIds(req) {
  return new Promise((resolve, reject) => {
    db.getUserLabyrinths(req.user.id)
      .then((labyrinths) => {
        const ids = labyrinths.map(labyrinth => labyrinth.id);
        resolve(ids);
      })
      .catch(reject);
  });
}

function getLabyrinthById(req) {
  const { id } = req.params;
  return new Promise((resolve, reject) => {
    db.getLabyrinthbyId(id)
      .then((labyrinth) => {
        if (!labyrinth) {
          return reject(APP.errors.notFound);
        }
        if (labyrinth.owner !== req.user.id) {
          return reject(APP.errors.noAccess);
        }

        return resolve(labyrinth);
      })
      .catch(reject);
  });
}

function addLabyrinthPlayField(req) {
  const {
    id, x, y, type,
  } = req.params;
  return new Promise((resolve, reject) => {
    db.getLabyrinthbyId(id)
      .then((labyrinth) => {
        if (!labyrinth) {
          return reject(APP.errors.notFound);
        }
        if (labyrinth.owner !== req.user.id) {
          return reject(APP.errors.noAccess);
        }

        const playfield = labyrinth.playfield ? labyrinth.playfield : [];
        const index = playfield.findIndex(p => p.x === x && p.y === y);
        if (index === -1) {
          playfield.push({ x, y, type });
        } else {
          playfield[index].type = type;
        }

        return db.updateLabyrinthPlayField(id, playfield);
      })
      .then(resolve)
      .catch(reject);
  });
}

function setLabyrinthStartOrEndPoint(req) {
  const {
    id, point, x, y,
  } = req.params;
  return new Promise((resolve, reject) => {
    db.getLabyrinthbyId(id)
      .then((labyrinth) => {
        if (!labyrinth) {
          return reject(APP.errors.notFound);
        }
        if (labyrinth.owner !== req.user.id) {
          return reject(APP.errors.noAccess);
        }

        return db.setLabyrinthStartOrEnd(id, point, x, y);
      })
      .then(resolve)
      .catch(reject);
  });
}

function getLabyrinthPlayFieldBlock(req) {
  const {
    id, x, y,
  } = req.params;
  return new Promise((resolve, reject) => {
    db.getLabyrinthbyId(id)
      .then((labyrinth) => {
        if (!labyrinth) {
          return reject(APP.errors.notFound);
        }
        if (labyrinth.owner !== req.user.id) {
          return reject(APP.errors.noAccess);
        }

        const playfield = labyrinth.playfield ? labyrinth.playfield : [];
        const index = playfield.findIndex(p => p.x === x && p.y === y);

        if (index === -1) {
          return reject(APP.errors.notFound);
        }

        return resolve(playfield[index]);
      })
      .catch(reject);
  });
}

function getLabyrinthSolution(req) {
  const { id } = req.params;

  return new Promise((resolve, reject) => {
    db.getLabyrinthbyId(id)
      .then((labyrinth) => {
        if (!labyrinth) {
          return reject(APP.errors.notFound);
        }
        if (labyrinth.owner !== req.user.id) {
          return reject(APP.errors.noAccess);
        }

        const path = labyrinthSolution.findLabyrinthSolution(labyrinth);

        return resolve(path);
      })
      .catch(reject);
  });
}

module.exports = {
  createLabyrith,
  getUserLabyrinthsIds,
  addLabyrinthPlayField,
  setLabyrinthStartOrEndPoint,
  getLabyrinthById,
  getLabyrinthPlayFieldBlock,
  getLabyrinthSolution,
};
