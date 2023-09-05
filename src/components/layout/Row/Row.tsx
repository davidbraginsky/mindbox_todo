import styles from "./Row.module.css";
import { FC, ReactNode } from "react";
import { EMPTY_STRING } from "@/utils/Constants";

type RowProps = {
  className?: string;
  children: ReactNode;
};

const Row: FC<RowProps> = ({ className = EMPTY_STRING, children }) => {
  return <div className={`${styles.row} ${className}`}>{children}</div>;
};

export default Row;
