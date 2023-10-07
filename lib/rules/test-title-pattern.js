module.exports = {
  meta: {
    type: 'suggestion',
    docs: {
      description: 'Disallow tests without title matches specified pattern',
    },
    schema: [
      {
        type: 'object',
        properties: {
          message: {
            type: 'string',
          },
          pattern: {
            type: 'object', // regexp
          },
          identifiers: {
            type: 'array',
          },
        },
      },
    ],
  },
  create(context) {
    const defaultPattern = /^.*[^.]$/i;
    const options = context.options[0] || {};
    const pattern = options.pattern ?? defaultPattern;
    const message = options.message ?? 'Test title should match pattern';
    const identifiers2 = options.identifiers ?? ['it', 'xit', 'specify', 'its'];

    return {
      CallExpression(node) {
        const getTitleNode = () => {
          const callee = node.callee;
          const args = node.arguments;
          const calleeName = callee?.name;
          const calleeObj = callee?.object;

          if (identifiers2.includes(calleeName ?? calleeObj?.name)) {
            // when title uses these quotes with template ``
            return args[0] && args[0].type === 'TemplateLiteral'
              ? node.arguments[0].quasis
              : node.arguments[0];
          }
        };

        const getQuasisTitle = (ttl) => {
          if (ttl && Array.isArray(ttl)) {
            return ttl.map((q) => q.value && q.value.raw).join(' ');
          }
          return undefined;
        };

        const getNode = (ttl) => {
          if (Array.isArray(ttl)) {
            const fullQuasis = getQuasisTitle(ttl);
            if (!pattern.test(fullQuasis)) {
              return title[0];
            }
          } else {
            if (ttl && !pattern.test(ttl.value)) {
              return ttl;
            }
          }
        };

        const title = getTitleNode();

        const testMessage = `Title: '${getQuasisTitle(title) ?? title?.value}'`;

        const nodeTitle = getNode(title);

        if (process.env['ESLINT_TEST'] === 'true') {
          console.log(`${testMessage} - ${nodeTitle ? 'fail' : 'ok'}`);
        }
        if (!nodeTitle) {
          return null;
        }

        context.report({
          node: nodeTitle,
          message: `${message}: ${pattern}`,
        });
      },
    };
  },
};
