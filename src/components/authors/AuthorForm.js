import React from "react";
import TextInput from "../common/TextInput";
import { PropTypes } from "prop-types";

function AuthorForm({ author, onChange, errors = {}, onSave, onCancel }) {
  return (
    <form onSubmit={onSave}>
      {errors.onSave && (
        <div className="alert alert-danger" role="alert">
          {errors.onSave}
        </div>
      )}
      <TextInput
        name="name"
        label="Name"
        value={author.name}
        onChange={onChange}
        error={errors.name}
      ></TextInput>
      <button type="submit" className="btn btn-primary">
        Save
      </button>
      <button onClick={onCancel} className="btn btn-danger ml-2">
        Cancel
      </button>
    </form>
  );
}

AuthorForm.propTypes = {
  author: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
};

export default AuthorForm;
