const fs = require("fs");
const QRCode = require("qrcode");
const { createCanvas, loadImage } = require("canvas");

function convertDataUriToImage(dataUri, filePath) {
  const base64Data = dataUri.split(";base64,").pop();
  const buffer = Buffer.from(base64Data, "base64");
  fs.writeFileSync(filePath, buffer);
}

export default async function generateQR(req, res) {
  const center_image = "images/download.png";
  const { string } = req.body;
  const width = 325; // To align the image in the center
  const cwidth = 75; // To increse the Quality of the image (Size)
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(canvas, string, {
    scale: 11,
    // errorCorrectionLevel: 'L',
  });

  const ctx = canvas.getContext("2d");
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2 + 15;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  const filePath = "qrCodes/" + Math.random() + "qr.png";

  convertDataUriToImage(canvas.toDataURL("image/png"), filePath);

  res.status(200).json({ message: "QR Code has been Successfully generated" });
}