import { useDispatch } from "react-redux";
import { v4 as uuid } from "uuid";
import { updateList, TodoData } from "@/store/features/todo/todoSlice";
import type { OnAddTodoFunc, OnRemoveTodoFunc, OnToggleStatusFunc, OnLoadTodoListFunc } from "@/utils/TodoUtils";
import { TODO_LIST_KEY } from "@/utils/Constants";
import useLocalStorage from "@/hooks/useLocalStorage";
import MiscUtils from "@/utils/MiscUtils";
import { DefaultOnClickFunc } from "@/types/types";

type UseTodoAPIFunc = () => UseTodoAPIOutput;

type UseTodoAPIOutput = {
  onAddTodo: OnAddTodoFunc;
  onRemoveTodo: OnRemoveTodoFunc;
  onToggleStatus: OnToggleStatusFunc;
  loadTodoList: OnLoadTodoListFunc;
  onClearCompleted: DefaultOnClickFunc;
  localTodoList: TodoData[];
};

const useTodoAPI: UseTodoAPIFunc = () => {
  const dispatch = useDispatch();

  const [localTodoList, setLocalTodoList] = useLocalStorage<TodoData[]>(TODO_LIST_KEY, []);

  const onAddTodo: OnAddTodoFunc = (text) => {
    const todo = { id: uuid(), text, isCompleted: false };
    const currentTodoList = MiscUtils.getLocalStorageValue<TodoData[]>(TODO_LIST_KEY);
    currentTodoList.push(todo);
    setLocalTodoList(currentTodoList);
    dispatch(updateList({ list: currentTodoList }));
  };

  const onRemoveTodo: OnRemoveTodoFunc = (id) => {
    const currentTodoList = MiscUtils.getLocalStorageValue<TodoData[]>(TODO_LIST_KEY);
    const filteredTodoList = currentTodoList.filter((todo) => todo.id !== id);
    setLocalTodoList(filteredTodoList);
    dispatch(updateList({ list: filteredTodoList }));
  };

  const onToggleStatus: OnToggleStatusFunc = (id) => {
    const currentTodoList = MiscUtils.getLocalStorageValue<TodoData[]>(TODO_LIST_KEY);
    const index = currentTodoList.findIndex((todo) => todo.id === id);
    currentTodoList[index].isCompleted = !currentTodoList[index].isCompleted;
    setLocalTodoList(currentTodoList);
    dispatch(updateList({ list: currentTodoList }));
  };

  const loadTodoList: OnLoadTodoListFunc = (list) => {
    setLocalTodoList(localTodoList);
    dispatch(updateList({ list }));
  };

  const onClearCompleted: DefaultOnClickFunc = () => {
    const currentTodoList = MiscUtils.getLocalStorageValue<TodoData[]>(TODO_LIST_KEY);
    const filteredTodoList = currentTodoList.filter((todo) => todo.isCompleted === false);
    setLocalTodoList(filteredTodoList);
    dispatch(updateList({ list: filteredTodoList }));
  };

  return { onAddTodo, onRemoveTodo, onToggleStatus, loadTodoList, onClearCompleted, localTodoList };
};

export default useTodoAPI;
