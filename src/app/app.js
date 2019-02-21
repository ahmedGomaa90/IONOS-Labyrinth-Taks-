'use strict';

const url = require('url');
const pathToRegex = require('path-to-regexp');
const debug = require('./utils/logger/debug')('app');
const { success, error } = require('./middlewares/response-handlers');
const labyrinthRoutes = require('./route-handlers/labyrinth-routes');
const { loginOrRegister } = require('./middlewares/authentication');

const routes = [
  {
    method: 'get',
    path: '/labyrinth/:id',
    handler: labyrinthRoutes.getLabyrinthById,
  },
  {
    method: 'get',
    path: '/labyrinth/:id/:x/:y',
    handler: labyrinthRoutes.getLabyrinthPlayFieldBlock,
  },
  {
    method: 'put',
    path: '/labyrinth/:id/playfield/:x/:y/:type(blocked|empty)',
    handler: labyrinthRoutes.addLabyrinthPlayField,
  },
  {
    method: 'put',
    path: '/labyrinth/:id/:point(start|end)/:x/:y',
    handler: labyrinthRoutes.setLabyrinthStartOrEndPoint,
  },
  {
    method: 'get',
    path: '/labyrinth',
    handler: labyrinthRoutes.getUserLabyrinthsIds,
  },
  {
    method: 'put',
    path: '/labyrinth',
    handler: labyrinthRoutes.createLabyrith,
  },
  {
    method: 'get',
    path: '/labyrinth/:id/solution',
    handler: labyrinthRoutes.getLabyrinthSolution,
  },
];

function handleRequest(req, res) {
  req.params = {};
  const pathName = `${req.method.toLowerCase()}=${url.parse(req.url).pathname}`;
  const matchedRoute = routes.find((route) => {
    const keys = [];
    const regex = pathToRegex(`${route.method}=${route.path}`, keys);
    const matched = regex.test(pathName);
    if (matched) {
      const extractedValues = regex.exec(pathName);
      keys.forEach((key, index) => {
        req.params[key.name] = extractedValues[index + 1];
      });
    }
    return matched;
  });

  if (!matchedRoute) {
    debug('No match for the requested url %s with method %s', req.url, req.method);
    res.statusCode = 404;
    res.write('requested resource doesn\'t exist');
    res.end();
    return;
  }

  loginOrRegister(req)
    .then((user) => {
      req.user = user;
      return matchedRoute.handler(req, res);
    })
    .then(data => success(res, data))
    .catch(err => error(res, err));
}

module.exports = {
  handleRequest,
};
