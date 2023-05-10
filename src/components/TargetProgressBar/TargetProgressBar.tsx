import React, { ReactNode } from "react";
import getCurrency from "@/helper/getCurrency";
import styles from "./TargetProgressBar.module.css";

type TTargetProgressBar = {
  maxTargetTotal: number;
  currentTotal: number;
  monthTargetTotal: number;
};

const TargetProgressBar: React.FC<TTargetProgressBar> = ({
  maxTargetTotal,
  currentTotal,
  monthTargetTotal,
}) => {
  return (
    <div className={styles.wrapper}>
      <div
        className={styles.progress}
        style={{ width: `${(currentTotal / maxTargetTotal) * 100}%` }}
      />
      <div
        className={styles.monthTarget}
        style={{ left: `${(monthTargetTotal / maxTargetTotal) * 100}%` }}
      >
        <div className={styles.monthTargetValue}>
          {getCurrency(monthTargetTotal)}
        </div>
      </div>
    </div>
  );
};

export default TargetProgressBar;
