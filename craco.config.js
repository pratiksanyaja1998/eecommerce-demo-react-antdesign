const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#f26f10', "@text-blue": '#081834' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};