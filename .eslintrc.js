module.exports = {
    "env": {
        "browser": true,
        "es6": true,
        "jest":true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended"
        ],
    "globals": {
        "Atomics": "readonly",
        "SharedArrayBuffer": "readonly"
    },
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 2018,
        "sourceType": "module"
    },
    "plugins": [
        "react"
    ],
    "rules": {
        "react/react-in-jsx-scope": "off"
    },
    "settings": {
        "react": {
            "version": "detect" // Automatically detect the React version
        }
    }
};