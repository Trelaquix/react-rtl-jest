import { render, screen } from "@testing-library/react";
import user from "@testing-library/user-event";
import UserForm from "./UserForm";

test("it shows two inputs and a button", () => {
  // Render the component
  render(<UserForm />);

  // Manipulate the component or find an element in it
  const inputs = screen.getAllByRole("textbox");
  const button = screen.getByRole("button");

  // Assertion - make sure the component is doing what we expect it to do
  expect(inputs).toHaveLength(2);
  expect(button).toBeInTheDocument();
});

test("it calls onUserAdd when the form is submitted", () => {
  // Not the best implementation
  const mock = jest.fn();

  // Render the component
  render(<UserForm onUserAdd={mock} />);

  // Find the two inputs
  const nameInput = screen.getByRole("textbox", {
    name: /name/i,
  });
  const emailInput = screen.getByRole("textbox", {
    name: /email/i,
  });

  // Stimulate typing in a name
  user.click(nameInput);
  user.keyboard("Bryan");

  // Stimulate typing in an email
  user.click(emailInput);
  user.keyboard("bryan@bryan.com");

  // Find the button
  const button = screen.getByRole("button");

  // Stimulate clicking the button
  user.click(button);

  // Assertion to make sure 'onUserAdd' gets called with email/name
  expect(mock).toHaveBeenCalled();
  expect(mock).toHaveBeenCalledWith({
    name: "Bryan",
    email: "bryan@bryan.com",
  });
});
