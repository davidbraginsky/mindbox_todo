import { createContext } from "react";
import MiscUtils from "@/utils/MiscUtils";
import { TodoData } from "@/store/features/todo/todoSlice";
import type { DefaultOnClickFunc } from "@/types/types";

type TodoCtxtData = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: OnRemoveTodoFunc;
  onToggleStatus: OnToggleStatusFunc;
  onClearCompleted: DefaultOnClickFunc;
};

export type OnAddTodoFunc = (text: string) => void;
export type OnRemoveTodoFunc = (id: string) => void;
export type OnToggleStatusFunc = (id: string) => void;
export type OnLoadTodoListFunc = (list: TodoData[]) => void;

export const TodoCtxt = createContext<TodoCtxtData>({
  onAddTodo: MiscUtils.dummyFunc,
  onRemoveTodo: MiscUtils.dummyFunc,
  onToggleStatus: MiscUtils.dummyFunc,
  onClearCompleted: MiscUtils.dummyFunc,
});

export enum TodoSortOption {
  ALL,
  ACTIVE,
  COMPLETED,
}
