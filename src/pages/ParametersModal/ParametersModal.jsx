import React, { useState } from "react";
import { useEffect } from "react";
import DictionaryFormModal from "./dictionaryForm/dictionaryFormModal";

export const ParametersModal = ({
  open,
  onClose,
  algo,
  algosInputs,
  setAlgosInputs,
}) => {
  const [inputTypes, setInputTypes] = useState({});
  const [dictionaryModalOpen, setDictionaryModalOpen] = useState(false);
  const [tempAlgoInputs, setTempAlgoInputs] = useState({});

  useEffect(() => {
    setTempAlgoInputs(algo ? { ...algosInputs[algo.name] } : {});
    console.log("temp " + JSON.stringify(tempAlgoInputs));
  }, [algo]);

  if (!open) return null;

  console.log(algo);
  console.log(tempAlgoInputs);
  console.log(algosInputs);
  console.log({ ...algosInputs[algo.name] });

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
        const discinaryVal = JSON.parse(argStr);
        return discinaryVal;
      case "list":
        const parsedList = JSON.parse(argStr);
        return parsedList;
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
    return updatedInputs;
  };

  const onSave = () => {
    console.log(tempAlgoInputs);
    const tempalgoInputVals = algoStrInputsToVals(tempAlgoInputs);
    setAlgosInputs((prevState) => ({
      ...prevState,
      [algo.name]: tempalgoInputVals,
    }));

    onClose();
  };

  const onAddDictClick = () => {
    setDictionaryModalOpen(true);
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
              <form className="input-form">
                <label>
                  {arg.param_name}

                  {inputTypes[arg.param_name] &&
                    (inputTypes[arg.param_name] === "string" ||
                      inputTypes[arg.param_name] === "float" ||
                      inputTypes[arg.param_name] === "list" ||
                      inputTypes[arg.param_name] === "dictionary") && (
                      <input
                        className="input"
                        type="text"
                        placeholder={""}
                        // placeholder={tempAlgoInputs[arg.param_name]}
                        onChange={(event) => onParamChange(event, arg)}
                      />
                    )}
                  {inputTypes[arg.param_name] === "dictionary" && (
                    <button onClick={onAddDictClick}>add dictionary</button>
                  )}

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
                <p className="types">type:</p>
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

          {
            <DictionaryFormModal
              setDictModalOpen={setDictionaryModalOpen}
              open={dictionaryModalOpen}
            ></DictionaryFormModal>
          }
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
