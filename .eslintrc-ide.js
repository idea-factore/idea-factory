module.exports = {
  env: {
    browser: true,
  },
  extends: [
    "airbnb", 
    'plugin:prettier/recommended', 
    'prettier/react'
  ],
  plugins: ["babel"],
  rules: {
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        "js": "never",
        "jsx": "never",
        "ts": "never",
        "tsx": "never"
      }
   ],
    "import/prefer-default-export": "error",
    "prefer-destructuring": "error",
    "prefer-template": "error",
    "react/prop-types": "error",
    "react/destructuring-assignment": "error",
    "no-console": "error",
  },
};
