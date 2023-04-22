import React, { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";

function EditableRow({
  param,
  setEditRow,
  setEditedDesc,
  setEditedTypes,
  onSave,
  acceptedTypes,
}) {
  const [dropdownSelectedOptions, setDropdownSelectedOptions] = useState(
    param.acceptedTypes
  );
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
        {/* <input
          type="text"
          required="required"
          placeholder={param.accepted_types}
          name="acceptedTypes"
          onChange={(event) => setEditedTypes(event.target.value)}
        ></input> */}
        <Dropdown
          options={acceptedTypes}
          selectedOptions={dropdownSelectedOptions}
          setSelectedOptions={setDropdownSelectedOptions}
          setSelectedOptionsList={setEditedTypes}
        ></Dropdown>
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
