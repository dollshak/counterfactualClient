import React, { useState } from "react";

export const ParametersModal = ({ open, onClose, algo, algosInputs }) => {
  if (!open) return null;
  const tempAlgoInputs = { ...algosInputs[algo._id] };

  const onParamChange = (event, arg) => {
    // algosInputs[algo._id][arg.param_name] = event.target.value;
    tempAlgoInputs[arg.param_name] = event.target.value;
    console.log(algosInputs[algo._id]);
    console.log(tempAlgoInputs);
  };

  const onSave = () => {
    algosInputs[algo._id] = tempAlgoInputs;
    onClose();
  };
  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="title_close_button">
          <button className="close_modal" onClick={onClose}>
            x
          </button>
        </div>
        <h1 className="title">{algo.name}</h1>
        <h2 className="algo_desc">{algo.description}</h2>
        <p className="algo_info">{algo.additional_info}</p>
        <p className="algo_output_example">{algo.output_example}</p>
        <div className="params_list">
          {algo.argument_lst.map((arg) => (
            <div className="param" key={arg.param_name}>
              <form>
                <label>
                  {arg.param_name + " "}
                  <input
                    className="input"
                    type="text"
                    placeholder={tempAlgoInputs[arg.param_name]}
                    onChange={(event) => onParamChange(event, arg)}
                  />
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
          <button className="save_button" onClick={onSave}>
            save
          </button>
        </div>
      </div>
    </div>
  );
};
