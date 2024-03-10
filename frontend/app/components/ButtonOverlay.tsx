import React from "react";
import styles from "./ButtonOverlay.module.css";

const ButtonOverlay = ({ onClick = () => {} }) => {
  return (
    <button className={styles.overlayButton} onClick={onClick}>
      <img src="/microphone.png" alt="mic" className={styles.image} />
    </button>
  );
};

export default ButtonOverlay;
