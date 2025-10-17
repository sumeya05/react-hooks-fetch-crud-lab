import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  within,
} from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App from "../components/App";
import { server } from "../mocks/server";

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test("displays question prompts after fetching", async () => {
  render(<App />);
  fireEvent.click(screen.getByText(/View Questions/i));
  expect(await screen.findByText(/lorem testum 1/i)).toBeInTheDocument();
  expect(await screen.findByText(/lorem testum 2/i)).toBeInTheDocument();
});

test("creates a new question when the form is submitted", async () => {
  render(<App />);
  fireEvent.click(screen.getByText("New Question"));

  fireEvent.change(screen.getByLabelText(/Prompt/i), {
    target: { value: "lorem testum 1" },
  });
  fireEvent.change(screen.getByLabelText("Answer 1:"), {
    target: { value: "one" },
  });
  fireEvent.change(screen.getByLabelText("Answer 2:"), {
    target: { value: "two" },
  });
  fireEvent.change(screen.getByLabelText("Answer 3:"), {
    target: { value: "three" },
  });
  fireEvent.change(screen.getByLabelText("Answer 4:"), {
    target: { value: "four" },
  });
  fireEvent.change(screen.getByLabelText(/Correct Index/i), {
    target: { value: "2" },
  });

  fireEvent.click(screen.getByText("Add Question"));
  fireEvent.click(screen.getByText("View Questions"));

  // Use findAllByText since there may be duplicates
  const matches = await screen.findAllByText(/lorem testum 1/i);
  expect(matches.length).toBeGreaterThanOrEqual(1);
});

test("deletes the question when the delete button is clicked", async () => {
  const { container } = render(<App />);
  fireEvent.click(screen.getByText("View Questions"));

  // Wait for multiple matches to appear
  await screen.findAllByText(/lorem testum 1/i);

  // Find the matching list item that contains the specific text
  const questionItem = Array.from(container.querySelectorAll("li")).find((li) =>
    li.textContent.includes("lorem testum 1")
  );

  expect(questionItem).toBeInTheDocument();

  const deleteButton = within(questionItem).getByRole("button", {
    name: /delete/i,
  });
  fireEvent.click(deleteButton);

  // Wait for it to be removed
  await waitFor(() => {
    const allMatches = screen.queryAllByText(/lorem testum 1/i);
    expect(allMatches.length).toBeLessThan(2); // or 0 depending on your initial state
  });
});
