const qrcode = require('qrcode');
const Jimp = require("jimp");

export default async function generateQr(req, res) {
    try {
        const logo = "src/assets/qrLogo_50.jpg";
        const backgroundImage = "src/assets/tyvek.png"; // add path to background image
        // Enter number of QR codes to generate
        for (let i = 101; i <= 102; i++) {
            const string = "http://users.technopreneur.co.in/33/T" + i;
            const filePath = 'qrCodes/T' + i + '.png';
            const name = 'T' + i;

            await qrcode.toFile(filePath, string, {
                color: {
                    dark: '#000000',
                    light: '#FFFFFF',
                },
                scale: 2.3,
                margin: 2.3
            });

            const qrImage = await Jimp.read(filePath);
            const attachment = await Jimp.read(logo);

            // Resize the attachment image to fit in the middle of the QR code
            attachment.resize(qrImage.bitmap.width / 3.9, qrImage.bitmap.height / 3.9); 
            // attachment.resize(qrImage.bitmap.width / 4.1, qrImage.bitmap.height / 4.1); //4.1
            qrImage.composite(attachment, qrImage.bitmap.width / 2.6, qrImage.bitmap.height / 2.6);

            const font = await Jimp.loadFont(Jimp.FONT_SANS_32_BLACK);
            // Font, X coordinate, Y coordinate for the String
            qrImage.print(font, 195, qrImage.bitmap.height - 33, name);

            const background = await Jimp.read(backgroundImage); // load the background image
            // center the qrImage with logo over the background image
            const x = (background.bitmap.width - qrImage.bitmap.width) / 2;
            const y = (background.bitmap.height - qrImage.bitmap.height) / 2;
            background.composite(qrImage, x-103, y);

            await background.writeAsync(filePath);
        }

        res.status(200).json({ message: "QR codes with images generated" });
    } catch (error) {
        //console.log(error);
        res.status(500).json({ error });
    }
}
