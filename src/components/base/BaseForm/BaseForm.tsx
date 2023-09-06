// import styles from "./BaseForm.module.css";
import { FC, ReactNode } from "react";
import { EMPTY_STRING } from "@/utils/Constants";
import type { DefaultOnSubmitFunc } from "@/types/types";

type BaseFormProps = {
  className?: string;
  disabled?: string;
  children: ReactNode;
  onSubmit?: DefaultOnSubmitFunc;
};

const BaseForm: FC<BaseFormProps> = ({ className = EMPTY_STRING, children, onSubmit, ...rest }) => {
  return (
    <form onSubmit={onSubmit} {...rest}>
      {children}
    </form>
  );
};

export default BaseForm;
