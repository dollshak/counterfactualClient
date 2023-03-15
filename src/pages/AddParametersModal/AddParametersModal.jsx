import React, { Fragment, useState } from "react";
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
  const [newAcceptedTypes, setNewAcceptedTypes] = useState("");
  const [showParamExistMessage, setShowParamExistMessage] = useState(false);
  if (!open) return null;

  const onDelete = (param_name) => {
    const filteredParamsList = paramsList.filter(
      (param) => param.param_name !== param_name
    );
    setParamsList(filteredParamsList);
  };

  const onNameChange = (event) => {
    setNewName(event.target.value);
  };

  const onDescChange = (event) => {
    setNewDesc(event.target.value);
  };
  const onTypesChange = (event) => {
    setNewAcceptedTypes(event.target.value);
  };

  const onAddParamClick = () => {
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
    }
  };

  // const onEdit =

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
          <form>
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
                  <Fragment>
                    <EditableRow param={param} onDelete={onDelete} />
                    <ReadOnlyRow param={param} onDelete={onDelete} />
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
                    <input
                      className="desc_input"
                      type="text"
                      value={newDesc}
                      onChange={onDescChange}
                    />
                  </td>
                  <td>
                    <input
                      className="types_input"
                      type="text"
                      value={newAcceptedTypes}
                      onChange={onTypesChange}
                    />
                  </td>
                  <td>
                    <button
                      className="add_param_button"
                      onClick={onAddParamClick}
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
