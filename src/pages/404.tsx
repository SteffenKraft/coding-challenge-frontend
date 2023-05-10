import styles from "@/styles/NotFound.module.css";
import Link from "next/link";

export default function Custom404() {
  return (
    <>
      <main className={styles.main}>
        <div>404 - This page could not be found. Please select a year</div>
        <div className={styles.buttons}>
          <Link className={styles.button} href="/2021/2">
            2021
          </Link>
          <Link className={styles.button} href="/2022/1">
            2022
          </Link>
        </div>
      </main>
    </>
  );
}
