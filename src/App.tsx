import TodoList from "@/components/TodoList/TodoList";
import BaseInput from "@/components/base/BaseInput/BaseInput";
import BaseButton from "@/components/base/BaseButton/BaseButton";

function App() {
  return (
    <main>
      <div>
        <BaseInput />
        <BaseButton />
      </div>

      <TodoList />
    </main>
  );
}

export default App;
