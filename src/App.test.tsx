import { screen, fireEvent } from "@testing-library/react";
import type { TodoData } from "@/store/features/todo/todoSlice";
import App from "./App";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import { EMPTY_STRING, TODO_LIST_KEY, TODO_TEST_LABEL, DEFAULT_TODO_REGEX } from "@/utils/Constants";
import { renderWithProvider } from "@/utils/TestUtils";

const mockTodoList: TodoData[] = [
  { id: "1", text: `${TODO_TEST_LABEL} hello`, isCompleted: false },
  { id: "2", text: `${TODO_TEST_LABEL} world`, isCompleted: false },
  { id: "3", text: `${TODO_TEST_LABEL} again`, isCompleted: true },
];

describe("App", async () => {
  afterEach(() => {
    localStorage.clear();
  });
  it("renders add btn", () => {
    renderWithProvider(<App />);
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
  });

  it("renders input field", () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO);
    expect(inputField).toBeInTheDocument();
  });

  it("updates input field value", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    expect(inputField.value).toBe(TODO_TEST_LABEL);
  });

  it("adds new item to localstorage after submitting", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    expect(inputField).toBeInTheDocument();
    const localTodos = JSON.parse(localStorage.getItem(TODO_LIST_KEY) || EMPTY_STRING);
    const todoText = localTodos[0].text;
    expect(todoText).toBe(TODO_TEST_LABEL);
  });

  it("displays added item on screen", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const todoElement = screen.getByText(TODO_TEST_LABEL);
    expect(todoElement).toBeInTheDocument();
  });

  it("clears input field after submitting todo", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    expect(inputField.value).toBe(EMPTY_STRING);
  });

  it("display validation message if user tries to enter empty todo", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: EMPTY_STRING } });
    await addBtn.click();
    const validationMessage = screen.getByText(LabelsProvider.INPUT_MUST_NOT_BE_EMPTY);
    expect(validationMessage).toBeInTheDocument();
  });

  it("added todo has delete button", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const deleteBtn = screen.getByText(LabelsProvider.DELETE);
    expect(deleteBtn).toBeInTheDocument();
  });

  it("deleting todo removes it from localStorage", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const deleteBtn = screen.getByText(LabelsProvider.DELETE);
    expect(deleteBtn).toBe(123);
  });

  it("deleting todo removes it from list", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const deleteBtn = screen.getByText(LabelsProvider.DELETE);
    expect(deleteBtn).toBe(123);
  });

  it("added todo has toggle checkbox", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeInTheDocument();
  });

  it("toggled todo is updated in localStorage", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBe(444);
  });

  it("toggled todo is displayed on screen", async () => {
    renderWithProvider(<App />);
    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);
    expect(addBtn).toBeInTheDocument();
    expect(inputField).toBeInTheDocument();
    await fireEvent.change(inputField, { target: { value: TODO_TEST_LABEL } });
    await addBtn.click();
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBe(666);
  });

  it("displays all todos by default", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList));
    renderWithProvider(<App />);
    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);
    console.log("todoElements: ", todoElements);
    expect(todoElements.length).toBe(3);
  });

  it("displays 'show only active' button ", async () => {
    renderWithProvider(<App />);
    const sortBtn = screen.getByText(LabelsProvider.ONLY_ACTIVE);
    expect(sortBtn).toBeInTheDocument();
  });

  it("shows only active todos if filtered by 'only active' ", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList));
    renderWithProvider(<App />);
    const sortBtn = screen.getByText(LabelsProvider.ONLY_ACTIVE);
    fireEvent.click(sortBtn);
    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);
    // we have 2 todos with isCompleted: false in mock data and that's why we check for that number
    expect(todoElements.length).toBe(2);
  });

  it("displays 'show only completed' button ", async () => {
    renderWithProvider(<App />);
    const sortBtn = screen.getByText(LabelsProvider.ONLY_COMPLETED);
    expect(sortBtn).toBeInTheDocument();
  });

  it("shows only active todos if filtered by 'only active' ", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList));
    renderWithProvider(<App />);
    const sortBtn = screen.getByText(LabelsProvider.ONLY_COMPLETED);
    fireEvent.click(sortBtn);
    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);
    // we have 1 todos with isCompleted: true in mock data and that's why we check for that number
    expect(todoElements.length).toBe(1);
  });

  it("displays 'clear completed' button ", async () => {
    renderWithProvider(<App />);
    const clearBtn = screen.getByText(LabelsProvider.CLEAR_COMPLETED);
    expect(clearBtn).toBeInTheDocument();
  });

  it("removes all completed todos if 'clear completed' was pushed ", async () => {
    localStorage.setItem(TODO_LIST_KEY, JSON.stringify(mockTodoList));
    renderWithProvider(<App />);
    const clearBtn = screen.getByText(LabelsProvider.CLEAR_COMPLETED);
    fireEvent.click(clearBtn);
    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);
    // we have 2 todos with isCompleted: true in mock data and that's why we check for that number
    expect(todoElements.length).toBe(2);
  });
});
