const R = require('ramda');

module.exports = function (calculateAverage, extractIntegerValues, logger, valueType, videoPackets) {
  return function(valueType, videoPackets) {
    const packetAverage = R.compose(calculateAverage, extractIntegerValues(valueType))(videoPackets);
    const standDeviation = R.map(calculate(calculateAverage), extractIntegerValues(valueType))(videoPackets);

    return standDeviation;
  }
}

module.exports.squaredDistanceFromMean = squaredDistanceFromMean;
module.exports.calculate = calculate;

function squaredDistanceFromMean(average, packetValue) {
  return function(packetValue) {
    const distance = packetValue - average;
    return Math.pow(distance, 2);
  }
}

function calculate(calculateAverage, dataCollection) {
  return function(dataCollection) {
    const average = calculateAverage(dataCollection);

    return R.compose(Math.sqrt, calculateAverage, R.map(squaredDistanceFromMean(average)))(dataCollection);
  }
}
