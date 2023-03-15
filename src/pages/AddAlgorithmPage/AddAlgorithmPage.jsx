import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";
import Axios from "axios";

const AddAlgorithmPage = () => {
  const [algorithmFile, setAlgorithmFile] = useState();
  const [parametersList, setParametersList] = useState([
    {
      param_name: "x",
      description: "param description",
      accepted_types: "int, string",
    },
    {
      param_name: "y",
      description: "param description",
      accepted_types: "int",
    },
  ]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });
  const onBackClick = () => {
    navigate("/");
  };

  const onAddParamsClick = () => {
    setOpenModal(true);
  };

  const onAddClick = () => {
    api
      .get("/")
      .then((res) => {
        console.log(res?.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setAlgorithmFile(e.target.files[0]);
    }
  };

  const handleUploadModelClick = () => {
    if (!algorithmFile) {
      return;
    }
    var formData = new FormData();
    formData.append("modelFile", algorithmFile);
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
              <input className="add_name_input" type="text" />
            </label>
          </form>
        </div>
        <div className="add_description">
          <form>
            <label className="desc_title">
              add description
              <input className="desc_input" type="text" />
            </label>
          </form>
        </div>

        <div className="add_additional_info">
          <form>
            <label className="info_title">
              add additional info
              <input className="info_input" type="text" />
            </label>
          </form>
        </div>

        <div className="add_output_example">
          <form>
            <label className="output_title">
              add output example
              <input className="output_info" type="text" />
            </label>
          </form>
        </div>

        <div className="algorithm_upload">
          <input type="file" id="files" onChange={handleModelFileUpload} />
          <button onClick={handleUploadModelClick}>upload model</button>
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
    </div>
  );
};

export default AddAlgorithmPage;
