module.exports = function (logger, ffprobe, video) {
  // pass in the ffprobe = spawn(videopath, params)
  ffprobe(video, getPacketParams());

  return video
}

function getPacketParams() {
  return '-select_streams v -show_entries packet=pts_time,size'
}
