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
});
