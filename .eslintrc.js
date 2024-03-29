module.exports = {
    parser: '@typescript-eslint/parser',
    extends: [
        'airbnb',
        'prettier',
        'plugin:compat/recommended',
        'plugin:vue/vue3-recommended',
        'eslint:recommended'
    ],
    plugins: ['@typescript-eslint', 'import'],
    env: {
        browser: true,
        node: true,
        es6: true,
        mocha: true,
        jest: true,
        jasmine: true,
    },
    globals: {
        APP_TYPE: true,
        page: true,
    },
    rules: {
        'react/jsx-filename-extension': [1, {extensions: ['.js']}],
        'react/jsx-wrap-multilines': 0,
        'react/prop-types': 0,
        'react/forbid-prop-types': 0,
        'react/jsx-one-expression-per-line': 0,
        'import/no-unresolved': [2, {ignore: ['^@/', '^@@/']}],
        'import/no-extraneous-dependencies': [
            2,
            {
                optionalDependencies: true,
                devDependencies: ['**/tests/**.js', '/mock/**/**.js', '**/**.test.js'],
            },
        ],
        'jsx-a11y/no-noninteractive-element-interactions': 0,
        'jsx-a11y/click-events-have-key-events': 0,
        'jsx-a11y/no-static-element-interactions': 0,
        'jsx-a11y/anchor-is-valid': 0,
        'linebreak-style': 0,
    },
    settings: {
        polyfills: ['fetch', 'promises', 'url', 'object-assign'],
        "import/resolver": {
            alias: {
                map: [
                    ['@/', './src/']
                ],
                extensions: ['.ts', '.js', '.jsx', '.vue', '.tsx']
            },
        },
    },
};
