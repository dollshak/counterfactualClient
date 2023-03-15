import React from "react";

function EditableRow({ param, onDelete }) {
  return (
    <tr id={param.param_name}>
      <td className="nameEdit">
        <input
          type="text"
          required="required"
          placeholder={param.param_name}
          name="name"
        ></input>
      </td>
      <td className="desc">
        <input
          type="text"
          required="required"
          placeholder={param.description}
          name="description"
        ></input>
      </td>
      <td className="types">
        <input
          type="text"
          required="required"
          placeholder={param.accepted_types}
          name="acceptedTypes"
        ></input>
      </td>
      <td>
        <button className="edit_button">edit</button>
        <button
          className="delete_button"
          onClick={() => onDelete(param.param_name)}
        >
          delete
        </button>
      </td>
    </tr>
  );
}

export default EditableRow;
