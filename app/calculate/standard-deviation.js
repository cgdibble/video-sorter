const R = require('ramda');

module.exports = function (logger, videoPackets) {
  return function(videoPackets) {
    const packetAverage = R.compose(calculateAverage, collectPacketIntAverages)(videoPackets);
    const standDeviation = R.map(calculateStandardDeviation, collectPacketIntAverages)(videoPackets);

    return standDeviation;
  }
}
module.exports.collectPacketIntAverages = collectPacketIntAverages;
module.exports.calculateAverage = calculateAverage;
module.exports.squaredDistanceFromMean = squaredDistanceFromMean;
module.exports.calculateStandardDeviation = calculateStandardDeviation;

function calculateAverage(data) {
  let total = R.sum(data);

  return total / data.length
}

function collectPacketIntAverages(packetData) {
  return R.map((packet) => {
    return Number(packet.size);
  }, packetData)
}

function squaredDistanceFromMean(average, packetValue) {
  return function(packetValue) {
    const distance = packetValue - average;
    return Math.pow(distance, 2);
  }
}

function calculateStandardDeviation(dataCollection) {
  const average = calculateAverage(dataCollection);


  return R.compose(Math.sqrt, calculateAverage, R.map(squaredDistanceFromMean(average)))(dataCollection);
}
