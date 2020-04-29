import React from "react";
import {
  cleanup,
  render,
  fireEvent,
  waitForElement,
} from "react-testing-library";
import { ManageAuthorPage, mapStateToProps } from "./ManageAuthorPage";
import { newAuthor, authors } from "../../../tools/mockData";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";

afterEach(cleanup);

function renderManageAuthorPage(args) {
  const routerHistory = createMemoryHistory();
  const defaultProps = {
    createAuthor: jest.fn(),
    history: routerHistory,
    author: {},
    authors: [],
    loadAuthors: jest.fn().mockResolvedValue(),
  };
  const props = { ...defaultProps, ...args };
  return render(
    <Router history={routerHistory}>
      <ManageAuthorPage {...props} />
    </Router>
  );
}

it("should be able to save a new author and then redirect to /authors", async () => {
  const author = { id: null, name: "new name" };
  const createAuthor = jest.fn().mockResolvedValue();
  const history = { push: jest.fn() };
  const pushSpy = jest.spyOn(history, "push");

  const { getByText, getByLabelText } = renderManageAuthorPage({
    createAuthor,
    history,
    author,
  });

  fireEvent.change(getByLabelText("Name"), {
    target: { value: author.name },
  });
  fireEvent.click(getByText("Save"));

  expect(createAuthor).toHaveBeenCalledTimes(1);
  expect(createAuthor).toHaveBeenCalledWith(author);
  await createAuthor();
  expect(pushSpy).toHaveBeenCalledTimes(1);
  expect(pushSpy).toHaveBeenCalledWith("/authors");
});

it("should display error message when creatingAuthor throws error", async () => {
  const errorMessage = "Error saving";
  const createAuthor = jest.fn().mockRejectedValue(new Error(errorMessage));

  const { getByText, getByLabelText } = renderManageAuthorPage({
    createAuthor,
  });

  fireEvent.change(getByLabelText("Name"), {
    target: { value: "New Name" },
  });
  fireEvent.click(getByText("Save"));

  await waitForElement(() => getByText(errorMessage));
});

it("should display missing name error message saving without name", () => {
  const createAuthor = jest.fn();
  const { getByText } = renderManageAuthorPage({ createAuthor });

  fireEvent.click(getByText("Save"));

  expect(createAuthor).toHaveBeenCalledTimes(0);

  getByText("Name must not be empty");
});

it("should set author to empty author if no id param is present in url", () => {
  const mockOwnProps = {
    match: {
      params: {},
    },
  };

  const state = mapStateToProps({}, mockOwnProps);

  expect(state.author).toBe(newAuthor);
});

it("should set author to empty author if id param is present but state.authors is empty", () => {
  const mockOwnProps = {
    match: {
      params: {
        id: "1",
      },
    },
  };
  const mockState = { authors: [] };

  const state = mapStateToProps(mockState, mockOwnProps);

  expect(state.author).toBe(newAuthor);
});

it("should set author if id param is present and state.authors is set", () => {
  const author = authors[0];
  const mockOwnProps = {
    match: {
      params: {
        id: author.id,
      },
    },
  };
  const mockState = { authors };

  const state = mapStateToProps(mockState, mockOwnProps);

  expect(state.author).toBe(author);
});

it("should load authors and set to authors at the beginning if not set in state", () => {
  const loadAuthors = jest.fn().mockResolvedValue(authors);
  renderManageAuthorPage({ loadAuthors, authors: [] });

  expect(loadAuthors).toHaveBeenCalledTimes(1);
});

it("should render author's name in input field", () => {
  const author = authors[0];

  const { getByLabelText } = renderManageAuthorPage({
    author,
  });

  const input = getByLabelText("Name");
  expect(input.value).toEqual(author.name);
});

it("reroutes when cancel button is clicked and no changes were made to the form", async () => {
  const history = { push: jest.fn() };
  const { getByText, findByText, queryByTestId } = renderManageAuthorPage({
    history,
  });

  fireEvent.click(getByText("Cancel"));

  findByText("Add Author");
  expect(queryByTestId("author-table")).toBeDefined;
});

it("doesn't reroute when cancel button is clicked and changes were made to ithe form", async () => {
  const history = { push: jest.fn() };
  const { getByText, queryByTestId, getByLabelText } = renderManageAuthorPage({
    history,
  });

  expect(queryByTestId("add-author-header")).toBeDefined;

  const input = getByLabelText("Name");
  fireEvent.change(input, { target: { value: "23" } });
  fireEvent.click(getByText("Cancel"));
  expect(queryByTestId("author-table")).toBeNull;
});
