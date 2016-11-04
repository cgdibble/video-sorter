const { assert } = require('chai');
const sinon  = require('sinon');
const packetExtractor = require('./packet-extractor');

describe('Packet Extractor', () => {
  const video = "a-video-file.mp4";
  const packetParams = '-select_streams v -show_entries packet=pts_time,size';

  let sandbox = sinon.sandbox.create();
  let ffprobeMock = sandbox.stub();
  let logger = {
    info: function(data) { console.log(data); }
  };

  afterEach(() => {
    sandbox.restore();
  });

  it('should return the video string', () => {
    let videoPath = packetExtractor(logger, ffprobeMock, video);

    assert.equal(video, videoPath, 'the correct video path was not returned');
  });

  it('should call ffprobe.spawn with video and params', () => {
    packetExtractor(logger, ffprobeMock, video);

    assert.equal(ffprobeMock.args[0][0], video, 'FFProbe was not called with video');
    assert.equal(ffprobeMock.args[0][1], packetParams, 'FFProbe was not called with correct params');
  });
});
