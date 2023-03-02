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
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });

  const onSubmit = () => {};

  const algorithmChecked = (algorithmId) => {
    var checkBox = document.getElementById(algorithmId);
    var text = document.getElementById("p" + algorithmId);
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

  useEffect(() => {
    api
      .get("/algos")
      .then((res) => {
        console.log(res?.data);
        setAlgorithmsList(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const addModelParam = () => {
    modelParamsList.push(modelParam);
    if (paramsStr === "") {
      setParamsStr(modelParam);
    } else {
      setParamsStr(paramsStr + "," + modelParam);
    }
    setmodelParam("");
  };

  const onBackClick = () => {
    navigate("/");
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setModelFile(e.target.files[0]);
    }
    console.log(modelFile);
  };

  const handleUploadModelClick = () => {
    if (!modelFile) {
      return;
    }
    var formData = new FormData();
    formData.append("modelFile", modelFile);
    api
      .post("/file", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => console.log(res?.data))
      .catch((err) => console.error(err));
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
              <ParametersModal
                open={openModal}
                onClose={() => setOpenModal(false)}
                algo={algorithmToAddParams}
              />
            </div>
          ))}
        </div>
        <div className="model_upload">
          <input type="file" onChange={handleModelFileUpload} />
          <button onClick={handleUploadModelClick}>Upload</button>
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
