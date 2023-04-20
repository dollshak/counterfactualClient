import React, { useState, useEffect } from "react";
import { ParametersModal } from "../ParametersModal/ParametersModal";
import { useNavigate } from "react-router-dom";
import Axios from "axios";

const RunAlgorithmsPage = () => {
  const navigate = useNavigate();
  const [modelParamsList, setModelParamsList] = useState([]);
  const [modelParam, setmodelParam] = useState("");
  const [paramsStr, setParamsStr] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const [algorithmToAddParams, setAlgorithmToAddParams] = useState();
  const [algorithmsList, setAlgorithmsList] = useState([]);
  const [modelFile, setModelFile] = useState();
  const [modelInputsFile, setModelInputsFile] = useState();
  const [algosInputs, setAlgosInputs] = useState({});
  const [showModelInputI, setShowModelInputI] = useState(false);
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });

  const onSubmit = () => {
    const algo_names = Object.keys(algosInputs);
    const arg_list_obj = Object.values(algosInputs);
    const arg_list = arg_list_obj.map((obj) => Object.values(obj));
    var formData = new FormData();
    formData.append("algo_names", algo_names);
    formData.append("arg_list", arg_list);
    formData.append("model_file", modelFile);
    formData.append("model_input", modelInputsFile);
    api
      .post("/runAlgorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addAlgoToList = (algorithm) => {
    if (!(algorithm.name in algosInputs)) {
      algosInputs[algorithm.name] = {};
      algorithm.argument_lst.forEach((param) => {
        algosInputs[algorithm.name][param.param_name] = "se";
      });
    }
    console.log(algosInputs);
  };

  const algorithmChecked = (algorithm) => {
    var checkBox = document.getElementById(algorithm._id);
    var text = document.getElementById("p" + algorithm._id);
    if (checkBox.checked) {
      text.hidden = false;
    } else {
      text.hidden = true;
    }
    addAlgoToList(algorithm);
  };

  const onAddParamsClick = (algorithm) => {
    setAlgorithmToAddParams(algorithm);
    setOpenModal(true);
  };

  useEffect(() => {
    api
      .get("/algos")
      .then((res) => {
        setAlgorithmsList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const onBackClick = () => {
    navigate("/");
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setModelFile(e.target.files[0]);
    }
  };
  const handleModelInputsFileUpload = (e) => {
    if (e.target.files) {
      setModelInputsFile(e.target.files[0]);
    }
  };

  const onIClick = () => {};

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
                onClick={() => algorithmChecked(algorithm)}
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
              <ParametersModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                algo={algorithmToAddParams}
                algosInputs={algosInputs}
              />
            </div>
          ))}
        </div>
        <div className="model_upload">
          <p className="RAP_MU_title">upload a model:</p>
          <input
            type="file"
            accept=".pkl, .joblib"
            id="files"
            onChange={handleModelFileUpload}
          />
        </div>
        <div className="model_upload">
          <button className="RAP_i_button" onClick={onIClick}>
            i
          </button>
          <p className="RAP_MU_title">upload model parameters:</p>
          <input
            type="file"
            accept=".json"
            id="files"
            onChange={handleModelInputsFileUpload}
          />
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
