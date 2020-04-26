module.exports = {
  "parser":  "@typescript-eslint/parser",
  "extends": [
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:import/react",
    "plugin:import/errors",
    "plugin:import/warnings"
  ],
  "plugins": ["react-hooks"],
  "env": {
    "es6": true,
    "node": true,
    "browser": true
  },
  "parserOptions": {
    "ecmaVersion": 2018,
    "ecmaFeatures": {
      "jsx": true
    }
  },
  "rules": {
    "react/prop-types": "off",
    "@typescript-eslint/array-type": ["error", { "default": "generic" }],
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/indent": ["error", 2, { "SwitchCase": 1 }],
    "@typescript-eslint/no-explicit-any": "off",
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "eqeqeq": ["error", "smart"],
    "no-else-return": "warn",
    "no-multi-spaces": ["error", { "ignoreEOLComments": true }],
    "vars-on-top": "warn",
    "no-shadow": "error",
    "no-use-before-define": "error",
    "array-bracket-spacing": "error",
    "block-spacing": "error",
    "brace-style": ["error", "1tbs", { "allowSingleLine": true }],
    "camelcase": "error",
    "comma-dangle": "error",
    "comma-spacing": "error",
    "comma-style": "error",
    "computed-property-spacing": "error",
    "eol-last": "error",
    "func-call-spacing": "error",
    "func-style": ["error", "declaration", { "allowArrowFunctions": true }],
    "indent": ["error", 2, { "SwitchCase": 1 }],
    "jsx-quotes": "error",
    "key-spacing": "error",
    "keyword-spacing": "error",
    "lines-around-comment": ["error", { "beforeBlockComment": true, "allowBlockStart": true }],
    "lines-between-class-members": ["error", "always", { "exceptAfterSingleLine": true }],
    "max-depth": "warn",
    "max-lines": ["warn", { "skipBlankLines": true, "skipComments": true }],
    "newline-per-chained-call": ["error", { "ignoreChainWithDepth": 2 }],
    "no-bitwise": "error",
    "no-continue": "error",
    "no-lonely-if": "error",
    "no-multiple-empty-lines": "error",
    "no-nested-ternary": "error",
    "no-new-object": "error",
    "no-tabs": "error",
    "no-trailing-spaces": "error",
    "no-unneeded-ternary": "error",
    "no-whitespace-before-property": "error",
    "nonblock-statement-body-position": "error",
    "object-curly-spacing": ["error", "always"],
    "object-property-newline": ["error", { "allowAllPropertiesOnSameLine": true }],
    "operator-assignment": "error",
    "operator-linebreak": ["error", "after"],
    "prefer-object-spread": "error",
    "quote-props": ["error", "consistent-as-needed"],
    "quotes": ["error", "single"],
    "semi": "error",
    "semi-style": "error",
    "space-before-blocks": "error",
    "space-before-function-paren": ["error", { "anonymous": "always", "named": "never", "asyncArrow": "always" }],
    "space-in-parens": "error",
    "switch-colon-spacing": "error",
    "arrow-parens": ["error", "as-needed"],
    "arrow-spacing": "error",
    "no-duplicate-imports": "error",
    "no-useless-computed-key": "error",
    "no-var": "error",
    "object-shorthand": "error",
    "prefer-const": "error",
    "prefer-destructuring": ["error", { "array": false, "object": true }],
    "prefer-numeric-literals": "error",
    "prefer-template": "error",
    "rest-spread-spacing": "error",
    "template-curly-spacing": "error"
  },
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
        "moduleDirectory": ["node_modules", "src"]
      }
    },
    "react": {
      "version": "detect"
    }
  }
};
