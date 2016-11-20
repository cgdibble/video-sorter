const R = require('ramda');

module.exports = function(videos, options) {
  if (!videos /*|| videos.length === 0*/) throw new Error('No videos were provided');

  const command = generateCommand(videos, options);

  return command;
}

module.exports.generateCommand = generateCommand;
module.exports.getDefaultCommand = getDefaultCommand;
module.exports.assembleCustomCommand = assembleCustomCommand;

function generateCommand(videos, options){
  if (!options) return getDefaultCommand(videos[0]);

  return assembleCustomCommand(videos[0], options.show);
}

function getDefaultCommand(video){
  return ['-v', 'quiet', '-print_format', 'json', '-i', video];
}

function assembleCustomCommand(video, options) {
  let command = getDefaultCommand(video);

  R.map((value) => {
    command.push(ffprobeParameters[value.type]);
    if (value.additional) {
      command.push(`${value.type}=${value.additional.join()}`);
    }
  }, options);

  return command;
}

const ffprobeParameters = {
  frame: '-show_frames',
  format: '-show_format',
  streams: '-show_streams'
  // --> if an array, set packets=pkt_Size,size aka what is provided
  //  basically, if truthy, add -show_frames, if array, then add packets= portion as well.
}
