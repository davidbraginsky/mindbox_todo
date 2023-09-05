import styles from "./Layout.module.css";
import { FC, ReactNode } from "react";
import { EMPTY_STRING } from "@/utils/Constants";

type LayoutProps = {
  className?: string;
  children: ReactNode;
};

const Layout: FC<LayoutProps> = ({ className = EMPTY_STRING, children }) => {
  return <main className={`${styles.wrapper} ${className}`}>{children}</main>;
};

export default Layout;
