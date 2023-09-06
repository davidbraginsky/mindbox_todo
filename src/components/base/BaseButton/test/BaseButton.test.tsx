import { render, screen, fireEvent } from "@testing-library/react";
import BaseButton from "@/components/base/BaseButton/BaseButton";
import { LabelsProvider } from "@/L10N/LabelsProvider";

describe("BaseButton", async () => {
  it("renders child component", () => {
    render(<BaseButton>{LabelsProvider.ADD}</BaseButton>);
    const button = screen.getByText(LabelsProvider.ADD);
    expect(button).toBeVisible();
    expect(button).toHaveTextContent(LabelsProvider.ADD);
  });

  it("calls passed onClick function", () => {
    const mockFunc = vi.fn();
    render(<BaseButton onClick={mockFunc}>{LabelsProvider.ADD}</BaseButton>);
    const button = screen.getByText(LabelsProvider.ADD);
    fireEvent.click(button);
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
});
