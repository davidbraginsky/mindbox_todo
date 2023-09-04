import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addTodo } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import BaseInput from "@/components/base/BaseInput/BaseInput";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import BaseForm from "@/components/base/BaseForm/BaseForm";
import { LabelsProvider } from "@/l10n/LabelsProvider";
import { DefaultOnClickFunc } from "@/types/types";

function App() {
  const dispatch = useDispatch();

  const state = useSelector((state) => state);

  console.log("state: ", state);

  const onAddTodo = useCallback(() => {
    console.log("adding todo");
    dispatch(addTodo({ id: "123", text: "random text" }));
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
