const path = require('path');

console.log(path.resolve('../../', 'node_modules/@dank-style/react'));
module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    'storybook-dark-mode',
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-react-native-web',
    '@storybook/addon-docs',
  ],
  framework: '@storybook/react',
  typescript: {
    reactDocgen: 'none',
  },

  staticDirs: ['../public'],
  webpackFinal: async (config, { configType }) => {
    // `configType` has a value of 'DEVELOPMENT' or 'PRODUCTION'
    // You can change the configuration based on that.
    // 'PRODUCTION' is used when building the static version of storybook.

    // Make whatever fine-grained changes you need
    // config.module.rules.push({
    //   test: /\.scss$/,
    //   use: ['style-loader', 'css-loader', 'sass-loader'],
    //   include: path.resolve(__dirname, '../'),
    // });

    config.module.rules.push({
      test: /\.(js|ts|tsx)$/,
      use: 'babel-loader',
    });

    // Return the altered config
    return config;
  },
};
