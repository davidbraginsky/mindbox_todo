import { renderHook, act } from "@testing-library/react";
import useSortedList from "../useSortedList";
import { MOCK_TODO_LIST } from "@/utils/TestUtils";
import { TodoSortOption } from "@/utils/TodoUtils";

describe("useSortedList", () => {
  it("sets correct sortOption", () => {
    const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

    act(() => {
      result.current.onChangeSort(TodoSortOption.COMPLETED);
    });

    expect(result.current.sortOption).toBe(TodoSortOption.COMPLETED);
  });

  it("returns all todos when TodoSortOption.ALL is selected", () => {
    const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

    act(() => {
      result.current.onChangeSort(TodoSortOption.ALL);
    });

    expect(result.current.sortedList).toEqual(MOCK_TODO_LIST);
  });

  it("returns completed todos when TodoSortOption.COMPLETED is selected", () => {
    const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

    act(() => {
      result.current.onChangeSort(TodoSortOption.COMPLETED);
    });

    const areAllTodosCompleted = result.current.sortedList.every((todo) => todo.isCompleted);

    expect(areAllTodosCompleted).toBe(true);
  });

  it("returns active todos when TodoSortOption.ACTIVE is selected", () => {
    const { result } = renderHook(() => useSortedList({ list: MOCK_TODO_LIST }));

    act(() => {
      result.current.onChangeSort(TodoSortOption.ACTIVE);
    });

    const areAllTodosActive = result.current.sortedList.every((todo) => todo.isCompleted === false);

    expect(areAllTodosActive).toBe(true);
  });
});
