import styles from "./BaseInput.module.css";
import { FC } from "react";
import { EMPTY_STRING } from "@/utils/Constants";
import { DefaultOnChangeFunc } from "@/types/types";

type BaseInputProps = {
  className?: string;
  disabled?: boolean;
  required?: boolean;
  value?: string;
  placeholder?: string;
  onChange?: DefaultOnChangeFunc;
};

const BaseInput: FC<BaseInputProps> = ({ className = EMPTY_STRING, ...rest }) => {
  return <input className={`${styles.input} ${className}`} type="text" {...rest} />;
};

export default BaseInput;
