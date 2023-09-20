import type { ReactNode } from "react";
import { renderHook, act } from "@testing-library/react";
import useTodoAPI from "../useTodoAPI";
import { getDefaultTodosFromLocalStorage, setDefaultTodosInLocalStorage, MOCK_TODO_LIST } from "@/utils/TestUtils";
import { TODO_TEST_LABEL } from "@/utils/Constants";
import { Provider } from "react-redux";
import store from "@/store/store";

type WrappProps = {
  children: ReactNode;
};

describe("useTodoAPI", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("adds new todo", () => {
    setDefaultTodosInLocalStorage();
    const wrapper = ({ children }: WrappProps) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useTodoAPI(), { wrapper });

    act(() => {
      result.current.onAddTodo(TODO_TEST_LABEL);
    });

    const todos = getDefaultTodosFromLocalStorage();

    expect(todos[todos.length - 1].text).toBe(TODO_TEST_LABEL);
  });

  it("removes todo when passed ID", () => {
    setDefaultTodosInLocalStorage();
    const wrapper = ({ children }: WrappProps) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useTodoAPI(), { wrapper });

    act(() => {
      result.current.onRemoveTodo("1");
    });

    const todos = getDefaultTodosFromLocalStorage();

    // initially we had three todos so removing one should leave us with two
    expect(todos.length).toBe(2);
  });

  it("toggles status when passed ID", () => {
    setDefaultTodosInLocalStorage();
    const wrapper = ({ children }: WrappProps) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useTodoAPI(), { wrapper });

    act(() => {
      result.current.onToggleStatus("1");
    });

    const todos = getDefaultTodosFromLocalStorage();

    // initially we had isCompleted: false on first todo
    expect(todos[0].isCompleted).toBe(true);
  });

  it("sets passed list to localStorage", () => {
    const wrapper = ({ children }: WrappProps) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useTodoAPI(), { wrapper });

    act(() => {
      result.current.loadTodoList(MOCK_TODO_LIST);
    });

    const todos = getDefaultTodosFromLocalStorage();

    expect(todos).toEqual(MOCK_TODO_LIST);
  });

  it("clears all completed todos", () => {
    setDefaultTodosInLocalStorage();
    const wrapper = ({ children }: WrappProps) => <Provider store={store}>{children}</Provider>;
    const { result } = renderHook(() => useTodoAPI(), { wrapper });

    act(() => {
      result.current.onClearCompleted();
    });

    const todos = getDefaultTodosFromLocalStorage();

    // initially we had three todos, one of which was completed, so after clearing all we should have two left
    expect(todos.length).toBe(2);
  });
});
