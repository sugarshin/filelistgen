const Promise = require('bluebird');
const parseXLSX = require('excel');

module.exports = function parseXLSXAsync(filepath) {
  return new Promise((resolve, reject) => {
    parseXLSX(filepath, (err, data) => {
      if (err) reject(err);
      resolve(data);
    });
  });
};
