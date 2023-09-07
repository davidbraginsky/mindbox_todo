import styles from "./App.module.css"
import sortBtnStyles from "@/components/todo/TodoSort/SortBtn/SortBtn.module.css";
import { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import type { StoreType } from "@/store/StoreType";
import type { TodoData } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import TodoForm from "@/components/todo/TodoForm/TodoForm";
import TodoOverview from "@/components/todo/TodoOverview/TodoOverview";
import TodoSort from "@/components/todo/TodoSort/TodoSort";
import Layout from "@/components/layout/Layout/Layout";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import Row from "@/components/layout/Row/Row";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import useTodoAPI from "@/hooks/useTodoAPI";
import useSortedList from "@/hooks/useSortedList";
import { TodoCtxt } from "@/utils/TodoUtils";

function App() {
  const { onAddTodo, onRemoveTodo, onToggleStatus, loadTodoList, onClearCompleted, localTodoList } = useTodoAPI();

  useEffect(() => {
    loadTodoList(localTodoList);
  }, []);

  const todoList = useSelector<StoreType, TodoData[]>((state: StoreType) => state.todo?.todoList);

  const { onChangeSort, sortedList, sortOption } = useSortedList({ list: todoList });

  const TodoCtxtValue = useMemo(() => {
    return {
      onAddTodo,
      onRemoveTodo,
      onToggleStatus,
      onClearCompleted,
    };
  }, [onAddTodo, onRemoveTodo, onToggleStatus, onClearCompleted]);

  return (
    <Layout>
      <TodoCtxt.Provider value={TodoCtxtValue}>
        <TodoForm />
        <TodoOverview
          totalNumberOfTodos={todoList.length}
          numberOfFinishedTodos={todoList.filter((todo) => todo.isCompleted).length}
        />
        <TodoList list={sortedList} />
        <TodoSort onChangeSort={onChangeSort} sortOption={sortOption} />
          <Row className={styles.row}>
            <BaseButton onClick={onClearCompleted} className={sortBtnStyles.btn}>
              {LabelsProvider.CLEAR_COMPLETED}
            </BaseButton>
          </Row>
      </TodoCtxt.Provider>
    </Layout>
  );
}

export default App;
