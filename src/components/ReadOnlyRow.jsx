import React from "react";

const ReadOnlyRow = ({ param, onDelete, onEdit }) => {
  return (
    <tr id={param.param_name}>
      <td className="name">{param.param_name}</td>
      <td className="desc">{param.description}</td>
      <td className="types">{param.accepted_types.join(", ")}</td>
      <td>
        <button
          className="edit_button"
          onClick={(event) => onEdit(event, param)}
        >
          edit
        </button>
        <button
          className="delete_button"
          onClick={() => onDelete(param.param_name)}
        >
          delete
        </button>
      </td>
    </tr>
  );
};

export default ReadOnlyRow;
