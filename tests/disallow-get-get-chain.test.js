"use strict";

const rule = require("../lib/test-get-get-disallowed");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });
const errors = [{ message: 'Unexpected chain' }];

ruleTester.run("@parsable/tests/disallow-get-get", rule, {
  valid: [
    {
      code: `
      cy.get('div');
      `,
    },
    {
      code: `
      cy.get('div');
      cy.get('sdsd');
      `,
    },
    {
      code: `
      cy.get('div').find('ff');
      `,
    },
    {
      code: `
      cy.get('div').find('div2').do('2'); // do, find, get
      cy.get('sdsd').find('div').hello('div2').done('2'); // done, hello, find, get
      `,
    },
    {
      code: "cy.customType('div').customType('f').get('div2');",
      options: [{ methods: [] }],
    },
    {
      code: "cy.get('div').get('f').get('div2');",
      options: [{ methods: [] }],
    },
  ],

  invalid: [
    {
      code: "cy.get('div').get('div2');",
      errors: [{message: 'get is unexpected in the chain - split the chain or change the command'}]
    },
    {
      code: "cy.get('div').find('f').get('div2');",
      errors: [{message: 'get is unexpected in the chain - split the chain or change the command'}]
    },
    {
      code: "cy.customType('div').customType('f').get('div2');",
      errors: [{message: 'customType is unexpected in the chain - split the chain or change the command'}],
      options: [{ methods: ['customType', 'customClick'] }],
    },
    {
      code: "cy.customType('div').customType('f').get('div2');",
      errors: [{message: 'customType is unexpected in the chain - split the chain or change the command'}],
      options: [{ methods: ['customType', 'customClick'] }],
    },
  ],
});