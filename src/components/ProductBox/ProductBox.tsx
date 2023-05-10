import React, { ReactNode } from "react";
import styles from "./ProductBox.module.css";

type TProductBox = {
  title: string;
  children: ReactNode;
};

const ProductBox: React.FC<TProductBox> = ({ title, children }) => {
  return (
    <div className={styles.box}>
      <div className={styles.title}>{title}</div>
      <div className={styles.line} />
      {children}
    </div>
  );
};

export default ProductBox;
