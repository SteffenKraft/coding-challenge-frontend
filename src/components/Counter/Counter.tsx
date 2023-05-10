import React, { useEffect, useState } from "react";
import styles from "./Counter.module.css";

const Counter: React.FC = () => {
  const [countdown, setCountdown] = useState(60);

  useEffect(() => {
    const interval = setInterval(() => {
      setCountdown((countdown) => (countdown > 0 ? countdown - 1 : 60));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      window.location.reload();
    }, (countdown - 1) * 1000);

    return () => clearTimeout(timeout);
  }, [countdown]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.text}>Refresh in</div>
      <div className={styles.counter}>{countdown}</div>
    </div>
  );
};

export default Counter;
