import styles from "./BaseButton.module.css";
import { FC, ReactNode } from "react";
import { EMPTY_STRING } from "@/utils/constants";
import type { DefaultOnClickFunc } from "@/types/types";

type BaseButtonProps = {
  className?: string;
  type?: "button" | "submit";
  children?: ReactNode;
  disabled?: boolean;
  onClick?: DefaultOnClickFunc;
};

const BaseButton: FC<BaseButtonProps> = ({
  className = EMPTY_STRING,
  type = "button",
  children,
  ...rest
}) => {
  return (
    <button className={className} type={type} {...rest}>
      {children}
    </button>
  );
};

export default BaseButton;
