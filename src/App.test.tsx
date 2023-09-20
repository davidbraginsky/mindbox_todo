import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";
import { LabelsProvider } from "./L10N/LabelsProvider";

import { Provider } from "react-redux";
import store from "./store/store";

import { EMPTY_STRING, TODO_LIST_KEY } from "./utils/Constants";

import type { TodoData } from "@/store/features/todo/todoSlice";

const mockTodoList: TodoData[] = [
  { id: "1", text: "__test-todo__ world", isCompleted: false },
  { id: "2", text: "__test-todo__ everybody", isCompleted: false },
  { id: "3", text: "__test-todo__ guys", isCompleted: true },
];

describe("App", async () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("renders add btn", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
  });

  it("renders input field", () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO);
    expect(inputField).toBeInTheDocument();
  });

  it("updates input field value", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    expect(inputField.value).toBe("hello there");
  });

  it("adds new item to localstorage after submitting", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    expect(inputField).toBeInTheDocument();
    const localTodos = JSON.parse(localStorage.getItem(TODO_LIST_KEY) || EMPTY_STRING);
    const todoText = localTodos[0].text;
    expect(todoText).toBe("hello there");
  });

  it("displays added item on screen", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const todoElement = screen.getByText("hello there");
    expect(todoElement).toBeInTheDocument();
  });

  it("clears input field after submitting todo", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    expect(inputField.value).toBe(EMPTY_STRING);
  });

  it("display validation message if user tries to enter empty todo", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "" } });
    await addBtn.click();
    const validationMessage = screen.getByText(LabelsProvider.INPUT_MUST_NOT_BE_EMPTY);
    expect(validationMessage).toBeInTheDocument();
  });

  it("added todo has delete button", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const deleteBtn = screen.getByText(LabelsProvider.DELETE);
    expect(deleteBtn).toBeInTheDocument();
  });

  it("deleting todo removes it from localStorage", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const deleteBtn = screen.getByText(LabelsProvider.DELETE);
    expect(deleteBtn).toBe(123);
  });

  it("deleting todo removes it from list", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const deleteBtn = screen.getByText(LabelsProvider.DELETE);
    expect(deleteBtn).toBe(123);
  });

  it("added todo has toggle checkbox", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("toggled todo is updated in localStorage", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBe(444);
  });

  it("toggled todo is displayed on screen", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: "hello there" } });
    await addBtn.click();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBe(666);
  });

  it("displays all todos by default", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList))
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const todoElements = screen.getAllByText(/__test-todo__/);
    console.log('todoElements: ', todoElements)
    expect(todoElements.length).toBe(3);
  });

  it("displays 'show only active' button ", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const sortBtn = screen.getByText(LabelsProvider.ONLY_ACTIVE);
    expect(sortBtn).toBeInTheDocument();
  });

  it("shows only active todos if filtered by 'only active' ", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList))
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const sortBtn = screen.getByText(LabelsProvider.ONLY_ACTIVE);
    fireEvent.click(sortBtn)
    const todoElements = screen.getAllByText(/__test-todo__/);
    // we have 2 todos with isCompleted: false in mock data and that's why we check for that number
    expect(todoElements.length).toBe(2);
  });

  it("displays 'show only completed' button ", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const sortBtn = screen.getByText(LabelsProvider.ONLY_COMPLETED);
    expect(sortBtn).toBeInTheDocument();
  });

  it("shows only active todos if filtered by 'only active' ", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList))
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const sortBtn = screen.getByText(LabelsProvider.ONLY_COMPLETED);
    fireEvent.click(sortBtn)
    const todoElements = screen.getAllByText(/__test-todo__/);
    // we have 1 todos with isCompleted: true in mock data and that's why we check for that number
    expect(todoElements.length).toBe(1);
  });

  it("displays 'clear completed' button ", async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const clearBtn = screen.getByText(LabelsProvider.CLEAR_COMPLETED);
    expect(clearBtn).toBeInTheDocument();
  });

  it("removes all completed todos if 'clear completed' was pushed ", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList))
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const clearBtn = screen.getByText(LabelsProvider.CLEAR_COMPLETED);
    fireEvent.click(clearBtn)
    const todoElements = screen.getAllByText(/__test-todo__/);
    // we have 2 todos with isCompleted: true in mock data and that's why we check for that number
    expect(todoElements.length).toBe(2);
  });
});