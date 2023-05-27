import React, { useState } from "react";
import Dropdown from "./Dropdown/Dropdown";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
function EditableRow({
  param,
  setEditRow,
  setEditedDesc,
  setEditedTypes,
  setEditedDefVal,
  setIsEditedDefValUse,
  isEditedDefValUse,
  onSave,
  acceptedTypes,
}) {
  const [dropdownSelectedOptions, setDropdownSelectedOptions] = useState(
    param.accepted_types.map((type) => {
      return {
        value: type,
        label: type,
      };
    })
  );

  const onCancel = () => {
    setEditRow(null);
  };
  return (
    <tr id={param.param_name}>
      <td className="nameEdit paramTd">{param.param_name}</td>
      <td className="desc paramTd">
        <input
          type="text"
          required="required"
          placeholder={param.description}
          name="description"
          onChange={(event) => setEditedDesc(event.target.value)}
        ></input>
      </td>
      <td className="defaultValue paramTd">
        <div>
          <input
            type="checkbox"
            id="scales"
            name="scales"
            value={isEditedDefValUse}
            onChange={(event) => setIsEditedDefValUse(!isEditedDefValUse)}
            checked={isEditedDefValUse}
          />{" "}
          set defualt value
        </div>
        <div>
          <input
            className="desc_input"
            type="text"
            placeholder={param.default_value}
            onChange={(event) => setEditedDefVal(event.target.value)}
            disabled={!isEditedDefValUse}
          />
        </div>
      </td>
      <td className="types paramTd">
        <Dropdown
          options={acceptedTypes}
          selectedOptions={dropdownSelectedOptions}
          setSelectedOptions={setDropdownSelectedOptions}
          setSelectedOptionsList={setEditedTypes}
        ></Dropdown>
      </td>
      <td className="paramTd">
        <button
          className="action_button"
          onClick={(event) => onSave(event, param.param_name)}
          title="save"
        >
          <SaveAsOutlinedIcon />
        </button>
        <button
          className="action_button_cancel"
          onClick={onCancel}
          title="cancel"
        >
          <CancelOutlinedIcon />
        </button>
      </td>
    </tr>
  );
}

export default EditableRow;
