import { useSelector } from "react-redux";
import type { StoreType } from "@/store/StoreType";
import { Todo } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import TodoForm from "@/components/todo/TodoForm/TodoForm";

function App() {
  const todoList = useSelector<StoreType, Todo[]>((state: StoreType) => state.todo?.todoList);

  return (
    <main>
      <TodoForm />
      <TodoList list={todoList} />
    </main>
  );
}

export default App;
