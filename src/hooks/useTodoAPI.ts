import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { addTodo, removeTodo, toggleStatus, loadList, TodoData } from "@/store/features/todo/todoSlice";
import type { OnAddTodoFunc, OnRemoveTodoFunc, OnToggleStatusFunc, OnLoadTodoListFunc } from "@/utils/TodoUtils";
import { TODO_LIST_KEY } from "@/utils/Constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import MiscUtils from "@/utils/MiscUtils";

type UseTodoAPIFunc = () => UseTodoAPIOutput;

type UseTodoAPIOutput = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: OnRemoveTodoFunc;
  onToggleStatus: OnToggleStatusFunc;
  loadTodoList: OnLoadTodoListFunc;
  localTodoList: TodoData[];
};

const useTodoAPI: UseTodoAPIFunc = () => {
  const dispatch = useDispatch();

  const [localTodoList, setLocalTodoList] = useLocalStorage<TodoData[]>(TODO_LIST_KEY, []);

  const onAddTodo: OnAddTodoFunc = (text) => {
    const todo = { id: uuid(), text, isCompleted: false };
    const currentTodoList = MiscUtils.getLocalStorageValue(TODO_LIST_KEY);
    currentTodoList.push(todo)
    setLocalTodoList(currentTodoList);
    dispatch(addTodo({ id: uuid(), text }));
  };

  const onRemoveTodo: OnRemoveTodoFunc = (id) => {
    dispatch(removeTodo({ id }));
  };

  const onToggleStatus: OnToggleStatusFunc = (id) => {
    dispatch(toggleStatus({ id }));
  };

  const loadTodoList: OnLoadTodoListFunc = (list) => {
    setLocalTodoList(localTodoList)
    dispatch(loadList({ list }));
  };

  return { onAddTodo, onRemoveTodo, onToggleStatus, loadTodoList, localTodoList };
};

export default useTodoAPI;
