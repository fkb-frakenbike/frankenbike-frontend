module.exports = {
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
      'no-console': ['warn', { allow: ['warn', 'error'] }]
    },
    settings: {
      react: {
        version: 'detect'
      }
    }
  };