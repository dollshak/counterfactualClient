import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";
import Axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { AlgoType } from "../../Objects/ConfigService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pink } from "@mui/material/colors";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAlgorithmPage = () => {
  const [algorithmFile, setAlgorithmFile] = useState();
  const [algoName, setAlgoName] = useState("");
  const [algoDesc, setAlgoDesc] = useState("");
  const [algoInfo, setAlgoInfo] = useState("");
  const [algoOutputExample, setAlgoOutputExample] = useState("");
  const [parametersList, setParametersList] = useState([]);
  const [algoTypes, setAlgoTypes] = useState([]);
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [isSubmitValid, setIsSubmitValid] = useState(false);
  const [addingClicked, setAddingClicked] = useState(false);
  const api = Axios.create({
    baseURL: "http://127.0.0.1:5000",
  });
  const onBackClick = () => {
    navigate("/");
  };

  useEffect(() => {
    onDataChange();
  });
  const onNameChange = (event) => {
    setAlgoName(event.target.value);
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
  const onDataChange = () => {
    if (
      !algorithmFile ||
      !algoName ||
      algoName.length < 1 ||
      !algoDesc ||
      algoDesc.length < 1 ||
      !algoOutputExample ||
      algoOutputExample.length < 1 ||
      !algoTypes ||
      algoTypes.length < 1
    ) {
      setIsSubmitValid(false);
    } else {
      setIsSubmitValid(true);
    }
  };
  const onAddClick = () => {
    console.log("starting to add");
    if (!algorithmFile) {
      return;
    }

    const loadingToastId = toast.loading("Adding the algorithm...", {
      autoClose: false,
    });
    var formData = new FormData();
    formData.append("file_content", algorithmFile);
    formData.append("name", algoName);
    formData.append("argument_lst", JSON.stringify(parametersList));
    formData.append("description", algoDesc);
    formData.append("additional_info", algoInfo);
    formData.append("output_example", [algoOutputExample]);
    formData.append("type", JSON.stringify(algoTypes));
    setAddingClicked(true);
    api
      .post("/algorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toast.dismiss(loadingToastId);
        toast.success("algorithm was added successfully");
        setTimeout(() => {
          navigate("/");
        }, 2500);
      })
      .catch((err) => {
        console.log(err);
        toast.dismiss(loadingToastId);
        toast.error("could not add algorithm");
      });
  };

  const handleModelFileUpload = (e) => {
    if (e.target.files) {
      setAlgorithmFile(e.target.files[0]);
    }
  };

  const onTypeClick = (e) => {
    let algoType = e.target.value;
    if (e.target.checked && !algoTypes.includes(algoType)) {
      algoTypes.push(algoType);
    } else {
      const index = algoTypes.indexOf(algoType);
      if (index >= 0) {
        algoTypes.splice(index);
      }
    }
  };

  return (
    <div className="addAlgo-container">
      <div>
        <button className="back_button" onClick={onBackClick}>
          <h1>
            <HomeIcon />
          </h1>
        </button>
        <ToastContainer hideProgressBar={true} />
      </div>
      <h1 className="mainTitle">Add New Algorithm</h1>

      <div className="fields">
        <div className="rowSmall">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Algorithm's name</label>
          </div>
          <div className="columnRightAddAlgo">
            <input
              className="inputClass"
              type="text"
              value={algoName}
              onChange={onNameChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Description</label>
          </div>
          <div className="columnRightAddAlgo">
            <textarea
              className="textArea"
              type="text"
              value={algoDesc}
              onChange={onDescChange}
            />
          </div>
        </div>

        <div className="row">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Output example description</label>
          </div>
          <div className="columnRightAddAlgo">
            <textarea
              className="textArea"
              type="text"
              value={algoOutputExample}
              onChange={onOutputChange}
            />
          </div>
        </div>
        <div className="row">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Additional Info</label>
          </div>
          <div className="columnRightAddAlgo">
            <textarea
              className="textArea"
              type="text"
              value={algoInfo}
              onChange={onInfoChange}
            />
          </div>
        </div>

        <div className="rowSmall">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Code File</label>
          </div>
          <div className="columnRightAddAlgo">
            <input
              className="fileClass"
              type="file"
              id="files"
              onChange={handleModelFileUpload}
            />
          </div>
        </div>

        <div className="rowSmall">
          <div className="columnLeftAddAlgo">
            <label className="fieldTitle">Acceptable Models </label>
          </div>
          <div className="columnRightAddAlgo">
            <FormControlLabel
              value={AlgoType.Regressor}
              className="checkboxLeft"
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                  onChange={onTypeClick}
                />
              }
              label="Regression Models"
              labelPlacement="Regression Models"
            />
            <FormControlLabel
              className="checkboxRight"
              value={AlgoType.Classifier}
              control={
                <Checkbox
                  sx={{
                    color: pink[800],
                    "&.Mui-checked": {
                      color: pink[600],
                    },
                  }}
                  onChange={onTypeClick}
                />
              }
              label="Classification Models"
              labelPlacement="Classification Models"
            />
          </div>
        </div>

        <div className="row">
          <div className="shortInput">
            <button className="paramsButton" onClick={onAddParamsClick}>
              {parametersList.length === 0
                ? "Add Parameters"
                : "Edit parameters"}
            </button>
          </div>
        </div>
      </div>

      <AddParametersModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        paramsList={parametersList}
        setParamsList={setParametersList}
      />
      <div>
        <button
          className="submitButton"
          disabled={!isSubmitValid || addingClicked}
          onClick={onAddClick}
        >
          add
        </button>
      </div>
    </div>
  );
};

export default AddAlgorithmPage;
