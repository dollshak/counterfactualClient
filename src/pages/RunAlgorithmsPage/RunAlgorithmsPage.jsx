import React, { useState } from "react";
import { ParametersModal } from "../ParametersModal/ParametersModal";
import { useNavigate } from "react-router-dom";

const RunAlgorithmsPage = () => {
  const navigate = useNavigate();
  const [modelParamsList, setModelParamsList] = useState([]);
  const [modelParam, setmodelParam] = useState("");
  const [paramsStr, setParamsStr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [algorithmToAddParams, setAlgorithmToAddParams] = useState();
  // const [algorithmsList, setAlgorithmsList] = useState([]);
  const algorithmsList = [
    {
      _id: "1",
      name: "Dummy_CF",
      file_content: "from server.businessLayer...",
      description: "dummy",
      argument_lst: [
        { param_name: "x", description: "param desc", accepted_types: "int" },
        {
          param_name: "y",
          description: "param desc",
          accepted_types: "string",
        },
      ],
      additional_info: "some info",
      output_example: ["6000 -> 1200", "4 -> 40"],
    },
    {
      _id: "2",
      name: "Alibi",
      file_content: "from server.businessLayer...",
      description: "albidesc",
      argument_lst: [
        { param_name: "x", description: "param desc", accepted_types: "int" },
      ],
      additional_info: "some info",
      output_example: ["6000 -> 1200", "4 -> 40"],
    },
  ];

  const onSubmit = () => {};

  const algorithmChecked = (algorithmId) => {
    var checkBox = document.getElementById(algorithmId);
    var text = document.getElementById("p" + algorithmId);
    console.log(checkBox.checked);
    if (checkBox.checked) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
  };

  const onAddParamsClick = (algorithm) => {
    setAlgorithmToAddParams(algorithm);
    setOpenModal(true);
  };

  const addModelParam = () => {
    modelParamsList.push(modelParam);
    if (paramsStr === "") {
      setParamsStr(modelParam);
    } else {
      setParamsStr(paramsStr + "," + modelParam);
    }
    console.log(paramsStr);
    setmodelParam("");
  };

  const onBackClick = () => {
    navigate("/");
  };
  return (
    <div className="RunAlgorithmsPage">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <div className="run_algo_page_container">
        <h1 className="run_algo_title">run algorithms</h1>
        <p className="choose_title">choose algorithms to run:</p>
        <div className="algorithms_list">
          {algorithmsList.map((algorithm) => (
            <div className="algorithm" key={algorithm._id}>
              <input
                type="checkbox"
                id={algorithm._id}
                name={algorithm.name}
                value={algorithm.name}
                onClick={() => algorithmChecked(algorithm._id)}
              />
              <label className="algo_name" htmlFor={algorithm._id}>
                {algorithm.name}
              </label>
              <button
                className="add_params_button"
                id={"p" + algorithm._id}
                hidden={true}
                onClick={() => onAddParamsClick(algorithm)}
              >
                add params
              </button>
              {console.log(algorithm)}
              <ParametersModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                algo={algorithmToAddParams}
              />
            </div>
          ))}
        </div>
        <div className="model_upload">
          <form>
            <label className="upload_model">
              upload a model:
              <input type="text" />
            </label>
          </form>
          <button className="upload_button">upload</button>
        </div>
        <div className="add_model_params">
          <form>
            <label className="add_model_input_label">
              add model input:
              <input type="text" />
            </label>
          </form>
          <button className="add_button" onClick={addModelParam}>
            add
          </button>
        </div>
        <div className="submit_button">
          <button className="run_button" onClick={onSubmit}>
            run
          </button>
        </div>
      </div>
    </div>
  );
};

export default RunAlgorithmsPage;
