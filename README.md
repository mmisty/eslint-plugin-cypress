# @mmisty/eslint-plugin-cypress

Additional linter rules for cypress tests


## Table of Contents

1. [Installation](#installation)
1. [Recommended settings](#recommended-settings)
2. [Setup](#setup)
3. [Rules](#rules)
    - [disallow-get-get-chain](#disallow-get-get-chain)
    - [test-title-pattern](#test-title-pattern)
    - [disallow-only](#disallow-only)
   
### Installation

````shell script
yarn add -D @mmisty/eslint-plugin-cypress
````

````shell script
npm i --save-dev @mmisty/eslint-plugin-cypress
````

### Recommended settings
You can use recommended settings for cypress or jest.

Just add the following into .eslintrc.js

```
// .eslintrc.js=
    extends: [..., 'plugin:@mmisty/cypress/recommended'],
```

### Setup

To enable rules add the following to plugins section in your .eslintrc.js:
```
plugins: ['@mmisty/cypress'],
```

and add rules you want: 

```
 rules: {
     "@mmisty/cypress/test-title-pattern": 'error',
   ...
  },

```


## Rules

### disallow-get-get-chain

Disallows chaining specified commands (default `['get']`).

Will warn when user tries to do chains like `cy.get('id').get('id2');`

```
    rules: {
        '@mmisty/cypress/disallow-get-get-chain': ['error', { methods: ['qaId', 'get'] }],
    }
```

### test-title-pattern

The rule will check whether test has title matched with pattern - default pattern not allows '.' at the end of test title

Available options: 

| Option      | Description                      |
|-------------|----------------------------------|
| pattern     | regexp                           |
| message     | string, error message            |
| identifiers | test identifiers. ex `it`/`xit`  |


To configure the rule with options: 
```
rules: {
    "@mmisty/cypress/test-title-pattern": ["error", {
      pattern: /^ID\d+\w+should/i,
      message: "Test should have ID",
      identifiers: ['it']
    }],
  },
```

### disallow-only

Disallows `.only` in tests
To configure the rule:

```
rules: {
    "@mmisty/cypress/disallow-only": "error",
  },
```
