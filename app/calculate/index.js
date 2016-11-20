const R = require('ramda');
const logger = require('logger');
const calculateAverage = require('./average');
const extractIntegerValues = require('./extract-integer-values');
const calculateStandardDeviation = require('./standard-deviation')(calculateAverage, extractIntegerValues, logger);

module.exports = function(dataSet) {
  const relevantValue = 'pkt_size';
  const average = R.compose(calculateAverage, extractIntegerValues(relevantValue))(dataSet.frames);
  const stdev = calculateStandardDeviation(relevantValue, dataSet.frames);

  return {
    average,
    stdev
  }
}
