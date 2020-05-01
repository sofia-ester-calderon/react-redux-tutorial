import React, { useState, useEffect } from "react";
import AuthorForm from "./AuthorForm";
import { newAuthor } from "../../../tools/mockData";
import { connect } from "react-redux";
import { createAuthor, loadAuthors } from "../../redux/actions/authorActions";
import { toast } from "react-toastify";
import { PropTypes } from "prop-types";
import { Prompt } from "react-router-dom";

export function ManageAuthorPage({
  createAuthor,
  history,
  loadAuthors,
  authors,
  ...props
}) {
  const [author, setAuthor] = useState({ ...props.author });
  const [errors, setErrors] = useState({});
  const [isFormTouched, setFormTouched] = useState(false);

  useEffect(() => {
    if (authors.length === 0) {
      loadAuthors().catch((error) =>
        toast.error(`error loading authors ${error.message}`)
      );
    }
    setAuthor({ ...props.author });
  }, [props.author]);

  function handleChange(event) {
    setFormTouched(true);
    const { name, value } = event.target;
    setAuthor({
      ...author,
      [name]: value,
    });
  }

  function handleSave(event) {
    event.preventDefault();
    if (!isFormValid()) {
      return;
    }
    createAuthor(author)
      .then(() => {
        setFormTouched(false);
        toast.success("Author created");
        history.push("/authors");
      })
      .catch((error) => {
        setErrors({ ...errors, onSave: error.message });
      });
  }

  function isFormValid() {
    const { name } = author;
    if (!name) {
      setErrors({ ...errors, name: "Name must not be empty" });
      return false;
    }
    return true;
  }

  function handleCancel(event) {
    event.preventDefault();
    history.push("/authors");
  }

  return (
    <>
      <Prompt when={isFormTouched} message="Do you want to discard changed?" />
      <h2 data-testid="add-author-header">Add New Author</h2>
      <AuthorForm
        author={author}
        errors={errors}
        onChange={handleChange}
        onSave={handleSave}
        onCancel={handleCancel}
      />
    </>
  );
}

ManageAuthorPage.propTypes = {
  createAuthor: PropTypes.func.isRequired,
  loadAuthors: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  author: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
};

export function mapStateToProps(state, ownProps) {
  const authorId = parseInt(ownProps.match.params.id);
  const author =
    authorId && state.authors.length > 0
      ? state.authors.find((author) => author.id === authorId)
      : newAuthor;
  return { author, authors: state.authors };
}

const mapDispatchToProps = {
  createAuthor,
  loadAuthors,
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageAuthorPage);
