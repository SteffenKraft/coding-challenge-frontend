import styles from "@/styles/Home.module.css";

export default function Home() {
  return <main className={styles.main}></main>;
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
