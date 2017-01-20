module.exports = {
  type: 'react-component',

  npm: {
    esModules: true,
    umd: {
      global: 'CollectionHelpers',
      externals: {
        react: 'React',
      },
    },
  },

  webpack: {
    compat: {
      enzyme: true,
    },
    html: {
      template: 'demo/index.html',
    },
  },

  karma: {
    testDirs: [
      'src/polyfills.js',
    ]
  }
};
