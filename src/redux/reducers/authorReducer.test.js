import authorReducer from "./authorReducer";
import * as actions from "../actions/authorActions";

it("should add an author when passed CREATE_AUTHOR_SUCCESS", () => {
  const initialState = [{ name: "A" }, { name: "B" }];
  const newAuthor = { name: "C" };
  const action = actions.createAuthorSuccess(newAuthor);

  const newState = authorReducer(initialState, action);

  expect(newState.length).toEqual(3);
  expect(newState[0].name).toEqual("A");
  expect(newState[2].name).toEqual("C");
});

it("should update an author when passed UPDATE_AUTHOR_SUCCESS", () => {
  const initialState = [
    { id: 1, name: "A" },
    { id: 2, name: "B" },
  ];
  const updatedAuthor = { id: 1, name: "C" };
  const action = actions.updateAuthorSuccess(updatedAuthor);

  const newState = authorReducer(initialState, action);

  expect(newState.length).toEqual(2);
  expect(newState[0].name).toEqual("C");
  expect(newState[1].name).toEqual("B");
});
