import * as authorActions from "./authorActions";
import * as types from "./actionTypes";
import { authors, newAuthor } from "../../../tools/mockData";
import thunk from "redux-thunk";
import fetchMock from "fetch-mock";
import configureMockStore from "redux-mock-store";

const middleware = [thunk];
const mockStore = configureMockStore(middleware);

it("should create a SAVE_AUTHOR_SUCCESS action", () => {
  const author = authors[0];

  const action = authorActions.createAuthorSuccess(author);

  expect(action.type).toEqual(types.CREATE_AUTHOR_SUCCESS);
  expect(action.author).toEqual(author);
});

it("should create a UPDATE_AUTHOR_SUCCESS action", () => {
  const author = authors[0];

  const action = authorActions.updateAuthorSuccess(author);

  expect(action.type).toEqual(types.UPDATE_AUTHOR_SUCCESS);
  expect(action.author).toEqual(author);
});

describe("Async actions", () => {
  afterEach(() => {
    fetchMock.restore();
  });

  it("should create BEGIN_API_CALL and CREATE_AUTHOR_SUCCESS when creating an author", () => {
    const author = newAuthor;

    fetchMock.mock("*", {
      body: author,
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.CREATE_AUTHOR_SUCCESS, author },
    ];

    const store = mockStore({ authors: [] });
    return store.dispatch(authorActions.createAuthor(author)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create BEGIN_API_CALL and UPDATE_AUTHOR_SUCCESS when updating an author", () => {
    const author = authors[0];

    fetchMock.mock("*", {
      body: author,
      headers: { "content-type": "application/json" },
    });

    const expectedActions = [
      { type: types.BEGIN_API_CALL },
      { type: types.UPDATE_AUTHOR_SUCCESS, author },
    ];

    const store = mockStore({ authors: [] });
    return store.dispatch(authorActions.createAuthor(author)).then(() => {
      expect(store.getActions()).toEqual(expectedActions);
    });
  });

  it("should create API_CALL ERROR when failed to create an author", () => {
    const author = authors[0];
    fetchMock.mock("*", () => {
      throw new Error();
    });

    const expectedActions = [
      { type: types.API_CALL_ERROR },
      { type: types.BEGIN_API_CALL },
    ];
    const store = mockStore({ authors: [] });
    return store
      .dispatch(authorActions.createAuthor(author))
      .then(() => {
        expect(store.getActions()).toEqual(expectedActions);
      })
      .catch((error) => console.log(error.message));
  });
});
