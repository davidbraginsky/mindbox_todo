import styles from "./BaseForm.module.css";
import { FC, ReactNode } from "react";
import { EMPTY_STRING } from "@/utils/constants";
import type { DefaultOnClickFunc } from "@/types/types";

type BaseFormProps = {
  className?: string;
  disabled?: string;
  children: ReactNode;
  onSubmit?: DefaultOnClickFunc;
};

const BaseForm: FC<BaseFormProps> = ({ className = EMPTY_STRING, children, onSubmit, ...rest }) => {
  return <form onSubmit={onSubmit} {...rest}>{children}</form>;
};

export default BaseForm;
