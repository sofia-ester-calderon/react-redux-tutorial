import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";

function AuthorList({ authors, onDelete, onFilter }) {
  return (
    <>
      {authors.length === 0 ? (
        <p>No authors</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>Name</th>
                <th>
                  <input
                    className="form-control"
                    placeholder="Filter authors"
                    onChange={onFilter}
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {authors.map((author) => {
                return (
                  <tr key={author.id}>
                    <td>
                      <Link to={"/author/" + author.id}>{author.name}</Link>
                    </td>
                    <td>
                      <button
                        className="btn btn-outline-danger"
                        onClick={() => onDelete(author)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </>
  );
}

AuthorList.propTypes = {
  authors: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  onFilter: PropTypes.func.isRequired,
};

export default AuthorList;
