import React, { useState, useEffect } from "react";

export const ParametersModal = ({ open, onClose, algo, algosInputs }) => {
  const [inputTypes, setInputTypes] = useState({});

  if (!open) return null;
  const tempAlgoInputs = { ...algosInputs[algo.name] };

  const onParamChange = (event, arg) => {
    tempAlgoInputs[arg.param_name] = event.target.value;
    console.log(event.target.value);
  };

  //to change
  const findArgType = (argName) => {
    const arg = algo.argument_lst.find((arg) => arg.param_name === argName);
    const type = arg.accepted_types;
    return type;
  };

  const argStrToVal = (argStr, argType) => {
    switch (argType) {
      case "boolean":
        return argStr === "True" || argStr === "true";
      case "float":
        return parseFloat(argStr);
      case "string":
        return argStr;
      case "dictionary":
        return JSON.parse(argStr);
      case "list":
        return JSON.parse(argStr);
      default:
        return argStr;
    }
  };

  const onTypeChoose = (event, arg) => {
    const argName = arg.param_name;
    const argType = event.target.value;
    setInputTypes((prevInputTypes) => {
      return { ...prevInputTypes, [argName]: argType };
    });
  };

  const algoStrInputsToVals = (tempAlgoInputs) => {
    for (const argName in tempAlgoInputs) {
      const type = inputTypes[argName];
      const argStr = tempAlgoInputs[argName];
      const argVal = argStrToVal(argStr, type);
      tempAlgoInputs[argName] = argVal;
    }
    return tempAlgoInputs;
  };

  const onSave = () => {
    const tempalgoInputVals = algoStrInputsToVals(tempAlgoInputs);
    console.log("tempalgoInputVals " + JSON.stringify(tempalgoInputVals));
    algosInputs[algo.name] = tempAlgoInputs;
    // onClose();
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
                <p className="types">accepted types:</p>
                <div className="PM_types">
                  {arg.accepted_types.map((type, index) => (
                    <div>
                      <input
                        type="radio"
                        id={type}
                        value={type}
                        name={arg.param_name}
                        onChange={(event) => onTypeChoose(event, arg)}
                      />
                      <label htmlFor={type}>{type}</label>
                    </div>
                  ))}
                </div>
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
