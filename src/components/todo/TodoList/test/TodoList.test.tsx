import { render, screen, fireEvent } from "@testing-library/react";
import { TodoData } from "@/store/features/todo/todoSlice";
import TodoList from "@/components/todo/TodoList/TodoList";
import { LabelsProvider } from "@/L10N/LabelsProvider";

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

  it("renders correct amount of todos", () => {
    render(<TodoList list={mockTodoList} />);
    const todoItems = screen.getAllByText(/hello/i);
    expect(todoItems.length).toBe(3);
  });

});
