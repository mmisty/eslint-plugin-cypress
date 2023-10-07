"use strict";

const rule = require("../lib/test-title-pattern-jest");
const RuleTester = require("eslint").RuleTester;

const ruleTester = new RuleTester({ parserOptions: { ecmaVersion: 2015 } });

ruleTester.run("@parsable/tests/test-title-pattern-jest", rule, {
  valid: [
    {
      options: [{ pattern: /ID\d\d\s+/ }],
      code: "it('ID01 test', () => { })",
    },
    {
      options: [{ pattern: /should/i }],
      code: "it('test should have should', () => { })",
    },
    {
      options: [{ pattern: /should/i, message: 'Custom msg'}],
      code: "it('test should have should', () => { })",
    },
    {
      options: [{ pattern: /should/i, message: 'Custom msg'}],
      code: "it(`test should have should when template`, () => { })",
    },
    {
      options: [{ pattern: /should/i, message: 'Custom msg'}],
      code: "it(`test have ${someVar} " +
        " when should template`, () => { })",
    },
    {
      options: [{ pattern: /should/i, message: 'Custom msg'}],
      code: "it.only(`test have ${someVar} " +
        " when should template`, () => { })",
    },
    {
      code: "it.only('#1 test', () => { })",
    }
  ],

  invalid: [
    {
      options: [{pattern: /44/}],
      code: "it('test', () => { })",
      errors: [{ message: "Test title should match pattern: /44/" }]
    },
    {
      options: [{pattern: /44/, message: 'My custom message'}],
      code: "it('test', () => { })",
      errors: [{ message: "My custom message: /44/" }]
    },
    {
      // default pattern
      code: "it('test', () => { })",
      errors: [{ message: "Test title should match pattern: /^#\\d+[\\s\\w-_]/i" }]
    },
    {
      // default pattern with only
      code: "it.only('test', () => { })",
      errors: [{ message: "Test title should match pattern: /^#\\d+[\\s\\w-_]/i"  }]
    },
    {
      // no should when pattern template
      options: [{ pattern: /should/i, message: 'Custom msg'}],
      code: "it(`test`, () => { })",
      errors: [{ message: "Custom msg: /should/i"  }]
    },{
      // no should when pattern template 2 parts
      options: [{ pattern: /should/i, message: 'Custom msg'}],
      code: "it(`test ${bbb} notfound`, () => { })",
      errors: [{ message: "Custom msg: /should/i"  }]
    }
  ]
});