import React, { ReactNode } from "react";
import ProductBox from "@/components/ProductBox/ProductBox";
import getCurrency from "@/helper/getCurrency";
import styles from "./TopProductsBox.module.css";
import { TOrdersResponseObject } from "@/types";

type TRecentOrdersBox = {
  title: string;
  orders: TOrdersResponseObject[] | null;
  total: number;
};

const TopProductsBox: React.FC<TRecentOrdersBox> = ({
  title,
  orders,
  total,
}) => {
  const ordersByAmount = [...(orders ?? [])].sort(
    (a, b) => b.amount - a.amount
  );

  const reducedProducts = [...(orders ?? [])].reduce<{
    [key: string]: TOrdersResponseObject;
  }>((acc, curr) => {
    if (acc[curr.name]) {
      return {
        ...acc,
        [curr.name]: {
          ...acc[curr.name],
          amount: acc[curr.name].amount + curr.amount,
        },
      };
    } else {
      return {
        ...acc,
        [curr.name]: curr,
      };
    }
  }, {});

  const topProducts = Object.values(reducedProducts).sort(
    (a, b) => b.amount - a.amount
  );
  return (
    <ProductBox title={title}>
      <div className={styles.box}>
        {topProducts.slice(0, 5).map((order) => {
          return (
            <div className={styles.row} key={crypto.randomUUID()}>
              <div className={styles.cell}>{order.name}</div>
              <div className={`${styles.cell} ${styles.cellWider}`}>
                <div
                  className={styles.progress}
                  style={{ width: `${(order.amount / total) * 100}%` }}
                />
              </div>
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
