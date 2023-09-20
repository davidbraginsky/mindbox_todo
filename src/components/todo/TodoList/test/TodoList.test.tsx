import { render, screen } from "@testing-library/react";
import { TodoData } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import { EMPTY_STRING } from "@/utils/Constants";

const mockTodoList: TodoData[] = [
  { id: "1", text: "hello world", isCompleted: false },
  { id: "2", text: "hello everybody", isCompleted: false },
  { id: "3", text: "hello guys", isCompleted: true },
];

describe("TodoList", async () => {
  it("renders passed list", () => {
    render(<TodoList list={mockTodoList} />);
    const todoItem = screen.getByText("hello world");
    expect(todoItem).toBeVisible();
  });

  it("renders todos from localStorage", () => {
    localStorage.setItem('todos', JSON.stringify(mockTodoList));
    render(<TodoList list={mockTodoList} />);
    const todos = JSON.parse(localStorage.getItem('todos') || EMPTY_STRING);
    expect(todos).toEqual(mockTodoList);
  })
});