import styles from "./TodoList.module.css";
import { FC } from "react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import Todo from "../Todo/Todo";
import { EMPTY_STRING } from "@/utils/constants";

type TodoListProps = {
  className?: string;
  list?: TodoData[];
};

const TodoList: FC<TodoListProps> = ({ className = EMPTY_STRING, list = [] }) => {
  return (
    <>
      {list.length ? (
        <ul className={`${styles.list} ${className}`}>
          {list.map((todo) => {
            return <Todo key={todo.id} todo={todo} />;
          })}
        </ul>
      ) : null}
    </>
  );
};

export default TodoList;
