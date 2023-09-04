import styles from "./BaseInput.module.css";
import { FC } from "react";
import { EMPTY_STRING } from "@/utils/constants";

type BaseInputProps = {
  className?: string;
};

const BaseInput: FC<BaseInputProps> = ({ className = EMPTY_STRING }) => {
  return <input type="text" />;
};

export default BaseInput;
