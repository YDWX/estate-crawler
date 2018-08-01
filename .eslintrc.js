// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true
  },
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['airbnb-base'],
  // required to lint *.vue files
  plugins: [],
  // add your custom rules here

  rules: {
    // don't require .vue extension when importing
    'import/extensions': [
      'off',
      'always',
      {
        js: 'never'
      }
    ],
    'import/no-unresolved': ['off'],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': [
      'error',
      {
        props: true,
        ignorePropertyModificationsFor: [
          'state', // for vuex state
          'acc', // for reduce accumulators
          'e' // for e.returnvalue
        ]
      }
    ],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': [
      'error',
      {
        optionalDependencies: ['test/unit/index.js']
      }
    ],

    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    'comma-dangle': ['off'],
    'max-len': ['off'],
    'arrow-parens': ['error', 'always'],
    'no-lonely-if': ['off'],
    'no-undef': 'warn',
    'no-unused-vars': 'warn',
    semi: ['error', 'never'],
    'no-shadow': ['off'],
    'no-multi-assign': ['off'],
    'no-param-reassign': ['warn'],
    'no-restricted-globals': ['off'],
    'arrow-body-style': ['error', 'always'],
    'no-useless-constructor': ['off'],
    'object-curly-newline': ['off'],
    'function-paren-newline': ['off'],
    'class-methods-use-this': ['off'],
    'no-mixed-operators': ['off'],
    'camelcase': ['warn'],
    'radix': ['off']
  }
}
