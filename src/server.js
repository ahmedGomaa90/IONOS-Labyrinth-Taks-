'use strict';

const http = require('http');
const app = require('./app/app');
const config = require('./app/config');
const debug = require('./app/utils/logger/debug')('server');
const { openDbConnection } = require('./app/modules/db/connection');

const server = http.createServer(app.handleRequest);

openDbConnection()
  .then(() => {
    server.listen(config.APP.port, () => {
      debug('server started on PORT', config.APP.port);
    });
  })
  .catch((err) => {
    debug('error opening connection with db', err);
    debug('server hasn\'t started');
  });
