import React, { useState } from "react";

function EditableRow({
  param,
  setEditRow,
  setEditedDesc,
  setEditedTypes,
  onSave,
}) {
  const onCancel = () => {
    setEditRow(null);
  };
  return (
    <tr id={param.param_name}>
      <td className="nameEdit">{param.param_name}</td>
      <td className="desc">
        <input
          type="text"
          required="required"
          placeholder={param.description}
          name="description"
          onChange={(event) => setEditedDesc(event.target.value)}
        ></input>
      </td>
      <td className="types">
        <input
          type="text"
          required="required"
          placeholder={param.accepted_types}
          name="acceptedTypes"
          onChange={(event) => setEditedTypes(event.target.value)}
        ></input>
      </td>
      <td>
        <button
          className="ER_save_button"
          onClick={(event) => onSave(event, param.param_name)}
        >
          save
        </button>
        <button className="ER_delete_button" onClick={onCancel}>
          cancle
        </button>
      </td>
    </tr>
  );
}

export default EditableRow;
