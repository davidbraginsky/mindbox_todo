import styles from "./TodoForm.module.css";
import { FC, useState } from "react";
import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo } from "@/store/features/todo/todoSlice";
import BaseInput from "@/components/base/BaseInput/BaseInput";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import BaseForm from "@/components/base/BaseForm/BaseForm";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import type { DefaultOnChangeFunc, DefaultOnClickFunc } from "@/types/types";
import { EMPTY_STRING } from "@/utils/constants";

type TodoFormProps = {
  className?: string;
};

const TodoForm: FC<TodoFormProps> = ({ className = EMPTY_STRING }) => {
  const dispatch = useDispatch();

  const [text, setText] = useState<string>(EMPTY_STRING);

  const onChangeText: DefaultOnChangeFunc = (e) => {
    setText(e.target.value);
  };

  const onSubmitForm: DefaultOnClickFunc = (e) => {
    e.preventDefault();
    dispatch(addTodo({ id: uuid(), text }));
  };

  return (
    <BaseForm onSubmit={onSubmitForm}>
      <BaseInput name="text" onChange={onChangeText} value={text} />
      <BaseButton type="submit">{LabelsProvider.ADD}</BaseButton>
    </BaseForm>
  );
};

export default TodoForm;
