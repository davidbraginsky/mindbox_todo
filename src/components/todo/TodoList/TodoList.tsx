// import styles from "./TodoList.module.css";
import { FC } from "react";
import { EMPTY_STRING } from "@/utils/constants";

type TodoListProps = {
  className?: string;
};

const TodoList: FC<TodoListProps> = ({ className = EMPTY_STRING }) => {
  return (
    <ul className={className}>
      <li>hello there</li>
    </ul>
  );
};

export default TodoList;
