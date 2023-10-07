module.exports = (identifiers) => {
  return {
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
          },
        },
      ],
    },
    create(context) {
      const options = context.options[0] || {};
      const pattern = options.pattern ?? /^#\d+[\s\w-_]/i;
      const message = options.message ?? 'Test title should match pattern';

      return {
        CallExpression(node) {
          const reg = pattern;

          let testShouldHaveId = (arg) => {
            context.report({
              node: arg,
              message: `${message}: ${reg}`,
            });
          };

          const getNode = () => {
            if (
              (node.callee.name && identifiers.includes(node.callee.name)) ||
              (!node.callee.name &&
                node.callee.object &&
                identifiers.includes(node.callee.object.name))
            ) {
              if (
                node.arguments[0] &&
                node.arguments[0].type === 'TemplateLiteral'
              ) {
                // when title uses these quotes with template ``
                const quasis = node.arguments[0].quasis;

                const fullQuasis = quasis
                  .map((q) => q.value && q.value.raw)
                  .join(' ');

                if (!reg.test(fullQuasis)) {
                  testShouldHaveId(quasis[0]);
                  return null;
                }
              } else {
                if (node.arguments[0] && !reg.test(node.arguments[0].value)) {
                  testShouldHaveId(node.arguments[0]);
                  return node;
                }
              }
            }
          };

          const nodeTitle = getNode();
          if (!nodeTitle) {
            return null;
          }
        },
      };
    },
  };
};
