import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AddParametersModal } from "../AddParametersModal/AddParametersModal";
import Axios from "axios";
import HomeIcon from "@mui/icons-material/Home";
import { AlgoType } from "../../Objects/ConfigService";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import { pink } from "@mui/material/colors";

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
  const [showGoodMessage, setShowGoodMessage] = useState(false);
  const [showBadMessage, setShowBadMessage] = useState(false);
  const [isSubmitValid, setIsSubmitValid] = useState(false);
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
    if (!algorithmFile) {
      return;
    }
    var formData = new FormData();
    formData.append("file_content", algorithmFile);
    formData.append("name", algoName);
    formData.append("argument_lst", JSON.stringify(parametersList));
    formData.append("description", algoDesc);
    formData.append("additional_info", algoInfo);
    formData.append("output_example", [algoOutputExample]);
    formData.append("type", JSON.stringify(algoTypes));
    api
      .post("/algorithm", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        setShowGoodMessage(true);
        setShowBadMessage(false);
        setTimeout(() => {
          navigate("/");
        }, 3000);
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
    <div className="backgroundComp">
      <div>
        <button className="back_button" onClick={onBackClick}>
          <h1>
            <HomeIcon />
          </h1>
        </button>
        <h1 className="mainTitle">Add New Algorithm</h1>
      </div>
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
            <label className="fieldTitle">output example description</label>
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
            <label className="fieldTitle">
              Choose algorithm acceptable Models{" "}
            </label>
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
              label="For Regression Models"
              labelPlacement="For Regression Models"
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
              label="For Classification Models"
              labelPlacement="For Classification Models"
            />
          </div>
        </div>

        <div className="row">
          <div className="shortInput">
            <button className="paramsButton" onClick={onAddParamsClick}>
              Add Parameters
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
          disabled={!isSubmitValid}
          onClick={onAddClick}
        >
          add
        </button>
      </div>
      {showGoodMessage && (
        <p className="AAP_good_message">algorithm was added succecfully</p>
      )}
      {showBadMessage && (
        <p className="errorMessage">
          there was a problem adding your algorithm
        </p>
      )}
    </div>
  );
};

export default AddAlgorithmPage;
