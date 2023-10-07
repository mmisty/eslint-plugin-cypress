

const { basename } = require('path')

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
}

module.exports =  {
  meta: {
    // docs: {
    //   category: 'Best Practices',
    //   description: 'Disallow "get.get" in tests',
    //   recommended: 'error',
    //   // suggestion: true
    // },
    messages: {
      unexpectedChain: 'Unexpected chain',
      suggestFixChain: 'Remove consequient "get.get "'
    },
    schema : [schema],
    type: 'suggestion'
  },
  create(context) {
    let unsafeChainCmds = [ 'get' ];
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
      "ExpressionStatement"(node){
        chainRes = [];
        nodes = [];
      },
      "ExpressionStatement:exit"(node){
        chainRes = chainRes.reverse();
        nodes = nodes.reverse();
        const allCorrect = !chainRes.some((t,i, a)=> i!== a.indexOf(t) && unsafeChainCmds.includes(t) );
        const nodeIndex = chainRes.findIndex((t,i, a)=> i!== a.indexOf(t) && unsafeChainCmds.includes(t) );
        if(process.env['ESLINT_TEST'] === 'true'){
          console.log(JSON.stringify(chainRes) + ': ' + (allCorrect ? (`ok (hasOpts=${hasOpts})`)  : "INVALID"));
        }
        
        if(!allCorrect){
          context.report({
            message: `${nodes[nodeIndex]?.name} is unexpected in the chain - split the chain or change the command`,
            node: nodes[nodeIndex],
          });
        }
      },
      
      CallExpression(node) {
        const namesCmd  = (par, arr, nd) => {
          if(par?.parent?.property?.name){
            arr.push(par?.parent?.property?.name)
            nd.push(par?.parent?.property);
            
            namesCmd(par?.parent, arr, nd);
          }
          
          if(par?.callee?.object?.name === 'cy'){
            arr.push(par?.callee?.property?.name);
            nd.push(par?.callee?.property);
          }
        }
        
        namesCmd(node, chainRes, nodes);
      }
    };
  }
};