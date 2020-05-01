import React from "react";
import { PropTypes } from "prop-types";
import { Link } from "react-router-dom";
import sortDownImg from "../../img/down.png";
import sortUpImg from "../../img/up.png";
import { SORT_DESC } from "./AuthorsPage";

function AuthorList({ authors, onDelete, onFilter, sortOrder, onSort }) {
  return (
    <>
      {authors.length === 0 ? (
        <p>No authors</p>
      ) : (
        <>
          <table className="table">
            <thead>
              <tr>
                <th>
                  Name
                  <img
                    src={sortOrder === SORT_DESC ? sortDownImg : sortUpImg}
                    style={{ height: "15px", margin: "10px" }}
                    onClick={onSort}
                  />
                </th>
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
                    <td className="author-name">
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
  sortOrder: PropTypes.string.isRequired,
  onSort: PropTypes.func.isRequired,
};

export default AuthorList;
