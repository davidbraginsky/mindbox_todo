import styles from "./BaseCheckbox.module.css";
import { FC } from "react";
import { EMPTY_STRING } from "@/utils/Constants";
import type { DefaultOnChangeFunc } from "@/types/types";

type BaseCheckboxProps = {
  className?: string;
  checked?: boolean;
  onChange?: DefaultOnChangeFunc;
};

const BaseCheckbox: FC<BaseCheckboxProps> = ({ className = EMPTY_STRING, ...rest }) => {
  return <input type="checkbox" {...rest} />;
};

export default BaseCheckbox;
