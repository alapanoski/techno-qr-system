const fs = require('fs');
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

function convertDataUriToImage(dataUri, filePath) {
    const base64Data = dataUri.split(';base64,').pop();
    const buffer = Buffer.from(base64Data, 'base64');
    fs.writeFileSync(filePath, buffer);
}

export default async function generateQR(req, res) {
    const center_image = 'images/download.png'
    const { string } = req.body;
    const width = 325; // To align the image in the center
    const cwidth = 75; // To increse the Quality of the image (Size)
    const canvas = createCanvas(width, width);
    QRCode.toCanvas(
        canvas,
        string, {
        scale: 11,
        // errorCorrectionLevel: 'L',
    }
    );

    const ctx = canvas.getContext("2d");
    const img = await loadImage(center_image);
    const center = ((width - cwidth) / 2) + 15;
    ctx.drawImage(img, center, center, cwidth, cwidth);
    const filePath = 'qrCodes/' + Math.random() + 'qr.png';

    convertDataUriToImage(canvas.toDataURL("image/png"), filePath);

    res.status(200).json({ message: "QR Code has been Successfully generated" });
}





// const qrcode = require('qrcode');

// export default async function generateQr(req, res) {
//     const { string } = req.body;

//     const logo = "/images/download.png"
//     qrcode.toFile('qrCodes/' + Math.random() + 'qr.png', string, {
//         color: {
//             dark: '#000000',
//             light: '#FFFFFF',
//         },
//     }, function (err) {
//         if (err) throw err

//     })

//     res.status(200).json({ message: "QR generated" });
// }
// const qrImage = require('qr-image');
// const fs = require('fs');

// export default async function generateQR(req, res) {
//     const logo = "imagesac3f7a47-50c1-424a-9763-d4a60161540c.jpg"
//     const filePath = 'qrCodes/' + Math.random() + 'qr.png';
//     const { string } = req.body;
//     const qr = qrImage.image(string, {
//         type: 'png',
//         size: 20,
//         margin: 1,
//         customEncoding: 'utf8',
//         ec_level: 'H',
//         mode: 'byte',
//         case_sensitive: true,
//         merge_image: logo, // File path of the image
//     });

//     qr.pipe(fs.createWriteStream(filePath));
//     res.status(200).json({ message: "QR generated" });
// }


