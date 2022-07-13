module.exports = {
  presets: ['@vue/babel-preset-jsx'],
  plugins: [
    '@babel/plugin-proposal-optional-chaining',
    '@babel/plugin-proposal-nullish-coalescing-operator',
    [
      'module-resolver',
      {
        root: ['.'],
        alias: {
          '@': './src',
        },
      },
    ],
  ],
}
