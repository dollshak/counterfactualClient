import React, { useState } from "react";

export const ParametersModal = ({ open, onClose, algo }) => {
  if (!open) return null;
  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="title_close_button">
          <button className="close_modal" onClick={onClose}>
            x
          </button>
        </div>
        <h1 className="title">{algo.name}</h1>
        <div className="params_list">
          {algo.argument_lst.map((arg) => (
            <div className="param" key={arg.param_name}>
              <form>
                <label>
                  {arg.param_name + " "}
                  <input className="input" type="text" />
                </label>
              </form>
              <div className="desc_and_types">
                <p className="desc">{arg.description}</p>
                <p className="types">accepted types: {arg.accepted_types}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="save_button_container">
          <button className="save_button" onClick={onClose}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
