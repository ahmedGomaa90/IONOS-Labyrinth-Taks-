'use strict';

const { expect } = require('chai');
const {
  prepareNodes,
  calculateNodesScoreSorted,
  findAdjacentNodes,
  findLabyrinthSolution,
} = require('../labyrinth-solution');
const { labyrinth, solution } = require('./labyrinth-ex.spec');

const empty = 'empty';
const blocked = 'blocked';

describe('labyrinth solution algorithm tests', () => {
  describe('prepareNodes method tests', () => {
    let nodes;
    let startNode;
    let endNode;
    beforeEach(() => {
      startNode = { x: '1', y: '2' };
      endNode = { x: '3', y: '2' };
      nodes = [
        { x: '1', y: '1', type: empty },
        { x: '1', y: '2', type: empty },
        { x: '1', y: '3', type: blocked },
        { x: '2', y: '1', type: empty },
        { x: '2', y: '2', type: empty },
        { x: '2', y: '3', type: empty },
        { x: '3', y: '1', type: empty },
        { x: '3', y: '2', type: empty },
        { x: '3', y: '3', type: blocked },
      ];
    });

    it('should add id for each node which is the respective node index, node should preserve its type', () => {
      const { preparedNodes } = prepareNodes(nodes, startNode, endNode);

      expect(preparedNodes[0].id).to.equal(0);
      expect(preparedNodes[0].type).to.equal(empty);
      expect(preparedNodes[2].id).to.equal(2);
      expect(preparedNodes[2].type).to.equal(blocked);
    });

    it('start and end nodes ids should be same as their respective nodes', () => {
      const { start, end } = prepareNodes(nodes, startNode, endNode);

      expect(start.id).to.equal(1);
      expect(end.id).to.equal(7);
    });

    it('calculate the boundaries of the nodes (x-axis, y-axis)', () => {
      const { xAxis, yAxis } = prepareNodes(nodes, startNode, endNode);

      expect(xAxis.min).to.equal(1);
      expect(xAxis.max).to.equal(3);
      expect(yAxis.min).to.equal(1);
      expect(yAxis.max).to.equal(3);
    });
  });

  describe('findAdjacentNodes method tests', () => {
    it('get all adjacent nodes', () => {
      const adjacentNodes = findAdjacentNodes(
        { x: 2, y: 2 }, { min: 1, max: 3 }, { min: 1, max: 3 }
      );

      expect(adjacentNodes).to.have.length(4);

      const leftNode = adjacentNodes.find(n => n.direction === 'left');
      expect(leftNode.x).to.equal(1);
      expect(leftNode.y).to.equal(2);

      const rightNode = adjacentNodes.find(n => n.direction === 'right');
      expect(rightNode.x).to.equal(3);
      expect(rightNode.y).to.equal(2);

      const upperNode = adjacentNodes.find(n => n.direction === 'up');
      expect(upperNode.x).to.equal(2);
      expect(upperNode.y).to.equal(3);

      const downNode = adjacentNodes.find(n => n.direction === 'down');
      expect(downNode.x).to.equal(2);
      expect(downNode.y).to.equal(1);
    });

    it('ignore out of boundaries nodes', () => {
      const adjacentNodes = findAdjacentNodes(
        { x: 1, y: 1 }, { min: 1, max: 3 }, { min: 1, max: 3 }
      );

      expect(adjacentNodes).to.have.length(2);

      const leftNode = adjacentNodes.find(n => n.direction === 'left');
      expect(leftNode).to.equal(undefined);

      const downNode = adjacentNodes.find(n => n.direction === 'down');
      expect(downNode).to.equal(undefined);
    });
  });

  describe('calculateNodesScoreSorted method test', () => {
    let nodes;
    let startNode;
    let endNode;
    beforeEach(() => {
      startNode = { x: 1, y: 2 };
      endNode = { x: 3, y: 2 };
      nodes = [
        { x: 1, y: 3, id: 1 }, // fScore = 1 + 1 = 2
        { x: 3, y: 4, id: 2 }, // fScore = 2 + 4 = 6
        { x: 3, y: 3, id: 3 }, // fScore = 3 + 1 = 4
      ];
    });

    it('should calculate the node score based on this fomula f(n)=g(n)+h(n) then sort them descending based on the score', () => {
      const sortedNodes = calculateNodesScoreSorted(Object.assign([], nodes), startNode, endNode);
      expect(sortedNodes[0].id).to.equal(nodes[1].id);
      expect(sortedNodes[1].id).to.equal(nodes[2].id);
      expect(sortedNodes[2].id).to.equal(nodes[0].id);
    });
  });

  describe('findLabyrinthSolution method tests', () => {
    it('should find the shortest path through the labyrinth', () => {
      const path = findLabyrinthSolution(labyrinth);
      solution.forEach((dir, index) => {
        expect(dir).to.equal(path[index]);
      });
    });
  });
});
