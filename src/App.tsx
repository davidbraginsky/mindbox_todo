import { useMemo } from "react";
import { useSelector } from "react-redux";
import type { StoreType } from "@/store/StoreType";
import type { TodoData } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import TodoForm from "@/components/todo/TodoForm/TodoForm";
import useTodoAPI from "@/hooks/useTodoAPI";
import { TodoCtxt } from "@/utils/TodoUtils";

function App() {
  const todoList = useSelector<StoreType, TodoData[]>((state: StoreType) => state.todo?.todoList);

  const { onAddTodo, onRemoveTodo, onToggleStatus } = useTodoAPI();

  const TodoCtxtValue = useMemo(() => {
    return {
      onAddTodo,
      onRemoveTodo,
      onToggleStatus,
    };
  }, [onAddTodo, onRemoveTodo, onToggleStatus]);

  return (
    <main>
      <TodoCtxt.Provider value={TodoCtxtValue}>
        <TodoForm />
        <TodoList list={todoList} />
      </TodoCtxt.Provider>
    </main>
  );
}

export default App;
