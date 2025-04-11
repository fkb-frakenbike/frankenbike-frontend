module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  extends: [
    'next', 
    'next/core-web-vitals', 
    'eslint:recommended', 
    'plugin:react/recommended', 
    'plugin:@typescript-eslint/recommended',
    'plugin:prettier/recommended'  // Intégration ESLint et Prettier
  ],
  plugins: ['react', '@typescript-eslint', 'prettier'],
  parserOptions: {
    ecmaVersion: 2021,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true
    },
    project: './tsconfig.json'
  },
  env: {
    browser: true,
    es2021: true,
    node: true,
    jest: true,
  },
  rules: {
    'prettier/prettier': 'error',
    'react/react-in-jsx-scope': 'off',
    'react/prop-types': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    'no-unused-vars': 'off',
    '@typescript-eslint/no-unused-vars': ['error', { 
      'argsIgnorePattern': '^_',
      'varsIgnorePattern': '^_'
    }],
    'no-console': ['warn', { allow: ['warn', 'error'] }],
    "quotes": ["error", "single", { "avoidEscape": true }],
    // Règles supplémentaires recommandées
    'react/jsx-uses-react': 'off',
    'react/jsx-uses-vars': 'error',
    'import/prefer-default-export': 'off',
    '@next/next/no-img-element': 'off',
    'jsx-a11y/alt-text': 'warn'
  },
  settings: {
    react: {
      version: 'detect'
    }
  }
};
