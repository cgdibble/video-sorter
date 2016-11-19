const R = require('ramda');

module.exports = function (calculateAverage, logger, valueType, videoPackets) {
  return function(valueType, videoPackets) {
    const packetAverage = R.compose(calculateAverage, collectPacketIntAverages(valueType))(videoPackets);
    const standDeviation = R.map(calculateStandardDeviation(calculateAverage), collectPacketIntAverages(valueType))(videoPackets);

    return standDeviation;
  }
}
module.exports.collectPacketIntAverages = collectPacketIntAverages;
module.exports.squaredDistanceFromMean = squaredDistanceFromMean;
module.exports.calculateStandardDeviation = calculateStandardDeviation;

function collectPacketIntAverages(valueType, packetData) {
  return function(packetData) {
    return R.map((packet) => {
      return Number(packet[valueType]);
    }, packetData);
  }
}

function squaredDistanceFromMean(average, packetValue) {
  return function(packetValue) {
    const distance = packetValue - average;
    return Math.pow(distance, 2);
  }
}

function calculateStandardDeviation(calculateAverage, dataCollection) {
  return function(dataCollection) {
    const average = calculateAverage(dataCollection);

    return R.compose(Math.sqrt, calculateAverage, R.map(squaredDistanceFromMean(average)))(dataCollection);
  }
}
