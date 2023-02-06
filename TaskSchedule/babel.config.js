// module.exports = {
//   presets: ['module:metro-react-native-babel-preset'],
//   plugins: [
//     [
//       'module-resolver',
//       {
//         root: ['./src'],
//         extensions: [
//           '.ios.js',
//           '.android.js',
//           '.js',
//           '.jsx',
//           '.json',
//           '.tsx',
//           '.ts',
//           '.native.js',
//         ],
//         alias: {
//           tests: ['./tests/'],
//         },
//       },
//     ],
//   ],
// };
module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
  plugins: [
    [
      'module-resolver',
      {
        root: ['./src'],
        extensions: [
          '.ios.js',
          '.android.js',
          '.js',
          '.jsx',
          '.ts',
          '.tsx',
          '.json',
          '.native.js',
        ],
        alias: {
          tests: ['./tests/'],
        },
      },
    ],
  ],
};
