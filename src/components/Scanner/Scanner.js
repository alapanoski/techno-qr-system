import React, { useState } from "react";
import { useZxing } from "react-zxing";
import styles from "./Scanner.module.css";

function Scanner({ qr_pay, setUserId, userId, setPaymentId, paymentId }) {
  const [result, setResult] = useState("");
  const { ref } = useZxing({
    constraints: { video: { facingMode: "environment" } },
    onResult(result) {
      setResult(result.getText());
      if (qr_pay) {
        setPaymentId(result.getText());
      } else {
        setUserId(result.getText().split("/")[3]);
      }
    },
    onError(error) {
      if (!(error.name === "NotFoundException")) {
        console.log(error);
      }
    },
  });

  return (
    <div className="scanner_container">
      <div className={styles.scan_container}>
        <div className={styles.scan}>
          <div className={styles.scan_heading}>
            Scan the {qr_pay ? "Payment" : "Band"} QR code
          </div>
          <video ref={ref} />
        </div>
        <div className={styles.scan_heading_or}>OR</div>
        <div className={styles.text_input}>
          <div className={styles.scan_heading}>Enter the code manually</div>
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
    </div>
  );
}

export default Scanner;
