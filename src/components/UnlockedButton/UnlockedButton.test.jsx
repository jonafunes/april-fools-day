/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import UnlockedButton from "./UnlockedButton";

describe("In this test we will test the UnlockedButton", () => {
  test("Button is rendered", () => {
    const onClick = () => {};
    const disabled = true;

    render(<UnlockedButton onClick={onClick} disabled={disabled} />);
  });

  test("blocked button is clicked", () => {
    const onClick = () => {};
    const disabled = true;

    render(<UnlockedButton onClick={onClick} disabled={disabled} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    assert(!onClick.called, "onClick should not be called");
  });

  test("is disabled when disabled prop is true", () => {
    render(<UnlockedButton disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});