import type { ReactNode } from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import store from "@/store/store";

export const renderWithProvider = (component: ReactNode) => {
  render(<Provider store={store}>{component}</Provider>);
};
