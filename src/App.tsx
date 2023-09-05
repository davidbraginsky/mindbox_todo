import { useSelector } from "react-redux";
import type { StoreType } from "@/store/StoreType";
import type { TodoData } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import TodoForm from "@/components/todo/TodoForm/TodoForm";

function App() {
  const todoList = useSelector<StoreType, TodoData[]>((state: StoreType) => state.todo?.todoList);

  return (
    <main>
      <TodoForm />
      <TodoList list={todoList} />
    </main>
  );
}

export default App;
