### Assumptions
  since the task requirements is not very thorough, some assumptions are made:
  - PUT http method is used for the PUSH method mentioned in the task document.
  - the endpoint `GET /labyrinth<id>` is not clear what is needed here, so this API is returning the whole labyrinth object from the db.
  - the labyrinth solution is using the A* pathfinding algorithms (Depth first).
  - no validations are done to any of the url parameters based on the assumption that the user will always provide valid parameters' values.

### Clarifications
  - the application expects an authorization header according to the basic auth flow in the following format
    `"authorization": "Basic <Base64 of (username:password)>"`
  - the labyrinth design is completely the user's responsibility, the application doesn't do any validation if any block is missing or such cases, if not all labyrinth blocks are added or if there's a mistake, the behavior of the solution API is not expected and most likely to return a `500 system error`.
  - there's no diagonal movement allowed when finding the path between the start and the end.
  - for the sake of simplicity no unit tests are done except for the labyrinth-solution.js which contains the algorithm implementation, tests can be found in src/app/modules/labyrinth/specs.

### Running unit tests & starting the server
  - make sure there's a running mongodb server and having the correct connection string written in the .env file (change the DB_HOST env variable).
  - `npm install` to install the dependencies.
  - `npm test` to run the unit tests.
  - `npm start` to start the server.  
