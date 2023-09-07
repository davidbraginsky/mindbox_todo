import styles from "./TodoList.module.css";
import { FC, useContext } from "react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import Todo from "@/components/todo/Todo/Todo";
import TodoSort from "@/components/todo/TodoSort/TodoSort";
import { EMPTY_STRING } from "@/utils/Constants";
import { TodoCtxt } from "@/utils/TodoUtils";
import useSortedList from "@/hooks/useSortedList";

type TodoListProps = {
  className?: string;
  list?: TodoData[];
  useSort?: boolean;
};

const TodoList: FC<TodoListProps> = ({ className = EMPTY_STRING, list = [], useSort = false }) => {
  const { onToggleStatus, onRemoveTodo } = useContext(TodoCtxt);

  const { onChangeSort, sortedList, sortOption } = useSortedList({ list });

  return (
    <>
      {sortedList.length ? (
        <>
          <ul className={`${styles.list} ${className}`}>
            {sortedList.map((todo) => {
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
          {useSort ? <TodoSort onChangeSort={onChangeSort} sortOption={sortOption} /> : null}
        </>
      ) : null}
    </>
  );
};

export default TodoList;
