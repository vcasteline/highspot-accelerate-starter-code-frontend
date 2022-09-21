import { render, screen } from "@testing-library/react";
import { App } from "./App";

test("renders card list", () => {
  render(<App />);
  const cardList = screen.getByRole(/list/i);
  expect(cardList).toBeInTheDocument();
});
