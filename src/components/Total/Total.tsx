import React from "react";
import getCurrency from "@/helper/getCurrency";
import styles from "./Total.module.css";
import { Roboto } from "@next/font/google";

type TTotal = {
  total: number;
};

const roboto = Roboto({
  weight: ["700"],
  subsets: ["latin"],
});

const Total: React.FC<TTotal> = ({ total }) => {
  return (
    <div className={`${styles.total} ${roboto.className}`}>
      {getCurrency(total)}
    </div>
  );
};

export default Total;
