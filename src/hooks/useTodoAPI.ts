import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, removeTodo, toggleStatus } from "@/store/features/todo/todoSlice";
import type { OnAddTodoFunc, OnRemoveTodoFunc, OnToggleStatusFunc } from "@/utils/TodoUtils";

type UseTodoAPIFunc = () => UseTodoAPIOutput;

type UseTodoAPIOutput = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: OnRemoveTodoFunc;
  onToggleStatus: OnToggleStatusFunc;
};

const useTodoAPI: UseTodoAPIFunc = () => {
  const dispatch = useDispatch();

  const onAddTodo: OnAddTodoFunc = (text) => {
    dispatch(addTodo({ id: uuid(), text }));
  };

  const onRemoveTodo: OnRemoveTodoFunc = (id) => {
    dispatch(removeTodo({ id }));
  };

  const onToggleStatus: OnToggleStatusFunc = (id) => {
    dispatch(toggleStatus({ id }));
  };

  return { onAddTodo, onRemoveTodo, onToggleStatus };
};

export default useTodoAPI;
