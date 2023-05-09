import Head from "next/head";
import styles from "@/styles/Home.module.css";

export default function Home() {
  return (
    <>
      <Head>
        <title>AM Coding Challenge - Frontend (Next.js)</title>
        <meta
          name="description"
          content=" Coding Challenge - Product Order Dashboard"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}></main>
    </>
  );
}

export async function getServerSideProps() {
  const [orders, targets] = await Promise.all([
    fetch("http://localhost:3000/api/orders").then((res) => res.json()),
    fetch("http://localhost:3000/api/targets").then((res) => res.json()),
  ]);

  return {
    props: {
      sheetdata: orders.data,
      targets: targets.data,
    },
  };
}
