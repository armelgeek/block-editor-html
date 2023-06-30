const { createImportResolver } = require('eslint-import-resolver-vite');

module.exports = {
  // ...autres configurations ESLint

  settings: {
    'module-resolver': {
      alias: {
        map: [['@', './src']],
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json'],
      },
      ...createImportResolver()
    },
  },
};
