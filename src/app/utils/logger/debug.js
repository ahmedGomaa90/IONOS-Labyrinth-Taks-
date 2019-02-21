'use strict';

module.exports = (namespace) => {
  // eslint-disable-next-line global-require
  const debug = require('debug')(`IONOS:Labyrinth:${namespace}`);

  return debug;
};
