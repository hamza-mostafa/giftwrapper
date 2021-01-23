const { box: boxConfig } = require('../config/box')

function side2rectangle(width, length){
    return {
        surface: width * length,
        width,
        length
    }
}

const top = side2rectangle(boxConfig.width, boxConfig.length)
const facing = side2rectangle(boxConfig.width, boxConfig.height)
const hidden = side2rectangle(boxConfig.length, boxConfig.height)

exports.box = {
        paperWidth: 2 * hidden.width + facing.width + boxConfig.extraWidth,
        paperLength: 2 * facing.length + 2 * top.length + boxConfig.extraLength
}
