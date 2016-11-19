const R = require('ramda');

module.exports = calculateAverage

function calculateAverage(data) {
  let total = R.sum(data);

  return total / data.length
}
