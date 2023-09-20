import type { ReactNode } from "react";
import { render, fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/store/store";

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