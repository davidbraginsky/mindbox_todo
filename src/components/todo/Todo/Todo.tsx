import styles from "./Todo.module.css";
import { FC } from "react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import BaseCheckbox from "@/components/base/BaseCheckbox/BaseCheckbox";
import { EMPTY_STRING } from "@/utils/constants";

type TodoProps = {
  className?: string;
  todo: TodoData;
};

const Todo: FC<TodoProps> = ({ className = EMPTY_STRING, todo }) => {
  return (
    <li>
      <BaseCheckbox checked={todo.isCompleted} />
      <span>{todo.text}</span>
    </li>
  );
};

export default Todo;
