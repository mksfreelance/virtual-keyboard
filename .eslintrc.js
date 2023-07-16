module.exports = {
  env: {
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'env': {
      'browser': true,
      'node': true
    },
    'no-param-reassign': 0,
    'no-use-before-define': ['error', {
      functions: false,
      classes: true,
      variables: true,
      allowNamedExports: false,
    }],
  },
};
