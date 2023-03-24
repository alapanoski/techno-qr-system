const qrcode = require("qrcode");
const Jimp = require("jimp");

async function generateQr(req, res) {
  try {
    const logo = "src/assets/qrLogo_10.jpg";
    const backgroundImage = "src/assets/tyvek.png"; // add path to background image
    // Enter number of QR codes to generate
    for (let i = 101; i <= 103; i++) {
      const string = "http://users.technopreneur.co.in/33/T" + i;
      const filePath = "qrCodes/T" + i + ".png";
      const name = "T" + i;

      await qrcode.toFile(filePath, string, {
        color: {
          dark: "#000000",
          light: "#FFFFFF",
        },
        scale: 2.1,
        margin: 1.5,
        errorCorrectionLevel: "H",
      });

      const qrImage = await Jimp.read(filePath);
      // const attachment = await Jimp.read(logo);

      // Resize the attachment image to fit in the middle of the QR code
      // attachment.resize(qrImage.bitmap.width / 4.1, qrImage.bitmap.height / 4.1);
      // qrImage.composite(attachment, qrImage.bitmap.width / 2.6, qrImage.bitmap.height / 2.6);

      const background = await Jimp.read(backgroundImage);
      // center the qrImage with logo over the background image
      const x = (background.bitmap.width - qrImage.bitmap.width) / 2;
      const y = (background.bitmap.height - qrImage.bitmap.height) / 2;
      background.composite(qrImage, x - 98, y);

      const font = await Jimp.loadFont(Jimp.FONT_SANS_16_WHITE);
      // create a new Jimp image with the text rotated and transparent background
      const rotatedText = new Jimp(55, 120, 0x00000000);
      rotatedText.print(font, 0, 0, name);
      rotatedText.rotate(-90);

      // composite the rotated text onto the background image
      const textX = 210;
      const textY = background.bitmap.height - 63;
      background.composite(rotatedText, textX, textY);

      await background.writeAsync(filePath);
    }

    res.status(200).json({ message: "QR codes with images generated" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
}

module.exports = generateQr;
