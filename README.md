# @mmisty/eslint-plugin-cypress

Additional linter rules for cypress tests

### Installation

````shell script
yarn add -D @mmisty/eslint-plugin-cypress
````

````shell script
npm i --save-dev @mmisty/eslint-plugin-cypress
````

### Setup
To enable rules add the following to plugins section in your .eslintrc.js:
```
plugins: ['@mmisty/cypress'],
```

and add the following to the rules: 

```
 rules: {
     "@mmisty/cypress/test-title-pattern-mocha": 'error',
   ...
  },

```

### Recommended settings
You can use recommended settings for mocha or jest.

Just add the following into .eslintrc.js

```
    ...
    extends: [..., 'plugin:@mmisty/cypress/jest-recommended'],
    ...
```

#### Available configs: 
- mocha-recommended
- jest-recommended


## Rules
### test-title-pattern
test-title-pattern-mocha / test-title-pattern-jest 

The rule will check whether test has title matched with pattern

Available options: 

| Option  | Description           |
|---------|-----------------------|
| pattern | regexp                |
| message | string, error message |


To configure the rule with options: 
```
rules: {
    ...
    "@mmisty/cypress/test-title-jest": ["error", {
      pattern: /^ID\d+\w+should/i,
      message: "Test should have ID"
    }],

  },
```

### disallow-get-get-chain

Disallows chaining specified commands (default `['get']`)

```
    rules: {
        'cypress/disallow-get-get-chain': [2, { methods: ['qaId', 'get'] }],
    }
```
