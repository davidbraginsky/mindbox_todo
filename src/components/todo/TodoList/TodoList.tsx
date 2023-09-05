// import styles from "./TodoList.module.css";
import { FC } from "react";
import type { Todo } from "@/store/features/todo/todoSlice";
import { EMPTY_STRING } from "@/utils/constants";

type TodoListProps = {
  className?: string;
  list?: Todo[];
};

const TodoList: FC<TodoListProps> = ({ className = EMPTY_STRING, list = [] }) => {
  return (
    <>
      {list.length ? (
        <ul className={className}>
          {list.map((todo) => {
            return <li key={todo.id}>{todo.text}</li>;
          })}
        </ul>
      ) : null}
    </>
  );
};

export default TodoList;
