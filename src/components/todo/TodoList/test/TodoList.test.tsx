import { render, screen } from "@testing-library/react";
import TodoList from "@/components/todo/TodoList/TodoList";
import { TODO_TEST_LABEL } from "@/utils/Constants";
import { setDefaultTodosInLocalStorage, getDefaultTodosFromLocalStorage, MOCK_TODO_LIST } from "@/utils/TestUtils";

describe("TodoList", () => {
  afterEach(() => {
    localStorage.clear();
  });

  it("renders passed list", () => {
    render(<TodoList list={MOCK_TODO_LIST} />);

    const todoItem = screen.getByText(`${TODO_TEST_LABEL} hello`);

    expect(todoItem).toBeVisible();
  });

  it("renders todos from localStorage", () => {
    setDefaultTodosInLocalStorage();
    render(<TodoList list={MOCK_TODO_LIST} />);

    const todos = getDefaultTodosFromLocalStorage();

    expect(todos).toEqual(MOCK_TODO_LIST);
  });
});
