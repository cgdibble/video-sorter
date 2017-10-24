const singleVideoFrame = (frameType = 'B') => {
  return {
    media_type: 'video',
    stream_index: 0,
    key_frame: 0,
    pkt_pts: 0,
    pkt_pts_time: '0.000000',
    pkt_dts: 0,
    pkt_dts_time: '0.000000',
    best_effort_timestamp: 0,
    best_effort_timestamp_time: '0.000000',
    pkt_duration: 3003,
    pkt_duration_time: '0.033367',
    pkt_pos: '600075',
    pkt_size: '54608',
    width: 1920,
    height: 1080,
    pix_fmt: 'yuv420p',
    sample_aspect_ratio: '1:1',
    pict_type: `${frameType}`,
    coded_picture_number: 1,
    display_picture_number: 0,
    interlaced_frame: 0,
    top_field_first: 0,
    repeat_pict: 0
  }
}

module.exports = {
  singleVideoFrame
}
