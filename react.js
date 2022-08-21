module.exports = {
  "parser":  "@typescript-eslint/parser",
  "extends": [
    "plugin:react/recommended",
    "plugin:import/react",
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
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "jsx-quotes": "error"
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
