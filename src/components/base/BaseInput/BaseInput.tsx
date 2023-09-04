import styles from "./BaseInput.module.css";
import { FC } from "react";
import { EMPTY_STRING } from "@/utils/constants";

type BaseInputProps = {
  className?: string;
  disabled?: boolean;
  required?: boolean;
};

const BaseInput: FC<BaseInputProps> = ({ className = EMPTY_STRING, ...rest }) => {
  return <input type="text" {...rest} />;
};

export default BaseInput;
