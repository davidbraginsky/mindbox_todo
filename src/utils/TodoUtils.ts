import { createContext } from "react";
import MiscUtils from "@/utils/MiscUtils";

type TodoCtxtData = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: OnRemoveTodoFunc;
  onToggleStatus: OnToggleStatusFunc;
};

export type OnAddTodoFunc = (text: string) => void;
export type OnRemoveTodoFunc = (id: string) => void;
export type OnToggleStatusFunc = (id: string) => void;

export const TodoCtxt = createContext<TodoCtxtData>({
  onAddTodo: MiscUtils.dummyFunc,
  onRemoveTodo: MiscUtils.dummyFunc,
  onToggleStatus: MiscUtils.dummyFunc,
});
