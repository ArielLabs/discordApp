import React, { useRef, useEffect } from "react";
import styles from "./LocalScreenSharing.module.css";

const LocalScrrenSharing = (props) => {
  const videoRef = useRef(null);
  const { stream } = props;

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  return (
    <div className={styles.localScreenSharing}>
      <video ref={videoRef} className={styles.videoSharing} autoPlay muted />
    </div>
  );
};

export default LocalScrrenSharing;
