const { basename } = require('path');

const NAME = basename(__dirname);
const DESCRIPTION = 'get get';

/**
 * @type {import('eslint').Rule.RuleMetaData['schema']}
 */
const schema = {
  title: NAME,
  description: DESCRIPTION,
  type: 'object',
  properties: {
    methods: {
      type: 'array',
      description:
        'An additional list of methods to check for unsafe chaining.',
      default: [],
    },
  },
};

module.exports = {
  meta: {
    // docs: {
    //   category: 'Best Practices',
    //   description: 'Disallow "get.get" in tests',
    //   recommended: 'error',
    //   // suggestion: true
    // },
    messages: {
      unexpectedChain: 'Unexpected chain',
      suggestFixChain: 'Remove consequient "get.get "',
    },
    schema: [schema],
    type: 'suggestion',
  },
  create(context) {
    let unsafeChainCmds = ['get'];
    let chainRes = [];
    let nodes = [];
    const options = context.options[0];
    const hasOpts = !!options?.methods;

    if (options?.methods) {
      unsafeChainCmds = [];
      unsafeChainCmds.push(...options.methods);
    }

    return {
      // https://astexplorer.net/

      'CallExpression:exit'() {
        if (chainRes.length === 0) {
          return;
        }

        const doCheck = (arr) => {
          arr = arr.reverse();
          nodes = nodes.reverse();
          const predicate = (t, i, a) =>
            i !== a.indexOf(t) && unsafeChainCmds.includes(t);

          const allCorrect = !arr.some(predicate);
          const nodeIndex = arr.findIndex(predicate);

          if (process.env['ESLINT_TEST'] === 'true') {
            console.log(
              `${JSON.stringify(arr)}: ${
                allCorrect ? `ok (hasOpts=${hasOpts})` : 'INVALID'
              }`
            );
          }

          if (!allCorrect) {
            context.report({
              message: `${nodes[nodeIndex]?.name} is unexpected in the chain - split the chain or change the command`,
              node: nodes[nodeIndex],
            });
          }
        };

        doCheck(chainRes);

        chainRes = [];
      },

      CallExpression(node) {
        const getCommandsChain = (par, arr, nd) => {
          const parent = par?.parent;
          const callee = par?.callee;

          if (parent?.type === 'MemberExpression') {
            const prop = parent?.property;
            arr.push(prop?.name);
            nd.push(prop);

            getCommandsChain(parent, arr, nd);
          }

          if (callee?.object?.name === 'cy') {
            const prop = callee?.property;
            arr.push(prop?.name);
            nd.push(prop);
          }
        };

        getCommandsChain(node, chainRes, nodes);
      },
    };
  },
};
