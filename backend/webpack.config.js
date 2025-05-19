import path from 'node:path'
import CopyPlugin from 'copy-webpack-plugin'
import config from '../config.json' assert { type: 'json' }

const OUT_DIR = path.resolve(config.output, config.name)

export default {
  mode: 'production',
  entry: {
    client: path.resolve('src/client/main.ts'),
    server: path.resolve('src/server/main.ts'),
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve('fxmanifest.lua'),
        },
      ],
    }),
  ],
  resolve: {
    extensions: ['.ts', '.js'],
    alias: {
      '@shared': path.resolve('..', 'common', 'shared'),
    },
  },
  output: {
    filename: '[name].js',
    path: OUT_DIR,
  },
  target: 'node',
}
