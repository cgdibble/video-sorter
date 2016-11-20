const logger = require('logger');
const calculateAverage = require('./average');
const extractIntegerValues = require('./extract-integer-values');
const calculateStandardDeviation = require('./standard-deviation')(calculateAverage, extractIntegerValues, logger);

module.exports = function(dataSet) {

  // const average = calculateAverage();
  const average = calculateStandardDeviation('pkt_size', data.frames);
}
