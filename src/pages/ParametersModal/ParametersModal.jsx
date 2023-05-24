import React, { useState } from "react";
import { useEffect } from "react";
import DictionaryForm from "./dictionaryForm/dictionaryForm";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import SaveAsOutlinedIcon from "@mui/icons-material/SaveAsOutlined";
import Switch, { SwitchProps } from "@mui/material/Switch";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import TimerRoundedIcon from "@mui/icons-material/TimerRounded";
import TimerOffRoundedIcon from "@mui/icons-material/TimerOffRounded";
export const ParametersModal = ({
  open,
  onClose,
  algo,
  algosInputs,
  setAlgosInputs,
}) => {
  const initializeInputTypes = () => {
    if (algo) {
      const initialInputTypes = {};
      algo.argument_lst.forEach((arg) => {
        initialInputTypes[arg.param_name] = arg.accepted_types[0];
      });
      setInputTypes(initialInputTypes);
    }
  };
  const [inputTypes, setInputTypes] = useState({});
  const [tempAlgoInputs, setTempAlgoInputs] = useState({});
  const [openDictModal, setOpenDictModal] = useState(false);
  const [timeLimit, setTimeLimit] = useState("");
  const [isUseTimeLimit, setIsUseTimeLimit] = useState(false);
  useEffect(() => {
    setTempAlgoInputs(algo ? { ...algosInputs[algo.name] } : {});
    if (algo) {
      initializeInputTypes();
    }
  }, [algo]);

  if (!open) return null;

  console.log(inputTypes);

  const onParamChange = (event, arg) => {
    let val = event.target.value;
    if (event.target.name === "boolean") {
      val = argStrToVal(val, "boolean");
    }
    setTempAlgoInputs((prevInputs) => ({
      ...prevInputs,
      [arg.param_name]: val,
    }));
  };

  const argStrToVal = (argStr, argType) => {
    switch (argType) {
      case "boolean":
        if (argStr instanceof Boolean) {
          return argStr;
        }
        return argStr === "True" || argStr === "true";
      case "float":
        return parseFloat(argStr);
      case "string":
        return argStr;
      case "dictionary":
        if (argStr instanceof Object) {
          return argStr;
        }
        const discinaryVal = JSON.parse(argStr);
        return discinaryVal;
      case "list":
        if (argStr instanceof Array) {
          return argStr;
        }
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

  const onDefaultValueClick = (event, arg) => {
    setTempAlgoInputs((prevInputs) => ({
      ...prevInputs,
      [arg.param_name]: JSON.stringify(arg.default_value),
    }));
  };
  const onSave = () => {
    const tempalgoInputVals = algoStrInputsToVals(tempAlgoInputs);
    if (isUseTimeLimit && timeLimit && timeLimit > 0) {
      tempalgoInputVals["time_limit"] = timeLimit;
    } else {
      tempalgoInputVals["time_limit"] = -1;
    }
    setAlgosInputs((prevState) => ({
      ...prevState,
      [algo.name]: tempalgoInputVals,
    }));

    onClose();
  };

  const onTimeLimitChange = (event) => {
    const inputValue = event.target.value;
    const numbersOnly = /^\d*$/;

    if (inputValue === "" || numbersOnly.test(inputValue)) {
      setTimeLimit(inputValue);
    }
  };

  const onAddDictClick = () => {
    setOpenDictModal(true);
  };

  const onSwitchTimeLimit = () => {
    setIsUseTimeLimit(!isUseTimeLimit);
  };

  const getPlaceholderByType = (type) => {
    let placeholder = "example: ";
    switch (type) {
      case "string":
        return placeholder + "abc";
      case "float":
        return placeholder + "3";
      case "list":
        return placeholder + "[1,2,3]";
      case "dictionary":
        return placeholder + '{"x": 3}';
      default:
        return "";
    }
  };

  return (
    <div className="modal_background">
      <div className="modal_container">
        <div className="backButtonRow">
          <button className="back_button" onClick={onClose}>
            x
          </button>
        </div>
        <div>
          {openDictModal && (
            <Popup
              className="dict-popup"
              open={openDictModal}
              onClose={() => setOpenDictModal(false)}
            >
              <DictionaryForm></DictionaryForm>
            </Popup>
          )}
        </div>
        <div className="titleRow">
          <h1 className="mainTitle">{algo.name}</h1>
        </div>
        <div className="descriptionRow">
          <h2 className="algo_desc">{algo.description}</h2>
        </div>
        {/* <div className="row">
          <p className="algo_info">{algo.additional_info}</p>
        </div> */}
        {/* <p className="algo_output_example">{algo.output_example}</p> */}
        <div className="params_list">
          {algo.argument_lst.map((arg) => (
            <div
              className={
                inputTypes[arg.param_name] &&
                inputTypes[arg.param_name] === "dictionary"
                  ? "dictParam"
                  : "param"
              }
              key={arg.param_name}
            >
              <div className="columnLeft">
                <label
                  data-tooltip-id={arg.param_name}
                  data-tooltip-content={arg.description}
                  className="fieldTitle"
                >
                  {arg.param_name}:
                </label>
              </div>
              <div className="columnCenter">
                {inputTypes[arg.param_name] &&
                  inputTypes[arg.param_name] !== "boolean" &&
                  inputTypes[arg.param_name] !== "dictionary" && (
                    <input
                      className="input"
                      type="text"
                      value={tempAlgoInputs[arg.param_name]}
                      placeholder={getPlaceholderByType(
                        inputTypes[arg.param_name]
                      )}
                      // placeholder={tempAlgoInputs[arg.param_name]}
                      onChange={(event) => onParamChange(event, arg)}
                    />
                  )}

                {inputTypes[arg.param_name] &&
                  inputTypes[arg.param_name] === "dictionary" && (
                    <textarea
                      className="textAreaInputs"
                      type="text"
                      value={tempAlgoInputs[arg.param_name]}
                      placeholder={getPlaceholderByType(
                        inputTypes[arg.param_name]
                      )}
                      // placeholder={tempAlgoInputs[arg.param_name]}
                      onChange={(event) => onParamChange(event, arg)}
                    />
                  )}
                {inputTypes[arg.param_name] &&
                  inputTypes[arg.param_name] === "dictionary" && (
                    <button key={arg.param_name} onClick={onAddDictClick}>
                      add
                    </button>
                  )}

                {inputTypes[arg.param_name] &&
                  inputTypes[arg.param_name] === "boolean" && (
                    <div>
                      <input
                        type="radio"
                        id="true"
                        value="true"
                        checked={tempAlgoInputs[arg.param_name]}
                        name="boolean"
                        onChange={(event) => onParamChange(event, arg)}
                      />
                      <label className="radioTxt" htmlFor="true">
                        true
                      </label>
                      <input
                        type="radio"
                        id="false"
                        value="false"
                        checked={!tempAlgoInputs[arg.param_name]}
                        name="boolean"
                        onChange={(event) => onParamChange(event, arg)}
                      />
                      -
                      <label className="radioTxt" htmlFor="false">
                        false
                      </label>
                    </div>
                  )}
              </div>
              <div className="columnRight">
                <div className="defaultValueSubColumn">
                  <button
                    className="defaultValButton"
                    disabled={arg.default_value ? false : true}
                    onClick={(event) => onDefaultValueClick(event, arg)}
                  >
                    Use Defualt Value
                  </button>
                </div>
                <div className="typesSubColumn">
                  <Tooltip id={arg.param_name} />
                  <div className="PM_types">
                    {arg.accepted_types.map((type, index) => (
                      <div>
                        <input
                          type="radio"
                          id={type}
                          value={type}
                          name={arg.param_name}
                          onChange={(event) => onTypeChoose(event, arg)}
                          defaultChecked={index === 0}
                        />
                        <label htmlFor={type}>{type}</label>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* {
            <DictionaryFormModal
              setDictModalOpen={setDictionaryModalOpen}
              open={dictionaryModalOpen}
            ></DictionaryFormModal>
          } */}
        </div>
        <div className="timeParam">
          <dev className="columnLeft">
            <label className="fieldTitle">Running Time Limitation:</label>
          </dev>
          <dev className="columnCenter">
            <input
              className="input"
              type="text"
              placeholder="Limit the algorithm time (in seconds)"
              value={timeLimit}
              disabled={!isUseTimeLimit}
              onChange={(event) => onTimeLimitChange(event)}
            />
          </dev>
          <dev className="columnRight">
            <Stack direction="row" spacing={1} alignItems="center">
              <Typography className="switchText">
                <TimerOffRoundedIcon />
              </Typography>
              <Switch onChange={onSwitchTimeLimit} />
              <Typography className="switchText">
                <TimerRoundedIcon />
              </Typography>
            </Stack>
          </dev>
        </div>
        <div className="row">
          <button className="submitButton" onClick={onSave}>
            <SaveAsOutlinedIcon />
            save
          </button>
        </div>
      </div>
    </div>
  );
};
