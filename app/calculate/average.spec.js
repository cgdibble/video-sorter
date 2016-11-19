const { assert } = require('chai');
const calculateAverage = require('./average');

describe('#calculateAverage', () => {
  it('calculate total average of all packets', () => {
    const intAverages = [100, 200, 300];
    const expectedAverage = 200;

    let average = calculateAverage(intAverages);

    assert.equal(average, expectedAverage, 'Average bitrate was not calculated');
  });
});
