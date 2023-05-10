import React, { ReactNode } from "react";
import ProductBox from "@/components/ProductBox/ProductBox";
import getCurrency from "@/helper/getCurrency";
import styles from "./TopProductsBox.module.css";
import { TOrdersResponseObject } from "@/types";

type TRecentOrdersBox = {
  title: string;
  orders: TOrdersResponseObject[] | null;
};

const TopProductsBox: React.FC<TRecentOrdersBox> = ({ title, orders }) => {
  const ordersByAmount = [...(orders ?? [])].sort(
    (a, b) => b.amount - a.amount
  );
  return (
    <ProductBox title={title}>
      <div className={styles.box}>
        {ordersByAmount.slice(0, 5).map((order) => {
          return (
            <div className={styles.row} key={crypto.randomUUID()}>
              <div className={styles.cell}>{order.name}</div>
              <div className={styles.cell}>precessBar</div>
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

export default TopProductsBox;
