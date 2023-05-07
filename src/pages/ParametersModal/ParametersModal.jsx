import React, { useState } from "react";
import DictionaryForm from "./dictionaryForm/dictionaryForm";

export const ParametersModal = ({
  open,
  onClose,
  algo,
  algosInputs,
  setAlgosInputs,
}) => {
  const [inputTypes, setInputTypes] = useState({});
  const [tempAlgoInputs, setTempAlgoInputs] = useState(
    algo ? { ...algosInputs[algo.name] } : {}
  );

  if (!open) return null;

  const onParamChange = (event, arg) => {
    setTempAlgoInputs((prevInputs) => ({
      ...prevInputs,
      [arg.param_name]: event.target.value,
    }));
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
        console.log(argStr);
        console.log("before distionary parse");
        const discinaryVal = JSON.parse(argStr);
        console.log("after distionary parse");
        return discinaryVal;
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

  // const algoStrInputsToVals = (tempAlgoInputs) => {
  //   for (const argName in tempAlgoInputs) {
  //     const type = inputTypes[argName];
  //     //console.log(type);
  //     const argStr = tempAlgoInputs[argName];
  //     //console.log(argStr);
  //     const argVal = argStrToVal(argStr, type);
  //     //console.log(argVal);
  //     // tempAlgoInputs[argName] = argVal;
  //     setTempAlgoInputs((prevState) => {
  //       return {
  //         ...prevState,
  //         [argName]: argVal,
  //       };
  //     });
  //   }

  //   console.log(JSON.stringify(tempAlgoInputs));
  //   return tempAlgoInputs;
  // };

  const algoStrInputsToVals = (tempAlgoInputs) => {
    const updatedInputs = Object.entries(tempAlgoInputs).reduce(
      (acc, [key, value]) => {
        const type = inputTypes[key];
        const updatedValue = argStrToVal(value, type);
        return {
          ...acc,
          [key]: updatedValue,
        };
      },
      {}
    );

    setTempAlgoInputs(updatedInputs);
    console.log(JSON.stringify(updatedInputs));
    return updatedInputs;
  };

  const onSave = () => {
    const tempalgoInputVals = algoStrInputsToVals(tempAlgoInputs);
    setAlgosInputs((prevState) => ({
      ...prevState,
      [algo.name]: tempalgoInputVals,
    }));

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

                  {inputTypes[arg.param_name] &&
                    (inputTypes[arg.param_name] === "string" ||
                      inputTypes[arg.param_name] === "float" ||
                      inputTypes[arg.param_name] === "list" ||
                      inputTypes[arg.param_name] === "dictionary") && (
                      <input
                        className="input"
                        type="text"
                        placeholder={tempAlgoInputs[arg.param_name]}
                        onChange={(event) => onParamChange(event, arg)}
                      />
                    )}
                  {/* {inputTypes[arg.param_name] &&
                    inputTypes[arg.param_name] === "dictionary" && (
                      <DictionaryForm></DictionaryForm>
                    )} */}

                  {inputTypes[arg.param_name] &&
                    inputTypes[arg.param_name] === "boolean" && (
                      <div>
                        <input
                          type="radio"
                          id="true"
                          value="true"
                          name="boolean"
                          onChange={(event) => onParamChange(event, arg)}
                        />
                        <label htmlFor="true">true</label>
                        <input
                          type="radio"
                          id="false"
                          value="false"
                          name="boolean"
                          onChange={(event) => onParamChange(event, arg)}
                        />
                        <label htmlFor="false">false</label>
                      </div>
                    )}
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
