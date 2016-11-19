const logger = require('logger');
const childProcess = require('child_process');
const calculateAverage = require('./app/calculate/standard-deviation');
const calculateStandardDeviation = require('./app/calculate/standard-deviation')(calculateAverage, logger);

let JSONStream = require('JSONStream');
let video = process.argv[process.argv.length - 1];

// frame=pkt_size
/*
  use packet SIZE to find total video size pretty exactly.


*/
let ffprobe = childProcess.spawn('ffprobe', ['-v', 'quiet', '-print_format', 'json', '-show_format', '-show_streams', '-show_frames',/* 'packet=pkt_size,size','frame=pkt_size',*/ '-i', 'niceViewValley.MP4']);
let stderr;

ffprobe.once('close', function (code) {
  if (code) console.log("ERROR ERROR ERROR", code);
});

ffprobe.stdout
  .pipe(JSONStream.parse())
  .once('data', (data, there) => {
    // Call packet extractor from here with the packets
    // console.log("#######", data)
    const stdev = calculateStandardDeviation('pkt_size', data.frames)
    console.log("Standard Deviation of Packet Data::::", stdev)

  });

////////////////////////////////////////////////
//// EXAMPLE PACKET OUTPUT FOR AUDIO/VIDEO
////////////////////////////////////////////////
/*

{ codec_type: 'video',
       stream_index: 0,
       pts: 99099,
       pts_time: '1.101100',
       dts: 99099,
       dts_time: '1.101100',
       duration: 3003,
       duration_time: '0.033367',
       size: '11100',
       pos: '3453772',
       flags: '_' },
     { codec_type: 'audio',
       stream_index: 1,
       pts: 55296,
       pts_time: '1.152000',
       dts: 55296,
       dts_time: '1.152000',
       duration: 1024,
       duration_time: '0.021333',
       size: '343',
       pos: '3464872',
       flags: 'K' },


*/
