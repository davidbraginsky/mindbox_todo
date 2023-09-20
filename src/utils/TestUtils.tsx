import type { ReactNode } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/store/store";
import type { TodoData } from "@/store/features/todo/todoSlice";
import { TODO_TEST_LABEL } from "@/utils/Constants";

type AddTextToInputProps = {
  node: Element;
  label: string;
};

export const renderWithProvider = (component: ReactNode) => {
  render(<Provider store={store}>{component}</Provider>);
};

export const addTextToInput = ({ node, label }: AddTextToInputProps) => {
  fireEvent.change(node, { target: { value: label } });
};

export const mockTodoList: TodoData[] = [
  { id: "1", text: `${TODO_TEST_LABEL} hello`, isCompleted: false },
  { id: "2", text: `${TODO_TEST_LABEL} world`, isCompleted: false },
  { id: "3", text: `${TODO_TEST_LABEL} again`, isCompleted: true },
];
