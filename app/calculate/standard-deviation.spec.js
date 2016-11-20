const { assert } = require('chai');
const packetExtractor = require('./standard-deviation');
const calculateAverage = require('./average');
const extractIntegerValues = require('./extract-integer-values');
const { squaredDistanceFromMean,
        sumSquaredDistanceFromMeans,
        calculateStandardDeviation } = require('./standard-deviation');

describe('Packet Extractor', () => {
  const packetData = [
    {
      pkt_size: '1',
      size: '1'
    },
    {
      pkt_size: '3',
      size: '3'
    }
  ]
  const packetParams = '-select_streams v -show_entries packet=pkt_size,size';

  let logger = {
    info: function(data) { console.log(data); }
  };

  it('should return the standard deviation', () => {
    const expectedStdDeviation = 1;
    const dataType = 'pkt_size';

    let standardDeviation = packetExtractor(calculateAverage, extractIntegerValues, logger)(dataType, packetData);

    assert.deepEqual(standardDeviation, expectedStdDeviation, 'There was an issue in calculating standard deviation');
  });

  context('#calculateAverage', () => {
    it('calculate total average of all packets', () => {
      const intAverages = [100, 200, 300];
      const expectedAverage = 200;

      let average = calculateAverage(intAverages);

      assert.equal(average, expectedAverage, 'Average bitrate was not calculated');
    });
  });

  context('#squaredDistanceFromMean', () => {
    it('should return the squared distance from average', () => {
      const average = 2;
      const packetValue = 1;
      const expectedValue = 1;

      let value = squaredDistanceFromMean(average)(packetValue);

      assert.equal(value, expectedValue, 'the squared distance from mean was calculated incorrectly');
    });
  });

  context('#calculateStandardDeviation', () => {
    it('should return average of squaredDistanceFromMeans', () => {
      const average = 2;
      const intAverages = [8, 12];
      const expectedValue = 2;

      let value = calculateStandardDeviation(calculateAverage)(intAverages);

      assert.deepEqual(value, expectedValue, 'the squared distance from mean was calculated incorrectly');
    });
  });
});
