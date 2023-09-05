import styles from "./Todo.module.css";
import { FC } from "react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import BaseCheckbox from "@/components/base/BaseCheckbox/BaseCheckbox";
import { EMPTY_STRING } from "@/utils/Constants";
import { DefaultOnChangeFunc } from "@/types/types";

type TodoProps = {
  className?: string;
  todo: TodoData;
  onToggleCheckbox?: DefaultOnChangeFunc;
};

const Todo: FC<TodoProps> = ({ className = EMPTY_STRING, todo, onToggleCheckbox }) => {
  return (
    <li>
      <BaseCheckbox checked={todo.isCompleted} onChange={onToggleCheckbox} />
      <span>{todo.text}</span>
    </li>
  );
};

export default Todo;
