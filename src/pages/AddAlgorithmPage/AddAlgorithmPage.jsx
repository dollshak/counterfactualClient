import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";
import Axios from "axios";

const AddAlgorithmPage = () => {
  const parametersList = [
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
  ];
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
        <div className="addFile">
          <form>
            <label className="upload_algo_title">
              upload algorithm file
              <input className="upload_algo_input" type="text" />
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
      />

      <button className="add_button" onClick={onAddClick}>
        add
      </button>
    </div>
  );
};

export default AddAlgorithmPage;
