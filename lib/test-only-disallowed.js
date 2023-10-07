

module.exports =  {
    meta: {
      docs: {
        category: 'Best Practices',
        description: 'Disallow "only" in tests',
        recommended: 'error',
        suggestion: true
      },
      messages: {
        focusedTest: 'Unexpected focused test (".only")',
        suggestRemoveFocus: 'Remove ".only" from test.'
      },
      schema: [],
      type: 'suggestion'
    },
    create(context) {
      return {
        CallExpression(node) {
          const getOnlyNode = () => {
            if(node.callee
              && node.callee.type === 'MemberExpression'
              && node.callee.property
              && node.callee.property.type === 'Identifier'
              && node.callee.property.name === 'only'
              && (node.callee.object && (
                node.callee.object.name === 'it' ||
                node.callee.object.name === 'test' ||
                node.callee.object.name === 'specify' ||
                node.callee.object.name === 'describe'||
                node.callee.object.name === 'suite'
              ))){
              return node.callee.property;
            }
            return null;
          }

          const onlyNode = getOnlyNode();

          if(!onlyNode){
            return ;
          }
          context.report({
            messageId: 'focusedTest',
            node: onlyNode,
            suggest: [{
              messageId: 'suggestRemoveFocus',
              fix: fixer => fixer.removeRange([onlyNode.range[0] - 1, onlyNode.range[1] + Number(onlyNode.type !== 'Identifier')])
            }]
          });


         /* const findOnlyNode = node => {
            const callee = node.callee.type === 'TaggedTemplateExpression'
              ? node.callee.tag
              : node.callee.type === 'CallExpression'
                ? node.callee.callee : node.callee;

            if (callee.type === 'MemberExpression') {
              if (callee.object.type === 'MemberExpression') {
                if ((callee.object.property, 'only')) {
                  return callee.object.property;
                }
              }

              if ((callee.property, 'only')) {
                return callee.property;
              }
            }

            return null;
          };
          const onlyNode = findOnlyNode(node);

          if (!onlyNode) {
            return;
          }

          context.report({
            messageId: 'focusedTest',
            node: onlyNode,
            suggest: [{
              messageId: 'suggestRemoveFocus',
              fix: fixer => fixer.removeRange([onlyNode.range[0] - 1, onlyNode.range[1] + Number(onlyNode.type !== 'Identifier')])
            }]
          });*/

        }
      };
    }
};