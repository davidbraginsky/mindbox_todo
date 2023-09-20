import { renderHook, act } from "@testing-library/react";
import useLocalStorage from "../useLocalStorage";
import { TODO_TEST_LABEL, TODO_LIST_KEY, EMPTY_STRING } from "@/utils/Constants";
import { getDefaultTodosFromLocalStorage } from "@/utils/TestUtils"

describe("useLocalStorage", () => {
  it("sets passed data to localStorage", () => {
    const { result } = renderHook(() => useLocalStorage(TODO_LIST_KEY, EMPTY_STRING));
    const [, setValue] = result.current;

    act(() => {
      setValue(TODO_TEST_LABEL);
    });

    const localStorageData = getDefaultTodosFromLocalStorage();

    expect(localStorageData).toBe(TODO_TEST_LABEL);
  });
});
