'use strict';

function prepareNodes(nodes, startNode, endNode) {
  const xAxis = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
  const yAxis = { min: Number.MAX_SAFE_INTEGER, max: Number.MIN_SAFE_INTEGER };
  const preparedNodes = [];
  let start;
  let end;
  nodes.forEach((node, index) => {
    const parsedNode = {
      id: index,
      x: parseInt(node.x, 10),
      y: parseInt(node.y, 10),
      type: node.type,
    };
    if (node.x === startNode.x && node.y === startNode.y) {
      start = parsedNode;
    }
    if (node.x === endNode.x && node.y === endNode.y) {
      end = parsedNode;
    }
    if (parsedNode.x < xAxis.min) {
      xAxis.min = parsedNode.x;
    }
    if (parsedNode.x > xAxis.max) {
      xAxis.max = parsedNode.x;
    }
    if (parsedNode.y < yAxis.min) {
      yAxis.min = parsedNode.y;
    }
    if (parsedNode.y > yAxis.max) {
      yAxis.max = parsedNode.y;
    }

    preparedNodes.push(parsedNode);
  });

  return {
    preparedNodes, xAxis, yAxis, start, end,
  };
}


function findAdjacentNodes(currentNode, xAxis, yAxis) {
  const adjacentNodes = [
    // moving on x-axis
    { x: currentNode.x - 1, y: currentNode.y, direction: 'left' },
    { x: currentNode.x + 1, y: currentNode.y, direction: 'right' },
    // moving on y-axis
    { y: currentNode.y + 1, x: currentNode.x, direction: 'up' },
    { y: currentNode.y - 1, x: currentNode.x, direction: 'down' },
  ];

  return adjacentNodes
    .filter(node => node.x >= xAxis.min
      && node.x <= xAxis.max
      && node.y >= yAxis.min
      && node.y <= yAxis.max);
}

function calculateNodesScoreSorted(nodes, startNode, endNode) {
  nodes.forEach((node) => {
    const g = Math.abs((startNode.x + startNode.y) - (node.x + node.y));
    const h = Math.abs((endNode.x + endNode.y) - (node.x + node.y));

    node.fScore = g + h;
  });

  return nodes.sort((a, b) => {
    if (a.fScore > b.fScore) return -1;
    if (a.fScore < b.fScore) return 1;
    return 0;
  });
}

function findLabyrinthSolution(labyrinth) {
  const {
    preparedNodes: nodes, xAxis, yAxis, start, end,
  } = prepareNodes(labyrinth.playfield, labyrinth.start, labyrinth.end);

  const stack = [start];

  // eslint-disable-next-line no-constant-condition
  while (true) {
    const currentNode = stack[stack.length - 1];
    currentNode.visited = true;

    if (currentNode.id === end.id) {
      break;
    }

    let unvisited = 0;
    let adjacents = findAdjacentNodes(currentNode, xAxis, yAxis);
    adjacents = calculateNodesScoreSorted(adjacents, start, end);
    adjacents.forEach((adj) => {
      const node = nodes.find(n => n.x === adj.x && n.y === adj.y);
      if (node.type === 'empty' && !node.visited) {
        if (!node.parent) {
          node.direction = adj.direction;
          node.parent = currentNode;
        }
        stack.push(node);
        unvisited += 1;
      }
    });

    if (unvisited === 0) {
      stack.pop();
    }
  }

  const path = [];
  let currentParent = stack[stack.length - 1];

  while (currentParent.parent) {
    path.push(currentParent.direction);
    currentParent = currentParent.parent;
  }

  return path.reverse();
}


module.exports = {
  prepareNodes,
  calculateNodesScoreSorted,
  findAdjacentNodes,
  findLabyrinthSolution,
};
