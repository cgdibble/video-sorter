const childProcess = require('child_process');
let packetExtractor = require('./app/packet-extractor');


let JSONStream = require('JSONStream');
let video = process.argv[process.argv.length - 1];

// ffprobe -v quiet -print_format json -show_format -show_streams "lolwut.mp4" > "lolwut.mp4.json"
let ffprobe = childProcess.spawn('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', '-show_entries', 'packet=pts_time,size', /*'-report',*/ 'niceViewValley.MP4', '2>', 'videoData.json']);
let stderr;

ffprobe.stdout
  .on('data', (data) => {
      console.log("ermergerd thems packets::::::::",JSONStream.parse(data))
  })
  // .pipe(JSONStream.parse())
  // .once('data', (data) => {
  // })
