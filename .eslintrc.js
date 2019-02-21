module.exports = {
  "extends": "airbnb",
  "parser": "espree",
  "parserOptions": {
    "ecmaVersion": 6,
    "sourceType": "script",
  },
  "env": {
    "node": true,
    "mocha": true,
  },
  "rules": {
    "strict": ['error', 'global'],
    "import/no-extraneous-dependencies": [
      'error',
      {
        'devDependencies': true,
      },
    ],
    "arrow-body-style": [
      "error",
      "as-needed",
      { "requireReturnForObjectLiteral": true }
    ],
    "no-param-reassign": [
      "error",
      {
        "props": false,
      },
    ],
    'comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'never',
    }],
    "prefer-promise-reject-errors": 0,
    "no-underscore-dangle": [
      "error",
      {
        "allow": ["__set__", "__get__", "_id"]
      }
    ],
  },
};