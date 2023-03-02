import React from "react";

export const AddParametersModal = ({ open, onClose, paramsList }) => {
  if (!open) return null;

  const onDelete = () => {};
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
                <tr>
                  <td className="name">{param.param_name}</td>
                  <td className="desc">{param.description}</td>
                  <td className="types">{param.accepted_types}</td>
                  <td>
                    <button className="edit_button">edit</button>
                    <button className="delete_button">delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="new_param">
          <input className="name_input" type="text" />
          <input className="desc_input" type="text" />
          <input className="types_input" type="text" />
          <button className="add_button">add</button>
        </div>

        <div className="add_save_button_container">
          <button className="add_save_button" onClick={onClose}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
