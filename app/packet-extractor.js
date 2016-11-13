const R = require('ramda');

module.exports = function (logger, videoPackets) {
  return function(videoPackets) {
    const packetAverage = R.compose(calculateAverage, collectPacketIntAverages)(videoPackets);

    const metaData = assembleMetaData(packetAverage);

    return metaData;
  }
}
module.exports.collectPacketIntAverages = collectPacketIntAverages;
module.exports.calculateAverage = calculateAverage;
module.exports.assembleMetaData = assembleMetaData;
module.exports.squaredDistanceFromMean = squaredDistanceFromMean;
module.exports.calculateStandardDeviation = calculateStandardDeviation;

function assembleMetaData(average) {
  return {
    average
  }
}

function calculateAverage(data) {
  console.log(" the data", data)
  let total = R.sum(data);

  return total / data.length
}

function collectPacketIntAverages(packetData) {
  return R.map((packet) => {
    return Number(packet.size);
  }, packetData)
}

function getPacketParams() {
  return '-select_streams v -show_entries packet=pts_time,size';
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
  // let data = dataCollection.map((value) => {
  //   return squaredDistanceFromMean(value, average);
  // });
  //
  // return Math.sqrt(calculateAverage(data));
  // squaredDistanceFromMean needs to be run for each packetValue within the packetData √
    // then aggregated into an array to be averaged using calculateAverage √
    // then take square root
}

function stDev() {
  /*
    sqroot of:
      sum((value - avg)^2)
      divided by number of values
  */

  /*
    √ 1) find mean ---> calculateAverage
    √ 2) for each packetValue, do (packetValue - mean)^2 ---> squaredDistanceFromMean
    find average of those values: ---> calculateAverage
      3) then sum all of those values together
      4) Divide by number of packets
    5) take the square root
  */
}
