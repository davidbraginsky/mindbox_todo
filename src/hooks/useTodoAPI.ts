import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, removeTodo } from "@/store/features/todo/todoSlice";
import type { OnAddTodoFunc } from "@/utils/TodoUtils";

type UseTodoAPIFunc = () => UseTodoAPIOutput;

type UseTodoAPIOutput = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: Function;
  onToggleTodo: Function;
};

const useTodoAPI: UseTodoAPIFunc = () => {
  const dispatch = useDispatch();

  const onAddTodo = (text: string) => {
    dispatch(addTodo({ id: uuid(), text }));
  };

  const onRemoveTodo = (id: string) => {
    console.log("removing");
    // dispatch(removeTodo({ id: uuid(), text }));
  };

  const onToggleTodo = (id: string) => {
    console.log("toggling");
    // dispatch(addTodo({ id: uuid(), text }));
  };

  return { onAddTodo, onRemoveTodo, onToggleTodo };
};

export default useTodoAPI;
