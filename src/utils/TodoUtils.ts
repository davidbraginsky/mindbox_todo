import { createContext } from "react";
import MiscUtils from "@/utils/MiscUtils";

type TodoCtxtData = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: Function;
  onToggleTodo: Function;
};

export type OnAddTodoFunc = (text: string) => void;

export const TodoCtxt = createContext<TodoCtxtData>({
  onAddTodo: MiscUtils.dummyFunc,
  onRemoveTodo: MiscUtils.dummyFunc,
  onToggleTodo: MiscUtils.dummyFunc,
});
