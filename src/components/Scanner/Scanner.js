import React, { useState } from "react";
// import { useZxing } from "react-zxing";
import styles from "./Scanner.module.css";

import QrReader from "react-qr-reader";

function Scanner({ qr_pay, setUserId, userId, setPaymentId, paymentId }) {
  const [result, setResult] = useState("");
  // const [torchOn, setTorchOn] = useState(false);

  // const { ref } = useZxing({
  //   constraints: {
  //     // torch: {
  //     //   on: torchOn,
  //     //   off: !torchOn,
  //     //   isOn: () => torchOn,
  //     //   isAvailable: true
  //     // },
  //     video: { facingMode: "environment" },
  //   },
  //   onResult(result) {
  //     setResult(result.getText());
  //     if (qr_pay) {
  //       setPaymentId(result.getText());
  //     } else {
  //       if (
  //         result.getText().split("/")[
  //           result.getText().split("/").length - 1
  //         ] !== ""
  //       )
  //         setUserId(
  //           result.getText().split("/")[result.getText().split("/").length - 1]
  //         );
  //       else
  //         setUserId(
  //           result.getText().split("/")[result.getText().split("/").length - 2]
  //         );
  //     }
  //   },
  //   onError(error) {
  //     if (!(error.name === "NotFoundException")) {
  //       //console.log(error);
  //     }
  //   },
  // });

  const handleScan = (result) => {
    console.log(result);
    setResult(result);
    if (qr_pay) {
      if (result != null) {
        setUserId(result);
      }
    } else {
      if (result != null) {
        setUserId(result);
      }
    }
  };

  const handleError = (err) => {
    console.error(err);
  };

  return (
    <div className={styles.scan_container}>
      {/* <button onClick={()=>{
        setTorchOn((prev) => !prev);
      }}>Torch</button> */}
      <div className={styles.scan}>
        <div className={styles.scan_heading}>
          Scan the {qr_pay ? "Payment" : "Band"} QR code
        </div>
        {/* <video ref={ref} /> */}
        <QrReader
          onScan={handleScan}
          onError={handleError}
          style={{ width: "300px" }}
        />
        z{" "}
      </div>

      {/* <div className={styles.scan_heading_or}>OR</div> */}
      <div className={styles.text_input}>
        {/* <div className={styles.scan_heading}>Enter the code manually</div> */}
        <input
          className={styles.input}
          type="text"
          placeholder="Enter code"
          value={qr_pay ? paymentId : userId}
          onChange={(e) => {
            if (qr_pay) {
              setPaymentId(e.target.value);
            } else {
              setUserId(e.target.value);
            }
          }}
        />
      </div>
    </div>
  );
}

export default Scanner;
