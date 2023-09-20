import { screen, fireEvent, act } from "@testing-library/react";
import App from "./App";
import { LabelsProvider } from "@/L10N/LabelsProvider";
import { EMPTY_STRING, TODO_LIST_KEY, TODO_TEST_LABEL, DEFAULT_TODO_REGEX } from "@/utils/Constants";
import {
  renderWithProvider,
  addTextToInput,
  setDefaultTodosInLocalStorage,
  getDefaultTodosFromLocalStorage,
  MOCK_TODO_LIST,
} from "@/utils/TestUtils";

describe("App", () => {
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

  it("updates input field value", () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    addTextToInput({ node: inputField, label: TODO_TEST_LABEL });

    expect(inputField.value).toBe(TODO_TEST_LABEL);
  });

  it("adds new item to localstorage after submitting", () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);

    addTextToInput({ node: inputField, label: TODO_TEST_LABEL });
    act(() => {
      fireEvent.click(addBtn);
    });

    const localTodos = getDefaultTodosFromLocalStorage();
    const todoText = localTodos[0].text;

    expect(todoText).toBe(TODO_TEST_LABEL);
  });

  it("displays added item on screen", () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);

    addTextToInput({ node: inputField, label: TODO_TEST_LABEL });
    act(() => {
      fireEvent.click(addBtn);
    });

    const todoElement = screen.getByText(TODO_TEST_LABEL);

    expect(todoElement).toBeInTheDocument();
  });

  it("clears input field after submitting todo", () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);

    addTextToInput({ node: inputField, label: TODO_TEST_LABEL });
    act(() => {
      fireEvent.click(addBtn);
    });

    expect(inputField.value).toBe(EMPTY_STRING);
  });

  it("displays validation message if user tries to enter empty todo", () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);

    addTextToInput({ node: inputField, label: EMPTY_STRING });
    act(() => {
      fireEvent.click(addBtn);
    });

    const validationMessage = screen.getByText(LabelsProvider.INPUT_MUST_NOT_BE_EMPTY);

    expect(validationMessage).toBeInTheDocument();
  });

  it("added todo has delete button", () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);

    addTextToInput({ node: inputField, label: TODO_TEST_LABEL });
    act(() => {
      fireEvent.click(addBtn);
    });

    const deleteBtn = screen.getByText(LabelsProvider.DELETE);

    expect(deleteBtn).toBeInTheDocument();
  });

  it("deleting todo removes it from localStorage", () => {
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const deleteBtns = screen.getAllByText(LabelsProvider.DELETE);
    act(() => {
      fireEvent.click(deleteBtns[0]);
    });

    const localTodos = getDefaultTodosFromLocalStorage();

    // we initially had 3 todos in our mock list and removing one should result in 2
    expect(localTodos.length).toBe(2);
  });

  it("deleting todo removes it from list", () => {
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const deleteBtns = screen.getAllByText(LabelsProvider.DELETE);
    act(() => {
      fireEvent.click(deleteBtns[0]);
    });

    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);

    // we initially had 3 todos in our mock list and removing one should result in 2
    expect(todoElements.length).toBe(2);
  });

  it("added todo has toggle checkbox", async () => {
    renderWithProvider(<App />);

    const inputField = screen.getByPlaceholderText(LabelsProvider.NEW_TODO) as HTMLInputElement;
    const addBtn = screen.getByText(LabelsProvider.ADD);

    addTextToInput({ node: inputField, label: TODO_TEST_LABEL });
    act(() => {
      fireEvent.click(addBtn);
    });

    const checkbox = screen.getByRole("checkbox");

    expect(checkbox).toBeInTheDocument();
  });

  it("toggled todo is updated in localStorage", () => {
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const checkboxes = screen.getAllByRole("checkbox");
    act(() => {
      fireEvent.click(checkboxes[0]);
    });

    const localTodos = getDefaultTodosFromLocalStorage();

    // initially, our first todo had a status of isCompleted: false
    // and clicking on the checkbox should switch it to true
    expect(localTodos[0].isCompleted).toBe(true);
  });

  it("displays all todos by default", async () => {
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);

    expect(todoElements.length).toBe(3);
  });

  it("displays 'show only active' button ", async () => {
    renderWithProvider(<App />);

    const sortBtn = screen.getByText(LabelsProvider.ONLY_ACTIVE);

    expect(sortBtn).toBeInTheDocument();
  });

  it("shows only active todos if filtered by 'only active' ", async () => {
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const sortBtn = screen.getByText(LabelsProvider.ONLY_ACTIVE);
    act(() => {
      fireEvent.click(sortBtn);
    });

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
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const sortBtn = screen.getByText(LabelsProvider.ONLY_COMPLETED);
    act(() => {
      fireEvent.click(sortBtn);
    });

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
    setDefaultTodosInLocalStorage();
    renderWithProvider(<App />);

    const clearBtn = screen.getByText(LabelsProvider.CLEAR_COMPLETED);
    act(() => {
      fireEvent.click(clearBtn);
    });
    const todoElements = screen.getAllByText(DEFAULT_TODO_REGEX);
    // we have 2 todos with isCompleted: true in mock data and that's why we check for that number

    expect(todoElements.length).toBe(2);
  });
});
