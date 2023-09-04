/* eslint-disable no-undef */
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";
import ClearButton from "./ClearButton";

describe("In this test we will test the BlockedButton", () => {
  test("Button is rendered", () => {
    const onClick = () => {};
    const disabled = true;

    render(<ClearButton onClick={onClick} disabled={disabled} />);
  });
});
