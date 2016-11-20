const { assert } = require('chai');
const extractIntegerValues = require('./extract-integer-values');

describe('Extract Integer Averages', () => {
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

  it('should return integer averages', () => {
    const expectedIntAverages = [1, 3];
    const dataType = 'pkt_size';

    const packetAverages = extractIntegerValues(dataType)(packetData);

    assert.deepEqual(packetAverages, expectedIntAverages, 'the correct integer averages were not returned');
  });
});
