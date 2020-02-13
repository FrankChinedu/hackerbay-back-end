module.exports = {
  env: {
    commonjs: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb-base',
    'prettier'
  ],
  plugins: ['import', 'prettier'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parserOptions: {
    ecmaVersion: 2018,
  },
  rules: {
    'one-var': 0,
    'linebreak-style': 0,
    'one-var-declaration-per-line': 0,
    'new-cap': 0,
    indent: ['error', 4],
    'consistent-return': 0,
    'no-param-reassign': 0,
    'comma-dangle': 0,
    curly: ['error', 'multi-line'],
    'import/no-unresolved': [2, { commonjs: true }],
    'no-shadow': ['error', { allow: ['req', 'res', 'err'] }],
  },
};
