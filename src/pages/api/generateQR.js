const qrcode = require('qrcode');
const Jimp = require("jimp");

export default async function generateQr(req, res) {
    try {
        const logo = "src/assets/qrLogo.jpg";
        // Enter number of QR codes to generate
        for (let i = 22; i <= 23; i++) {
            const string = "http://users.technopreneur.co.in/33/T-" + i;
            const filePath = 'qrCodes/TH-' + i + '.png';
            const name = 'TH-' + i;

            await qrcode.toFile(filePath, string, {
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
                scale: 11,
                margin: 2
            });

            const qrImage = await Jimp.read(filePath);
            // const attachment = await Jimp.read(logo);

            // // Resize the attachment image to fit in the middle of the QR code
            // attachment.resize(qrImage.bitmap.width / 4.1, qrImage.bitmap.height / 4.1); //4.1
            // qrImage.composite(attachment, qrImage.bitmap.width / 2.6, qrImage.bitmap.height / 2.6);

            const font = await Jimp.loadFont(Jimp.FONT_SANS_16_BLACK);
            // Font, X coordinate, Y coordinate for the String
            qrImage.print(font, 150, qrImage.bitmap.height - 20, name);

            await qrImage.writeAsync(filePath);
        }

        res.status(200).json({ message: "QR codes with images generated" });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error });
    }
}
