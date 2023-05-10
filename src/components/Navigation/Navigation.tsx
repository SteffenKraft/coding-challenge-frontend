import React, { ReactNode } from "react";
import styles from "./Navigation.module.css";
import Link from "next/link";
import Image from "next/image";
import left from "../../../public/left.svg";
import right from "../../../public/right.svg";

type TNavigation = {
  month: string;
  year: string;
  monthLong: string;
};

const Navigation: React.FC<TNavigation> = ({ month, year, monthLong }) => {
  const monthNumber = parseInt(month);
  const yearNumber = parseInt(year);
  const previousYear = monthNumber === 1 ? yearNumber - 1 : yearNumber;
  const previousMonth = monthNumber === 1 ? 12 : monthNumber - 1;
  const nextYear = monthNumber === 12 ? yearNumber + 1 : yearNumber;
  const nextMonth = monthNumber === 12 ? 1 : monthNumber + 1;

  return (
    <div className={styles.wrapper}>
      <div className={styles.currentMonthYear}>
        {monthLong} {yearNumber}
      </div>
      <Link
        className={styles.navButton}
        href={`/${previousYear}/${previousMonth}`}
      >
        <Image
          src={left}
          alt="Follow us on Twitter"
          className={styles.ellipse}
        />
      </Link>
      <Link className={styles.navButton} href={`/${nextYear}/${nextMonth}`}>
        <Image
          src={right}
          alt="Follow us on Twitter"
          className={styles.ellipse}
        />
      </Link>
    </div>
  );
};

export default Navigation;
