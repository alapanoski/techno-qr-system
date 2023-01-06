import React, { useState } from "react"
import { useZxing } from "react-zxing"
import styles from "./Scanner.module.css"

function Scanner() {
  const { ref } = useZxing({
    constraints: { video: { facingMode: "environment" } },
    onResult(result) {
      setQrResult(result.getText())
      setScannedUserId(result.toString().split("/")[3])
    },
    onError(error) {
      setQrResult(error.message)
    },
  })

  const [qrResult, setQrResult] = useState("Nothing scanned yet")
  const [scannedUserId, setScannedUserId] = useState("")

  return (
    <div className="container mx-auto">
      <h1 className="text-4xl">QR Scanner</h1>

      <div className="flex flex-col md:flex-row justify-between md:justify-center items-center gap-10">
        <video ref={ref} />

        <div className="w-full flex flex-col items-center gap-2 text-center text-xl">
          {qrResult && <p>Scan Result: {qrResult.toString()}</p>}
          {scannedUserId && <p>User ID: {scannedUserId}</p>}
        </div>
      </div>
    </div>
  )
}

export default Scanner
