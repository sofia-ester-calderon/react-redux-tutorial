# Code following the tutorial "Building Applications in React and Redux" on Pluralsight

All code concerning _authors_ was written by myself, expanding the code from the tutorial, using TDD.

- components
  - authors
    - all files
- redux
  - actions
    - authorActions
  - reducers
    - authorReducer

## Running application/tests

1. **Install Node Packages.** - `npm install`
2. **Run applcation** - `npm start`
3. **Run tests** - `npm t`

## Known issues

When running the test `should display error message when creatingAuthor throws error` on `ManageAuthorsPage.test.js`, the following warning is displayed in the console

```Warning: An update to ManageAuthorPage inside a test was not wrapped in act(...).

      When testing, code that causes React state updates should be wrapped into act(...):

      act(() => {
        /* fire events that update state */
      });
      /* assert on the output */

      This ensures that you're testing the behavior the user would see in the browser. Learn more at https://fb.me/react-wrap-tests-with-act
          in ManageAuthorPage (at ManageAuthorPage.test.js:27)
          in Router (at ManageAuthorPage.test.js:26)
```
