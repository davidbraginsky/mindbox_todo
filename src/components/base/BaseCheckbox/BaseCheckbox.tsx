import styles from "./BaseCheckbox.module.css";
import { FC } from "react";
import { EMPTY_STRING } from "@/utils/constants";

type BaseCheckboxProps = {
  className?: string;
  checked?: boolean;
};

const BaseCheckbox: FC<BaseCheckboxProps> = ({ className = EMPTY_STRING, ...rest }) => {
  return <input type="checkbox" {...rest} />;
};

export default BaseCheckbox;
