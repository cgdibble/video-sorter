const { assert } = require('chai');
const sinon  = require('sinon');
const packetExtractor = require('./standard-deviation');
const { collectPacketIntAverages,
        calculateAverage,
        squaredDistanceFromMean,
        sumSquaredDistanceFromMeans,
        calculateStandardDeviation } = require('./standard-deviation');

describe('Packet Extractor', () => {
  const packetData = [
    {
      pts_time: '0.1',
      size: '1'
    },
    {
      pts_time: '0.3',
      size: '3'
    }
  ]
  const packetParams = '-select_streams v -show_entries packet=pts_time,size';

  let sandbox = sinon.sandbox.create();
  let ffprobeMock = sandbox.stub();
  let logger = {
    info: function(data) { console.log(data); }
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the standard deviation', () => {
    const expectedStdDeviation = 1;

    let standardDeviation = packetExtractor(logger)(packetData);

    assert.deepEqual(standardDeviation, expectedStdDeviation, 'There was an issue in calculating standard deviation');
  });

  context('#collectPacketIntAverages', () => {
    it('should return the video string', () => {
      let expectedIntAverages = [1, 3];
      let packetAverages = collectPacketIntAverages(packetData);

      assert.deepEqual(packetAverages, expectedIntAverages, 'the correct integer averages were not returned');
    });
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
      // const expectedValue = [Math.pow(2,2), Math.pow(4,2), Math.pow(2,2)];
      const expectedValue = 2;

      let value = calculateStandardDeviation(intAverages);

      assert.deepEqual(value, expectedValue, 'the squared distance from mean was calculated incorrectly');
    });
  });

  context.skip('#sumSquaredDistanceFromMeans', () => {
    it('should sum the squared distances from average', () => {
      const expectedSum = 4;
      const squaredDistacesFromAverage = [2, 2];

      let sum = sumSquaredDistanceFromMeans(squaredDistacesFromAverage);

      assert.equal(sum, expectedSum, 'Sum of squared distance from means was not calculated correctly');
    });
  });

  it.skip('should call ffprobe.spawn with video and params', () => {
    packetExtractor(logger, ffprobeMock, video);

    assert.equal(ffprobeMock.args[0][0], video, 'FFProbe was not called with video');
    assert.equal(ffprobeMock.args[0][1], packetParams, 'FFProbe was not called with correct params');
  });
});
