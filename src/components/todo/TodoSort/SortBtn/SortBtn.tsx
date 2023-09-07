import styles from "./SortBtn.module.css";
import { FC, ReactNode } from "react";
import { TodoSortOption } from "@/utils/TodoUtils";
import type { DefaultOnClickFunc } from "@/types/types";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import { EMPTY_STRING } from "@/utils/Constants";

type SortBtnProps = {
  className?: string;
  activeCondition?: TodoSortOption;
  sortOption?: TodoSortOption;
  children: ReactNode;
  onClick?: DefaultOnClickFunc;
};

const SortBtn: FC<SortBtnProps> = ({ children, className = EMPTY_STRING, sortOption, activeCondition, ...rest }) => {
  const isActive = sortOption === activeCondition;
  return (
    <BaseButton className={`${styles.btn} ${className} ${isActive ? styles.isActive : EMPTY_STRING}`} {...rest}>
      {children}
    </BaseButton>
  );
};

export default SortBtn;
