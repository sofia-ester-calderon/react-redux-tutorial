import React from "react";
import { shallow } from "enzyme";
import { authors } from "../../../tools/mockData";
import AuthorList from "./AuthorList";

function renderCourseList(args) {
  const defaultProps = {
    authors,
    onDelete: jest.fn(),
    onFilter: jest.fn(),
  };

  const props = { ...defaultProps, ...args };
  return shallow(<AuthorList {...props} />);
}

it("should render an input field to filter Authors List", () => {
  const wrapper = renderCourseList();
  expect(wrapper.find("input").props().placeholder).toEqual("Filter authors");
});

it("should render a table if authors are present with all authors in rows", () => {
  const wrapper = renderCourseList();

  const tableBody = wrapper.find("tbody");
  const rows = tableBody.find("tr");

  expect(rows.getElements().length).toEqual(authors.length);
});

it("should render no table if authors are empty", () => {
  const wrapper = renderCourseList({ authors: [] });

  expect(wrapper.find("table").exists()).toBeFalsy();
  expect(wrapper.find("p").text()).toEqual("No authors");
});
