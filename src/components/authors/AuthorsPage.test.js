import React from "react";
import { AuthorsPage, SORT_DESC } from "./AuthorsPage";
import { authors, courses } from "../../../tools/mockData";
import { Router } from "react-router-dom";
import { createMemoryHistory } from "history";
import { mount } from "enzyme";

let history;

function renderAuthorsPage(args) {
  const defaultProps = {
    authors: authors,
    loadAuthors: jest.fn(),
    loading: false,
    courses: courses,
    loadCourses: jest.fn(),
    deleteAuthor: jest.fn(),
  };
  const props = { ...defaultProps, ...args };
  history = createMemoryHistory();

  return mount(
    <Router history={history}>
      <AuthorsPage {...props} />
    </Router>
  );
}

it("should route to /author if Add Authors is clicked", () => {
  const wrapper = renderAuthorsPage();
  const links = wrapper.find("a").map((link) => link);
  const link = links.find((_link) => _link.text() === "Add Author");

  link.simulate("click", { button: 0 });

  expect(history.location.pathname).toBe("/author");
});

it("should route to /author/:id if author name is clicked", () => {
  const author = authors[0];
  const wrapper = renderAuthorsPage();
  const links = wrapper.find("a").map((link) => link);
  const link = links.find((_link) => _link.text() === author.name);

  link.simulate("click", { button: 0 });

  expect(history.location.pathname).toBe(`/author/${author.id}`);
});

it("should show all authors if filter-input is empty", () => {
  const wrapper = renderAuthorsPage();

  const tableBody = wrapper.find("tbody");
  const rows = tableBody.find("tr");

  expect(wrapper.find("input").text()).toEqual("");
  expect(rows.getElements().length).toEqual(authors.length);
});

it("should show only authors that meet the criteria in filter-input", () => {
  const _authors = [
    { id: 1, name: "abcdw" },
    { id: 2, name: "abcde" },
    { id: 3, name: "wbcde" },
  ];

  const wrapper = renderAuthorsPage({ authors: _authors });

  wrapper.find("input").simulate("change", { target: { value: "w" } });

  const tableBody = wrapper.find("tbody");
  const rows = tableBody.find("tr");

  expect(rows.getElements().length).toEqual(2);
});

it("should show only authors that meet the criteria in filter-input - case insensitive", () => {
  const _authors = [
    { id: 1, name: "abcdw" },
    { id: 2, name: "abcde" },
    { id: 3, name: "Wbcde" },
  ];

  const wrapper = renderAuthorsPage({ authors: _authors });

  wrapper.find("input").simulate("change", { target: { value: "w" } });

  const tableBody = wrapper.find("tbody");
  const rows = tableBody.find("tr");

  expect(rows.getElements().length).toEqual(2);
});

it("should sort authors in alphabetical order desc when initially loading page", () => {
  const _authors = [
    { id: 1, name: "C" },
    { id: 2, name: "D" },
    { id: 3, name: "A" },
    { id: 4, name: "B" },
  ];

  const wrapper = renderAuthorsPage({ authors: _authors });

  const tableBody = wrapper.find("tbody");
  const authorNames = tableBody.find(".author-name");

  expect(authorNames.first().text()).toEqual("A");
  expect(authorNames.last().text()).toEqual("D");
});

it("should sort authors in alphabetical order asc when sort btn is clicked", () => {
  const _authors = [
    { id: 1, name: "C" },
    { id: 2, name: "D" },
    { id: 3, name: "A" },
    { id: 4, name: "B" },
  ];

  const wrapper = renderAuthorsPage({ authors: _authors });

  const imgBtn = wrapper.find("img");
  imgBtn.simulate("click", { button: 0 });

  const tableBody = wrapper.find("tbody");
  const authorNames = tableBody.find(".author-name");

  expect(authorNames.first().text()).toEqual("D");
  expect(authorNames.last().text()).toEqual("A");
});
