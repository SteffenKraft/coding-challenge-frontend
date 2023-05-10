import React, { ReactNode } from "react";
import ProductBox from "@/components/ProductBox/ProductBox";
import getCurrency from "@/helper/getCurrency";
import styles from "./RecentOrdersBox.module.css";
import { TOrdersResponseObject } from "@/types";

type TRecentOrdersBox = {
  title: string;
  orders: TOrdersResponseObject[];
};

const RecentOrdersBox: React.FC<TRecentOrdersBox> = ({ title, orders }) => {
  return (
    <ProductBox title={title}>
      <div className={styles.box}>
        {orders.slice(0, 5).map((order) => {
          const dateObj = new Date(order.date);

          return (
            <div className={styles.row} key={crypto.randomUUID()}>
              <div className={styles.cell}>{order.id}</div>
              <div className={styles.cell}>
                {dateObj.getDate()}.{dateObj.getMonth() + 1}.
                {dateObj.getFullYear()}
              </div>
              <div className={styles.cell}>{order.name}</div>
              <div className={`${styles.cell} ${styles.alignRight}`}>
                {getCurrency(order.amount)}
              </div>
            </div>
          );
        })}
      </div>
    </ProductBox>
  );
};

export default RecentOrdersBox;
