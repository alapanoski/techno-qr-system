import React, { useState } from "react"
import { useZxing } from "react-zxing"
import styles from "./Scanner.module.css"

function Scanner({ setQrResult }) {
  const { ref } = useZxing({
    constraints: { video: { facingMode: "environment" } },
    onResult(result) {
      setResult(result.getText())
      setQrResult(result.getText())
    },
    onError(error) {
      if (!(error.name === "NotFoundException")) {
        console.log(error)
      }
    },
  })

  const [result, setResult] = useState("Nothing scanned yet")

  return (
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between md:justify-center items-center gap-10">
        <video ref={ref} />

        <div className="w-full flex flex-col items-center gap-2 text-center text-xl">
          {result && <p>Scan Result: {result.toString()}</p>}
        </div>
      </div>
    </div>
  )
}

export default Scanner
