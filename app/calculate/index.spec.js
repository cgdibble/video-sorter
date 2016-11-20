const { assert } = require('chai');
const R = require('ramda');
const logger = require('logger');

const extractVideoData = require('./');
const calculateAverage = require('./average');
const extractIntegerValues = require('./extract-integer-values');
const calculateStandardDeviation = require('./standard-deviation')(calculateAverage, extractIntegerValues, logger);

describe('Calculate -> Component', () => {
  const packetData = [
    {
      pkt_size: '1',
      size: '1'
    },
    {
      pkt_size: '3',
      size: '3'
    }
  ];

  it('should return an object containing the videos average and stdev bitrate', () => {
    const expectedData = {
      average: 2,
      stdev: 1
    }
    const videoData = extractVideoData(packetData);

    assert.deepEqual(videoData, expectedData, 'Incorrect video data');
  });
});
