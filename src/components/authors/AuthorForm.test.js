import React from "react";
import { cleanup, render } from "react-testing-library";
import AuthorForm from "./AuthorForm";
import { newAuthor, authors } from "../../../tools/mockData";

afterEach(cleanup);

function renderManageAuthorPage(args) {
  const defaultProps = {
    author: newAuthor,
    onChange: jest.fn(),
    onSave: jest.fn(),
    onCancel: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  return render(<AuthorForm {...props} />);
}

it("should render the author's name in name input field, a save button and a cancel button", () => {
  const author = authors[0];
  const { getByLabelText, getByText } = renderManageAuthorPage({ author });
  const input = getByLabelText("Name");
  expect(input.value).toEqual(author.name);
  getByText("Save");
  getByText("Cancel");
});
