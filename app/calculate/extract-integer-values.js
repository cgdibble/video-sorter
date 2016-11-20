const R = require('ramda');

module.exports = collectPacketIntAverages;

function collectPacketIntAverages(valueType, packetData) {
  return function(packetData) {
    return R.map((packet) => {
      return Number(packet[valueType]);
    }, packetData);
  }
}
