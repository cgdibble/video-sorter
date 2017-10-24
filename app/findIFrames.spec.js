const findIFrames = require('./findIFrames')
const { singleVideoFrame } = require('../models/models')

describe('findIFrames()', () => {
  it('should return only the iframes', () => {
    const frameData = [singleVideoFrame('I')]
    findIFrames
  })
})
