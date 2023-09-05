import { useMemo, useEffect } from "react";
import { useSelector } from "react-redux";
import type { StoreType } from "@/store/StoreType";
import type { TodoData } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import TodoForm from "@/components/todo/TodoForm/TodoForm";
import Layout from "@/components/layout/Layout/Layout";
import useTodoAPI from "@/hooks/useTodoAPI";
import { TodoCtxt } from "@/utils/TodoUtils";

function App() {
  const { onAddTodo, onRemoveTodo, onToggleStatus, loadTodoList, localTodoList } = useTodoAPI();

  useEffect(() => {
    loadTodoList(localTodoList);
  }, []);

  const todoList = useSelector<StoreType, TodoData[]>((state: StoreType) => state.todo?.todoList);

  const TodoCtxtValue = useMemo(() => {
    return {
      onAddTodo,
      onRemoveTodo,
      onToggleStatus,
    };
  }, [onAddTodo, onRemoveTodo, onToggleStatus]);

  return (
    <Layout>
      <TodoCtxt.Provider value={TodoCtxtValue}>
        <TodoForm />
        <TodoList list={todoList} />
      </TodoCtxt.Provider>
    </Layout>
  );
}

export default App;
