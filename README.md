# video-sorter

A utility for calculating different data and metrics about videos. Currently it is just calculating the standard deviation in bitrate between video packets. This information is going to be used to draw comparisons between videos for categorizing video libraries to make intelligent decisions in selecting encoding profiles. 

## Future Developments:
- Store data about a given video in DB (i.e. Stdev of bitrate, average bitrate, GOP size, frame rate, packet avgs etc.)
- Be able to run against a directory/library of videos. 
  - Starting with a filesystem directory and moving into processing recursively
  - Then on to AWS hosted content
- Ability to run test encodes via FFMPEG
  - Ideally via a simplistic dashboard to adjust values and compare between original and test encodes
  - Maybe even run a variety of test encodes to make comparisons in file size and other metrics
- Dashboard:
  - Chart bitrate data for original vs test encode
  - compare data about library of videos
  - Run ffmpeg commands to test encode videos based on certain parameters adjusted within the gui
