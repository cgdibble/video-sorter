const logger = require('logger');
const childProcess = require('child_process');
const extractVideoData = require('./app/calculate');
// const calculateAverage = require('./app/calculate/standard-deviation');
// const calculateStandardDeviation = require('./app/calculate/standard-deviation')(calculateAverage, extractVideoData, logger);
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
    const videoData = extractVideoData(data.frames);
    console.log("VIDEO DATA::::", videoData)

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





/*

ffmpeg -y -i niceViewValley.MP4 -c:v libx264 -b:v 5000k -pass 1 -f mp4 NUL && \
ffmpeg -i niceViewValley.MP4  -c:v libx264 -b:v 5000k -maxrate 10000k -bufsize 10000k -pass 2 Test-Encode.mp4

Run ffprobe, take average and standard deviation. Run ffmpeg command above but with the 110% constrained vbr (so set -maxrate to 110% of bitrate)


bufsize should be about 1 or 2 seconds, so have it synced with bitrate
---> set bufsize to somewhere between the same as your maxrate (one second) and twice of your maxrate (2 seconds).
            If this is still not low enough, lower your maxrate and then re-set bufsize accordingly.
 --> http://superuser.com/questions/945413/how-to-consider-bitrate-maxrate-and-bufsize-of-a-video-for-web
 --> https://trac.ffmpeg.org/wiki/Limiting%20the%20output%20bitrate

*/
