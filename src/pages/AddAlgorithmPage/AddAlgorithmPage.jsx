import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";

const AddAlgorithmPage = () => {
  const parametersList = [
    {
      param_name: "x",
      description: "param description",
      accepted_types: "int, string",
    },
  ];
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const onBackClick = () => {
    navigate("/");
  };

  const onAddParamsClick = () => {
    setOpenModal(true);
  };
  return (
    <div className="AddAlgorithmPage">
      <button className="back_button" onClick={onBackClick}>
        back
      </button>
      <h1 className="main_title">add new algorithm</h1>
      <div className="add_name">
        <form>
          <label className="add_name_title">
            algorithm's name
            <input type="text" />
          </label>
        </form>
      </div>
      <div className="addFile">
        <form>
          <label className="upload_algo_title">
            upload algorithm file
            <input type="text" />
          </label>
        </form>
      </div>
      <div className="add_description">
        <form>
          <label className="desc_title">
            add description
            <input type="text" />
          </label>
        </form>
      </div>

      <div className="add_arguments">
        <button className="args_title" onClick={onAddParamsClick}>
          add_parameters
        </button>
      </div>
      {console.log(parametersList)}
      <AddParametersModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        paramsList={parametersList}
      />

      <div className="add_additional_info">
        <form>
          <label className="info_title">
            add additional info
            <input type="text" />
          </label>
        </form>
      </div>

      <div className="add_output_example">
        <form>
          <label className="output_title">
            add output example
            <input type="text" />
          </label>
        </form>
      </div>

      <button className="add_button">add</button>
    </div>
  );
};

export default AddAlgorithmPage;
