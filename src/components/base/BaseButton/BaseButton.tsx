import styles from "./BaseButton.module.css";
import { FC, ReactNode } from "react";
import { EMPTY_STRING } from "@/utils/constants";
import type { DefaultOnClickFunc } from "@/types/types";

type BaseButtonProps = {
  className?: string;
  type?: "button" | "submit";
  children?: ReactNode;
  onClick?: DefaultOnClickFunc;
};

const BaseButton: FC<BaseButtonProps> = ({ className = EMPTY_STRING, type = "button", children, onClick }) => {
  return (
    <button onClick={onClick} className={className} type={type}>
      {children}
    </button>
  );
};

export default BaseButton;
