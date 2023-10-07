"use strict";

const rule = require("../lib/test-only-disallowed");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

ruleTester.run("@parsable/tests/disallow-only", rule, {
  valid: [
    {
      code: "it('title', () => { })",
    },
    {
      code: `
       it('title', () => {
          const ttt = {
            only: () => {
              console.log('test');
            },
          };
        });`,
    },
  ],

  invalid: [
    {
      code: "it.only('test', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: "test.only('test', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: "test.only('test', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: "specify.only('test', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: "describe.only('suite', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: "suite.only('suite', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: "it.only('test', () => { })",
      errors: [{ message: 'Unexpected focused test (".only")' }]
    },

    {
      code: `
      describe.only('sdsd', ()=> {
      it.only('test', () => { 
      })
      
      it('test', () => { 
      })
      
      it.only('test', () => { 
      })
      })
      
      `,
      errors: [
        { message: 'Unexpected focused test (".only")' },
        { message: 'Unexpected focused test (".only")' },
        { message: 'Unexpected focused test (".only")' }
        ]
    },

  ],
});