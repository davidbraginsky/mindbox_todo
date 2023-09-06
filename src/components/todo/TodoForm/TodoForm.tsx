import styles from "./TodoForm.module.css";
import { FC, useState, useContext } from "react";
import { TodoCtxt } from "@/utils/TodoUtils";
import BaseInput from "@/components/base/BaseInput/BaseInput";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import BaseForm from "@/components/base/BaseForm/BaseForm";
import Row from "@/components/layout/Row/Row";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import type { DefaultOnChangeFunc, DefaultOnSubmitFunc } from "@/types/types";
import { EMPTY_STRING } from "@/utils/Constants";

type TodoFormProps = {
  className?: string;
};

const TodoForm: FC<TodoFormProps> = () => {
  const { onAddTodo } = useContext(TodoCtxt);

  const [text, setText] = useState<string>(EMPTY_STRING);
  const [validationMessage, setValidationMessage] = useState<string>(EMPTY_STRING);

  const onChangeText: DefaultOnChangeFunc = (e) => {
    setText(e.target.value);
  };

  const onSubmitForm: DefaultOnSubmitFunc = (e) => {
    e.preventDefault();
    if (text === EMPTY_STRING) {
      setValidationMessage(LabelsProvider.INPUT_MUST_NOT_BE_EMPTY);
      return;
    }
    onAddTodo(text);
    setText(EMPTY_STRING);
    setValidationMessage(EMPTY_STRING);
  };

  return (
    <BaseForm onSubmit={onSubmitForm}>
      <Row className={styles.inputRow}>
        <BaseInput
          className={styles.input}
          onChange={onChangeText}
          value={text}
          placeholder={LabelsProvider.NEW_TODO}
        />
        <BaseButton type="submit">{LabelsProvider.ADD}</BaseButton>
      </Row>
      {validationMessage ? <span className={styles.error}>{validationMessage}</span> : null}
    </BaseForm>
  );
};

export default TodoForm;
