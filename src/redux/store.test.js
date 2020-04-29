import { createStore } from "redux";
import rootReducer from "./reducers/index";
import initialState from "./reducers/initialState";
import * as courseActions from "./actions/courseActions";

it("should handle creating and updating courses", () => {
  const store = createStore(rootReducer, initialState);
  const course1 = { id: 1, title: "A" };
  const course2 = { id: 2, title: "B" };
  const course2Updated = { id: 2, title: "C" };

  const action1 = courseActions.createCourseSuccess(course1);
  store.dispatch(action1);
  const action2 = courseActions.createCourseSuccess(course2);
  store.dispatch(action2);
  const action3 = courseActions.updateCourseSuccess(course2Updated);
  store.dispatch(action3);

  const courses = store.getState().courses;
  expect(courses.length).toEqual(2);
  expect(courses[0].title).toEqual("A");
  expect(courses[1].title).toEqual("C");
});
