module.exports = {
    root: true,
    env: {
    // this section will be used to determine which APIs are available to us
    // (i.e are we running in a browser environment or a node.js env)
        node: true,
        browser: true,
        jest: true
    },
    parserOptions: {
        parser: 'babel-eslint',
        // specifying a module sourcetype prevent eslint from marking import statements as errors
        sourceType: 'module'
    },
    extends: [
        'plugin:vue/essential',
        '@vue/standard'
    ],
    rules: {
        'arrow-parens': 0,
        'semi': [
            2,
            'always'
        ],
        'indent': [
            'error',
            4
        ],
        'one-var': [
            'error',
            'always'
        ],
        'generator-star-spacing': 0
    }
};
