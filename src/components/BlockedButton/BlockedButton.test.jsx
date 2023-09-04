/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render, screen, fireEvent } from "@testing-library/react";
import BlockedButton from "./BlockedButton";

describe("In this test we will test the BlockedButton", () => {
  test("Button is rendered", () => {
    const onClick = () => {};
    const disabled = true;

    render(<BlockedButton onClick={onClick} disabled={disabled} />);
  });

  test("blocked button is clicked", () => {
    const onClick = () => {};
    const disabled = true;

    render(<BlockedButton onClick={onClick} disabled={disabled} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    assert(!onClick.called, "onClick should not be called");
  });

  test("is disabled when disabled prop is true", () => {
    render(<BlockedButton disabled={true} />);
    const button = screen.getByRole("button");
    expect(button).toBeDisabled();
  });
});
