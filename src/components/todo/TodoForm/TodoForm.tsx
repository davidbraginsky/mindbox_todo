import styles from "./TodoForm.module.css";
import { FC, useState, useContext } from "react";
import { TodoCtxt } from "@/utils/TodoUtils";
import BaseInput from "@/components/base/BaseInput/BaseInput";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import BaseForm from "@/components/base/BaseForm/BaseForm";
import Row from "@/components/layout/Row/Row";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import type { DefaultOnChangeFunc, DefaultOnClickFunc } from "@/types/types";
import { EMPTY_STRING } from "@/utils/Constants";

type TodoFormProps = {
  className?: string;
};

const TodoForm: FC<TodoFormProps> = ({ className = EMPTY_STRING }) => {
  const { onAddTodo } = useContext(TodoCtxt);

  const [text, setText] = useState<string>(EMPTY_STRING);

  const onChangeText: DefaultOnChangeFunc = (e) => {
    setText(e.target.value);
  };

  const onSubmitForm: DefaultOnClickFunc = (e) => {
    e.preventDefault();
    onAddTodo(text);
  };

  return (
    <BaseForm onSubmit={onSubmitForm}>
      <Row className={styles.inputRow}>
        <BaseInput className={styles.input} onChange={onChangeText} value={text} placeholder={LabelsProvider.NEW_TODO} />
        <BaseButton type="submit">{LabelsProvider.ADD}</BaseButton>
      </Row>
    </BaseForm>
  );
};

export default TodoForm;
