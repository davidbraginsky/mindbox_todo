import { useCallback } from "react";
import TodoList from "@/components/todo/TodoList/TodoList";
import BaseInput from "@/components/base/BaseInput/BaseInput";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import BaseForm from "@/components/base/BaseForm/BaseForm";
import { LabelsProvider } from "@/l10n/LabelsProvider";
import { DefaultOnClickFunc } from "@/types/types";

function App() {
  const onAddTodo = useCallback(() => {
    console.log("adding todo");
  }, []);

  const onSubmitForm: DefaultOnClickFunc = useCallback((e) => {
    e.preventDefault();
    console.log("form was submitted");
  }, []);

  return (
    <main>
      <BaseForm onSubmit={onSubmitForm}>
        <BaseInput />
        <BaseButton onClick={onAddTodo} type="submit">
          {LabelsProvider.ADD}
        </BaseButton>
      </BaseForm>
      <TodoList />
    </main>
  );
}

export default App;
