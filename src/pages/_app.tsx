import type { AppProps } from "next/app";
import Head from "next/head";
import { Montserrat } from "@next/font/google";
import Image from "next/image";
import twitterIcon from "../../public/ellipse.svg";
import styles from "@/styles/App.module.css";
import "@/styles/globals.css";

const montserrat = Montserrat({
  weight: ["400", "500", "700"],
  subsets: ["latin"],
});

export default function App({ Component, pageProps }: AppProps) {
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
      <div className={`${styles.main} ${montserrat.className}`}>
        <Image
          priority
          src={twitterIcon}
          alt="Follow us on Twitter"
          className={styles.ellipse}
        />
        <Component {...pageProps} />
      </div>
    </>
  );
}
