import { renderHook, act } from "@testing-library/react";
import useTodoAPI from "../useTodoAPI";
import { getDefaultTodosFromLocalStorage, setDefaultTodosInLocalStorage, MOCK_TODO_LIST } from "@/utils/TestUtils";
import { TodoSortOption } from "@/utils/TodoUtils";
import { TODO_TEST_LABEL } from "@/utils/Constants";
import { Provider } from "react-redux";
import store from "@/store/store";
import { ReactNode } from "react";

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

  //   it("returns all todos when TodoSortOption.ALL is selected", () => {
  //     const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

  //     act(() => {
  //       result.current.onChangeSort(TodoSortOption.ALL);
  //     });

  //     expect(result.current.sortedList).toEqual(MOCK_TODO_LIST);
  //   });

  //   it("returns completed todos when TodoSortOption.COMPLETED is selected", () => {
  //     const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

  //     act(() => {
  //       result.current.onChangeSort(TodoSortOption.COMPLETED);
  //     });

  //     const areAllTodosCompleted = result.current.sortedList.every((todo) => todo.isCompleted);

  //     expect(areAllTodosCompleted).toBe(true);
  //   });

  //   it("returns active todos when TodoSortOption.ACTIVE is selected", () => {
  //     const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

  //     act(() => {
  //       result.current.onChangeSort(TodoSortOption.ACTIVE);
  //     });

  //     const areAllTodosActive = result.current.sortedList.every((todo) => todo.isCompleted === false);

  //     expect(areAllTodosActive).toBe(true);
  //   });
});
