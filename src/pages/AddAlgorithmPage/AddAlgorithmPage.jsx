import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";
import Axios from "axios";

const AddAlgorithmPage = () => {
  const [algorithmFile, setAlgorithmFile] = useState();
  const [algoName, setAlgoName] = useState("");
  const [algoDesc, setAlgoDesc] = useState("");
  const [algoInfo, setAlgoInfo] = useState("");
  const [algoOutputExample, setAlgoOutputExample] = useState("");
  const [parametersList, setParametersList] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [showGoodMessage, setShowGoodMessage] = useState(false);
  const [showBadMessage, setShowBadMessage] = useState(false);
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });
  const onBackClick = () => {
    navigate("/");
  };

  const onNameChange = (event) => {
    setAlgoName(event.target.value);
    setShowBadMessage(false);
    setShowGoodMessage(false);
  };
  const onDescChange = (event) => {
    setAlgoDesc(event.target.value);
  };
  const onInfoChange = (event) => {
    setAlgoInfo(event.target.value);
  };
  const onOutputChange = (event) => {
    setAlgoOutputExample(event.target.value);
  };

  const onAddParamsClick = () => {
    setOpenModal(true);
  };

  const onAddClick = () => {
    if (!algorithmFile) {
      return;
    }
    var formData = new FormData();
    var data = [
      { param_name: "shape", description: "", accepted_types: "int" },
    ];
    formData.append("file_content", algorithmFile);
    formData.append("name", algoName);
    formData.append("argument_lst", JSON.stringify(data));
    formData.append("description", algoDesc);
    formData.append("additional_info", algoInfo);
    formData.append("output_example", ["1"]);
    api
      .post("/algorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setShowGoodMessage(true);
        setShowBadMessage(false);
      })
      .catch((err) => {
        console.log(err);
        setShowBadMessage(true);
        setShowGoodMessage(false);
      });
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setAlgorithmFile(e.target.files[0]);
    }
  };

  return (
    <div className="AddAlgorithmPage">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <h1 className="main_title">add new algorithm</h1>
      <div className="fields">
        <div className="add_name">
          <form>
            <label className="add_name_title">
              algorithm's name
              <input
                className="add_name_input"
                type="text"
                value={algoName}
                onChange={onNameChange}
              />
            </label>
          </form>
        </div>
        <div className="add_description">
          <form>
            <label className="desc_title">
              add description
              <input
                className="desc_input"
                type="text"
                value={algoDesc}
                onChange={onDescChange}
              />
            </label>
          </form>
        </div>

        <div className="add_additional_info">
          <form>
            <label className="info_title">
              add additional info
              <input
                className="info_input"
                type="text"
                value={algoInfo}
                onChange={onInfoChange}
              />
            </label>
          </form>
        </div>

        <div className="add_output_example">
          <form>
            <label className="output_title">
              add output example
              <input
                className="output_info"
                type="text"
                value={algoOutputExample}
                onChange={onOutputChange}
              />
            </label>
          </form>
        </div>

        <div className="algorithm_upload">
          <p className="AAP_upload_title">upload algorithm file</p>
          <input type="file" id="files" onChange={handleModelFileUpload} />
        </div>
      </div>

      <div className="add_arguments">
        <button className="args_title" onClick={onAddParamsClick}>
          add_parameters
        </button>
      </div>
      <AddParametersModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        paramsList={parametersList}
        setParamsList={setParametersList}
      />

      <button className="add_button" onClick={onAddClick}>
        add
      </button>
      {showGoodMessage && (
        <p className="AAP_good_message">algorithm was added succecfully</p>
      )}
      {showBadMessage && (
        <p className="AAP_bad_message">
          there was a problem adding your algorithm
        </p>
      )}
    </div>
  );
};

export default AddAlgorithmPage;
