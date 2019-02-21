
'use strict';

const empty = 'empty';
const blocked = 'blocked';
const labyrinth = {
  start: { x: '1', y: '3' },
  end: { x: '5', y: '4' },
  playfield: [
    { x: '1', y: '1', type: empty },
    { x: '1', y: '2', type: empty },
    { x: '1', y: '3', type: empty },
    { x: '1', y: '4', type: blocked },

    { x: '2', y: '1', type: blocked },
    { x: '2', y: '2', type: empty },
    { x: '2', y: '3', type: blocked },
    { x: '2', y: '4', type: empty },

    { x: '3', y: '1', type: empty },
    { x: '3', y: '2', type: empty },
    { x: '3', y: '3', type: empty },
    { x: '3', y: '4', type: empty },

    { x: '4', y: '1', type: blocked },
    { x: '4', y: '2', type: empty },
    { x: '4', y: '3', type: empty },
    { x: '4', y: '4', type: blocked },

    { x: '5', y: '1', type: empty },
    { x: '5', y: '2', type: empty },
    { x: '5', y: '3', type: blocked },
    { x: '5', y: '4', type: empty },

    { x: '6', y: '1', type: empty },
    { x: '6', y: '2', type: blocked },
    { x: '6', y: '3', type: empty },
    { x: '6', y: '4', type: empty },

    { x: '7', y: '1', type: empty },
    { x: '7', y: '2', type: empty },
    { x: '7', y: '3', type: empty },
    { x: '7', y: '4', type: empty },
  ],
};

const solution = [
  'down',
  'right',
  'right',
  'right',
  'right',
  'down',
  'right',
  'right',
  'up',
  'up',
  'left',
  'up',
  'left',
];

module.exports = {
  labyrinth,
  solution,
};
