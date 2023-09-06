import styles from "./Todo.module.css";
import { FC } from "react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import BaseCheckbox from "@/components/base/BaseCheckbox/BaseCheckbox";
import { EMPTY_STRING } from "@/utils/Constants";
import { DefaultOnChangeFunc, DefaultOnClickFunc } from "@/types/types";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import { LabelsProvider } from "@/L10N/LabelsProvider";

type TodoProps = {
  className?: string;
  todo: TodoData;
  onToggleCheckbox?: DefaultOnChangeFunc;
  onRemove?: DefaultOnClickFunc;
};

const Todo: FC<TodoProps> = ({ className = EMPTY_STRING, todo, onToggleCheckbox, onRemove }) => {
  return (
    <li className={`${styles.todo} ${className}`}>
      <div className={styles.column}>
        <BaseCheckbox checked={todo.isCompleted} onChange={onToggleCheckbox} />
        <span className={todo.isCompleted ? styles.textCompleted : EMPTY_STRING}>{todo.text}</span>
      </div>
      <BaseButton className={styles.btn} onClick={onRemove}>
        {LabelsProvider.DELETE}
      </BaseButton>
    </li>
  );
};

export default Todo;
