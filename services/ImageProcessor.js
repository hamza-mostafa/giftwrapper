const fs = require("fs");
const { pdf: pdfConfig } = require("../config/pdf");
const { Image, createCanvas, Canvas } = require("canvas");
const { box } = require('../services/box')
const { image: imageConfig } = require('../config/image')
const { cm2inch } = require("../helpers/UnitConverter");

exports.GeneratePdf = async (pattern) => {
        console.log('generating file ...', new Date)

        let image = new Image();
        image.src = process.cwd()+'/'+ pattern

        let pdfCanvas = new createCanvas(
            cm2inch(box.paperWidth) * 72,
            cm2inch(box.paperLength) * 72,
            'pdf'
        );

        let imageCanvas = new Canvas(
            box.paperWidth * imageConfig.requiredDPI,
            box.paperLength * imageConfig.requiredDPI,
        )

        let imageContext = imageCanvas.getContext('2d');
        imageContext.fillStyle = imageContext.createPattern(image, 'repeat');
        imageContext.fillRect(0, 0, imageCanvas.width, imageCanvas.height);

        let pdfContext = pdfCanvas.getContext('2d');

        pdfContext.drawImage(imageCanvas, 0,0, imageCanvas.width, imageCanvas.height, 0,0, pdfCanvas.width, pdfCanvas.height)
        // console.log('saving file', new Date)
        // recordToFiles(imageCanvas, pdfCanvas) // if a copy is required
        console.log('preparing buffering', new Date)

        return pdfCanvas.createPDFStream(pdfConfig)
}

function recordToFiles(imageCanvas, pdfCanvas) {
        try{
                fs.readFileSync('./tmp/uploading/uploadThis.pdf')
                fs.readFileSync('./tmp/uploading/uploadThis.png')
        }catch (e) {
                try {
                        fs.mkdir('./tmp/uploading', { recursive: true }, (err) => {
                                if (err) throw err;
                                fs.writeFileSync('./tmp/uploading/uploadThis.pdf', '', 'utf8');
                                fs.writeFileSync('./tmp/uploading/uploadThis.png', '', 'utf8');
                        });
                }catch (e) {
                        throw new Error('Please make sure the application can create folder uploading ');
                }
        }
        fs.writeFileSync('./tmp/uploading/uploadThis.png', imageCanvas.toBuffer('image/png'))
        fs.writeFileSync('./tmp/uploading/uploadThis.pdf', pdfCanvas.toBuffer('application/pdf'))
}