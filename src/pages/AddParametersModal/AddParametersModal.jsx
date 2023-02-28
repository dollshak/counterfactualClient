import React from "react";

export const AddParametersModal = ({ open, onClose, paramsList }) => {
  if (!open) return null;
  return (
    <div className="add_modal_background">
      <div className="add_modal_container">
        <div className="add_title_close_button">
          <button className="add_close_modal" onClick={onClose}>
            x
          </button>
        </div>
        <h1 className="add_title">parameters</h1>
        <div className="add_parameters_list">
          {paramsList.map((param) => (
            <div className="param_in_modal" key={param.param_name}>
              <p>{param.param_name}</p>
              <p>{param.description}</p>
              <p>{param.accepted_types}</p>
            </div>
          ))}
        </div>
        {console.log(paramsList)}
        <div className="add_save_button_container">
          <button className="add_save_button" onClick={onClose}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
