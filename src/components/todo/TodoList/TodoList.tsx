import styles from "./TodoList.module.css";
import { FC, useContext } from "react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import Todo from "@/components/todo/Todo/Todo";
import { EMPTY_STRING } from "@/utils/Constants";
import { TodoCtxt } from "@/utils/TodoUtils";

type TodoListProps = {
  className?: string;
  list?: TodoData[];
};

const TodoList: FC<TodoListProps> = ({ className = EMPTY_STRING, list = [] }) => {
  const { onToggleStatus, onRemoveTodo } = useContext(TodoCtxt);

  return (
    <>
      {list.length ? (
        <ul className={`${styles.list} ${className}`}>
          {list.map((todo) => {
            return (
              <Todo
                key={todo.id}
                todo={todo}
                onToggleCheckbox={() => {
                  onToggleStatus(todo.id);
                }}
                onRemove={() => {
                  onRemoveTodo(todo.id);
                }}
              />
            );
          })}
        </ul>
      ) : null}
    </>
  );
};

export default TodoList;
