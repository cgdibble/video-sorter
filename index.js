const childProcess = require('child_process');
let packetExtractor = require('./app/packet-extractor')(ffprobe);


let JSONStream = require('JSONStream');
let video = process.argv[process.argv.length - 1];

let ffprobe = childProcess.spawn('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', '-show_entries', 'packet=pts_time,size', '-i', 'niceViewValley.MP4']);
let stderr;

ffprobe.once('close', function (code) {
  if (code) console.log("ERROR ERROR ERROR", code);
});

ffprobe.stdout
  .pipe(JSONStream.parse())
  .once('data', (data, there) => {
    // Call packet extractor from here with the packets
    console.log("plain data::", data.packets);

  });
