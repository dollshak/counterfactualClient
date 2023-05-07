import React, { Fragment, useState } from "react";
import Dropdown from "../../components/Dropdown/Dropdown";
import EditableRow from "../../components/EditableRow";
import ReadOnlyRow from "../../components/ReadOnlyRow";

export const AddParametersModal = ({
  open,
  onClose,
  paramsList,
  setParamsList,
}) => {
  const [newName, setNewName] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newAcceptedTypes, setNewAcceptedTypes] = useState([]);
  const [showParamExistMessage, setShowParamExistMessage] = useState(false);
  const [editRow, setEditRow] = useState(null);
  const [editedDesc, setEditedDesc] = useState("");
  const [editedTypes, setEditedTypes] = useState([]);
  const [dropdownSelectedOptions, setDropdownSelectedOptions] = useState([]);

  const acceptedTypes = [
    { value: "float", label: "float" },
    { value: "string", label: "string" },
    { value: "boolean", label: "boolean" },
    { value: "dictionary", label: "dictionary" },
    { value: "list", label: "list" },
  ];

  if (!open) return null;

  const onDelete = (param_name) => {
    const filteredParamsList = paramsList.filter(
      (param) => param.param_name !== param_name
    );
    setParamsList(filteredParamsList);
  };

  const onEdit = (event, param) => {
    event.preventDefault();
    setEditedTypes(param.accepted_types);
    setEditedDesc(param.description);
    setEditRow(param.param_name);
  };

  const onSave = (event, paramName) => {
    event.preventDefault();
    const paramToModify = paramsList.find(
      (param) => param.param_name === paramName
    );

    if (paramToModify) {
      paramToModify.description = editedDesc;
      paramToModify.accepted_types = editedTypes;
    }
    setParamsList(paramsList);
    setEditRow(null);
  };

  const onNameChange = (event) => {
    event.preventDefault();
    setNewName(event.target.value);
  };

  const onDescChange = (event) => {
    setNewDesc(event.target.value);
  };

  const onAddParamClick = (event) => {
    event.preventDefault();

    const isParamNameExists = paramsList.some(
      (param) => param.param_name === newName
    );
    if (isParamNameExists) {
      setShowParamExistMessage(true);
    } else {
      setShowParamExistMessage(false);
      const newParam = {
        param_name: newName,
        description: newDesc,
        accepted_types: newAcceptedTypes,
      };
      const updatedParamsList = [...paramsList, newParam];
      setParamsList(updatedParamsList);
      setNewName("");
      setNewDesc("");
      setNewAcceptedTypes([]);
      setDropdownSelectedOptions([]);
    }
  };

  return (
    <div className="add_modal_background">
      <div className="add_modal_container">
        <div className="add_title_close_button">
          <button className="add_close_modal" onClick={onClose}>
            x
          </button>
        </div>

        <h1 className="add_title">parameters</h1>

        <div className="table_container">
          <form className="APM_form">
            <table>
              <thead>
                <tr>
                  <th className="name_title">name</th>
                  <th className="desc_title">description</th>
                  <th className="types_title">accepted types</th>
                  <th className="actions_title">actions</th>
                </tr>
              </thead>
              <tbody>
                {paramsList.map((param) => (
                  <Fragment key={param.param_name}>
                    {editRow === param.param_name ? (
                      <EditableRow
                        param={param}
                        setEditRow={setEditRow}
                        setEditedDesc={setEditedDesc}
                        setEditedTypes={setEditedTypes}
                        onSave={onSave}
                        acceptedTypes={acceptedTypes}
                      />
                    ) : (
                      <ReadOnlyRow
                        param={param}
                        onDelete={onDelete}
                        onEdit={onEdit}
                      />
                    )}
                  </Fragment>
                ))}
                <tr className="add_param_row">
                  <td>
                    <input
                      className="name_input"
                      type="text"
                      value={newName}
                      onChange={onNameChange}
                    />
                  </td>
                  <td>
                    <textarea
                      className="desc_input"
                      type="text"
                      value={newDesc}
                      onChange={onDescChange}
                    />
                  </td>
                  <td>
                    <Dropdown
                      options={acceptedTypes}
                      selectedOptions={dropdownSelectedOptions}
                      setSelectedOptions={setDropdownSelectedOptions}
                      setSelectedOptionsList={setNewAcceptedTypes}
                    ></Dropdown>
                  </td>
                  <td>
                    <button
                      className="add_param_button"
                      onClick={(event) => onAddParamClick(event)}
                    >
                      add
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </form>
        </div>

        {showParamExistMessage && <p>param with this name already exists</p>}

        <div className="add_save_button_container">
          <button className="add_save_button" onClick={onClose}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
