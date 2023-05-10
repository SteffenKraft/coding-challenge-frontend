import Head from "next/head";
import styles from "@/styles/Home.module.css";
import Link from "next/link";
import RecentOrdersBox from "@/components/RecentOrdersBox/RecentOrdersBox";
import {
  TOrdersResponse,
  TOrdersResponseObject,
  TParams,
  TTargetsResponseObject,
} from "@/types";

type Props = {
  params: { year: string; month: string };
  monthOrders: TOrdersResponseObject[];
  monthTarget: TTargetsResponseObject;
  maxTarget: number;
};

export default function Home({
  params,
  monthOrders,
  monthTarget,
  maxTarget,
}: Props) {
  const ordersByDate = [...monthOrders]?.sort(
    (a, b) => new Date(a.date).getDate() - new Date(b.date).getDate()
  );

  const ordersByAmount = monthOrders.sort((a, b) => b.amount - a.amount);
  const total = ordersByDate.reduce((acc, curr) => acc + curr.amount, 0);

  const monthNumber = parseInt(params.month);
  const yearNumber = parseInt(params.year);
  const previousYear = monthNumber === 1 ? yearNumber - 1 : yearNumber;
  const previousMonth = monthNumber === 1 ? 12 : monthNumber - 1;
  const nextYear = monthNumber === 12 ? yearNumber + 1 : yearNumber;
  const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;
  const currentMonthString = monthTarget.id;
  return (
    <>
      <main className={styles.main}>
        <Link href={`/${previousYear}/${previousMonth}`}>Prev</Link>
        <Link href={`/${nextYear}/${nextMonth}`}>Next</Link>
        <div>
          {currentMonthString} {yearNumber}
        </div>
        <div>Max Target: {maxTarget}</div>
        <div>
          Total{" "}
          {total.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </div>
        {ordersByAmount.slice(0, 5).map((orderByAmount) => {
          const dateObj = new Date(orderByAmount.date);
          const month = dateObj.getMonth() + 1;
          const day = dateObj.getDate();
          const year = dateObj.getFullYear();
          return (
            <div key={crypto.randomUUID()}>
              {day}.{month}.{year}{" "}
              {orderByAmount.amount.toLocaleString("de-DE", {
                style: "currency",
                currency: "EUR",
              })}
            </div>
          );
        })}
        <div>
          Monthly Target:{" "}
          {monthTarget.amount.toLocaleString("de-DE", {
            style: "currency",
            currency: "EUR",
          })}
        </div>
        <RecentOrdersBox title="5 Recent Orders" orders={ordersByDate} />
      </main>
    </>
  );
}

export async function getStaticPaths() {
  const ordersResponse = await fetch("http://localhost:3000/api/orders");
  const orders: TOrdersResponse = await ordersResponse.json();

  const paths: TParams = orders?.data
    ?.map((order) => {
      return {
        params: {
          year: new Date(order.date).getFullYear().toString(),
          month: (new Date(order.date).getMonth() + 1).toString(),
        },
      };
    })
    .filter((elem, index, self) => {
      return (
        index ===
        self.findIndex(
          (t) =>
            t.params.year === elem.params.year &&
            t.params.month === elem.params.month
        )
      );
    });

  return {
    paths,
    fallback: false,
  };
}

export const getStaticProps = async ({ params }: any) => {
  const [orders, targets] = await Promise.all([
    fetch("http://localhost:3000/api/orders").then((res) => res.json()),
    fetch("http://localhost:3000/api/targets").then((res) => res.json()),
  ]);

  const monthName = new Date(2022, params?.month - 1, 1).toLocaleString("en", {
    month: "long",
  });
  const monthTarget = targets.data.find(
    (item: TTargetsResponseObject) => item.id === monthName
  );

  const monthOrders = orders.data.filter((order: TOrdersResponseObject) => {
    const date = new Date(order.date);
    return (
      date.getFullYear() == params.year && date.getMonth() + 1 == params.month
    );
  });

  const targetsByAmount = targets.data.sort(
    (a: TTargetsResponseObject, b: TTargetsResponseObject) =>
      b.amount - a.amount
  );

  return {
    props: {
      params,
      monthOrders,
      monthTarget,
      maxTarget: targetsByAmount[0].amount,
    },
    revalidate: 30,
  };
};
