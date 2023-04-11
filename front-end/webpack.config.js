const path = require('path');
const webpack = require('webpack');
const dotenv = require('dotenv').config({
  path: path.join(__dirname, '.env')
});

module.exports = {
  plugins: [
    new webpack.DefinePlugin({
      'process.env': JSON.stringify(dotenv.parsed),
    }),
  ],
};
// const webpack = require('webpack');
// const dotenv = require('dotenv').config();

// module.exports = {
//   plugins: [
//     new webpack.DefinePlugin({
//       'process.env': JSON.stringify(dotenv.parsed)
//     })
//   ]
// };


