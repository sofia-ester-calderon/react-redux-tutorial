import React, { useEffect, useState } from "react";
import AuthorList from "./AuthorList";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { loadAuthors, deleteAuthor } from "../../redux/actions/authorActions";
import Spinner from "../common/Spinner";
import { loadCourses } from "../../redux/actions/courseActions";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

export function AuthorsPage({
  authors,
  loadAuthors,
  loading,
  courses,
  loadCourses,
  deleteAuthor,
}) {
  const [filteredAuthors, setFilteredAuthors] = useState(authors);
  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) => alert("error loadig authors " + error));
    } else if (filteredAuthors.length === 0) {
      setFilteredAuthors(Object.assign(authors));
    }
    if (courses.length === 0) {
      loadCourses().catch((error) => alert("error loadig courses " + error));
    }
  }, [authors, courses]);

  function handleDelete(event) {
    const authorCourses = courses.filter((course) => {
      return course.authorId === event.id;
    });
    if (authorCourses.length > 0) {
      toast.error(
        `${event.name} cannot be deleted, because he is the author of an active course"`
      );
      return;
    }
    deleteAuthor(event)
      .then(() => toast.success("Author deleted"))
      .catch((error) =>
        toast.error("Author could not be deleted " + error.message)
      );
  }

  function handleFilter(event) {
    setFilteredAuthors(
      authors.filter((author) =>
        author.name.toLowerCase().includes(event.target.value.toLowerCase())
      )
    );
  }

  return (
    <>
      <h2>Authors</h2>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <AuthorList
            data-testid="author-table"
            authors={filteredAuthors}
            onDelete={handleDelete}
            onFilter={handleFilter}
          />
          <Link className="btn btn-primary" to={"/author"}>
            Add Author
          </Link>
        </>
      )}
    </>
  );
}

AuthorsPage.propTypes = {
  authors: PropTypes.array.isRequired,
  courses: PropTypes.array.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  loadCourses: PropTypes.func.isRequired,
  deleteAuthor: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    authors: state.authors,
    courses: state.courses,
    loading: state.apiCallsInProgress > 0,
  };
}

const mapDispatchToProps = {
  loadAuthors,
  loadCourses,
  deleteAuthor,
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthorsPage);
