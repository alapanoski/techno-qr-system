import React, { useState } from "react";
import { QrReader } from "react-qr-reader";
import styles from './Scanner.module.css'

function Scanner() {
    const [qrResult, setQrResult] = useState("Nothing scanned yet")
    const [scannedUserId, setScannedUserId] = useState("")
  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">QR Scanner</h1>

      <div className="flex flex-col md:flex-row justify-between md:justify-center items-center gap-10">
        <QrReader
          className={styles.qr_image_wrapper}
          delay={300}
          constraints={{ facingMode: "environment" }}
          onError={(err) => console.log(err)}
          onResult={(result, error) => {
            if (!!result) {
              setQrResult(result);
              setScannedUserId(result.toString().split("/")[3]);
            }
            if (!!error) console.log(error);
          }}
          legacyMode={true}
        />
        <div className="w-full flex flex-col items-center gap-2 text-xl">
          {qrResult && <p>Scan Result: {qrResult.toString()}</p>}
          {scannedUserId && <p>User ID: {scannedUserId}</p>}
          {scannedUserId && (
            <button
              type="button"
              class="inline-block px-6 py-2.5 bg-blue-600 text-white rounded"
            >
              Next
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Scanner;
