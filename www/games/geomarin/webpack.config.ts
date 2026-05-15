import { Configuration } from 'webpack';

export default {
  resolve: {
    extensions: ['.ts'],
  },
  module: {
    rules: [
      { test: /\.ts$/, use: 'ts-loader' },
    ],
  },
} as Configuration;
