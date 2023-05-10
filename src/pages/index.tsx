import styles from "@/styles/Home.module.css";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main}>
      <Link className={styles.button} href="/2021/2">
        2021
      </Link>
      <Link className={styles.button} href="/2022/1">
        2022
      </Link>
    </main>
  );
}
