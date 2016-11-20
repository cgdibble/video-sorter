const R = require('ramda');
const { assert } = require('chai');

const ffprobe = require('./');
const { getDefaultCommand, assembleCustomCommand } = require('./');

describe('Ffprobe Processing', () => {
  context('when validating inputs', ()=>{
    it.skip('should throw if not given a list of videos', () => {
      assert.throws(() => ffprobe());
    });

    it('should throw if not given a video', () => {
      assert.throws(() => ffprobe());
    });
  });

  it('should return default ffprobe command if no options provided', () => {
    const videos = ['aFakeVideo.mp4'];
    const command = ffprobe(videos);
    const defaultCommand = ['-v', 'quiet', '-print_format', 'json', '-i', videos[0]];

    assert.deepEqual(command, defaultCommand, 'The default ffprobe command was not used');
  });

  context('#getDefaultCommand', () => {
    it('should return the default command', () => {
      const videos = ['aFakeVideo.mp4'];
      const defaultCommand = ['-v', 'quiet', '-print_format', 'json', '-i', videos[0]];

      const command = getDefaultCommand(videos[0]);

      assert.deepEqual(command, defaultCommand, 'Default command was not returned');
    });
  });

  context('#assembleCustomCommand', () => {
    it('should create the custom command with the given options', () => {
      const videos = ['aFakeVideo.mp4'];
      const expectedCommand = ['-v', 'quiet', '-print_format', 'json', '-i', videos[0], '-show_frames'];
      const options = {
        show: {
          type:'frame'
        }
      }

      const command = assembleCustomCommand(videos[0], options);

      assert.deepEqual(command, expectedCommand, 'Command was created corrently');
    });

    it('should add additional specific values when supplied', () => {
      const videos = ['aFakeVideo.mp4'];
      const expectedCommand = ['-v', 'quiet', '-print_format', 'json', '-i', videos[0], '-show_frames', 'frame=pkt_size'];
      const options = [{
        type: 'frame',
        additional: ['pkt_size']
      }];

      const command = assembleCustomCommand(videos[0], options);

      assert.deepEqual(command, expectedCommand, 'Command was created corrently');
    });

    it('should be able to handle a variety of show parameters', () => {
      const videos = ['aFakeVideo.mp4'];
      const expectedCommand = ['-v', 'quiet', '-print_format', 'json', '-i', videos[0], '-show_frames', 'frame=pkt_size', '-show_format'];
      const options = [
        {
          type: 'frame',
          additional: ['pkt_size']
        },
        {
          type: 'format'
        }
      ]

      const command = assembleCustomCommand(videos[0], options);

      assert.deepEqual(command, expectedCommand, 'Command was created corrently');
    });

    it('should throw if invalid additional parameters are given');

  });
});
